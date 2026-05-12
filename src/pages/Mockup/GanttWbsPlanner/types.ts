export type ViewMode = "day" | "week" | "month" | "year";
export type TaskKind = "summary" | "task" | "milestone";
export type TaskStatus = "on-track" | "at-risk" | "done";
export type ResourceTone = "slate" | "teal" | "amber" | "rose" | "indigo";
export type PhaseColor = "green" | "gray" | "pink" | "orange" | "blue";

export type Resource = {
  role: string;
  tone: ResourceTone;
};

export type TaskDependency = {
  fromTaskId: number;
  toTaskId: number;
  type: "finish-to-start" | "start-to-start" | "finish-to-finish" | "start-to-finish";
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
  dependencies?: number[];
};

export type FlattenedTask = GanttTask & {
  depth: number;
  childrenCount: number;
  startDate: Date;
  endDate: Date;
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
};
