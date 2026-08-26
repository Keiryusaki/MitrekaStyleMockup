import type { GanttSprint } from "../types";
import { addDays, formatDateYmd, startOfDay } from "../utils";

export function generateSprints(start: string, durationWeeks: number, count: number): GanttSprint[] {
  const startDate = startOfDay(new Date(start));
  const durationDays = Math.max(1, durationWeeks) * 7;
  return Array.from({ length: Math.max(0, count) }, (_, index) => {
    const sprintStart = addDays(startDate, index * durationDays);
    const sprintEnd = addDays(sprintStart, durationDays - 1);
    return {
      id: `sprint-${index + 1}`,
      name: `Sprint ${index + 1}`,
      start: formatDateYmd(sprintStart),
      end: formatDateYmd(sprintEnd),
    };
  });
}
