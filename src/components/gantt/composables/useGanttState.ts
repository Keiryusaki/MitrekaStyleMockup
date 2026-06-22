import { computed, reactive, ref, watch, type ComputedRef, type Ref } from "vue";
import type { GanttTask, GanttEmployee, GanttChangeEvent, FlattenedTask, Resource, GanttValidation } from "../types";
import { startOfDay, endOfDay, flattenTasks, findDependencyViolations, findResourceOverAllocations } from "../utils";

export type UseGanttStateOptions = {
  /** Getter for the source task list (e.g. `() => props.tasks`). */
  source: () => GanttTask[];
  /** Getter for the employee master list. */
  employees: () => GanttEmployee[];
  /** Getter for the initially expanded task ids. Falls back to all summary tasks. */
  defaultExpandedIds?: () => number[] | undefined;
  /** Getter for the initially checked task ids. Falls back to all `done` tasks. */
  defaultCheckedIds?: () => number[] | undefined;
  /** Called with the full task list whenever internal state mutates (for `v-model:tasks`). */
  onUpdateTasks: (tasks: GanttTask[]) => void;
  /** Called with a discriminated payload describing each mutation. */
  onChange: (event: GanttChangeEvent) => void;
};

export type ParsedTask = GanttTask & {
  startDate: Date;
  endDate: Date;
  isScheduled: boolean;
};

export type UseGanttStateReturn = {
  tasksState: Ref<GanttTask[]>;
  expandedIds: Set<number>;
  checkedTaskIds: Set<number>;
  taskHistory: Ref<Array<{ id: number; fromStart: string; fromEnd: string; toStart: string; toEnd: string }>>;
  parsedTasks: ComputedRef<ParsedTask[]>;
  flattenedTasks: ComputedRef<FlattenedTask[]>;
  validation: ComputedRef<GanttValidation>;
  employeeLookup: ComputedRef<Map<string, GanttEmployee>>;
  employeeOptions: ComputedRef<Array<{ value: string; label: string }>>;
  toggleExpand: (id: number) => void;
  isTaskChecked: (id: number) => boolean;
  toggleTaskCheck: (id: number) => void;
  nextTaskId: () => number;
  normalizePicResources: (resources: Resource[], ownerName?: string) => Resource[];
  deriveOwnerFromResources: (resources: Resource[]) => string;
  rechainDependenciesWithinParent: (parentId: number | null) => void;
  createTask: (task: GanttTask) => void;
  updateTask: (id: number, patch: Partial<GanttTask>) => void;
  removeTask: (taskId: number) => void;
  reorderTask: (sourceTaskId: number, targetTaskId: number) => void;
  updateTaskDate: (payload: { id: number; start: Date; end: Date }) => void;
  unscheduleTask: (taskId: number) => void;
  commitTaskDateChange: (payload: { id: number; fromStart: Date; fromEnd: Date; toStart: Date; toEnd: Date }) => void;
  undoLastDateChange: () => void;
};

function formatDateYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function cloneTasks(list: GanttTask[]): GanttTask[] {
  return list.map((task) => ({
    ...task,
    resources: task.resources.map((resource) => ({ ...resource })),
    dependencies: task.dependencies ? [...task.dependencies] : undefined,
  }));
}

/**
 * Owns the Gantt task data engine: the working task list, expand/check sets,
 * undo history, and every mutation primitive. Keeps `GanttChart.vue` focused on
 * timeline layout and modal/form UI.
 */
export function useGanttState(opts: UseGanttStateOptions): UseGanttStateReturn {
  const tasksState = ref<GanttTask[]>(cloneTasks(opts.source()));

  // Two-way sync: keep internal copy aligned with incoming prop, emit on local edits.
  let syncingFromProp = false;
  watch(
    opts.source,
    (val) => {
      syncingFromProp = true;
      tasksState.value = cloneTasks(val);
    },
    { deep: true }
  );
  watch(
    tasksState,
    (val) => {
      if (syncingFromProp) {
        syncingFromProp = false;
        return;
      }
      opts.onUpdateTasks(val);
    },
    { deep: true }
  );

  const expandedIds = reactive(
    new Set<number>(opts.defaultExpandedIds?.() ?? opts.source().filter((task) => task.kind === "summary").map((task) => task.id))
  );
  const checkedTaskIds = reactive(
    new Set<number>(opts.defaultCheckedIds?.() ?? opts.source().filter((task) => task.status === "done").map((task) => task.id))
  );
  const taskHistory = ref<Array<{ id: number; fromStart: string; fromEnd: string; toStart: string; toEnd: string }>>([]);

  const employeeLookup = computed(() => new Map(opts.employees().map((item) => [item.id, item])));
  const employeeOptions = computed(() => opts.employees().map((item) => ({ value: item.id, label: `${item.name} - ${item.role}` })));

  const parsedTasks = computed<ParsedTask[]>(() =>
    tasksState.value.map((task) => ({
      ...task,
      startDate: startOfDay(new Date(task.start || "1970-01-01")),
      endDate: endOfDay(new Date(task.end || "1970-01-01")),
      isScheduled: Boolean(task.start && task.end),
    }))
  );

  const flattenedTasks = computed<FlattenedTask[]>(() => flattenTasks(tasksState.value, expandedIds));

  const validation = computed<GanttValidation>(() => {
    const dependencyViolations = findDependencyViolations(tasksState.value);
    const overAllocations = findResourceOverAllocations(tasksState.value, opts.employees());
    return {
      dependencyViolations,
      overAllocations,
      hasIssues: dependencyViolations.length > 0 || overAllocations.length > 0,
    };
  });

  function toggleExpand(id: number) {
    if (expandedIds.has(id)) expandedIds.delete(id);
    else expandedIds.add(id);
  }

  function isTaskChecked(id: number) {
    return checkedTaskIds.has(id);
  }

  function toggleTaskCheck(id: number) {
    if (checkedTaskIds.has(id)) checkedTaskIds.delete(id);
    else checkedTaskIds.add(id);
  }

  function nextTaskId() {
    return Math.max(...tasksState.value.map((task) => task.id), 0) + 1;
  }

  function normalizePicResources(resources: Resource[], ownerName?: string): Resource[] {
    const cloned = resources.map((res) => ({ ...res }));
    if (!cloned.length) return cloned;
    if (cloned.some((res) => res.isPic)) return cloned;
    const ownerMatchIndex = ownerName
      ? cloned.findIndex((res) => (employeeLookup.value.get(res.employeeId ?? "")?.name ?? "").toLowerCase() === ownerName.toLowerCase())
      : -1;
    const picIndex = ownerMatchIndex >= 0 ? ownerMatchIndex : 0;
    return cloned.map((res, idx) => ({ ...res, isPic: idx === picIndex }));
  }

  function deriveOwnerFromResources(resources: Resource[]): string {
    const pic = resources.find((res) => res.isPic) ?? resources[0];
    if (!pic) return "Unassigned";
    return employeeLookup.value.get(pic.employeeId ?? "")?.name ?? pic.role ?? "Unassigned";
  }

  function rechainDependenciesWithinParent(parentId: number | null) {
    const siblingIds = tasksState.value
      .filter((task) => task.parentId === parentId && task.kind !== "summary")
      .map((task) => task.id);
    if (!siblingIds.length) return;

    tasksState.value = tasksState.value.map((task) => {
      if (!siblingIds.includes(task.id)) return task;
      const preservedExternalDeps = (task.dependencies ?? []).filter((dep) => !siblingIds.includes(dep));
      const currentIndex = siblingIds.indexOf(task.id);
      if (currentIndex <= 0) {
        return { ...task, dependencies: preservedExternalDeps };
      }
      return { ...task, dependencies: [...preservedExternalDeps, siblingIds[currentIndex - 1]] };
    });
  }

  function createTask(task: GanttTask) {
    tasksState.value.push(task);
    if (task.parentId) expandedIds.add(task.parentId);
    rechainDependenciesWithinParent(task.parentId);
    opts.onChange({ type: "create", task });
  }

  function updateTask(id: number, patch: Partial<GanttTask>) {
    let updated: GanttTask | undefined;
    tasksState.value = tasksState.value.map((task) => {
      if (task.id !== id) return task;
      updated = { ...task, ...patch };
      return updated;
    });
    if (updated) opts.onChange({ type: "update", task: updated });
  }

  function removeTask(taskId: number) {
    const idsToRemove = new Set<number>([taskId]);
    let changed = true;
    while (changed) {
      changed = false;
      tasksState.value.forEach((item) => {
        if (item.parentId !== null && idsToRemove.has(item.parentId) && !idsToRemove.has(item.id)) {
          idsToRemove.add(item.id);
          changed = true;
        }
      });
    }
    tasksState.value = tasksState.value
      .filter((item) => !idsToRemove.has(item.id))
      .map((item) => ({
        ...item,
        dependencies: (item.dependencies ?? []).filter((dep) => !idsToRemove.has(dep)),
      }));
    opts.onChange({ type: "delete", id: taskId });
  }

  function reorderTask(sourceTaskId: number, targetTaskId: number) {
    if (!sourceTaskId || sourceTaskId === targetTaskId) return;
    const sourceIndex = tasksState.value.findIndex((task) => task.id === sourceTaskId);
    const targetIndex = tasksState.value.findIndex((task) => task.id === targetTaskId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    const next = [...tasksState.value];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    tasksState.value = next;
    rechainDependenciesWithinParent(moved.parentId);
  }

  function updateTaskDate(payload: { id: number; start: Date; end: Date }) {
    const start = formatDateYmd(payload.start);
    const end = formatDateYmd(payload.end);
    tasksState.value = tasksState.value.map((task) => (task.id === payload.id ? { ...task, start, end } : task));
    opts.onChange({ type: "reschedule", id: payload.id, start, end });
  }

  function unscheduleTask(taskId: number) {
    tasksState.value = tasksState.value.map((task) => (task.id === taskId ? { ...task, start: "", end: "" } : task));
    opts.onChange({ type: "reschedule", id: taskId, start: "", end: "" });
  }

  function commitTaskDateChange(payload: { id: number; fromStart: Date; fromEnd: Date; toStart: Date; toEnd: Date }) {
    const fromStart = formatDateYmd(payload.fromStart);
    const fromEnd = formatDateYmd(payload.fromEnd);
    const toStart = formatDateYmd(payload.toStart);
    const toEnd = formatDateYmd(payload.toEnd);
    if (fromStart === toStart && fromEnd === toEnd) return;
    taskHistory.value.push({ id: payload.id, fromStart, fromEnd, toStart, toEnd });
  }

  function undoLastDateChange() {
    const latest = taskHistory.value.pop();
    if (!latest) return;
    tasksState.value = tasksState.value.map((task) =>
      task.id === latest.id ? { ...task, start: latest.fromStart, end: latest.fromEnd } : task
    );
    opts.onChange({ type: "reschedule", id: latest.id, start: latest.fromStart, end: latest.fromEnd });
  }

  return {
    tasksState,
    expandedIds,
    checkedTaskIds,
    taskHistory,
    parsedTasks,
    flattenedTasks,
    validation,
    employeeLookup,
    employeeOptions,
    toggleExpand,
    isTaskChecked,
    toggleTaskCheck,
    nextTaskId,
    normalizePicResources,
    deriveOwnerFromResources,
    rechainDependenciesWithinParent,
    createTask,
    updateTask,
    removeTask,
    reorderTask,
    updateTaskDate,
    unscheduleTask,
    commitTaskDateChange,
    undoLastDateChange,
  };
}
