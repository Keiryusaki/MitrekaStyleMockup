import type { GanttPhase, GanttTask } from "../types";
import { addDays, formatDateYmd, startOfDay } from "../utils";

export type GanttTemplateId = "blank" | "software" | "product-sprint";

export type GanttTemplate = {
  id: GanttTemplateId;
  name: string;
  description: string;
  phases: string[];
};

export const ganttTemplates: GanttTemplate[] = [
  { id: "blank", name: "Start Blank", description: "Start from an empty WBS and add your own tasks.", phases: [] },
  {
    id: "software",
    name: "Software Implementation",
    description: "Locked implementation lifecycle summaries with editable child tasks.",
    phases: ["Initiation", "Analysis", "Design", "Development", "Testing", "Deployment", "Closure"],
  },
  {
    id: "product-sprint",
    name: "Product Sprint",
    description: "Sprint-oriented product delivery WBS with protected phase summaries.",
    phases: ["Product Discovery", "Backlog Preparation", "Sprint Delivery", "Review", "Release"],
  },
];

const phaseColors: GanttTask["phaseColor"][] = ["gray", "green", "pink", "blue", "orange"];
const phaseIds: GanttPhase[] = ["analysis", "research", "design", "development", "testing", "release", "closure"];

export function buildTemplateTasks(templateId: GanttTemplateId, start = formatDateYmd(new Date())): GanttTask[] {
  const template = ganttTemplates.find((item) => item.id === templateId);
  if (!template || template.id === "blank") return [];
  const anchor = startOfDay(new Date(start));
  const tasks: GanttTask[] = [];
  let id = 1;

  template.phases.forEach((phase, index) => {
    const phaseStart = addDays(anchor, index * 8);
    const phaseEnd = addDays(phaseStart, 6);
    const summaryId = id++;
    tasks.push({
      id: summaryId,
      parentId: null,
      code: `${index + 1}`,
      name: phase,
      owner: "Template",
      status: index === 0 ? "done" : "on-track",
      progress: index === 0 ? 100 : 0,
      kind: "summary",
      start: formatDateYmd(phaseStart),
      end: formatDateYmd(phaseEnd),
      resources: [],
      phaseColor: phaseColors[index % phaseColors.length],
      phaseId: phaseIds[index % phaseIds.length],
      source: "template",
      lock: { delete: true, rename: true, move: true, reparent: true },
      sprintId: templateId === "product-sprint" ? `sprint-${Math.min(index + 1, 4)}` : undefined,
    });

    tasks.push({
      id: id++,
      parentId: summaryId,
      code: `${index + 1}.1`,
      name: `${phase} task`,
      owner: "Unassigned",
      status: index === 0 ? "done" : "on-track",
      progress: index === 0 ? 100 : 20,
      kind: index === template.phases.length - 1 ? "milestone" : "task",
      start: formatDateYmd(addDays(phaseStart, 1)),
      end: formatDateYmd(addDays(phaseStart, index === template.phases.length - 1 ? 1 : 4)),
      resources: [],
      phaseColor: phaseColors[index % phaseColors.length],
      phaseId: phaseIds[index % phaseIds.length],
      source: "template",
      sprintId: templateId === "product-sprint" ? `sprint-${Math.min(index + 1, 4)}` : undefined,
      dependencies: index > 0 ? [{ predecessorId: summaryId - 2, type: "finish-to-start" }] : [],
      effort: { value: index + 3, unit: templateId === "product-sprint" ? "story-points" : "person-days" },
      weight: index + 1,
    });
  });

  return tasks;
}
