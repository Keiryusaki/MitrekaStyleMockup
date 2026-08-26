export type ViewMode = "day" | "week" | "month" | "year";
export type TaskKind = "summary" | "task" | "milestone";
export type TaskStatus = "on-track" | "at-risk" | "done";
export type ResourceTone = "slate" | "teal" | "amber" | "rose" | "indigo";
export type PhaseColor = "green" | "gray" | "pink" | "orange" | "blue";
export type PlanningMode = "schedule" | "sprint";
export type BarColorMode = "phase" | "sprint" | "status" | "custom";
export type DependencyDisplayMode = "all" | "selected" | "hidden";
export type ResourceLabelMode = "none" | "nickname" | "name" | "avatar";
export type TaskSource = "template" | "user";
export type GanttPhase = "discovery" | "research" | "analysis" | "design" | "development" | "testing" | "release" | "closure" | "general";

export type GanttPhaseDefinition = {
  id: GanttPhase;
  label: string;
  color: string;
};

export const ganttPhaseCatalog: GanttPhaseDefinition[] = [
  { id: "discovery", label: "Discovery", color: "#16a34a" },
  { id: "research", label: "Research", color: "#0d9488" },
  { id: "analysis", label: "Analysis", color: "#64748b" },
  { id: "design", label: "Design", color: "#db2777" },
  { id: "development", label: "Development", color: "#2563eb" },
  { id: "testing", label: "Testing", color: "#f59e0b" },
  { id: "release", label: "Release", color: "#ea580c" },
  { id: "closure", label: "Closure", color: "#475569" },
  { id: "general", label: "General", color: "#0ea5e9" },
];

export type GanttTaskDependency = {
  predecessorId: number;
  type: "finish-to-start";
  lagDays?: number;
};

export type GanttSprint = {
  id: string;
  name: string;
  start: string;
  end: string;
  color?: string;
};

export type SprintScheduleValidation = {
  taskId: number;
  assignedSprintId?: string;
  crossedSprintIds: string[];
  carryOverDays: number;
  entirelyOutsideAssignedSprint: boolean;
  hasIssue: boolean;
  message: string;
};

export type TaskLock = {
  delete?: boolean;
  move?: boolean;
  rename?: boolean;
  reparent?: boolean;
};

export type Resource = {
  employeeId?: string;
  role: string;
  tone?: ResourceTone;
  allocation?: number;
  isPic?: boolean;
};

/** Employee master record used to populate resource assignment selectors. */
export type GanttEmployee = {
  id: string;
  name: string;
  nickname?: string;
  role: string;
};

/** Discriminated payload describing a single mutation, emitted as `change`. */
export type GanttChangeEvent =
  | { type: "create"; task: GanttTask }
  | { type: "update"; task: GanttTask }
  | { type: "delete"; id: number }
  | { type: "reschedule"; id: number; start: string; end: string }
  | { type: "resources"; id: number; resources: Resource[] };

export type TaskDependency = {
  fromTaskId: number;
  toTaskId: number;
  type: "finish-to-start" | "start-to-start" | "finish-to-finish" | "start-to-finish";
};

/** A finish-to-start dependency that is violated (task starts before predecessor ends). */
export type DependencyViolation = {
  taskId: number;
  taskName: string;
  predecessorId: number;
  predecessorName: string;
  /** Days between predecessor end and task start; <= 0 means overlap/violation. */
  gapDays: number;
};

/** An employee whose concurrent allocation peaks above 100%. */
export type ResourceOverAllocation = {
  employeeId: string;
  employeeName: string;
  /** Peak day (YYYY-MM-DD). */
  date: string;
  /** Peak total allocation percentage. */
  totalAllocation: number;
  /** Tasks active at the peak. */
  taskIds: number[];
};

/** Aggregate validation result for the current task set. */
export type GanttValidation = {
  dependencyViolations: DependencyViolation[];
  overAllocations: ResourceOverAllocation[];
  hasIssues: boolean;
};

/** All user-facing strings. Override any subset via the `labels` prop. */
export type GanttLabels = {
  // Toolbar
  toolbarTitle: string;
  toolbarSubtitle: string;
  tabGantt: string;
  tabWorkload: string;
  addRootTask: string;
  summaryEditOn: string;
  summaryEditOff: string;
  searchPlaceholder: string;
  // Task-list columns
  colTask: string;
  colStart: string;
  colDue: string;
  // Quick resource modal
  resourceModalTitle: string;
  resourceModalDescription: string;
  resourceModalSave: string;
  taskNameLabel: string;
  addResourceLabel: string;
  employeePlaceholder: string;
  addButton: string;
  currentAssignees: string;
  noAssignees: string;
  noAssigneesHint: string;
  unknownEmployee: string;
  pic: string;
  removeAssignee: string;
  // Task form modal
  editTaskTitle: string;
  addTaskTitle: string;
  taskModalDescription: string;
  taskNamePlaceholder: string;
  kindLabel: string;
  statusLabel: string;
  dateRangeLabel: string;
  dateRangePlaceholder: string;
  progressLabel: string;
  resourcesLabel: string;
  removeTaskList: string;
  updateTaskButton: string;
  addTaskButton: string;
  cancel: string;
  // Delete confirm modal
  deleteConfirmTitle: string;
  deleteConfirmDescription: string;
  deleteConfirmBody: string;
  deleteConfirmYes: string;
  // Validation banner
  validationHeading: string;
  depViolationText: string;
  overAllocationText: string;
};

/** Default labels (current Indonesian/English mix). Spread + override for i18n. */
export const defaultGanttLabels: GanttLabels = {
  toolbarTitle: "Work Breakdown Structure",
  toolbarSubtitle: "Reusable schedule and sprint planning component",
  tabGantt: "Gantt",
  tabWorkload: "Workload",
  addRootTask: "+ Root Task",
  summaryEditOn: "Summary Edit: On",
  summaryEditOff: "Summary Edit: Off",
  searchPlaceholder: "Search tasks...",
  colTask: "Task name",
  colStart: "Start",
  colDue: "Due",
  resourceModalTitle: "Kelola Assignee",
  resourceModalDescription: "Quick edit resource untuk task ini.",
  resourceModalSave: "Simpan Perubahan",
  taskNameLabel: "Task Name",
  addResourceLabel: "Tambah Resource",
  employeePlaceholder: "Cari karyawan...",
  addButton: "Tambah",
  currentAssignees: "Assignee Saat Ini",
  noAssignees: "Belum ada assignee",
  noAssigneesHint: "Silakan tambah assignee dari menu di atas.",
  unknownEmployee: "Unknown Employee",
  pic: "PIC",
  removeAssignee: "Hapus Assignee",
  editTaskTitle: "Edit Task",
  addTaskTitle: "Tambah Task",
  taskModalDescription: "Form task untuk WBS dan timeline scheduling.",
  taskNamePlaceholder: "Masukkan nama task",
  kindLabel: "Kind",
  statusLabel: "Status",
  dateRangeLabel: "Date Range",
  dateRangePlaceholder: "Pilih rentang tanggal",
  progressLabel: "Progress (%)",
  resourcesLabel: "Resources",
  removeTaskList: "Remove Task List",
  updateTaskButton: "Update Task",
  addTaskButton: "Add Task",
  cancel: "Batal",
  deleteConfirmTitle: "Konfirmasi Hapus Task",
  deleteConfirmDescription: "Task dan seluruh child task akan dihapus permanen dari list.",
  deleteConfirmBody: "Lanjutkan hapus task ini?",
  deleteConfirmYes: "Ya, Hapus",
  validationHeading: "Peringatan Jadwal & Beban",
  depViolationText: "dimulai sebelum predecessor selesai",
  overAllocationText: "beban melebihi 100%",
};

export type GanttTask = {
  id: number;
  parentId: number | null;
  code: string;
  name: string;
  owner: string;
  status: TaskStatus;
  progress: number;
  kind: TaskKind;
  start: string;
  end: string;
  resources: Resource[];
  phaseColor?: PhaseColor;
  phaseId?: GanttPhase;
  color?: string;
  sprintId?: string;
  source?: TaskSource;
  lock?: TaskLock;
  dependencies?: Array<number | GanttTaskDependency>;
  effort?: {
    value: number;
    unit: "hours" | "person-days" | "story-points";
  };
  weight?: number;
};

export type FlattenedTask = GanttTask & {
  depth: number;
  childrenCount: number;
  startDate: Date;
  endDate: Date;
  isScheduled: boolean;
};

export type TimeSlot = {
  key: string;
  label: string;
  shortLabel: string;
  groupLabel: string;
  start: Date;
  end: Date;
  isToday: boolean;
};

export type TaskBarPosition = {
  task: FlattenedTask;
  gridColumn: string;
  left: number;
  width: number;
  top: number;
  height: number;
};

export type DependencyLine = {
  from: TaskBarPosition;
  to: TaskBarPosition;
  path: string;
  type: "finish-to-start";
  lagDays?: number;
  title: string;
};
