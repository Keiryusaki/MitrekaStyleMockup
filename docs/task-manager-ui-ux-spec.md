# Task Manager — UI/UX & Implementation Specification

## 1. Objective

Build a clean, responsive task-management web application inspired by the simplicity of Google Tasks and Microsoft To Do.

The product is **not a Kanban board**. Columns represent user-created **lists**, never workflow statuses such as Todo, In Progress, or Done.

The core hierarchy is:

```text
Group → List → Task → Subtask
```

The app must support both:

- an **All Tasks view**, where multiple lists are displayed side by side as columns; and
- a **Single List view**, focused on one selected list.

## 2. Non-Negotiable Product Rules

1. A column in All Tasks always represents a **list**.
2. A task belongs to exactly one list.
3. Lists may optionally belong to a group.
4. Groups are organizational containers shown in the sidebar; they are not boards or projects with status columns.
5. Task completion is represented by a checkbox, not by moving a task to a Done column.
6. Opening a task displays its details in a right-side drawer without navigating away from the current view.
7. Users control which list columns appear in All Tasks via **More (`•••`) → Manage visible lists**.
8. Do not introduce Kanban concepts unless explicitly requested later.

## 3. Information Architecture

### Sidebar

The left sidebar is the primary navigation and management surface.

Recommended structure:

```text
App identity / workspace
Search

Smart views
  All Tasks
  Today
  Important
  Completed

Groups and lists
  Personal
    Inbox
    Shopping
  Work
    Product
    Marketing

Create group / Create list
Settings / profile
```

Sidebar requirements:

- Groups can expand and collapse.
- Clicking a list opens its Single List view.
- Clicking All Tasks opens the multi-list view.
- The active view is visually highlighted.
- Each group and list has a contextual menu for supported actions.
- Users can create, rename, reorder, and delete groups/lists.
- Deleting a non-empty group or list must require confirmation and clearly explain what happens to its contents.
- On small screens, the sidebar becomes an overlay drawer.

### Main Header

The main header should contain:

- current view title;
- optional task count or contextual subtitle;
- search/filter/sort controls when relevant;
- a More (`•••`) menu;
- a primary **Add task** action.

For All Tasks, the More menu must include **Manage visible lists**.

## 4. Core Views

### 4.1 All Tasks View

Purpose: provide a consolidated overview of tasks across selected lists.

Layout:

- Render one column per visible list.
- Each column header shows the list name, optional color/icon, open task count, and contextual menu.
- Columns are horizontally scrollable when they exceed the available width.
- Each column contains its own task composer and task list.
- Completed tasks may be collapsed into a separate section within their original list column.
- Empty columns remain visible and display an intentional empty state.

Important behavior:

- Changing task status must not move the task into another column.
- Dragging a task between list columns, if implemented, changes the task's `listId` after confirmation or clear visual feedback.
- Column order should follow the user's configured visible-list order.
- Hiding a column only changes visibility; it does not delete or archive the list.

### 4.2 Manage Visible Lists

Open this surface from `••• → Manage visible lists` in All Tasks.

Use a modal, popover, or side panel containing:

- all available lists, grouped by their parent group;
- a checkbox or switch for each list;
- drag handles or another clear mechanism for changing column order;
- **Show all** and **Hide all** convenience actions;
- Apply/Done and Cancel actions if changes are not applied instantly.

Rules:

- Visibility preferences persist per user.
- A hidden list still exists in the sidebar and remains accessible in Single List view.
- If no lists are visible, show an explanatory empty state with a **Choose lists** button.

### 4.3 Single List View

Purpose: let the user focus on one list.

The view should include:

- list title and optional description;
- task count/progress summary;
- Add task composer;
- sorting and filtering controls;
- active tasks;
- collapsible completed tasks;
- a clear empty state for a new list.

The interaction language should remain consistent with All Tasks.

### 4.4 Smart Views

Smart views are filtered projections of existing tasks, not separate containers.

- **Today:** tasks due today and optionally overdue tasks.
- **Important:** tasks marked important.
- **Completed:** completed tasks across lists.
- **All Tasks:** tasks from the user-selected visible lists.

Every task shown in a smart view should retain a visible indicator of its source list.

## 5. Task Cards

A compact task card should support rapid scanning.

Minimum content:

- completion checkbox;
- task title;
- optional due-date indicator;
- optional importance/star indicator;
- optional metadata such as subtask progress, reminder, recurrence, or note presence.

Interaction rules:

- Clicking the checkbox toggles completion without opening the drawer.
- Clicking the task body opens the Task Detail Drawer.
- Clicking the importance control toggles importance without opening the drawer.
- Completed task titles receive subdued styling and optional strikethrough.
- Keyboard focus and hover states must be clear.

Avoid overloading cards with full notes or every metadata field. Detailed information belongs in the drawer.

## 6. Task Detail Drawer

Open from the right side on desktop. Use a full-screen sheet on narrow mobile screens.

The drawer should support:

- editing the task title;
- completion state;
- source list selection;
- importance;
- due date;
- reminder;
- recurrence;
- notes/description;
- subtasks;
- creation and update timestamps when useful;
- delete task;
- close action.

Subtask behavior:

- Add, rename, complete, reorder, and delete subtasks.
- Show completed/total subtask progress on the parent task card.
- Completing every subtask must not silently complete the parent task unless this behavior is explicitly enabled and communicated.

Save behavior:

- Prefer autosave with a subtle saving/saved indicator.
- Debounce text updates.
- Surface errors inline and preserve unsaved input when possible.
- Closing with unsaved changes must not silently discard work.

## 7. Creation Flows

### Create Task

- The Add task action should place focus directly in a lightweight task composer.
- Enter submits the task; Escape cancels.
- The task is created in the list associated with the current column or Single List view.
- In smart views where the target list is ambiguous, require list selection or use a clearly communicated default list.
- After creation, the task can be opened in the detail drawer for more fields.

### Create List

Required fields:

- name;
- optional parent group;
- optional color/icon.

### Create Group

Only a name is required initially. After creation, allow lists to be created inside it or moved into it.

## 8. Recommended Data Model

```ts
type ID = string;

interface Group {
  id: ID;
  name: string;
  order: number;
  isCollapsed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskList {
  id: ID;
  groupId: ID | null;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: ID;
  listId: ID;
  title: string;
  notes?: string;
  isCompleted: boolean;
  isImportant: boolean;
  dueAt?: string | null;
  reminderAt?: string | null;
  recurrenceRule?: string | null;
  order: number;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Subtask {
  id: ID;
  taskId: ID;
  title: string;
  isCompleted: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface UserViewPreferences {
  visibleListIds: ID[]; // array order is the All Tasks column order
  sidebarCollapsed: boolean;
  hiddenCompletedByList: Record<ID, boolean>;
  sortByList: Record<ID, 'manual' | 'dueDate' | 'createdAt' | 'importance'>;
}
```

The exact persistence layer is implementation-dependent, but relationships and list-column semantics must remain unchanged.

## 9. Application State & URL Structure

Recommended routes:

```text
/tasks                    All Tasks
/tasks/today              Today
/tasks/important          Important
/tasks/completed          Completed
/lists/:listId            Single List
```

Optional drawer deep linking:

```text
/lists/:listId?task=:taskId
/tasks?task=:taskId
```

Use optimistic updates for low-risk actions such as completion and importance toggles, with rollback and a visible error message if persistence fails.

## 10. Responsive Behavior

### Desktop

- Persistent sidebar.
- Main content uses the remaining width.
- All Tasks columns scroll horizontally.
- Task detail opens as a right drawer.

### Tablet

- Sidebar may collapse to icons or become an overlay.
- Columns retain a practical minimum width.
- Detail drawer may occupy a larger portion of the viewport.

### Mobile

- Sidebar is an overlay drawer.
- Avoid squeezing several list columns into the viewport.
- All Tasks may show one list column at a time with horizontal snapping or a list selector, while preserving the list-as-column mental model.
- Task details open as a full-screen sheet.
- Primary controls remain reachable and touch targets are at least 44×44 px.

## 11. Visual Direction

Aim for a calm, productivity-focused interface:

- neutral surfaces with restrained use of accent color;
- clear hierarchy, generous whitespace, and compact but readable task rows;
- subtle borders and shadows;
- consistent 8 px spacing rhythm;
- medium corner radius rather than exaggerated pill shapes;
- typography optimized for scanning;
- light and dark themes if supported by the chosen stack.

Do not copy Google or Microsoft branding, logos, or proprietary assets. Use them only as interaction-quality references.

## 12. Accessibility

- Support complete keyboard navigation.
- Use semantic buttons, inputs, headings, lists, and dialogs.
- Every icon-only button requires an accessible name and tooltip.
- Manage focus correctly when opening/closing modals and the task drawer.
- Escape closes the topmost dismissible surface.
- Announce task creation, completion, moves, and failures to assistive technology.
- Maintain WCAG AA contrast.
- Do not rely on color alone for due, important, selected, or completed states.
- Respect reduced-motion preferences.

## 13. Loading, Empty, and Error States

Implement intentional states for:

- initial application loading;
- loading task lists/columns;
- a new list with no tasks;
- All Tasks with no visible lists;
- search/filter with no matches;
- failed reads or writes;
- offline or reconnecting state if relevant;
- deleted or inaccessible task/list deep links.

Use skeletons for initial content loading where appropriate. Avoid blocking the entire application for a small background update.

## 14. Suggested Component Structure

```text
AppShell
├── Sidebar
│   ├── SmartViewNav
│   ├── GroupTree
│   └── SidebarActions
├── ViewHeader
├── MainContent
│   ├── AllTasksView
│   │   ├── ListColumn[]
│   │   │   ├── ListColumnHeader
│   │   │   ├── TaskComposer
│   │   │   └── TaskList
│   │   └── ManageVisibleListsDialog
│   ├── SingleListView
│   └── SmartView
└── TaskDetailDrawer
    ├── TaskFields
    └── SubtaskList
```

This is a conceptual structure, not a requirement to create one file per component.

## 15. Acceptance Criteria

### Navigation and hierarchy

- [ ] The sidebar renders groups and their nested lists.
- [ ] Selecting a list opens a Single List view.
- [ ] Selecting All Tasks opens a multi-list view.
- [ ] Active navigation state is clear.
- [ ] Group/list create, rename, reorder, and delete flows behave safely.

### All Tasks

- [ ] Each visible column maps to exactly one list.
- [ ] Columns never represent task statuses.
- [ ] Users can choose visible lists through `••• → Manage visible lists`.
- [ ] Visibility and column order persist.
- [ ] Hiding a list does not delete or archive it.
- [ ] A zero-visible-list state provides a direct way to choose lists.

### Tasks

- [ ] Tasks can be created, edited, completed, reopened, moved to another list, and deleted.
- [ ] Clicking a task opens the right-side detail drawer.
- [ ] Checkbox and importance controls work without opening the drawer.
- [ ] Task cards expose relevant metadata without becoming visually dense.
- [ ] Completed tasks remain associated with their source list.

### Subtasks and details

- [ ] Users can create, edit, reorder, complete, and delete subtasks.
- [ ] Subtask progress is visible on the parent task.
- [ ] Drawer edits save reliably and failures are communicated.

### Quality

- [ ] The application works across desktop, tablet, and mobile breakpoints.
- [ ] Core flows are keyboard accessible.
- [ ] Loading, empty, and error states are implemented.
- [ ] No accidental Kanban terminology or status-column behavior appears.

## 16. Delivery Instructions for the Coding Agent

1. Inspect the existing repository, framework, conventions, and available UI components before modifying code.
2. Reuse the existing design system and dependencies where practical.
3. Preserve unrelated user changes in the repository.
4. Implement the smallest coherent vertical slice first: app shell, sidebar, All Tasks columns, task cards, and detail drawer.
5. Keep domain logic separate from presentation logic.
6. Use stable IDs and normalized state or equivalent query-cache patterns.
7. Add representative seed/mock data only if no backend exists.
8. Do not fabricate backend integration. Clearly isolate mock persistence behind a service/repository layer.
9. Add tests for the non-negotiable behaviors, especially list-column mapping and visible-list preferences.
10. Run formatting, type checks, tests, and a production build before handoff.
11. Report changed files, verification performed, and any remaining limitations.

## 17. Compact Agent Prompt

Copy the following prompt into a coding agent together with this specification:

> Build or update the task-management application according to `task-manager-ui-ux-spec.md`. Treat every requirement in “Non-Negotiable Product Rules” as authoritative. This is a list-based task manager, not a Kanban board: in All Tasks, columns represent user-created lists. First inspect the existing repository and reuse its architecture and design system. Implement a polished responsive UI, preserve unrelated changes, and verify the result with the repository's formatter, type checker, tests, and production build. If a requirement conflicts with the existing architecture, preserve the product semantics and document the technical tradeoff in your handoff.
