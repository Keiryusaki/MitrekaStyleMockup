# Gantt WBS Planner - Progress Log

**Last update:** 2026-05-12  
**Page:** `http://localhost:5178/MitrekaStyleMockup/#/gantt-wbs-planner`  
**Route source:** `src/pages/Mockup/GanttWbsPlanner.vue`

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

---

## Current Interaction Rules

1. Drag center of bar: move task.
2. Drag left handle: resize start.
3. Drag right handle: resize end.
4. Press `Esc` during active drag: rollback.
5. Drop action is final unless canceled by `Esc` before release.

---

## Files Touched in This Iteration

- `src/pages/Mockup/GanttWbsPlanner.vue`
- `src/pages/Mockup/GanttWbsPlanner/components/GanttTaskRow.vue`
- `src/pages/Mockup/GanttWbsPlanner/components/GanttTimeline.vue`
- `src/pages/Mockup/GanttWbsPlanner/components/GanttDependencyLines.vue`

---

## Known Gaps / Next Suggested Work

1. Restrict editability for `summary` rows (optional lock).
2. Add live date tooltip while dragging/resizing.
3. Add dependency validation warning when task violates predecessor.
4. Add undo stack (`Ctrl+Z`) for committed drops.
5. Add explicit save/reset control if this moves beyond mockup state.

---

## Status

**Ready for demo (interactive mockup).**  
The page now supports dark mode + scroll sync + basic timeline editing (drag/resize).
