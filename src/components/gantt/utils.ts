import type { ViewMode, TimeSlot, FlattenedTask, GanttTask, GanttEmployee, DependencyViolation, ResourceOverAllocation, GanttTaskDependency, GanttSprint, SprintScheduleValidation } from "./types";

// Date utilities
export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function endOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, 0, 1);
}

export function startOfWeek(date: Date): Date {
  const next = startOfDay(date);
  const day = next.getDay();
  return addDays(next, day === 0 ? -6 : 1 - day);
}

export function endOfWeek(date: Date): Date {
  return endOfDay(addDays(startOfWeek(date), 6));
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function endOfYear(date: Date): Date {
  return endOfDay(new Date(date.getFullYear(), 11, 31));
}

export function weekOfMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

export function formatDateYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Slot utilities
export function slotPixelWidth(mode: ViewMode): number {
  if (mode === "day") return 38;
  if (mode === "week") return 92;
  if (mode === "month") return 176;
  return 220;
}

export function buildSlots(mode: ViewMode, start: Date, end: Date, marker: Date): TimeSlot[] {
  const output: TimeSlot[] = [];

  if (mode === "day") {
    let cursor = startOfDay(start);
    while (cursor <= endOfDay(end)) {
      output.push({
        key: cursor.toISOString(),
        label: String(cursor.getDate()).padStart(2, "0"),
        shortLabel: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        groupLabel: cursor.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        start: startOfDay(cursor),
        end: endOfDay(cursor),
        isToday: cursor.getTime() === startOfDay(marker).getTime(),
      });
      cursor = addDays(cursor, 1);
    }
    return output;
  }

  if (mode === "week") {
    let cursor = startOfWeek(start);
    while (cursor <= endOfWeek(end)) {
      output.push({
        key: cursor.toISOString(),
        label: `W${weekOfMonth(cursor)}`,
        shortLabel: cursor.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        groupLabel: cursor.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        start: startOfWeek(cursor),
        end: endOfWeek(cursor),
        isToday: marker >= startOfWeek(cursor) && marker <= endOfWeek(cursor),
      });
      cursor = addDays(cursor, 7);
    }
    return output;
  }

  if (mode === "month") {
    let cursor = startOfMonth(start);
    while (cursor <= endOfMonth(end)) {
      output.push({
        key: cursor.toISOString(),
        label: cursor.toLocaleDateString("en-US", { month: "short" }),
        shortLabel: cursor.toLocaleDateString("en-US", { year: "numeric" }),
        groupLabel: cursor.getFullYear().toString(),
        start: startOfMonth(cursor),
        end: endOfMonth(cursor),
        isToday: marker >= startOfMonth(cursor) && marker <= endOfMonth(cursor),
      });
      cursor = addMonths(cursor, 1);
    }
    return output;
  }

  let cursor = startOfYear(addYears(start, -1));
  while (cursor <= endOfYear(addYears(end, 1))) {
    output.push({
      key: cursor.toISOString(),
      label: cursor.getFullYear().toString(),
      shortLabel: "Year",
      groupLabel: "Planning Horizon",
      start: startOfYear(cursor),
      end: endOfYear(cursor),
      isToday: marker >= startOfYear(cursor) && marker <= endOfYear(cursor),
    });
    cursor = addYears(cursor, 1);
  }
  return output;
}

// Task utilities
export function rangeForTask(task: FlattenedTask, timeSlots: TimeSlot[]): { start: number; span: number } | null {
  if (!task.isScheduled) return null;
  const active = timeSlots
    .map((slot, index) => ({ slot, index }))
    .filter(({ slot }) => task.endDate >= slot.start && task.startDate <= slot.end);

  if (!active.length) return null;

  return {
    start: active[0].index + 1,
    span: active[active.length - 1].index - active[0].index + 1,
  };
}

export function flattenTasks(tasks: GanttTask[], expandedIds: Set<number>): FlattenedTask[] {
  const childrenMap = new Map<number | null, FlattenedTask[]>();

  tasks.forEach((task) => {
    const list = childrenMap.get(task.parentId) ?? [];
    list.push({
      ...task,
      depth: 0,
      childrenCount: 0,
      startDate: startOfDay(new Date(task.start || "1970-01-01")),
      endDate: endOfDay(new Date(task.end || "1970-01-01")),
      isScheduled: Boolean(task.start && task.end),
    });
    childrenMap.set(task.parentId, list);
  });

  const output: FlattenedTask[] = [];

  const walk = (parentId: number | null, depth = 0) => {
    const children = childrenMap.get(parentId) ?? [];
    children.forEach((task) => {
      const taskChildren = childrenMap.get(task.id) ?? [];
      output.push({ ...task, depth, childrenCount: taskChildren.length });
      if (taskChildren.length && expandedIds.has(task.id)) {
        walk(task.id, depth + 1);
      }
    });
  };

  walk(null);
  return output;
}

// Dependency utilities
export function normalizeDependencies(dependencies: GanttTask["dependencies"]): GanttTaskDependency[] {
  return (dependencies ?? [])
    .map((dep) => (typeof dep === "number" ? { predecessorId: dep, type: "finish-to-start" as const } : dep))
    .filter((dep): dep is GanttTaskDependency => Number.isFinite(dep.predecessorId) && dep.type === "finish-to-start");
}

export function isDependencyRelated(taskId: number, activeTaskId: number | null, tasks: GanttTask[]): boolean {
  if (activeTaskId === null) return true;
  if (taskId === activeTaskId) return true;
  const activeTask = tasks.find((task) => task.id === activeTaskId);
  if (normalizeDependencies(activeTask?.dependencies).some((dep) => dep.predecessorId === taskId)) return true;
  return tasks.some((task) => task.id === taskId && normalizeDependencies(task.dependencies).some((dep) => dep.predecessorId === activeTaskId));
}

// Dependency line calculation
export function calculateDependencyPath(
  fromTask: { left: number; width: number; top: number; height: number },
  toTask: { left: number; width: number; top: number; height: number }
): string {
  const fromX = fromTask.left + fromTask.width;
  const fromY = fromTask.top + fromTask.height / 2;
  const toX = toTask.left;
  const toY = toTask.top + toTask.height / 2;

  const midX = (fromX + toX) / 2;

  // Simple L-shaped connector
  if (fromY === toY) {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }

  // Z-shaped connector for different rows
  return `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`;
}

// Sprint validation utilities
export function findSprintForDate(date: Date, sprints: GanttSprint[]): GanttSprint | undefined {
  const normalized = startOfDay(date).getTime();
  return sprints.find((sprint) => normalized >= startOfDay(new Date(sprint.start)).getTime() && normalized <= endOfDay(new Date(sprint.end)).getTime());
}

export function validateTaskSprintSchedule(task: GanttTask, sprints: GanttSprint[]): SprintScheduleValidation {
  const base: SprintScheduleValidation = {
    taskId: task.id,
    assignedSprintId: task.sprintId,
    crossedSprintIds: [],
    carryOverDays: 0,
    entirelyOutsideAssignedSprint: false,
    hasIssue: false,
    message: task.sprintId ? "" : "No Sprint",
  };
  if (!task.sprintId || task.kind === "summary" || !task.start || !task.end) return base;
  const assigned = sprints.find((sprint) => sprint.id === task.sprintId);
  if (!assigned) return { ...base, hasIssue: true, message: "Committed sprint not found." };

  const taskStart = startOfDay(new Date(task.start));
  const taskEnd = startOfDay(new Date(task.end));
  const sprintStart = startOfDay(new Date(assigned.start));
  const sprintEnd = startOfDay(new Date(assigned.end));
  const overlapsAssigned = taskEnd >= sprintStart && taskStart <= sprintEnd;
  const insideAssigned = taskStart >= sprintStart && taskEnd <= sprintEnd;
  if (insideAssigned) return base;

  const crossedSprintIds = sprints
    .filter((sprint) => taskEnd >= startOfDay(new Date(sprint.start)) && taskStart <= endOfDay(new Date(sprint.end)) && sprint.id !== assigned.id)
    .map((sprint) => sprint.id);

  if (!overlapsAssigned) {
    return {
      ...base,
      crossedSprintIds,
      entirelyOutsideAssignedSprint: true,
      hasIssue: true,
      message: "Task is scheduled outside its committed sprint.",
    };
  }

  const carryOverDays = Math.max(0, Math.round((taskEnd.getTime() - sprintEnd.getTime()) / 86400000));
  const targetSprint = crossedSprintIds[0] ? sprints.find((sprint) => sprint.id === crossedSprintIds[0]) : undefined;
  return {
    ...base,
    crossedSprintIds,
    carryOverDays,
    hasIssue: carryOverDays > 0 || crossedSprintIds.length > 0,
    message: carryOverDays > 0 ? `Carry-over to ${targetSprint?.name ?? "next sprint"} · ${carryOverDays} days` : "Task starts before its committed sprint.",
  };
}

export function validateSprintSchedules(tasks: GanttTask[], sprints: GanttSprint[]): SprintScheduleValidation[] {
  return tasks.map((task) => validateTaskSprintSchedule(task, sprints)).filter((item) => item.hasIssue || item.message === "No Sprint");
}

// Validation utilities

/**
 * Finds finish-to-start dependency violations: a scheduled task whose start
 * falls on/before a predecessor's end date. `gapDays` is negative (overlap).
 */
export function findDependencyViolations(tasks: GanttTask[]): DependencyViolation[] {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const out: DependencyViolation[] = [];
  for (const task of tasks) {
    if (!task.start || !task.end) continue;
    const taskStart = startOfDay(new Date(task.start));
    for (const dep of normalizeDependencies(task.dependencies)) {
      const pred = byId.get(dep.predecessorId);
      if (!pred || !pred.start || !pred.end) continue;
      const predEnd = startOfDay(new Date(pred.end));
      if (predEnd >= taskStart) {
        const gapDays = Math.round((taskStart.getTime() - predEnd.getTime()) / 86400000);
        out.push({
          taskId: task.id,
          taskName: task.name,
          predecessorId: pred.id,
          predecessorName: pred.name,
          gapDays,
        });
      }
    }
  }
  return out;
}

/**
 * Finds employees whose concurrent allocation (sum of overlapping scheduled
 * tasks) peaks above 100%. Summary roll-up bars are excluded to avoid double
 * counting. Returns the peak day and the tasks active at that peak.
 */
export function findResourceOverAllocations(tasks: GanttTask[], employees: GanttEmployee[] = []): ResourceOverAllocation[] {
  const employeeName = new Map(employees.map((emp) => [emp.id, emp.name]));
  const byEmp = new Map<string, Array<{ start: Date; end: Date; allocation: number; taskId: number }>>();

  for (const task of tasks) {
    if (task.kind === "summary" || !task.start || !task.end) continue;
    const start = startOfDay(new Date(task.start));
    const end = startOfDay(new Date(task.end));
    for (const res of task.resources) {
      if (!res.employeeId) continue;
      const list = byEmp.get(res.employeeId) ?? [];
      list.push({ start, end, allocation: res.allocation ?? 100, taskId: task.id });
      byEmp.set(res.employeeId, list);
    }
  }

  const out: ResourceOverAllocation[] = [];
  for (const [employeeId, segments] of byEmp) {
    const events: Array<{ t: number; delta: number; taskId: number }> = [];
    for (const seg of segments) {
      events.push({ t: seg.start.getTime(), delta: seg.allocation, taskId: seg.taskId });
      // end is inclusive, so the load drops the day after.
      events.push({ t: seg.end.getTime() + 86400000, delta: -seg.allocation, taskId: seg.taskId });
    }
    // Process additions before removals at the same instant.
    events.sort((a, b) => a.t - b.t || b.delta - a.delta);

    let running = 0;
    let peak = 0;
    let peakTime = 0;
    let peakTasks: number[] = [];
    const active = new Set<number>();
    for (const ev of events) {
      if (ev.delta > 0) {
        active.add(ev.taskId);
        running += ev.delta;
        if (running > peak) {
          peak = running;
          peakTime = ev.t;
          peakTasks = [...active];
        }
      } else {
        running += ev.delta;
        active.delete(ev.taskId);
      }
    }

    if (peak > 100) {
      out.push({
        employeeId,
        employeeName: employeeName.get(employeeId) ?? employeeId,
        date: formatDateYmd(new Date(peakTime)),
        totalAllocation: peak,
        taskIds: peakTasks,
      });
    }
  }
  return out;
}
