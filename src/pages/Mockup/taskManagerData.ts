export type TaskManagerId = string;

export type TaskManagerGroup = {
  id: TaskManagerId;
  name: string;
  order: number;
  isCollapsed: boolean;
};

export type TaskManagerList = {
  id: TaskManagerId;
  groupId: TaskManagerId | null;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
};

export type TaskManagerSubtask = {
  id: TaskManagerId;
  taskId: TaskManagerId;
  title: string;
  isCompleted: boolean;
  order: number;
};

export type TaskManagerTask = {
  id: TaskManagerId;
  listId: TaskManagerId;
  title: string;
  notes: string;
  isCompleted: boolean;
  isImportant: boolean;
  dueAt: string | null;
  reminderAt: string | null;
  recurrenceRule: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  subtasks: TaskManagerSubtask[];
};

export const taskManagerGroups: TaskManagerGroup[] = [
  { id: "personal", name: "Personal", order: 1, isCollapsed: false },
  { id: "work", name: "Work", order: 2, isCollapsed: false },
];

export const taskManagerLists: TaskManagerList[] = [
  { id: "inbox", groupId: "personal", name: "Inbox", description: "Quick capture and personal follow-ups", color: "#5673ee", icon: "mail", order: 1 },
  { id: "shopping", groupId: "personal", name: "Shopping", description: "Things to pick up this week", color: "#ef8b52", icon: "box", order: 2 },
  { id: "product", groupId: "work", name: "Product", description: "Product planning and delivery", color: "#7a66db", icon: "rocket", order: 1 },
  { id: "marketing", groupId: "work", name: "Marketing", description: "Campaigns, content, and reporting", color: "#28a783", icon: "megaphone", order: 2 },
];

const today = new Date();
const dateOffset = (days: number) => {
  const value = new Date(today);
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
};

const stamp = new Date().toISOString();

export const taskManagerTasks: TaskManagerTask[] = [
  {
    id: "task-1", listId: "inbox", title: "Review monthly household budget", notes: "Check subscriptions and move the remaining amount to savings.",
    isCompleted: false, isImportant: true, dueAt: dateOffset(0), reminderAt: "09:00", recurrenceRule: "Every month", order: 2, createdAt: stamp, updatedAt: stamp,
    subtasks: [
      { id: "sub-1", taskId: "task-1", title: "Export bank statement", isCompleted: true, order: 1 },
      { id: "sub-2", taskId: "task-1", title: "Review subscriptions", isCompleted: false, order: 2 },
      { id: "sub-3", taskId: "task-1", title: "Update saving target", isCompleted: false, order: 3 },
    ],
  },
  { id: "task-2", listId: "inbox", title: "Book annual health check", notes: "Choose a Saturday morning slot.", isCompleted: false, isImportant: false, dueAt: dateOffset(2), reminderAt: null, recurrenceRule: null, order: 1, createdAt: stamp, updatedAt: stamp, subtasks: [] },
  { id: "task-3", listId: "inbox", title: "Renew apartment access card", notes: "", isCompleted: true, isImportant: false, dueAt: dateOffset(-1), reminderAt: null, recurrenceRule: null, order: 3, createdAt: stamp, updatedAt: stamp, subtasks: [] },
  { id: "task-4", listId: "shopping", title: "Weekly groceries", notes: "Prioritize fresh vegetables and breakfast items.", isCompleted: false, isImportant: false, dueAt: dateOffset(1), reminderAt: "17:30", recurrenceRule: "Every week", order: 1, createdAt: stamp, updatedAt: stamp, subtasks: [
    { id: "sub-4", taskId: "task-4", title: "Vegetables", isCompleted: false, order: 1 },
    { id: "sub-5", taskId: "task-4", title: "Coffee beans", isCompleted: false, order: 2 },
  ] },
  { id: "task-5", listId: "shopping", title: "Order a new desk lamp", notes: "Warm light, adjustable arm, neutral finish.", isCompleted: false, isImportant: true, dueAt: null, reminderAt: null, recurrenceRule: null, order: 2, createdAt: stamp, updatedAt: stamp, subtasks: [] },
  { id: "task-6", listId: "product", title: "Finalize Task Manager interaction flow", notes: "Confirm list-column semantics, mobile behavior, and detail drawer states with the product team.", isCompleted: false, isImportant: true, dueAt: dateOffset(0), reminderAt: "13:00", recurrenceRule: null, order: 2, createdAt: stamp, updatedAt: stamp, subtasks: [
    { id: "sub-6", taskId: "task-6", title: "Review desktop flow", isCompleted: true, order: 1 },
    { id: "sub-7", taskId: "task-6", title: "Review responsive flow", isCompleted: false, order: 2 },
  ] },
  { id: "task-7", listId: "product", title: "Prepare sprint review notes", notes: "Summarize decisions, risks, and follow-up owners.", isCompleted: false, isImportant: false, dueAt: dateOffset(3), reminderAt: null, recurrenceRule: null, order: 1, createdAt: stamp, updatedAt: stamp, subtasks: [] },
  { id: "task-8", listId: "product", title: "Archive resolved discovery items", notes: "", isCompleted: true, isImportant: false, dueAt: dateOffset(-2), reminderAt: null, recurrenceRule: null, order: 3, createdAt: stamp, updatedAt: stamp, subtasks: [] },
  { id: "task-9", listId: "marketing", title: "Publish August product update", notes: "Use the approved release highlights and link to the changelog.", isCompleted: false, isImportant: true, dueAt: dateOffset(1), reminderAt: "10:00", recurrenceRule: null, order: 2, createdAt: stamp, updatedAt: stamp, subtasks: [
    { id: "sub-8", taskId: "task-9", title: "Proofread copy", isCompleted: true, order: 1 },
    { id: "sub-9", taskId: "task-9", title: "Schedule social post", isCompleted: false, order: 2 },
  ] },
  { id: "task-10", listId: "marketing", title: "Collect campaign performance metrics", notes: "", isCompleted: false, isImportant: false, dueAt: dateOffset(5), reminderAt: null, recurrenceRule: "Every month", order: 1, createdAt: stamp, updatedAt: stamp, subtasks: [] },
];

export const cloneTaskManagerSeed = () => ({
  groups: JSON.parse(JSON.stringify(taskManagerGroups)) as TaskManagerGroup[],
  lists: JSON.parse(JSON.stringify(taskManagerLists)) as TaskManagerList[],
  tasks: JSON.parse(JSON.stringify(taskManagerTasks)) as TaskManagerTask[],
});
