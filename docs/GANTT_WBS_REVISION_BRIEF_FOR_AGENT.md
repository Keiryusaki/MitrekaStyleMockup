# Revision Brief — WBS Gantt Planner Component & Live Docs

## Target Repository

- Repository: `Keiryusaki/MitrekaStyleMockup`
- Route: `#/gantt-wbs-planner`
- Main live docs page:
  - `src/pages/Mockup/GanttWbsPlanner.vue`
- Core component:
  - `src/components/gantt/GanttChart.vue`
- Related files:
  - `src/components/gantt/types.ts`
  - `src/components/gantt/utils.ts`
  - `src/components/gantt/composables/useGanttState.ts`
  - `src/components/gantt/components/GanttHeader.vue`
  - `src/components/gantt/components/GanttTaskRow.vue`
  - `src/components/gantt/components/GanttTimeline.vue`
  - `src/components/gantt/components/GanttDependencyLines.vue`
  - `src/components/gantt/demo/ganttData.ts`

---

# 1. Objective

Revise the existing reusable WBS Gantt component and its live docs so it supports two planning modes:

1. **Schedule-Based**
   - Tasks are scheduled directly using start and due dates.
   - Bar color defaults to phase-based coloring.

2. **Sprint-Based**
   - Tasks are grouped into configurable sprint periods.
   - Bar color defaults to sprint-based coloring.
   - Sprint bands are displayed above the existing calendar header.

The live docs must clearly demonstrate the complete flow:

1. Select planning mode.
2. Select WBS template.
3. Configure the project.
4. Generate WBS.
5. Edit the schedule.
6. Set a baseline.
7. Simulate project changes.
8. Compare current plan against baseline.

The component must remain reusable and must not contain application-specific API persistence logic.

---

# 2. Implementation Principles

## 2.1 Preserve existing functionality

Do not remove or break the following existing capabilities:

- WBS hierarchy.
- Expand and collapse summary tasks.
- Add root and child tasks.
- Edit and delete user-created tasks.
- Drag task rows.
- Drag and resize timeline bars.
- Milestones.
- Dependency lines.
- Resource assignment.
- Resource allocation validation.
- Dependency validation.
- Day, week, month, and year view modes.
- Synchronized vertical and horizontal scrolling.
- Undo date changes using `Ctrl/Cmd + Z`.
- Existing dark mode support.

## 2.2 Keep concerns separated

The core `GanttChart` is responsible for:

- Rendering WBS and timeline.
- Rendering task bars, sprint bands, baseline bars, resources, tooltips, and dependency lines.
- Editing task data through emitted events.
- Enforcing task-level UI locks.

The live docs page is responsible for:

- Scenario selection.
- Planning mode selection.
- Template selection.
- Generating task data from templates.
- Creating and storing an in-memory baseline snapshot.
- Simulating project changes.
- Showing documentation and usage examples.

Do not place template catalogs, baseline version history, approval logic, or backend calls inside the core Gantt component.

---

# 3. MVP Scope

Implement the following features in this revision.

## 3.1 Explicit bar color source

Add a prop:

```ts
export type BarColorMode =
  | "phase"
  | "sprint"
  | "status"
  | "custom";
```

Suggested prop:

```ts
barColorMode?: BarColorMode;
```

Rules:

- `phase`: task bar color uses `task.phaseColor`.
- `sprint`: task bar color uses the assigned sprint color.
- `status`: task bar color uses task status.
- `custom`: task bar uses `task.color`.
- When the selected source is unavailable, use the existing default task color.
- Status must remain visible independently through badge, icon, or outline.
- Do not use the same visual color to ambiguously represent phase, sprint, and status at once.

Add a visible color legend to the live docs.

---

## 3.2 Planning modes

Add:

```ts
export type PlanningMode = "schedule" | "sprint";
```

Suggested prop:

```ts
planningMode?: PlanningMode;
```

Default:

```ts
planningMode: "schedule"
```

### Schedule mode

- Existing timeline behavior remains available.
- Task dates are edited directly.
- Default bar color mode is `phase`.

### Sprint mode

- Sprint bands appear above the existing date header.
- Each task may reference a sprint using `sprintId`.
- Default bar color mode is `sprint`.
- Tasks still retain actual start and end dates.
- A summary or epic may span multiple sprints.
- A normal task should be assignable to one primary sprint.
- Do not create an entirely separate Gantt implementation.

---

## 3.3 Sprint data model

Add:

```ts
export type GanttSprint = {
  id: string;
  name: string;
  start: string;
  end: string;
  color?: string;
};
```

Add props:

```ts
sprints?: GanttSprint[];
showSprintBands?: boolean;
```

Extend `GanttTask`:

```ts
sprintId?: string;
```

Add a sprint selector to the add/edit task modal when:

```ts
planningMode === "sprint"
```

Sprint header requirements:

- Render above month/week/day rows.
- Width must match sprint date range on the active timeline.
- Keep horizontal scrolling synchronized.
- Sprint label must remain readable.
- Sprint color should be visually light in the header, not overpower task bars.
- Tasks without a sprint remain allowed and display as `Unassigned`.

---

## 3.4 One task to multiple successor dependencies

The component must support:

- One predecessor leading to multiple successor tasks.
- Multiple predecessors leading to one successor task.
- Dependency lines must be independently rendered.
- Selecting or hovering a task should highlight its direct predecessors and successors.
- Non-related dependency lines should become less prominent while a task is active.

For the MVP, only implement:

```ts
"finish-to-start"
```

Preferred dependency model:

```ts
export type GanttTaskDependency = {
  predecessorId: number;
  type: "finish-to-start";
  lagDays?: number;
};
```

Extend `GanttTask`:

```ts
dependencies?: GanttTaskDependency[];
```

Backward compatibility:

- Existing numeric arrays such as `dependencies: [5, 6]` must either:
  1. be normalized internally, or
  2. have demo data migrated safely.

Do not silently break the current demo.

Add tooltip or accessible title for dependency lines:

```text
Task A → Task B · Finish to Start
```

Add live docs control:

```text
Dependencies: All | Selected | Hidden
```

Suggested type:

```ts
export type DependencyDisplayMode = "all" | "selected" | "hidden";
```

---

## 3.5 Resource nickname on task bar

Extend employee model:

```ts
export type GanttEmployee = {
  id: string;
  name: string;
  nickname?: string;
  role: string;
};
```

Add prop:

```ts
resourceLabel?: "none" | "nickname" | "name" | "avatar";
```

Default:

```ts
resourceLabel: "nickname"
```

Display rules:

- Show the primary PIC at the right side of the task bar.
- Prefer `employee.nickname`.
- Fallback to initials generated from employee name.
- If multiple resources are assigned:
  - show `AD +2`.
- When the bar is too small:
  - place the resource label outside the bar.
- When the timeline zoom is too dense:
  - allow the label to be hidden gracefully.
- Resource text must not block resize handles.

---

## 3.6 Task hover tooltip

When hovering a scheduled task bar, show a compact tooltip containing:

- Task name.
- Task type.
- Start and due dates.
- Duration.
- Planning mode information:
  - phase for schedule mode;
  - sprint for sprint mode.
- Progress.
- Status.
- PIC name and nickname.
- All assigned resources.
- Allocation percentage for each resource.
- Effort.
- Weight, when provided.
- Baseline variance, when baseline comparison is enabled.

Extend `GanttTask`:

```ts
effort?: {
  value: number;
  unit: "hours" | "person-days" | "story-points";
};

weight?: number;
```

Default tooltip example:

```text
Page Design
Task · Sprint 3
26 Sep – 2 Oct · 7 days

Progress: 40%
Status: On Track
PIC: AD — Aditya Pratama
Allocation: 50%
Effort: 8 Story Points
```

Prefer implementing the default tooltip as a reusable component:

```text
GanttTaskTooltip.vue
```

Optionally expose a slot:

```vue
<template #task-tooltip="{ task, resources, sprint, baselineTask }">
</template>
```

The default tooltip must work without a custom slot.

---

## 3.7 Locked template tasks

Extend task model:

```ts
export type TaskSource = "template" | "user";

export type TaskLock = {
  delete?: boolean;
  move?: boolean;
  rename?: boolean;
  reparent?: boolean;
};

export type GanttTask = {
  // existing fields
  source?: TaskSource;
  lock?: TaskLock;
};
```

Behavior:

- Template tasks can be protected from deletion.
- Template tasks can be protected from renaming.
- Template tasks can be protected from moving or reparenting.
- Date, progress, resource, effort, and sprint assignment may remain editable unless explicitly locked in the future.
- Show a lock icon beside locked task names.
- Hide or disable prohibited actions.
- When the user attempts a prohibited action, show a small tooltip or non-blocking explanation.
- User-created child tasks under locked template summaries remain editable and removable.
- Deleting a parent must never accidentally delete locked descendants.

The live docs must provide at least one locked WBS template demo.

---

## 3.8 Baseline comparison

Add support for displaying a baseline snapshot.

Props:

```ts
baselineTasks?: GanttTask[];
showBaseline?: boolean;
```

Baseline rendering rules:

- Match current and baseline tasks by task ID.
- Baseline bar appears as a muted ghost or outlined bar.
- Current plan remains the primary solid bar.
- Actual progress remains represented by the progress fill.
- Baseline bar must not capture pointer events.
- A changed task displays a small variance indicator where practical.

Tooltip must show:

```text
Baseline: 26 Sep – 2 Oct
Current: 29 Sep – 6 Oct
Variance: +4 days
```

The component only renders supplied baseline data.

The live docs page handles:

- `Set Baseline V1`.
- Taking a deep clone of current tasks.
- `Simulate Project Changes`.
- `Compare with Baseline`.
- Resetting the demo.

Do not add backend persistence.

---

# 4. Live Docs Redesign

Revise:

```text
src/pages/Mockup/GanttWbsPlanner.vue
```

The page must behave as an interactive component documentation page, not only a static demo.

## 4.1 Page header

Display:

- Title: `WBS Gantt Planner`
- Description:
  - reusable planning component for schedule-based and sprint-based projects.
- Component badge:
  - `Beta`
- Version:
  - use a local display value such as `vNext` or `v1.0 Demo`.

Do not display misleading text such as:

```text
read only from generated on 09 Aug 2100
```

Remove or replace that subtitle.

---

## 4.2 Scenario selector

Add scenario cards or segmented controls:

1. `Schedule-Based`
2. `Sprint-Based`
3. `Baseline Comparison`
4. `Locked WBS Template`

Changing scenario should:

- Load appropriate demo data.
- Update planning mode.
- Update bar color mode.
- Update sprint configuration.
- Update baseline visibility.
- Avoid a full page reload.

---

## 4.3 Guided flow

Add a visible flow or stepper:

1. Planning Mode
2. WBS Template
3. Project Setup
4. Build Schedule
5. Set Baseline
6. Track Changes

This may be a compact horizontal stepper.

It does not need to block navigation, but the current demo state should visibly correspond to the selected step.

---

## 4.4 Configuration panel

Add a configuration card above the Gantt.

Controls:

- Planning Mode:
  - Schedule-Based
  - Sprint-Based
- Template:
  - Start Blank
  - Software Implementation
  - Product Sprint
- Timeline View:
  - Day
  - Week
  - Month
  - Year
- Bar Color:
  - Phase
  - Sprint
  - Status
- Dependency Display:
  - All
  - Selected
  - Hidden
- Resource Label:
  - Nickname
  - Name
  - None
- Baseline:
  - Show / Hide

Sprint-only controls:

- Sprint duration:
  - 1, 2, 3, or 4 weeks.
- Sprint count.
- Generate sprint periods.

For the demo, sprint generation may be in-memory and deterministic.

---

## 4.5 Template selection and WBS generation

Create demo templates outside the main Vue file where practical:

```text
src/components/gantt/demo/templates.ts
```

Suggested templates:

### Software Implementation

Locked summary structure:

- Initiation
- Analysis
- Design
- Development
- Testing
- Deployment
- Closure

### Product Sprint

Locked summary structure:

- Product Discovery
- Backlog Preparation
- Sprint Delivery
- Review
- Release

Template rules:

- Main summary tasks are template-sourced.
- Main summary tasks cannot be deleted.
- User may add child tasks.
- User-created tasks remain removable.

When selecting a template:

- Show a preview.
- Require or provide a clear `Generate WBS` action.
- Avoid silently destroying edited data.
- If data already exists, confirm replacement in the live docs UI.

---

## 4.6 Baseline demo controls

Add buttons:

```text
Set Baseline V1
Simulate Project Changes
Compare with Baseline
Reset Demo
```

Behavior:

### Set Baseline V1

- Deep clone current tasks into baseline state.
- Show timestamp in the live docs.
- Baseline remains immutable.

### Simulate Project Changes

Modify several current tasks in a predictable way:

- Delay one task by 4 days.
- Increase one task duration.
- Change one resource allocation.
- Add one user-created task.
- Change one progress value.

### Compare with Baseline

- Enable baseline overlay.
- Show summary counters:
  - changed tasks;
  - delayed tasks;
  - added tasks.

### Reset Demo

- Restore scenario defaults.
- Clear baseline and simulation state.

---

# 5. Suggested Component API

The final public API may resemble:

```vue
<GanttChart
  v-model:tasks="tasks"
  :employees="employees"
  :view="activeView"
  :planning-mode="planningMode"
  :sprints="sprints"
  :show-sprint-bands="planningMode === 'sprint'"
  :bar-color-mode="barColorMode"
  :dependency-display="dependencyDisplay"
  :resource-label="resourceLabel"
  :baseline-tasks="baselineTasks"
  :show-baseline="showBaseline"
  :show-validation="true"
  @change="onChange"
  @validation="onValidation"
  @task-selected="onTaskSelected"
/>
```

New props should have safe defaults so existing usage remains functional.

---

# 6. Suggested File Structure

Do not force this exact structure when unnecessary, but avoid keeping all new logic in `GanttChart.vue`.

```text
src/components/gantt/
├─ GanttChart.vue
├─ types.ts
├─ utils.ts
├─ composables/
│  ├─ useGanttState.ts
│  ├─ useGanttDependency.ts
│  ├─ useGanttBaseline.ts
│  └─ useGanttSprint.ts
├─ components/
│  ├─ GanttHeader.vue
│  ├─ GanttTaskRow.vue
│  ├─ GanttTimeline.vue
│  ├─ GanttSprintHeader.vue
│  ├─ GanttTaskBar.vue
│  ├─ GanttBaselineBar.vue
│  ├─ GanttDependencyLines.vue
│  └─ GanttTaskTooltip.vue
└─ demo/
   ├─ ganttData.ts
   ├─ sprintData.ts
   ├─ baselineData.ts
   └─ templates.ts
```

Refactor only where it meaningfully improves maintainability.

---

# 7. Existing UX Issues to Fix During Revision

## 7.1 Do not leave fake controls

The current search input and Workload tab appear interactive but do not provide real behavior.

For this revision:

- Implement task search, or remove/hide it.
- Hide the Workload tab until a real workload view exists.
- Do not leave clickable controls that only change their visual state.

Search behavior, when implemented:

- Filter matching tasks.
- Keep ancestor summary tasks visible.
- Expand relevant ancestors automatically.
- Clear search restores previous expansion state where practical.

## 7.2 Checkbox consistency

The current task checkbox must not visually indicate completion while leaving status and progress unchanged.

Choose one consistent behavior.

Preferred:

- Checking a task sets:
  - `status = "done"`
  - `progress = 100`
- Unchecking restores:
  - previous status and progress when available;
  - otherwise `status = "on-track"`.

If this is not implemented, replace the checkbox with a non-interactive completion indicator.

## 7.3 Discoverable editing

Keep double-click as a shortcut, but add a discoverable row action menu:

- Edit task.
- Add child.
- Manage resources.
- Remove from timeline.
- Delete task.

For locked tasks, prohibited actions must be hidden or disabled.

## 7.4 Drag and drop hierarchy

Do not present ambiguous row drag behavior.

Minimum requirement:

- Add a visible drag handle.
- Show before/after drop indicator.
- Preserve parent-child hierarchy.
- Do not imply reparenting unless reparent behavior is actually implemented.
- Prevent locked task movement.
- Prevent moving a task into its own descendant.

If full reparenting is out of scope, row drag must only reorder among siblings.

---

# 8. Visual Requirements

- Maintain compatibility with existing Mitreka light and dark themes.
- Avoid hardcoding colors where design tokens or existing theme variables can be used.
- Keep the left WBS and right timeline row heights exactly synchronized.
- Increase default row height from 32 px to approximately 38 px if layout remains stable.
- Interactive targets should ideally be at least 28 px.
- Add a resizable divider between WBS and timeline when feasible.
- If resizable divider is not implemented now, preserve the existing `leftPanelWidth` prop.
- Baseline bars must remain visually secondary.
- Sprint header colors must be subtle.
- Resource labels must remain readable and not overlap dependency handles.
- Dependency lines must remain visible in both light and dark modes.

---

# 9. Validation and Edge Cases

Handle the following cases:

- Empty task list.
- Unscheduled task.
- Task without resources.
- Task without phase.
- Sprint mode with no sprint assigned.
- Baseline task deleted from current plan.
- Current task added after baseline.
- Locked task containing user-created children.
- Dependency pointing to a missing task.
- Multiple successors from one predecessor.
- Multiple predecessors into one successor.
- Collapsed summary containing selected or searched child.
- Very short milestone.
- Bar too short for resource label.
- Timeline zoom where sprint band starts or ends outside visible bounds.

---

# 10. Acceptance Criteria

The revision is complete when all criteria below pass.

## Core component

- Existing schedule-based demo still renders correctly.
- `planningMode="schedule"` works without sprint data.
- `planningMode="sprint"` renders sprint bands.
- Task bars can be colored by phase or sprint.
- A predecessor can render arrows to at least two successor tasks.
- Hovering or selecting a task highlights connected dependencies.
- PIC nickname appears on or beside the task bar.
- Hovering a task bar shows resource, allocation, effort, progress, and status.
- Locked template tasks cannot be deleted when `lock.delete = true`.
- Locked template tasks cannot be renamed when `lock.rename = true`.
- User-added tasks remain editable and removable.
- Baseline ghost bars appear when baseline data is supplied.
- Baseline tooltip shows current-versus-baseline variance.
- Existing validation still works.
- Existing drag and resize behavior still works.
- Existing day/week/month/year modes still work.
- Light and dark themes remain usable.

## Live docs

- User can switch between schedule and sprint scenarios.
- User can choose a WBS template.
- `Generate WBS` creates the template structure.
- Locked template rows are visibly marked.
- User can add a child task under a locked summary.
- User can set a baseline.
- User can simulate changes.
- User can compare current plan with baseline.
- User can reset the demo.
- Configuration controls update the demo without reloading the page.
- No visible control is fake or non-functional.
- The page clearly explains the planning flow.

---

# 11. Out of Scope for This Revision

Do not implement these items unless they are needed as small internal support:

- Backend persistence.
- Approval workflow.
- Real project permissions.
- Multiple persistent baseline versions.
- Rebaseline approval.
- Full change audit log.
- S-curve.
- Sprint burndown.
- Sprint velocity.
- Workload page.
- Finish-to-finish, start-to-start, and start-to-finish dependency types.
- Resource leveling engine.
- Auto-scheduling the entire project.
- Critical path calculation.

Prepare the component architecture so these can be added later without rewriting the core.

---

# 12. Expected Deliverables

1. Updated reusable Gantt component.
2. Updated types and utilities.
3. Sprint header support.
4. Baseline overlay support.
5. Resource nickname and hover tooltip.
6. Locked template task support.
7. Improved dependency rendering.
8. Revised interactive live docs flow.
9. Demo datasets and templates.
10. A concise developer note describing:
    - new props;
    - new task fields;
    - migration of dependency data;
    - known limitations.

Before completing the work:

- Run the existing build command.
- Run type checking.
- Fix all introduced errors.
- Verify the GitHub Pages route still works with hash routing.
- Avoid unrelated refactors outside the Gantt feature.
