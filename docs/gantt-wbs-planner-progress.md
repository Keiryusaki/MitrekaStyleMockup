# Gantt WBS Planner - Progress Log

**Last update:** 2026-06-03 (v4)  
**Page:** `http://localhost:5178/MitrekaStyleMockup/#/gantt-wbs-planner`  
**Route source:** `src/pages/Mockup/GanttWbsPlanner.vue` (thin wrapper)  
**Component source:** `src/components/gantt/` (reusable `<GanttChart>`)

---

## Completed

### 1) Core Layout and Visual
- Left panel task list + right panel timeline split layout.
- Sticky toolbar and timeline header.
- Task columns: `#`, checkbox, `Task Name`, `Start`, `Due`, `%`, resource button.
- Milestone diamond, summary bar style, progress fill, dependency lines.
- Today marker line + day/month grouped timeline header.

### 2) Data and Rendering
- Hierarchical tasks via `parentId` and expand/collapse.
- Flattened rendering for visible rows only.
- View modes: `day`, `week`, `month`, `year`.
- Slot-based timeline rendering using shared utility functions.

### 3) Dark Mode Support
- Dark theme styling now supports:
  - `.dark ...`
  - `:root[data-theme="mitrekadark"] ...`
  - `[data-theme="mitrekadark"] ...` fallback
- Applied across:
  - `GanttWbsPlanner.vue`
  - `GanttTaskRow.vue`
  - `GanttTimeline.vue`
  - `GanttDependencyLines.vue`

### 4) Scroll Behavior (Updated)
- Vertical scroll sync is now **two-way**:
  - Timeline body scroll -> Task list scroll.
  - Task list scroll -> Timeline body scroll.
- Horizontal scroll remains timeline-only and synced between:
  - Timeline header
  - Timeline body

### 5) Drag and Resize MVP (New)
- Drag task bar horizontally to move schedule.
- Resize from left handle to change start date.
- Resize from right handle to change end date.
- Snaps to current slot grid (day/week/month/year).
- Updates task `start` and `end` in local state immediately.

### 6) Drag Stability and Cancel UX (New)
- Added drag safety fixes:
  - `pointer capture`
  - cleanup on `pointercancel` and `window blur`
  - `preventDefault`, `user-select: none`, `touch-action: none`
- Added drag threshold (`6px`) to avoid accidental micro-move.
- Press `Esc` while dragging to cancel and restore original dates.

### 7) Summary Lock + Drag Tooltip + Undo (New)
- Summary bar edit lock now available via `Summary Edit: On/Off` toggle.
- While dragging/resizing bars, live date tooltip follows cursor.
- Committed drag/resizes are tracked in local undo stack.
- `Ctrl+Z` / `Cmd+Z` restores last committed task date change.

### 8) Task CRUD + Reorder + Schedule Drop (New)
- Added task list actions per row:
  - add child task
  - edit task name
  - remove task (with descendants)
- Added quick create root task button (`+ Root Task`).
- Task list reorder supports drag row and drop onto another row.
- Drag task row into timeline area to schedule/update its dates.
- Remove gantt bar from timeline via `×` button on the bar:
  - task remains in list
  - task dates are cleared (`unscheduled`)

### 9) Task Form Modal + Toolbar Placement (Adjustment)
- `Add root` and `Summary Edit` actions moved into `gantt-toolbar-wrapper` (right side, near search task).
- `Add root` and `Add child` no longer use prompt dialog; now use `Task Form` modal.
- `Edit task` now opens the same `Task Form` modal.
- Task form includes:
  - task name
  - kind
  - status
  - start/end date
  - owner
  - progress
  - resource role + tone
- `Remove task list` action is now available only in edit mode inside the task modal.

### 10) UX Fixes - Edit/Remove + DS Form Controls (Adjustment)
- Edit task now accessible via:
  - double click on task row
  - double click on gantt bar
  - edit icon on task row (made persistently visible)
- Remove gantt bar from timeline fixed:
  - top-right `x` button on bar now prevents drag interception and unschedules task correctly.
- Task form upgraded with DS components:
  - `SelectDropdown` for kind/status/resource tone
  - `DateTimePicker` (`mode=range`, `clearable`) for start-end
  - `Input` for text fields
- Progress input now inline and synchronized:
  - `[number input] [range slider]`
- Clearing date range in edit form now also removes gantt bar (task becomes unscheduled).

### 11) Dependency Arrow Reorder Fix (New)
- Dependency path routing now adapts to vertical task order changes.
- If task order is changed (e.g. predecessor/target swap top-bottom position), arrow connector recalculates side/turn direction so flow line stays aligned with new row positions.
- Behavior applies without changing dependency links themselves (still based on `dependencies` relation).

### 12) Reorder -> Auto Rechain Dependencies (New)
- Reordering task rows now auto-updates dependency chain within the same parent group (sibling tasks).
- Effect: flow sequence follows the latest row order after drag-drop.
- External dependencies (from other groups/parents) are preserved.

### 13) Arrow Alignment + Auto Flow on Add/Schedule (New)
- Dependency arrowhead marker adjusted to keep triangle centered on connector endpoint.
- Auto dependency rechain now also runs when:
  - adding new task via task modal
  - mapping task to timeline via drag-drop schedule
- Result: flow/dependency appears immediately without requiring manual reorder first.

### 14) Resource Model Unification (Step 1-3)
- Resource is now treated as primary task data in Add/Edit Task form (`multi-resource` list).
- Task form supports add/remove resource entries before submit.
- Resource modal on task row is now a quick editor over the same resource data:
  - load current task resources
  - add/remove resource
  - save back directly to `task.resources`
- This prepares next step for resource visualization/filter without data duplication.

### 15) Employee-Based Resource Assignment (Refactor)
- Resource input now references employee master options via `SelectDropdown` (employee-based assignment), not free-text role first.
- Resource payload now supports:
  - `employeeId`
  - `role` (derived/snapshot)
  - `allocation` (%)
- Task Form and Quick Resource Modal both use:
  - employee selector
  - allocation input
- Resource `tone` is no longer used as primary UX signal in assignment flow.

### 16) Resource UX and Task Modal Structure (Adjustment)
- Resource employee picker switched to `SelectInput` (searchable), so large employee list can be found quickly without long scrolling.
- Add/Edit task form order updated:
  1. Date range
  2. Progress (number + slider)
  3. Resource assignment (including PIC selection)
- Resource list rendering in Add/Edit form is now aligned with Resource Quick Modal style (card/list with avatar, role, allocation, remove action).
- Remove Task action moved to modal footer.
- Task deletion now requires explicit confirmation modal before task + descendants are removed.

### 17) Owner Simplification -> PIC in Resource (New)
- Owner input removed from Add/Edit task form.
- PIC is now selected from assigned resources (`single PIC` via radio).
- Rules:
  - if only one resource exists, it is auto-PIC
  - if PIC is removed and resources remain, first resource becomes PIC
- Task `owner` value remains derived automatically from selected PIC for backward compatibility.

### 18) Timeline Header Scroll Sync Stabilization (Fix)
- Fixed timeline header/body column misalignment when horizontal scroll reaches far right.
- Implemented dynamic scrollbar gutter compensation based on body viewport scrollbar width.
- Adjusted compensation placement to header container (not header content) to prevent desync when scrolling back to left.

### 19) Dependency Arrow and Dot Layering (Fix)
- Dependency line start/end anchors tuned to align with source/target dot positions.
- Arrow endpoint adjusted to avoid overshooting target connection point.
- Task dependency dot now has higher z-index than dependency line for clearer layering.

### 20) Task Modal Footer Action Layout (Fix)
- `Remove Task List` action now uses soft error style and is positioned on left side of footer.
- `Batal` and `Update/Add Task` remain grouped on right side.
- Footer width handling fixed so left-right separation renders consistently in modal.

### 21) Promote to Reusable Component (Refactor)
- Extracted the gantt engine from the page into `src/components/gantt/` as `<GanttChart>`.
- Page (`GanttWbsPlanner.vue`) is now a thin wrapper: owns demo data, renders `PageHeader`, view-mode switch, and summary stats.
- Decoupled from mock data — now driven by props:
  - `tasks` (supports `v-model:tasks`), `employees`, `today`, `view`
  - `leftPanelWidth`, `rowHeight`, `enableUndoShortcut`, `defaultExpandedIds`, `defaultCheckedIds`
- Emits for host persistence:
  - `update:tasks` (full list, two-way)
  - `change` (discriminated: `create` / `update` / `delete` / `reschedule` / `resources`)
- Hardcoded employee directory moved to `demo/ganttData.ts` (`ganttEmployees`).
- `today` marker no longer hardcoded inside engine (default `new Date()`, demo passes fixed date).
- Left-panel width now a single source of truth (prop + CSS var `--gantt-left-width`), no more JS/CSS duplication.
- Undo `Ctrl/Cmd+Z` global listener now opt-out via `enableUndoShortcut`.
- Default expanded rows now derived (all `summary` tasks) instead of hardcoded ids.
- Public entry: `src/components/gantt/index.ts` (`GanttChart` + types + select utils).

---

## Current Interaction Rules

1. Drag center of bar: move task.
2. Drag left handle: resize start.
3. Drag right handle: resize end.
4. Press `Esc` during active drag: rollback.
5. Drop action is final unless canceled by `Esc` before release.

---

## File Layout (after componentization)

- `src/pages/Mockup/GanttWbsPlanner.vue` — thin page wrapper (route entry)
- `src/components/gantt/GanttChart.vue` — reusable engine (props/emits)
- `src/components/gantt/index.ts` — public exports
- `src/components/gantt/types.ts`
- `src/components/gantt/utils.ts`
- `src/components/gantt/components/GanttHeader.vue`
- `src/components/gantt/components/GanttTaskRow.vue`
- `src/components/gantt/components/GanttTimeline.vue`
- `src/components/gantt/components/GanttDependencyLines.vue`
- `src/components/gantt/demo/ganttData.ts` — demo fixtures (`ganttTasks`, `ganttEmployees`)

---

## Known Gaps / Next Suggested Work

1. Add dependency validation warning when task violates predecessor.
2. Improve reorder behavior to support strict WBS hierarchy move rules.
3. Add resource workload validation (e.g. total allocation warning above 100%).
4. Add explicit save/reset control if this moves beyond mockup state.

---

## Status

**Ready for demo (interactive mockup).**  
The page now supports dark mode + scroll sync + basic timeline editing (drag/resize).
