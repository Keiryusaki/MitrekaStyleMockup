# Follow-up Patch Brief — Sprint Timeline, Carry-Over, Color Semantics & Branching Dependency

## Target

Repository:

```text
Keiryusaki/MitrekaStyleMockup
```

Live docs route:

```text
#/gantt-wbs-planner
```

This document is a **follow-up patch** for the existing WBS Gantt revision.  
Do not restart or redesign the whole component. Fix and clarify the current implementation based on the requirements below.

---

# 1. Main Problems Found in the Current Result

The current sprint demo has several issues:

1. The first task row in the task list is not vertically aligned with its task bar in the timeline.
2. Sprint header adds an extra timeline header layer, but the left task-list header still uses the previous fixed height.
3. Bar colors appear arbitrary because their meaning is not explained.
4. The edit-task form does not clearly expose the data that determines bar color.
5. Sprint colors should not become unique colors for every sprint.
6. The current demo does not clearly show one predecessor branching into two successor tasks.
7. A task needs a persistent sprint identity so the system can detect carry-over when its schedule crosses into the next sprint.

---

# 2. Fix Sprint Header and Task Row Alignment

## Requirement

The total height of the left task-list header and the right timeline header must always be identical.

The first task row on the left and the first timeline track on the right must start at the exact same vertical position.

## Header stacks

### Schedule mode

Right timeline header:

```text
Month
Date/slot
```

Left task-list header must use the same total height.

### Sprint mode

Right timeline header:

```text
Month
Sprint
Date/slot
```

Left task-list header must use the same total height.

The left side may remain a single merged header visually, but its total height must match the complete header stack on the right.

## Implementation guidance

Do not keep a hardcoded value such as:

```css
height: 71px;
```

when header layers are dynamic.

Use one shared computed header height or shared CSS variables, for example:

```ts
const timelineHeaderRows = computed(() => {
  return planningMode.value === "sprint" ? 3 : 2;
});
```

Possible CSS variables:

```css
--gantt-month-header-height
--gantt-sprint-header-height
--gantt-slot-header-height
--gantt-total-header-height
```

Example:

```css
--gantt-total-header-height:
  calc(
    var(--gantt-month-header-height)
    + var(--gantt-sprint-header-height)
    + var(--gantt-slot-header-height)
  );
```

Both sides must consume the same `--gantt-total-header-height`.

## Acceptance criteria

- `Kickoff` in the task list is horizontally level with the `Kickoff` milestone/bar in the timeline.
- Alignment remains correct when switching:
  - Schedule → Sprint.
  - Sprint → Schedule.
  - Day → Week → Month → Year.
- Alignment remains correct when the validation warning banner appears or disappears.
- Vertical scrolling never causes row drift.

---

# 3. Sprint Coloring — Alternating Odd/Even Background

## Decision

Sprint color is **not an identity color** and must not use a different strong color for every sprint.

Sprint color is only used to visually distinguish adjacent sprint timeboxes.

Use alternating odd/even background shading:

```text
Sprint 1 → Tint A
Sprint 2 → Tint B
Sprint 3 → Tint A
Sprint 4 → Tint B
```

This must remain readable even if the project contains many sprints.

## Visual hierarchy

### Sprint header band

Use a slightly stronger tint:

```text
approximately 10–14% visual intensity
```

### Timeline body band

Use a much lighter tint:

```text
approximately 4–6% visual intensity
```

### Sprint boundary

Render a subtle vertical boundary at the start of every sprint.

Suggested behavior:

- `1px` normal boundary.
- Slightly stronger than daily grid lines.
- Do not overpower dependency lines or task bars.

## Current sprint

Do not replace the odd/even tint.

Mark the current sprint using one of:

- `Current` badge.
- Small dot beside the sprint title.
- Slightly stronger header outline.

Do not darken the full current sprint body.

## Required setting

The live docs configuration may expose:

```text
Sprint Background
- Alternating
- Single Subtle Color
- Hidden
```

Default:

```text
Alternating
```

For this patch, `Alternating` must be fully functional. Other options may be omitted if they are not implemented properly.

## Acceptance criteria

- Sprint 1 and Sprint 3 use the same subtle tint family.
- Sprint 2 and Sprint 4 use the alternate tint family.
- The timeline remains readable with at least 12 generated sprints.
- Task bars, dependency lines, today marker, baseline bars, and text remain dominant over sprint shading.
- Dark theme has an equivalent subtle alternating treatment.

---

# 4. Clarify What Task Bar Color Means

## Decision

Sprint assignment must not determine the main task-bar color.

Use this visual meaning:

```text
Sprint background → sprint period
Task bar color    → project phase
Progress fill     → actual progress
Status icon/border→ done, at-risk, overdue
Ghost outline     → baseline
Red vertical line → today
```

## Phase model

Add or confirm a visible task phase field:

```ts
export type GanttPhase =
  | "discovery"
  | "research"
  | "analysis"
  | "design"
  | "development"
  | "testing"
  | "release"
  | "closure"
  | "general";
```

A simpler catalog is acceptable, but it must be explicit and visible in the edit form.

Extend task data:

```ts
phaseId?: string;
```

The edit-task modal must show:

```text
Phase
[ Analysis ▼ ]
```

The task bar color is derived automatically from the selected phase.

Do not require users to manually pick arbitrary colors for every task.

## Status display

Status must not silently overwrite the phase color.

Suggested status treatment:

- Done:
  - check icon;
  - complete progress fill.
- At Risk:
  - amber outline or warning icon.
- Overdue:
  - red outline or overdue indicator.
- On Track:
  - normal phase appearance.

## Legend

Add a compact visual guide in the live docs:

```text
Background : Sprint period
Bar color  : Project phase
Bar fill   : Actual progress
Outline    : Risk / overdue
Ghost bar  : Baseline plan
```

Also show the phase-to-color legend.

## Acceptance criteria

- Editing a task exposes the phase selector.
- Changing phase updates the task bar color.
- Changing sprint assignment does not directly change the bar color.
- The live docs clearly explain the color meaning.
- No visible bar color appears without an explainable source.

---

# 5. Sprint Identity on a Task

## Decision

A normal task must be linked to one committed sprint using a persistent sprint identity.

Extend task data:

```ts
sprintId?: string;
```

Meaning:

```text
sprintId = the sprint the task is committed/assigned to
start/end = the task's current scheduled position
```

The sprint assignment and timeline position are related but must not be treated as the same value.

Example:

```ts
{
  id: 101,
  name: "Page Design",
  sprintId: "sprint-1",
  start: "2026-07-10",
  end: "2026-07-22"
}
```

If Sprint 1 ends on 18 July, this task remains identified as a Sprint 1 task but crosses into Sprint 2.

This is a carry-over condition.

## Edit-task modal

In sprint mode, show:

```text
Committed Sprint
[ Sprint 1 ▼ ]
```

Also keep:

```text
Start Date
Due Date
```

When the dates do not fit the committed sprint, show inline validation.

Examples:

```text
Warning: Due date exceeds Sprint 1 by 4 days.
```

or:

```text
Warning: This task is scheduled entirely outside Sprint 1.
```

## Automatic suggestion

When assigning dates to a task with no sprint:

- Suggest the sprint based on the task start date.
- Do not silently change an existing `sprintId`.

Example:

```text
Suggested Sprint: Sprint 2
Based on task start date
```

The user confirms the assignment.

---

# 6. Carry-Over Detection

## Rules

Apply carry-over validation to:

- Normal tasks.
- Milestones.

Do not apply the same warning to:

- Summary tasks.
- Epics intended to span multiple sprints.

## Conditions

### Normal

```text
Committed sprint: Sprint 1
Start and due: both inside Sprint 1
```

No warning.

### Cross-sprint carry-over

```text
Committed sprint: Sprint 1
Start: inside Sprint 1
Due: inside Sprint 2
```

Show:

```text
Carry-over to Sprint 2 · 4 days
```

### Entirely outside assigned sprint

```text
Committed sprint: Sprint 1
Start and due: both inside Sprint 2
```

Show a stronger warning:

```text
Task is scheduled outside its committed sprint.
```

### Unassigned

```text
sprintId is empty
```

Show:

```text
No Sprint
```

Do not classify it as carry-over.

## Visual indication

Keep the task's phase color.

Add a compact warning at the right end of the bar:

- warning icon;
- carry-over badge;
- or small `↪ S2` marker.

Avoid large text that makes short bars unreadable.

Example:

```text
[ Page Design                RP ] ⚠
```

or:

```text
[ Page Design                RP ] S1 ↪ S2
```

For dense zoom levels, show only the warning icon.

## Tooltip

When carry-over exists, include:

```text
Committed Sprint: Sprint 1
Schedule: 10 Jul – 22 Jul
Crosses into: Sprint 2
Carry-over: 4 days
```

## Drag behavior

When a task bar is dragged or resized across the committed sprint boundary:

- Do not automatically update `sprintId`.
- Keep the original sprint assignment.
- Recompute carry-over validation after the drag is committed.

Optionally show a post-drag popover:

```text
This task exceeds Sprint 1.

- Keep as carry-over
- Move commitment to Sprint 2
```

`Split Task` is not required in this patch.

If the popover is not implemented, inline warning in the edit modal and tooltip is mandatory.

## Acceptance criteria

- A Sprint 1 task ending in Sprint 2 receives a carry-over warning.
- Moving the bar back inside Sprint 1 removes the warning.
- Dragging the task into Sprint 2 does not silently change `sprintId`.
- Changing `Committed Sprint` manually recalculates the warning.
- Summary tasks may span multiple sprints without a carry-over warning.
- Milestones outside their committed sprint receive a warning.

---

# 7. Resource Label and Tooltip Must Remain Compatible

Preserve the existing resource nickname display.

Rules:

- Show PIC nickname or initials at the right side of the bar.
- Multiple resources display:
  - `RP +2`
- Resource label must not overlap:
  - carry-over warning;
  - resize handle;
  - dependency anchor.

Suggested priority when space is limited:

1. Carry-over warning icon.
2. PIC nickname.
3. Additional-resource count.
4. Task name.

Hover tooltip must include:

- Task name.
- Phase.
- Committed sprint.
- Current schedule.
- Carry-over information.
- Progress.
- Status.
- PIC.
- Resources.
- Allocation.
- Effort.

---

# 8. Add a Branching Dependency Demo

## Problem

The current demo only clearly shows a linear sequence:

```text
Task A → Task B → Task C
```

It must explicitly demonstrate one predecessor connected to at least two successors.

## Required demo data

Add a visible example such as:

```text
API Foundation
├─ Frontend Integration
└─ Mobile Integration
```

Dependency:

```text
Frontend Integration depends on API Foundation
Mobile Integration depends on API Foundation
```

Visual result:

```text
                  → Frontend Integration
API Foundation ──┤
                  → Mobile Integration
```

Also include a many-to-one example when practical:

```text
Frontend Integration ──┐
                       ├──→ Integration Testing
Mobile Integration ────┘
```

## Rendering behavior

- Each dependency is rendered as an independent path.
- Lines may share an initial segment where appropriate, but must remain traceable.
- Arrowheads must point to each successor.
- Hovering or selecting the predecessor highlights all direct successor paths.
- Hovering or selecting one successor highlights:
  - that successor;
  - its predecessor;
  - the connecting path.
- Unrelated lines become visually quieter.

## Live docs scenario

Add either:

- a dedicated `Branching Dependencies` scenario; or
- branching tasks inside the Schedule-Based demo.

The branching must be visible without editing demo data manually.

## Acceptance criteria

- One task visibly connects to two successor task bars.
- Two task bars can visibly connect to one successor task.
- Lines remain aligned while scrolling.
- Lines remain correct after a task bar is moved.
- Missing dependency targets do not crash rendering.

---

# 9. Live Docs Adjustments

Update the live docs so the sprint concept is understandable without verbal explanation.

## Configuration panel

Show these controls in sprint scenario:

```text
Planning Mode: Sprint-Based
Sprint Duration: 2 Weeks
Committed Sprint: edited per task
Sprint Background: Alternating
Bar Meaning: Phase
```

Do not expose an arbitrary per-task color picker for the MVP.

## Sprint visual guide

Display:

```text
Sprint bands use alternating backgrounds only.
Task bars retain phase colors.
```

## Carry-over demo

The sprint scenario must contain at least one intentional carry-over task.

Example:

```text
Task: UI Revision
Committed Sprint: Sprint 1
Due date: inside Sprint 2
```

Show a visible warning and tooltip.

Also provide one normal task that stays inside its committed sprint for comparison.

## Alignment demo

Make sure the initial screenshot state clearly shows:

- first task row aligned with first timeline row;
- sprint header;
- month header;
- date header;
- no vertical drift.

---

# 10. Data Model Summary

Suggested task fields after this patch:

```ts
export type GanttTask = {
  id: number;
  parentId: number | null;
  name: string;
  kind: "summary" | "task" | "milestone";

  start: string;
  end: string;

  phaseId?: string;
  sprintId?: string;

  status: "on-track" | "at-risk" | "done";
  progress: number;

  resources: Resource[];
  effort?: {
    value: number;
    unit: "hours" | "person-days" | "story-points";
  };

  dependencies?: GanttTaskDependency[];

  source?: "template" | "user";
  lock?: TaskLock;
};
```

Suggested derived validation:

```ts
export type SprintScheduleValidation = {
  taskId: number;
  assignedSprintId?: string;
  crossedSprintIds: string[];
  carryOverDays: number;
  entirelyOutsideAssignedSprint: boolean;
  hasIssue: boolean;
};
```

This validation should be derived from task dates and sprint periods, not manually stored.

---

# 11. Out of Scope for This Patch

Do not expand this patch into:

- unique custom colors for every sprint;
- custom task color picker;
- full sprint backlog board;
- burndown chart;
- velocity chart;
- automated task splitting;
- automatic reassignment to the next sprint;
- persistent backend data;
- baseline version history;
- critical path;
- auto-scheduling.

Keep the patch focused on clarity and correct behavior.

---

# 12. Final Acceptance Checklist

The patch is complete when:

- [ ] Left and right header heights are synchronized.
- [ ] First task row and first timeline row are aligned in sprint mode.
- [ ] Sprint bands use odd/even alternating subtle backgrounds.
- [ ] Sprint backgrounds remain readable with many sprints.
- [ ] Task bar color clearly represents phase.
- [ ] Edit task exposes a phase selector.
- [ ] Edit task exposes a committed sprint selector in sprint mode.
- [ ] Sprint assignment does not automatically follow bar movement.
- [ ] Crossing the assigned sprint creates a carry-over warning.
- [ ] Carry-over details appear in the hover tooltip.
- [ ] Summary tasks may span several sprints without carry-over warnings.
- [ ] Resource nickname still appears correctly.
- [ ] One predecessor visibly branches to two successors.
- [ ] Two predecessors can visibly join one successor.
- [ ] The live docs contains an intentional carry-over example.
- [ ] The live docs explains the visual meaning through a legend.
- [ ] Light and dark themes remain usable.
- [ ] Build and type checking succeed.
- [ ] No unrelated feature is refactored or removed.
