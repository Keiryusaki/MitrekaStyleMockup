import type { ViewMode, TimeSlot, FlattenedTask, GanttTask } from "./types";

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
      startDate: startOfDay(new Date(task.start)),
      endDate: endOfDay(new Date(task.end)),
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
