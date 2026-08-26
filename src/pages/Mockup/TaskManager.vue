<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@/composables/Icon";
import Tooltip from "@/components/Tooltip.vue";
import {
  cloneTaskManagerSeed,
  type TaskManagerGroup,
  type TaskManagerId,
  type TaskManagerList,
  type TaskManagerTask,
} from "./taskManagerData";

type SmartView = "all" | "today" | "important" | "completed";
type ActiveView = SmartView | `list:${string}`;
type TaskSortMode = "manual" | "due";
type ListTaskSortMode = "manual" | "importance" | "due" | "alphabetical" | "created";
type ListMember = { id: string; name: string; email: string; initials: string; color: string; role: "owner" | "member" };
type TaskAttachment = { id: string; name: string; size: number; type: string; uploadedAt: string };
type FeatureGuideItem = { id: string; label: string; description: string; interaction: string; steps: string[] };

const seed = cloneTaskManagerSeed();
const router = useRouter();
const groups = ref<TaskManagerGroup[]>(seed.groups);
const lists = ref<TaskManagerList[]>(seed.lists);
const tasks = ref<TaskManagerTask[]>(seed.tasks);

const activeView = ref<ActiveView>("all");
const workspaceSearchQuery = ref("");
const workspaceSearchInput = ref<HTMLInputElement | null>(null);
const mobileWorkspaceSearchOpen = ref(false);
const isMobileViewport = ref(typeof window !== "undefined" && window.innerWidth <= 767);
const sidebarSearchQuery = ref("");
const mobileSidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
const selectedTaskId = ref<TaskManagerId | null>(null);
const drawerWidth = ref(460);
const drawerResizing = ref(false);
const drawerResizeStart = reactive({ x: 0, width: 460 });
const activeComposerId = ref<TaskManagerId | null>(null);
const composerDrafts = reactive<Record<string, string>>({});
const hiddenCompleted = reactive<Record<string, boolean>>({ inbox: true, shopping: true, product: true, marketing: true });
const expandedGroups = reactive<Record<string, boolean>>({ personal: true, work: true });
const topMenuOpen = ref(false);
const topMenuPosition = reactive({ x: 0, y: 0 });
const topMenuFromPointer = ref(false);
const taskSortMode = ref<TaskSortMode>("manual");
const listTaskSortModes = reactive<Record<string, ListTaskSortMode>>({});
const listSortPickerId = ref<string | null>(null);
const profileMenuOpen = ref(false);
const entityMenuId = ref<string | null>(null);
const entityMenuPosition = reactive({ x: 0, y: 0 });
const columnMenuId = ref<string | null>(null);
const columnMenuPosition = reactive({ x: 0, y: 0 });
const columnMenuFromPointer = ref(false);
const customizeListId = ref<string | null>(null);
const customizePosition = reactive({ x: 0, y: 0 });
const customColorExpanded = ref(false);
const customColorHue = ref(215);
const customColorSaturation = ref(70);
const customColorValue = ref(90);
const customColorDragging = ref(false);
const collapsedGroupFlyoutId = ref<string | null>(null);
const manageVisibleOpen = ref(false);
const manageDraftIds = ref<string[]>([]);
const manageExpandedGroups = reactive<Record<string, boolean>>({});
const newSubtask = ref("");
const subtaskComposerOpen = ref(false);
const savingState = ref<"saved" | "saving">("saved");
const liveMessage = ref("");
const creationInput = ref<HTMLInputElement | null>(null);
const renameInput = ref<HTMLInputElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const inlineCreation = reactive<{ kind: "list" | "group" | null; groupId: string | null; name: string }>({ kind: null, groupId: null, name: "" });
const inlineRename = reactive<{ listId: string | null; context: "sidebar" | "column" | "progress"; name: string }>({ listId: null, context: "sidebar", name: "" });
const inlineGroupRename = reactive<{ groupId: string | null; name: string }>({ groupId: null, name: "" });
const draggedListId = ref<string | null>(null);
const dragOverListId = ref<string | null>(null);
const draggedRootGroupId = ref<string | null>(null);
const rootDropBeforeKey = ref<string | null | undefined>(undefined);
const dragOverSidebarGroupId = ref<string | null>(null);
const draggedColumnId = ref<string | null>(null);
const dragOverColumnId = ref<string | null>(null);
const draggedTaskId = ref<string | null>(null);
const dragOverTaskId = ref<string | null>(null);
const dragOverTaskListId = ref<string | null>(null);
const suppressTaskOpen = ref(false);
const shareListId = ref<string | null>(null);
const joinPreviewOpen = ref(false);
const copiedInviteLink = ref(false);
const assignmentTaskId = ref<string | null>(null);
const assignmentPosition = reactive({ x: 0, y: 0 });
const listMemberIds = reactive<Record<string, string[]>>({ inbox: ["me"], shopping: ["me"], product: ["me", "nadia", "rizky"], marketing: ["me"] });
const shareTokens = reactive<Record<string, string>>({ product: "product-team-7KQ2M" });
const taskAssignees = reactive<Record<string, string | null>>({ "task-6": "me", "task-7": "nadia" });
const taskAttachments = reactive<Record<string, TaskAttachment[]>>({});
const demoGuideOpen = ref(false);
const expandedFeatureGuideId = ref<string | null>("reorder-list-cards");
let saveTimer: ReturnType<typeof setTimeout> | null = null;

const PREFERENCE_KEY = "mitreka-task-manager-mockup-preferences-v1";
const COLLABORATION_KEY = "mitreka-task-manager-mockup-collaboration-v1";
const currentMemberId = "me";
const workspaceMembers: ListMember[] = [
  { id: "me", name: "Eka Dian", email: "eka.dian@mitreka.com", initials: "ED", color: "#5673ee", role: "owner" },
  { id: "nadia", name: "Nadia Putri", email: "nadia.putri@mitreka.com", initials: "NP", color: "#7a66db", role: "member" },
  { id: "rizky", name: "Rizky Pratama", email: "rizky.pratama@mitreka.com", initials: "RP", color: "#28a783", role: "member" },
  { id: "sari", name: "Sari Wulandari", email: "sari.wulandari@mitreka.com", initials: "SW", color: "#ef8b52", role: "member" },
];
const defaultVisibleIds = lists.value.map((list) => list.id);
const visibleListIds = ref<string[]>([...defaultVisibleIds]);
const sidebarRootOrder = ref<string[]>([
  ...groups.value.slice().sort((a, b) => a.order - b.order).map((group) => `group:${group.id}`),
  ...lists.value.filter((list) => list.groupId === null).sort((a, b) => a.order - b.order).map((list) => `list:${list.id}`),
]);

const todayKey = new Date().toISOString().slice(0, 10);
const smartViews: Array<{ id: SmartView; label: string; icon: "layout-grid" | "sun" | "star" | "circle-check" }> = [
  { id: "all", label: "All Tasks", icon: "layout-grid" },
  { id: "today", label: "Today", icon: "sun" },
  { id: "important", label: "Important", icon: "star" },
  { id: "completed", label: "Completed", icon: "circle-check" },
];
const listColorOptions = [
  "#5673ee", "#7a66db", "#ef8b52", "#28a783", "#3b91d5", "#e0a32e", "#e45c6a", "#667085",
  "#025097", "#20a5c5", "#7aa33d", "#3f8f62", "#9b5de5", "#cf5b98", "#9a6a4f", "#344054",
];
const listIconOptions = [
  { icon: "clipboard", label: "Tasks" },
  { icon: "mail", label: "Inbox" },
  { icon: "box", label: "Package" },
  { icon: "rocket", label: "Project" },
  { icon: "megaphone", label: "Campaign" },
  { icon: "star", label: "Important" },
  { icon: "calendar", label: "Schedule" },
  { icon: "book", label: "Notes" },
  { icon: "home", label: "Personal" },
  { icon: "users", label: "Team" },
  { icon: "target", label: "Goals" },
  { icon: "zap", label: "Priority" },
  { icon: "credit-card", label: "Finance" },
  { icon: "landmark", label: "Business" },
  { icon: "folder-archive", label: "Archive" },
  { icon: "message-circle", label: "Communication" },
  { icon: "monitor", label: "Computer" },
  { icon: "cloud", label: "Cloud" },
  { icon: "map-pin", label: "Location" },
  { icon: "phone", label: "Calls" },
  { icon: "ticket", label: "Tickets" },
  { icon: "puzzle", label: "Ideas" },
  { icon: "settings", label: "Operations" },
  { icon: "shield", label: "Security" },
  { icon: "sparkles", label: "Creative" },
  { icon: "clock", label: "Time" },
  { icon: "check-check", label: "Checklist" },
  { icon: "hard-drive", label: "Storage" },
  { icon: "fileText", label: "Documents" },
  { icon: "layout-grid", label: "Overview" },
  { icon: "table", label: "Data" },
  { icon: "palette", label: "Design" },
];
const listSortOptions: Array<{ id: ListTaskSortMode; label: string }> = [
  { id: "manual", label: "My order" },
  { id: "importance", label: "Importance" },
  { id: "due", label: "Due date" },
  { id: "alphabetical", label: "Alphabetically" },
  { id: "created", label: "Creation date" },
];
const featureGuideSections: Array<{ title: string; description: string; items: FeatureGuideItem[] }> = [
  {
    title: "All Tasks",
    description: "Manage multiple lists from one workspace.",
    items: [
      { id: "reorder-list-cards", label: "Reorder list cards", description: "Change the horizontal order of lists in All Tasks.", interaction: "Drag", steps: ["Drag from an empty area in the list card header.", "Move the card left or right until the insertion marker appears.", "Release to save the new order."] },
      { id: "move-task", label: "Move or reorder a task", description: "Reorder a task or move it into another list.", interaction: "Drag", steps: ["Drag anywhere on a task card; a dedicated handle is not required.", "Drop above another task to reorder, or inside another list to move it.", "Completed tasks can be moved the same way."] },
      { id: "manage-visible", label: "Choose visible lists", description: "Control which list columns appear in All Tasks.", interaction: "Right-click", steps: ["Right-click an empty All Tasks area or open the All Tasks options in the sidebar.", "Select Manage visible lists.", "Select individual lists or an entire group, then apply the changes."] },
      { id: "global-sort", label: "Sort the workspace by due date", description: "Prioritize tasks and list columns by the nearest due date.", interaction: "Right-click", steps: ["Open the All Tasks options from the sidebar or empty workspace area.", "Under Sort by, select Due date.", "Select My order to return to the manually arranged order."] },
    ],
  },
  {
    title: "Lists & groups",
    description: "Organize work using lists, groups, icons, and colors.",
    items: [
      { id: "customize-list", label: "Change a list icon and color", description: "Give each list a recognizable visual identity.", interaction: "Right-click", steps: ["Right-click a list card in All Tasks or a list item in the sidebar.", "Select Customize list.", "Choose a preset or custom color, then select an icon."] },
      { id: "create-rename-list", label: "Create or rename a list", description: "Add lists and edit their names inline.", interaction: "Enter", steps: ["Select New list at the bottom of the sidebar.", "Type the list name and press Enter or move focus away to save.", "To rename it, right-click the list and select Rename list."] },
      { id: "organize-groups", label: "Group, ungroup, and reorder lists", description: "Arrange groups and standalone lists in any order.", interaction: "Drag", steps: ["Drag a list onto a group to move it into that group.", "Drag a grouped list to a full-width root insertion marker to ungroup it.", "Drag groups or standalone lists vertically to change their sidebar order."] },
      { id: "list-sort", label: "Set sorting for one list", description: "Use a different task order for each list.", interaction: "Options", steps: ["Open the list options from its All Tasks card or focused list view.", "Open Sort by.", "Choose My order, Importance, Due date, Alphabetically, or Creation date."] },
    ],
  },
  {
    title: "Tasks",
    description: "Capture work quickly, then add detail when needed.",
    items: [
      { id: "create-task-guide", label: "Create a task", description: "Add a task without leaving its destination list.", interaction: "Enter", steps: ["Select Add a task inside the destination list.", "Type the task title.", "Press Enter to add it."] },
      { id: "task-details-guide", label: "Edit task details", description: "Manage the full task from its resizable detail drawer.", interaction: "Click", steps: ["Click a task card or row to open its detail drawer.", "Set the list, due date, reminder, repeat schedule, notes, and importance.", "Drag the drawer's left edge on desktop to adjust its width."] },
      { id: "subtasks", label: "Add and complete subtasks", description: "Break a task into smaller, trackable steps.", interaction: "Click", steps: ["Open a task and select Add a subtask.", "Type a subtask and press Enter or select Add.", "Use each checkbox to update the subtask progress counter."] },
      { id: "complete-important", label: "Complete or star a task", description: "Track finished work and highlight priorities.", interaction: "Click", steps: ["Select the circle at the start of a task to complete it.", "Open the Completed section to show or hide completed tasks.", "Select the star at the end of a task to mark it important."] },
    ],
  },
  {
    title: "Collaboration",
    description: "Share lists, assign ownership, and attach supporting files.",
    items: [
      { id: "share-list-guide", label: "Share a list using an invite link", description: "Invite another account to join and edit a list.", interaction: "Share", steps: ["Open a list's options and select Share list.", "Generate and copy the invitation link.", "Open the link as another signed-in user to preview the join flow."] },
      { id: "assign-task", label: "Assign a task to a member", description: "Assign work after the destination list has members.", interaction: "Click", steps: ["Share the list and make sure the intended person is already a member.", "Open a task in that list and select Assign to.", "Choose yourself or another member; use the same popup to manage members or copy the link."] },
      { id: "add-file", label: "Attach a file", description: "Keep supporting material with the task.", interaction: "Upload", steps: ["Open the task detail drawer.", "Select Add file in the attachment section.", "Choose a file to display its name, size, and upload state."] },
    ],
  },
  {
    title: "Navigation & shortcuts",
    description: "Find the right task or list quickly.",
    items: [
      { id: "smart-views", label: "Use Smart Views", description: "Review tasks across lists by context.", interaction: "Click", steps: ["Select Today for due and overdue open tasks.", "Select Important for starred tasks.", "Select Completed to review finished work across all lists."] },
      { id: "searches", label: "Search tasks, groups, or lists", description: "The two search fields intentionally have different scopes.", interaction: "Search", steps: ["Use the topbar search to filter tasks in the current workspace view.", "Use the sidebar search to filter group and list names only.", "On mobile, select the search icon to expand and focus the topbar input."] },
      { id: "context-menu", label: "Use right-click shortcuts", description: "Reach relevant options without hunting for a button.", interaction: "Right-click", steps: ["Right-click a list or group in the sidebar for contextual actions.", "Right-click a list card for list actions and sorting.", "Right-click an empty All Tasks area for workspace visibility and sorting."] },
    ],
  },
];

const selectedTask = computed(() => tasks.value.find((task) => task.id === selectedTaskId.value) ?? null);
const selectedList = computed(() => selectedTask.value ? lists.value.find((list) => list.id === selectedTask.value?.listId) ?? null : null);
const shareDialogList = computed(() => lists.value.find((list) => list.id === shareListId.value) ?? null);
const shareDialogMembers = computed(() => shareDialogList.value ? membersForList(shareDialogList.value.id) : []);
const previewJoinMember = computed(() => workspaceMembers.find((member) => !shareDialogMembers.value.some((item) => item.id === member.id) && member.id !== currentMemberId) ?? null);
const assignmentTask = computed(() => tasks.value.find((task) => task.id === assignmentTaskId.value) ?? null);
const assignmentList = computed(() => assignmentTask.value ? listById(assignmentTask.value.listId) ?? null : null);
const assignmentMembers = computed(() => assignmentList.value ? membersForList(assignmentList.value.id) : []);
const assignmentListIsShared = computed(() => Boolean(assignmentList.value && (assignmentMembers.value.length > 1 || shareTokens[assignmentList.value.id])));
const activeListId = computed(() => activeView.value.startsWith("list:") ? activeView.value.slice(5) : null);
const activeList = computed(() => lists.value.find((list) => list.id === activeListId.value) ?? null);
const activeListTaskSortMode = computed<ListTaskSortMode>(() => activeListId.value ? listTaskSortMode(activeListId.value) : "manual");
const effectiveSidebarCollapsed = computed(() => sidebarCollapsed.value && !isMobileViewport.value);
const customizedList = computed(() => lists.value.find((list) => list.id === customizeListId.value) ?? null);
const ungroupedLists = computed(() => lists.value.filter((list) => list.groupId === null).sort((a, b) => a.order - b.order));
const sidebarGroups = computed(() => {
  const query = sidebarSearchQuery.value.trim().toLowerCase();
  if (!query) return groups.value;
  return groups.value.filter((group) => group.name.toLowerCase().includes(query) || groupLists(group.id).some((list) => list.name.toLowerCase().includes(query)));
});
const sidebarUngroupedLists = computed(() => {
  const query = sidebarSearchQuery.value.trim().toLowerCase();
  if (!query) return ungroupedLists.value;
  return ungroupedLists.value.filter((list) => list.name.toLowerCase().includes(query));
});
const visibleLists = computed(() => visibleListIds.value.map((id) => lists.value.find((list) => list.id === id)).filter(Boolean) as TaskManagerList[]);
const manageAllChecked = computed(() => lists.value.length > 0 && lists.value.every((list) => manageDraftIds.value.includes(list.id)));
const manageAllIndeterminate = computed(() => manageDraftIds.value.length > 0 && !manageAllChecked.value);
const displayedVisibleLists = computed(() => {
  const query = workspaceSearchQuery.value.trim().toLowerCase();
  const displayed = query
    ? visibleLists.value.filter((list) => tasks.value.some((task) => task.listId === list.id && `${task.title} ${task.notes}`.toLowerCase().includes(query)))
    : visibleLists.value;
  if (taskSortMode.value !== "due") return displayed;
  return [...displayed].sort(sortListsByDueDate);
});
const openTaskCount = computed(() => tasks.value.filter((task) => !task.isCompleted).length);
const activeListStats = computed(() => {
  const listId = activeListId.value;
  if (!listId) return { total: 0, completed: 0, percent: 0 };
  const listTasks = tasks.value.filter((task) => task.listId === listId);
  const completed = listTasks.filter((task) => task.isCompleted).length;
  return { total: listTasks.length, completed, percent: Math.round((completed / Math.max(1, listTasks.length)) * 100) };
});
const viewTitle = computed(() => {
  if (activeView.value === "all") return "All Tasks";
  if (activeView.value === "today") return "Today";
  if (activeView.value === "important") return "Important";
  if (activeView.value === "completed") return "Completed";
  return activeList.value?.name ?? "List";
});

const viewSubtitle = computed(() => {
  if (activeView.value === "all") return `${openTaskCount.value} open tasks across ${visibleLists.value.length} visible lists`;
  if (activeView.value === "today") return "Stay focused on what needs attention today";
  if (activeView.value === "important") return "Your starred tasks across every list";
  if (activeView.value === "completed") return "A history of tasks you have finished";
  return activeList.value?.description ?? "Focused list view";
});

const filteredFocusTasks = computed(() => {
  let result = tasks.value;
  if (activeView.value === "today") result = result.filter((task) => !task.isCompleted && Boolean(task.dueAt && task.dueAt <= todayKey));
  else if (activeView.value === "important") result = result.filter((task) => task.isImportant && !task.isCompleted);
  else if (activeView.value === "completed") result = result.filter((task) => task.isCompleted);
  else if (activeListId.value) result = result.filter((task) => task.listId === activeListId.value);
  return filterBySearch(result).sort(activeListId.value ? (a, b) => sortTasksForList(a, b, activeListId.value!) : sortTasks);
});
const focusPrimaryTasks = computed(() => activeList.value ? filteredFocusTasks.value.filter((task) => !task.isCompleted) : filteredFocusTasks.value);
const focusCompletedTasks = computed(() => activeList.value ? filteredFocusTasks.value.filter((task) => task.isCompleted) : []);

function sortTasks(a: TaskManagerTask, b: TaskManagerTask) {
  if (a.isCompleted !== b.isCompleted) return Number(a.isCompleted) - Number(b.isCompleted);
  return a.order - b.order;
}

function listTaskSortMode(listId: string): ListTaskSortMode {
  return listTaskSortModes[listId] ?? taskSortMode.value;
}

function sortTasksForList(a: TaskManagerTask, b: TaskManagerTask, listId: string) {
  const mode = listTaskSortMode(listId);
  if (mode === "importance" && a.isImportant !== b.isImportant) return Number(b.isImportant) - Number(a.isImportant);
  if (mode === "due") {
    if (a.dueAt && b.dueAt && a.dueAt !== b.dueAt) return a.dueAt.localeCompare(b.dueAt);
    if (a.dueAt && !b.dueAt) return -1;
    if (!a.dueAt && b.dueAt) return 1;
  }
  if (mode === "alphabetical") {
    const byTitle = a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    if (byTitle) return byTitle;
  }
  if (mode === "created" && a.createdAt !== b.createdAt) return b.createdAt.localeCompare(a.createdAt);
  return a.order - b.order;
}

function earliestOpenDueDate(listId: string) {
  return tasks.value
    .filter((task) => task.listId === listId && !task.isCompleted && task.dueAt)
    .reduce<string | null>((earliest, task) => !earliest || task.dueAt! < earliest ? task.dueAt! : earliest, null);
}

function sortListsByDueDate(a: TaskManagerList, b: TaskManagerList) {
  const aDueAt = earliestOpenDueDate(a.id);
  const bDueAt = earliestOpenDueDate(b.id);
  if (aDueAt && bDueAt && aDueAt !== bDueAt) return aDueAt.localeCompare(bDueAt);
  if (aDueAt && !bDueAt) return -1;
  if (!aDueAt && bDueAt) return 1;
  return visibleListIds.value.indexOf(a.id) - visibleListIds.value.indexOf(b.id);
}

function filterBySearch(source: TaskManagerTask[]) {
  const query = workspaceSearchQuery.value.trim().toLowerCase();
  if (!query) return source;
  return source.filter((task) => `${task.title} ${task.notes}`.toLowerCase().includes(query));
}

function tasksForList(listId: string, completed: boolean) {
  return filterBySearch(tasks.value.filter((task) => task.listId === listId && task.isCompleted === completed)).sort((a, b) => sortTasksForList(a, b, listId));
}

function listById(id: string) {
  return lists.value.find((list) => list.id === id);
}

function memberById(id: string | null | undefined) {
  return workspaceMembers.find((member) => member.id === id) ?? null;
}

function membersForList(listId: string) {
  const ids = listMemberIds[listId] ?? [currentMemberId];
  return ids.map((id) => memberById(id)).filter(Boolean) as ListMember[];
}

function listIsShared(listId: string) {
  return membersForList(listId).length > 1 || Boolean(shareTokens[listId]);
}

function assigneeForTask(taskId: string) {
  return memberById(taskAssignees[taskId]);
}

function attachmentsForTask(taskId: string) {
  return taskAttachments[taskId] ?? [];
}

function listOpenCount(id: string) {
  return tasks.value.filter((task) => task.listId === id && !task.isCompleted).length;
}

function groupLists(groupId: string) {
  return lists.value.filter((list) => list.groupId === groupId).sort((a, b) => a.order - b.order);
}

function sidebarGroupLists(groupId: string) {
  const query = sidebarSearchQuery.value.trim().toLowerCase();
  const result = groupLists(groupId);
  if (!query) return result;
  if (groups.value.find((group) => group.id === groupId)?.name.toLowerCase().includes(query)) return result;
  return result.filter((list) => list.name.toLowerCase().includes(query));
}

function toggleCollapsedGroupFlyout(groupId: string) {
  if (!sidebarCollapsed.value) return;
  collapsedGroupFlyoutId.value = collapsedGroupFlyoutId.value === groupId ? null : groupId;
}

function openSidebarContextMenu(event: MouseEvent, kind: "group" | "list", id: string) {
  const menuWidth = kind === "group" ? 180 : 170;
  const menuHeight = kind === "group" ? 126 : 130;
  entityMenuPosition.x = Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8));
  entityMenuPosition.y = Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8));
  entityMenuId.value = `${kind}:${id}`;
  topMenuOpen.value = false;
  profileMenuOpen.value = false;
  columnMenuId.value = null;
  customizeListId.value = null;
}

function closeSidebarContextMenu() {
  entityMenuId.value = null;
}

function openColumnContextMenu(event: MouseEvent, listId: string) {
  const menuWidth = 215;
  const menuHeight = 168;
  columnMenuPosition.x = Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8));
  columnMenuPosition.y = Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8));
  columnMenuFromPointer.value = true;
  columnMenuId.value = listId;
  entityMenuId.value = null;
  topMenuOpen.value = false;
  profileMenuOpen.value = false;
  customizeListId.value = null;
}

function toggleColumnMenu(listId: string) {
  const shouldOpen = columnMenuId.value !== listId || columnMenuFromPointer.value;
  columnMenuFromPointer.value = false;
  columnMenuId.value = shouldOpen ? listId : null;
  listSortPickerId.value = null;
  if (shouldOpen) {
    topMenuOpen.value = false;
    topMenuFromPointer.value = false;
    entityMenuId.value = null;
    profileMenuOpen.value = false;
    customizeListId.value = null;
  }
}

function closeColumnPointerMenu() {
  if (!columnMenuFromPointer.value) return;
  columnMenuId.value = null;
  columnMenuFromPointer.value = false;
}

function toggleListSortPicker(listId: string) {
  listSortPickerId.value = listSortPickerId.value === listId ? null : listId;
}

function setListTaskSortMode(listId: string, mode: ListTaskSortMode) {
  listTaskSortModes[listId] = mode;
  listSortPickerId.value = null;
  columnMenuId.value = null;
  persistPreferences();
  liveMessage.value = `${listById(listId)?.name ?? "List"} sorted by ${listSortOptions.find((option) => option.id === mode)?.label.toLowerCase() ?? mode}.`;
}

function openListCustomizer(event: MouseEvent, listId: string) {
  const width = 248;
  const height = 390;
  customizePosition.x = Math.max(8, Math.min(event.clientX + 10, window.innerWidth - width - 8));
  customizePosition.y = Math.max(8, Math.min(event.clientY - 24, window.innerHeight - height - 8));
  customizeListId.value = listId;
  customColorExpanded.value = false;
  syncCustomColorState(lists.value.find((list) => list.id === listId)?.color ?? "#025097");
  entityMenuId.value = null;
  columnMenuId.value = null;
  columnMenuFromPointer.value = false;
  topMenuOpen.value = false;
  topMenuFromPointer.value = false;
  profileMenuOpen.value = false;
}

function closeListCustomizer() {
  customizeListId.value = null;
}

function setListColor(color: string, syncPicker = true) {
  if (!customizedList.value) return;
  customizedList.value.color = color;
  if (syncPicker) syncCustomColorState(color);
  persistPreferences();
  liveMessage.value = `${customizedList.value.name} color updated.`;
}

function syncCustomColorState(hex: string) {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) return;
  const [r, g, b] = match.slice(1).map((value) => Number.parseInt(value, 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === r) hue = 60 * (((g - b) / delta) % 6);
    else if (max === g) hue = 60 * ((b - r) / delta + 2);
    else hue = 60 * ((r - g) / delta + 4);
  }
  customColorHue.value = Math.round(hue < 0 ? hue + 360 : hue);
  customColorSaturation.value = Math.round(max ? (delta / max) * 100 : 0);
  customColorValue.value = Math.round(max * 100);
}

function customColorHex() {
  const saturation = customColorSaturation.value / 100;
  const value = customColorValue.value / 100;
  const chroma = value * saturation;
  const section = customColorHue.value / 60;
  const x = chroma * (1 - Math.abs((section % 2) - 1));
  const offset = value - chroma;
  const channels = section < 1 ? [chroma, x, 0] : section < 2 ? [x, chroma, 0] : section < 3 ? [0, chroma, x] : section < 4 ? [0, x, chroma] : section < 5 ? [x, 0, chroma] : [chroma, 0, x];
  return `#${channels.map((channel) => Math.round((channel + offset) * 255).toString(16).padStart(2, "0")).join("")}`;
}

function commitCustomColor() {
  setListColor(customColorHex(), false);
}

function updateCustomColorPlane(event: PointerEvent, start = false) {
  const target = event.currentTarget as HTMLElement;
  if (start) {
    customColorDragging.value = true;
    target.setPointerCapture(event.pointerId);
  }
  const bounds = target.getBoundingClientRect();
  customColorSaturation.value = Math.round(Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)) * 100);
  customColorValue.value = Math.round((1 - Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))) * 100);
  commitCustomColor();
}

function updateCustomColorHue(event: Event) {
  customColorHue.value = Number((event.target as HTMLInputElement).value);
  commitCustomColor();
}

function applyCustomListColor(event: Event) {
  const input = event.target as HTMLInputElement;
  const color = input.value.trim();
  if (/^#[0-9a-f]{6}$/i.test(color)) setListColor(color.toLowerCase());
  else input.value = customizedList.value?.color ?? "#025097";
}

function setListIcon(icon: string) {
  if (!customizedList.value) return;
  customizedList.value.icon = icon;
  persistPreferences();
  liveMessage.value = `${customizedList.value.name} icon updated.`;
}

function openAllTasksContextMenu(event: MouseEvent, viewId?: SmartView) {
  if (viewId && viewId !== "all") return;
  const target = event.target as HTMLElement | null;
  if (!viewId && target?.closest(".list-column")) return;
  event.preventDefault();
  const menuWidth = 210;
  const menuHeight = 130;
  topMenuPosition.x = Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8));
  topMenuPosition.y = Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8));
  topMenuFromPointer.value = true;
  topMenuOpen.value = true;
  entityMenuId.value = null;
  columnMenuId.value = null;
  profileMenuOpen.value = false;
}

function toggleAllTasksMenu() {
  const shouldOpen = !topMenuOpen.value || topMenuFromPointer.value;
  topMenuFromPointer.value = false;
  topMenuOpen.value = shouldOpen;
  if (shouldOpen) {
    entityMenuId.value = null;
    columnMenuId.value = null;
    columnMenuFromPointer.value = false;
    profileMenuOpen.value = false;
    customizeListId.value = null;
  }
}

function toggleProfileMenu() {
  const shouldOpen = !profileMenuOpen.value;
  profileMenuOpen.value = shouldOpen;
  if (shouldOpen) {
    topMenuOpen.value = false;
    topMenuFromPointer.value = false;
    entityMenuId.value = null;
    columnMenuId.value = null;
    columnMenuFromPointer.value = false;
    customizeListId.value = null;
  }
}

function closeAllTasksPointerMenu() {
  if (!topMenuFromPointer.value) return;
  topMenuOpen.value = false;
  topMenuFromPointer.value = false;
}

function setTaskSortMode(mode: TaskSortMode) {
  taskSortMode.value = mode;
  Object.keys(listTaskSortModes).forEach((listId) => delete listTaskSortModes[listId]);
  persistPreferences();
  liveMessage.value = `Tasks sorted by ${mode === "due" ? "due date" : "my order"}.`;
}

function selectView(view: ActiveView) {
  activeView.value = view;
  selectedTaskId.value = null;
  mobileSidebarOpen.value = false;
  topMenuOpen.value = false;
  topMenuFromPointer.value = false;
  entityMenuId.value = null;
  collapsedGroupFlyoutId.value = null;
}

function logout() {
  profileMenuOpen.value = false;
  router.push("/");
}

function activateSearch() {
  nextTick(() => searchInput.value?.focus());
}

function openMobileSidebar() {
  collapsedGroupFlyoutId.value = null;
  mobileSidebarOpen.value = true;
}

function activateWorkspaceSearch() {
  if (isMobileViewport.value) mobileWorkspaceSearchOpen.value = true;
  nextTick(() => workspaceSearchInput.value?.focus());
}

function closeMobileWorkspaceSearch() {
  mobileWorkspaceSearchOpen.value = false;
  workspaceSearchQuery.value = "";
}

function openDemoGuide() {
  demoGuideOpen.value = true;
  mobileSidebarOpen.value = false;
  profileMenuOpen.value = false;
  topMenuOpen.value = false;
  entityMenuId.value = null;
  columnMenuId.value = null;
}

function updateViewportMode() {
  isMobileViewport.value = window.innerWidth <= 767;
  if (!isMobileViewport.value) {
    mobileSidebarOpen.value = false;
    mobileWorkspaceSearchOpen.value = false;
  } else {
    collapsedGroupFlyoutId.value = null;
  }
}

function focusInlineInput(selector: string) {
  nextTick(() => {
    const input = document.querySelector<HTMLInputElement>(`.task-manager-page ${selector}`);
    input?.focus();
    input?.select();
  });
}

function openComposer(listId: string) {
  if (!listById(listId)) return;
  activeComposerId.value = listId;
  composerDrafts[listId] ??= "";
  focusInlineInput(".task-composer input, .focus-composer input");
}

function cancelComposer() {
  activeComposerId.value = null;
}

function createTask(listId: string) {
  const title = composerDrafts[listId]?.trim();
  if (!title) return;
  const stamp = new Date().toISOString();
  const task: TaskManagerTask = {
    id: `task-${Date.now()}`,
    listId,
    title,
    notes: "",
    isCompleted: false,
    isImportant: false,
    dueAt: null,
    reminderAt: null,
    recurrenceRule: null,
    order: tasks.value.filter((item) => item.listId === listId).length + 1,
    createdAt: stamp,
    updatedAt: stamp,
    subtasks: [],
  };
  tasks.value.push(task);
  composerDrafts[listId] = "";
  activeComposerId.value = null;
  liveMessage.value = `Task ${title} created in ${listById(listId)?.name ?? "list"}.`;
}

function openTask(task: TaskManagerTask) {
  if (suppressTaskOpen.value) return;
  selectedTaskId.value = task.id;
  newSubtask.value = "";
  subtaskComposerOpen.value = false;
}

function persistCollaboration() {
  try {
    localStorage.setItem(COLLABORATION_KEY, JSON.stringify({ listMemberIds, shareTokens, taskAssignees, taskAttachments }));
  } catch {}
}

function openShareList(listId: string) {
  if (!listMemberIds[listId]) listMemberIds[listId] = [currentMemberId];
  assignmentTaskId.value = null;
  shareListId.value = listId;
  joinPreviewOpen.value = false;
  copiedInviteLink.value = false;
  entityMenuId.value = null;
  columnMenuId.value = null;
}

function closeShareDialog() {
  shareListId.value = null;
  joinPreviewOpen.value = false;
  copiedInviteLink.value = false;
  if (window.location.hash.includes("?invite=")) window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}${window.location.hash.split("?")[0]}`);
}

function generateInviteLink(listId = shareDialogList.value?.id ?? assignmentList.value?.id) {
  if (!listId) return;
  shareTokens[listId] = `${listId}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  copiedInviteLink.value = false;
  persistCollaboration();
}

function invitationLink(listId: string) {
  const token = shareTokens[listId];
  return token ? `${window.location.origin}${import.meta.env.BASE_URL}#/task-manager?invite=${token}&list=${encodeURIComponent(listId)}` : "";
}

async function copyListInvitationLink(listId: string) {
  const list = listById(listId);
  if (!list) return;
  if (!shareTokens[list.id]) generateInviteLink(list.id);
  const link = invitationLink(list.id);
  try { await navigator.clipboard.writeText(link); } catch {
    const field = document.createElement("textarea");
    field.value = link;
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
  copiedInviteLink.value = true;
  liveMessage.value = `Invitation link for ${list.name} copied.`;
}

function copyInvitationLink() {
  if (shareDialogList.value) void copyListInvitationLink(shareDialogList.value.id);
}

function revokeInviteLink() {
  const list = shareDialogList.value;
  if (!list) return;
  delete shareTokens[list.id];
  copiedInviteLink.value = false;
  persistCollaboration();
}

function confirmPreviewJoin() {
  const list = shareDialogList.value;
  const member = previewJoinMember.value;
  if (!list || !member) return;
  listMemberIds[list.id] = [...new Set([...(listMemberIds[list.id] ?? [currentMemberId]), member.id])];
  joinPreviewOpen.value = false;
  persistCollaboration();
  liveMessage.value = `${member.name} joined ${list.name}.`;
}

function removeListMember(memberId: string) {
  const list = shareDialogList.value;
  if (!list || memberId === currentMemberId) return;
  listMemberIds[list.id] = (listMemberIds[list.id] ?? []).filter((id) => id !== memberId);
  tasks.value.filter((task) => task.listId === list.id && taskAssignees[task.id] === memberId).forEach((task) => { taskAssignees[task.id] = null; });
  persistCollaboration();
}

function openAssignmentPopover(event: MouseEvent, task: TaskManagerTask) {
  const target = event.currentTarget as HTMLElement | null;
  const rect = target?.getBoundingClientRect();
  const width = Math.min(340, window.innerWidth - 16);
  const estimatedHeight = 470;
  const preferredX = rect ? rect.right - width : event.clientX;
  const preferredY = rect ? rect.bottom + 7 : event.clientY;
  assignmentPosition.x = Math.max(8, Math.min(window.innerWidth - width - 8, preferredX));
  assignmentPosition.y = Math.max(8, Math.min(window.innerHeight - estimatedHeight - 8, preferredY));
  assignmentTaskId.value = task.id;
  copiedInviteLink.value = false;
}

function closeAssignmentPopover() {
  assignmentTaskId.value = null;
  copiedInviteLink.value = false;
}

function setTaskAssignee(value: string | null) {
  const task = assignmentTask.value ?? selectedTask.value;
  if (!task) return;
  taskAssignees[task.id] = value || null;
  persistCollaboration();
  liveMessage.value = value ? `${task.title} assigned to ${memberById(value)?.name ?? "member"}.` : `${task.title} is now unassigned.`;
  closeAssignmentPopover();
}

function addTaskFiles(event: Event) {
  const task = selectedTask.value;
  const input = event.target as HTMLInputElement;
  if (!task || !input.files?.length) return;
  const added = Array.from(input.files).map((file, index): TaskAttachment => ({
    id: `attachment-${Date.now()}-${index}`,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    uploadedAt: new Date().toISOString(),
  }));
  taskAttachments[task.id] = [...attachmentsForTask(task.id), ...added];
  input.value = "";
  persistCollaboration();
  liveMessage.value = `${added.length} file${added.length === 1 ? "" : "s"} added to ${task.title}.`;
}

function removeTaskFile(taskId: string, attachmentId: string) {
  taskAttachments[taskId] = attachmentsForTask(taskId).filter((attachment) => attachment.id !== attachmentId);
  persistCollaboration();
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function clampDrawerWidth(width: number) {
  const maxWidth = Math.max(380, Math.min(720, window.innerWidth - 120));
  return Math.min(maxWidth, Math.max(380, width));
}

function resizeDrawer(event: PointerEvent) {
  if (!drawerResizing.value) return;
  drawerWidth.value = clampDrawerWidth(drawerResizeStart.width + drawerResizeStart.x - event.clientX);
}

function finishDrawerResize() {
  if (!drawerResizing.value) return;
  drawerResizing.value = false;
  window.removeEventListener("pointermove", resizeDrawer);
  window.removeEventListener("pointerup", finishDrawerResize);
  document.body.classList.remove("is-resizing-task-drawer");
  persistPreferences();
}

function startDrawerResize(event: PointerEvent) {
  if (window.innerWidth <= 767) return;
  event.preventDefault();
  drawerResizeStart.x = event.clientX;
  drawerResizeStart.width = drawerWidth.value;
  drawerResizing.value = true;
  document.body.classList.add("is-resizing-task-drawer");
  window.addEventListener("pointermove", resizeDrawer);
  window.addEventListener("pointerup", finishDrawerResize);
}

function resizeDrawerWithKeyboard(event: KeyboardEvent) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  drawerWidth.value = clampDrawerWidth(drawerWidth.value + (event.key === "ArrowLeft" ? 20 : -20));
  persistPreferences();
}

function resetDrawerWidth() {
  drawerWidth.value = clampDrawerWidth(460);
  persistPreferences();
}

function toggleTask(task: TaskManagerTask) {
  task.isCompleted = !task.isCompleted;
  task.updatedAt = new Date().toISOString();
  liveMessage.value = `${task.title} marked ${task.isCompleted ? "completed" : "active"}.`;
}

function toggleImportant(task: TaskManagerTask) {
  task.isImportant = !task.isImportant;
  task.updatedAt = new Date().toISOString();
  liveMessage.value = `${task.title} ${task.isImportant ? "marked important" : "removed from important"}.`;
}

function addSubtask() {
  const task = selectedTask.value;
  const title = newSubtask.value.trim();
  if (!task || !title) return;
  task.subtasks.push({ id: `sub-${Date.now()}`, taskId: task.id, title, isCompleted: false, order: task.subtasks.length + 1 });
  newSubtask.value = "";
  subtaskComposerOpen.value = false;
}

function openSubtaskComposer() {
  subtaskComposerOpen.value = true;
  focusInlineInput(".subtask-composer input");
}

function cancelSubtaskComposer() {
  newSubtask.value = "";
  subtaskComposerOpen.value = false;
}

function moveSubtask(index: number, direction: -1 | 1) {
  const subtasks = selectedTask.value?.subtasks;
  if (!subtasks) return;
  const target = index + direction;
  if (target < 0 || target >= subtasks.length) return;
  [subtasks[index], subtasks[target]] = [subtasks[target], subtasks[index]];
}

function deleteSelectedTask() {
  const task = selectedTask.value;
  if (!task || !window.confirm(`Delete “${task.title}”? This removes the task and its subtasks from ${selectedList.value?.name ?? "this list"}.`)) return;
  tasks.value = tasks.value.filter((item) => item.id !== task.id);
  selectedTaskId.value = null;
  liveMessage.value = `${task.title} deleted.`;
}

function formatDate(date: string | null) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
}

function dueTone(task: TaskManagerTask) {
  if (!task.dueAt || task.isCompleted) return "";
  if (task.dueAt < todayKey) return "is-overdue";
  if (task.dueAt === todayKey) return "is-today";
  return "";
}

function subtaskProgress(task: TaskManagerTask) {
  return task.subtasks.filter((subtask) => subtask.isCompleted).length;
}

function openManageVisible() {
  manageDraftIds.value = [...visibleListIds.value];
  groups.value.forEach((group) => { if (manageExpandedGroups[group.id] === undefined) manageExpandedGroups[group.id] = true; });
  if (manageExpandedGroups.__ungrouped === undefined) manageExpandedGroups.__ungrouped = true;
  manageVisibleOpen.value = true;
  topMenuOpen.value = false;
}

function toggleDraftVisibility(id: string) {
  manageDraftIds.value = manageDraftIds.value.includes(id)
    ? manageDraftIds.value.filter((item) => item !== id)
    : [...manageDraftIds.value, id];
}

function manageListsForGroup(groupId: string | null) {
  return groupId === null ? ungroupedLists.value : groupLists(groupId);
}

function manageGroupState(groupId: string | null) {
  const groupItems = manageListsForGroup(groupId);
  const selected = groupItems.filter((list) => manageDraftIds.value.includes(list.id)).length;
  return { checked: groupItems.length > 0 && selected === groupItems.length, indeterminate: selected > 0 && selected < groupItems.length };
}

function toggleManageGroup(groupId: string | null) {
  const groupItems = manageListsForGroup(groupId);
  const groupIds = groupItems.map((list) => list.id);
  const allSelected = groupIds.length > 0 && groupIds.every((id) => manageDraftIds.value.includes(id));
  manageDraftIds.value = allSelected
    ? manageDraftIds.value.filter((id) => !groupIds.includes(id))
    : [...manageDraftIds.value, ...groupIds.filter((id) => !manageDraftIds.value.includes(id))];
}

function toggleManageAll() {
  manageDraftIds.value = manageAllChecked.value ? [] : lists.value.map((list) => list.id);
}

function applyVisibleLists() {
  visibleListIds.value = [...manageDraftIds.value];
  persistPreferences();
  manageVisibleOpen.value = false;
  liveMessage.value = "Visible list columns updated.";
}

function persistPreferences() {
  try {
    syncSidebarRootOrder();
    const hiddenListIds = lists.value.filter((list) => !visibleListIds.value.includes(list.id)).map((list) => list.id);
    const listAppearance = Object.fromEntries(lists.value.map((list) => [list.id, { color: list.color, icon: list.icon }]));
    localStorage.setItem(PREFERENCE_KEY, JSON.stringify({ visibleListIds: visibleListIds.value, hiddenListIds, hiddenCompleted, sidebarCollapsed: sidebarCollapsed.value, taskSortMode: taskSortMode.value, listTaskSortModes, listAppearance, sidebarRootOrder: sidebarRootOrder.value, drawerWidth: drawerWidth.value }));
  } catch {}
}

function startInlineCreate(kind: "list" | "group", groupId: string | null = null) {
  inlineCreation.kind = kind;
  inlineCreation.groupId = kind === "list" ? groupId : null;
  inlineCreation.name = kind === "list" ? "Untitled list" : "Untitled group";
  if (groupId) expandedGroups[groupId] = true;
  entityMenuId.value = null;
  focusInlineInput(".inline-create-row input");
}

function cancelInlineCreate() {
  inlineCreation.kind = null;
  inlineCreation.groupId = null;
  inlineCreation.name = "";
}

function commitInlineCreate() {
  const kind = inlineCreation.kind;
  const name = inlineCreation.name.trim();
  const groupId = inlineCreation.groupId;
  if (!kind) return;
  if (!name) {
    cancelInlineCreate();
    return;
  }

  if (kind === "group") {
    const id = `group-${Date.now()}`;
    groups.value.push({ id, name, order: groups.value.length + 1, isCollapsed: false });
    sidebarRootOrder.value.push(`group:${id}`);
    expandedGroups[id] = true;
    persistPreferences();
    liveMessage.value = `Group ${name} created.`;
  } else {
    const id = `list-${Date.now()}`;
    const siblings = groupId ? groupLists(groupId) : ungroupedLists.value;
    lists.value.push({ id, groupId, name, description: "A new list ready for your tasks", color: "#5673ee", icon: "clipboard", order: siblings.length + 1 });
    listMemberIds[id] = [currentMemberId];
    if (groupId === null) sidebarRootOrder.value.push(`list:${id}`);
    visibleListIds.value.push(id);
    persistPreferences();
    persistCollaboration();
    liveMessage.value = `List ${name} created.`;
  }
  cancelInlineCreate();
}

function createDefaultList() {
  const id = `list-${Date.now()}`;
  const list: TaskManagerList = {
    id,
    groupId: null,
    name: "My Tasks",
    description: "A fresh place for your tasks",
    color: "#5673ee",
    icon: "clipboard",
    order: ungroupedLists.value.length + 1,
  };
  lists.value.push(list);
  listMemberIds[id] = [currentMemberId];
  sidebarRootOrder.value.push(`list:${id}`);
  visibleListIds.value = [id];
  hiddenCompleted[id] = true;
  workspaceSearchQuery.value = "";
  persistPreferences();
  persistCollaboration();
  return list;
}

function ensureListExists() {
  return lists.value.length ? null : createDefaultList();
}

function normalizeListOrders(groupId: string | null) {
  const siblings = lists.value.filter((list) => list.groupId === groupId).sort((a, b) => a.order - b.order);
  siblings.forEach((list, index) => { list.order = index + 1; });
}

function syncSidebarRootOrder() {
  const available = [
    ...groups.value.map((group) => `group:${group.id}`),
    ...lists.value.filter((list) => list.groupId === null).map((list) => `list:${list.id}`),
  ];
  sidebarRootOrder.value = [...sidebarRootOrder.value.filter((key) => available.includes(key)), ...available.filter((key) => !sidebarRootOrder.value.includes(key))];
}

function insertSidebarRootKey(key: string, beforeKey: string | null) {
  const next = sidebarRootOrder.value.filter((item) => item !== key);
  const targetIndex = beforeKey ? next.indexOf(beforeKey) : next.length;
  next.splice(targetIndex < 0 ? next.length : targetIndex, 0, key);
  sidebarRootOrder.value = next;
}

function onListDragStart(event: DragEvent, list: TaskManagerList) {
  draggedListId.value = list.id;
  draggedRootGroupId.value = null;
  event.dataTransfer?.setData("text/plain", list.id);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function onListDropOnList(event: DragEvent, target: TaskManagerList) {
  event.preventDefault();
  const dragged = listById(draggedListId.value ?? "");
  if (!dragged || dragged.id === target.id) return finishListDrag();
  if (target.groupId === null) {
    const sourceGroupId = dragged.groupId;
    dragged.groupId = null;
    insertSidebarRootKey(`list:${dragged.id}`, `list:${target.id}`);
    if (sourceGroupId !== null) normalizeListOrders(sourceGroupId);
    liveMessage.value = `${dragged.name} moved outside groups.`;
    persistPreferences();
    return finishListDrag();
  }
  const sourceGroupId = dragged.groupId;
  const targetSiblings = lists.value.filter((list) => list.groupId === target.groupId && list.id !== dragged.id).sort((a, b) => a.order - b.order);
  const targetIndex = Math.max(0, targetSiblings.findIndex((list) => list.id === target.id));
  targetSiblings.splice(targetIndex, 0, dragged);
  dragged.groupId = target.groupId;
  sidebarRootOrder.value = sidebarRootOrder.value.filter((key) => key !== `list:${dragged.id}`);
  targetSiblings.forEach((list, index) => { list.order = index + 1; });
  if (sourceGroupId !== target.groupId) normalizeListOrders(sourceGroupId);
  liveMessage.value = `${dragged.name} moved ${target.groupId ? `to ${groups.value.find((group) => group.id === target.groupId)?.name}` : "outside groups"}.`;
  persistPreferences();
  finishListDrag();
}

function onListDropOnGroup(event: DragEvent, groupId: string | null) {
  event.preventDefault();
  const dragged = listById(draggedListId.value ?? "");
  if (!dragged) return finishListDrag();
  const sourceGroupId = dragged.groupId;
  const siblings = lists.value.filter((list) => list.groupId === groupId && list.id !== dragged.id).sort((a, b) => a.order - b.order);
  dragged.groupId = groupId;
  if (groupId) sidebarRootOrder.value = sidebarRootOrder.value.filter((key) => key !== `list:${dragged.id}`);
  else if (!sidebarRootOrder.value.includes(`list:${dragged.id}`)) sidebarRootOrder.value.push(`list:${dragged.id}`);
  siblings.push(dragged);
  siblings.forEach((list, index) => { list.order = index + 1; });
  if (sourceGroupId !== groupId) normalizeListOrders(sourceGroupId);
  liveMessage.value = `${dragged.name} moved ${groupId ? `to ${groups.value.find((group) => group.id === groupId)?.name}` : "outside groups"}.`;
  persistPreferences();
  finishListDrag();
}

function onSidebarGroupDragOver(event: DragEvent, groupId: string) {
  if (!draggedListId.value) return;
  event.preventDefault();
  rootDropBeforeKey.value = undefined;
  dragOverSidebarGroupId.value = groupId;
}

function onSidebarGroupDragLeave(event: DragEvent) {
  const current = event.currentTarget as HTMLElement | null;
  const next = event.relatedTarget as Node | null;
  if (!current || (next && current.contains(next))) return;
  dragOverSidebarGroupId.value = null;
}

function onRootGroupDragStart(event: DragEvent, group: TaskManagerGroup) {
  if (inlineGroupRename.groupId === group.id) return event.preventDefault();
  draggedRootGroupId.value = group.id;
  draggedListId.value = null;
  event.dataTransfer?.setData("text/plain", `group:${group.id}`);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function onRootDropZoneDragOver(event: DragEvent, beforeKey: string | null) {
  if (!draggedListId.value && !draggedRootGroupId.value) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  dragOverListId.value = null;
  rootDropBeforeKey.value = beforeKey;
}

function onRootDrop(event: DragEvent, beforeKey: string | null) {
  event.preventDefault();
  if (draggedRootGroupId.value) {
    const group = groups.value.find((item) => item.id === draggedRootGroupId.value);
    if (group) {
      insertSidebarRootKey(`group:${group.id}`, beforeKey);
      liveMessage.value = `${group.name} reordered.`;
      persistPreferences();
    }
    return finishRootDrag();
  }
  const dragged = listById(draggedListId.value ?? "");
  if (!dragged) return finishListDrag();
  const sourceGroupId = dragged.groupId;
  dragged.groupId = null;
  insertSidebarRootKey(`list:${dragged.id}`, beforeKey);
  if (sourceGroupId !== null) normalizeListOrders(sourceGroupId);
  liveMessage.value = `${dragged.name} moved outside groups.`;
  persistPreferences();
  finishListDrag();
}

function finishRootDrag() {
  draggedRootGroupId.value = null;
  rootDropBeforeKey.value = undefined;
}

function finishListDrag() {
  draggedListId.value = null;
  dragOverListId.value = null;
  rootDropBeforeKey.value = undefined;
  dragOverSidebarGroupId.value = null;
}

function normalizeTaskOrders(listId: string) {
  ([false, true] as const).forEach((completed) => {
    tasks.value
      .filter((task) => task.listId === listId && task.isCompleted === completed)
      .sort((a, b) => a.order - b.order)
      .forEach((task, index) => { task.order = index + 1; });
  });
}

function onTaskDragStart(event: DragEvent, task: TaskManagerTask) {
  draggedTaskId.value = task.id;
  suppressTaskOpen.value = true;
  event.dataTransfer?.setData("text/plain", task.id);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function moveDraggedTask(targetListId: string, targetTaskId?: string, forceManualOrder = false) {
  const dragged = tasks.value.find((task) => task.id === draggedTaskId.value);
  if (!dragged) return finishTaskDrag();
  const sourceListId = dragged.listId;
  if (!forceManualOrder && listTaskSortMode(sourceListId) !== "manual" && sourceListId === targetListId) {
    liveMessage.value = "Switch to My order to reorder tasks inside this list.";
    return finishTaskDrag();
  }
  const targetTasks = tasks.value
    .filter((task) => task.listId === targetListId && task.isCompleted === dragged.isCompleted && task.id !== dragged.id)
    .sort((a, b) => a.order - b.order);
  const targetIndex = targetTaskId ? targetTasks.findIndex((task) => task.id === targetTaskId) : targetTasks.length;
  targetTasks.splice(targetIndex < 0 ? targetTasks.length : targetIndex, 0, dragged);
  dragged.listId = targetListId;
  dragged.updatedAt = new Date().toISOString();
  targetTasks.forEach((task, index) => { task.order = index + 1; });
  if (sourceListId !== targetListId) normalizeTaskOrders(sourceListId);
  liveMessage.value = `${dragged.title} moved to ${listById(targetListId)?.name ?? "list"}.`;
  finishTaskDrag();
}

function moveDraggedFocusTask(targetTaskId?: string) {
  const listId = activeListId.value;
  if (!listId) return finishTaskDrag();
  moveDraggedTask(listId, targetTaskId);
}

function finishTaskDrag() {
  draggedTaskId.value = null;
  dragOverTaskId.value = null;
  dragOverTaskListId.value = null;
  window.setTimeout(() => { suppressTaskOpen.value = false; }, 0);
}

function renameEntity(kind: "group" | "list", id: string) {
  if (kind === "list") {
    const list = listById(id);
    if (list) startRenameList(list, "sidebar");
    return;
  }
  const entity = groups.value.find((item) => item.id === id);
  if (!entity) return;
  startRenameGroup(entity);
}

function startRenameGroup(group: TaskManagerGroup) {
  if (sidebarCollapsed.value) sidebarCollapsed.value = false;
  inlineGroupRename.groupId = group.id;
  inlineGroupRename.name = group.name;
  entityMenuId.value = null;
  columnMenuId.value = null;
  focusInlineInput(".inline-group-rename input");
}

function cancelRenameGroup() {
  inlineGroupRename.groupId = null;
  inlineGroupRename.name = "";
}

function commitRenameGroup() {
  const group = groups.value.find((item) => item.id === inlineGroupRename.groupId);
  const name = inlineGroupRename.name.trim();
  if (group && name) {
    group.name = name;
    liveMessage.value = `Group renamed to ${name}.`;
  }
  cancelRenameGroup();
}

function startRenameList(list: TaskManagerList, context: "sidebar" | "column" | "progress") {
  inlineRename.listId = list.id;
  inlineRename.context = context;
  inlineRename.name = list.name;
  entityMenuId.value = null;
  columnMenuId.value = null;
  focusInlineInput(context === "sidebar" ? ".inline-rename-nav input" : context === "column" ? ".column-rename-input" : ".progress-list-rename-input");
}

function cancelRenameList() {
  inlineRename.listId = null;
  inlineRename.name = "";
}

function commitRenameList() {
  const list = listById(inlineRename.listId ?? "");
  const name = inlineRename.name.trim();
  if (list && name) {
    list.name = name;
    liveMessage.value = `List renamed to ${name}.`;
  }
  cancelRenameList();
}

function openListFromColumn(listId: string) {
  columnMenuId.value = null;
  selectView(`list:${listId}`);
}

function onColumnDragStart(event: DragEvent, listId: string) {
  if (taskSortMode.value === "due") {
    event.preventDefault();
    liveMessage.value = "Switch to My order to reorder list columns.";
    return;
  }
  draggedColumnId.value = listId;
  event.dataTransfer?.setData("text/plain", listId);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function onColumnDrop(targetListId: string) {
  const sourceId = draggedColumnId.value;
  if (!sourceId || sourceId === targetListId) return finishColumnDrag();
  const next = visibleListIds.value.filter((id) => id !== sourceId);
  const targetIndex = next.indexOf(targetListId);
  next.splice(targetIndex < 0 ? next.length : targetIndex, 0, sourceId);
  visibleListIds.value = next;
  persistPreferences();
  liveMessage.value = `${listById(sourceId)?.name ?? "List"} column reordered.`;
  finishColumnDrag();
}

function finishColumnDrag() {
  draggedColumnId.value = null;
  dragOverColumnId.value = null;
}

function deleteEntity(kind: "group" | "list", id: string) {
  if (kind === "group") {
    const group = groups.value.find((item) => item.id === id);
    const count = lists.value.filter((list) => list.groupId === id).length;
    if (!group || !window.confirm(`Delete group “${group.name}”? Its ${count} list${count === 1 ? "" : "s"} will be kept and moved outside the group.`)) return;
    const groupKey = `group:${id}`;
    const groupIndex = sidebarRootOrder.value.indexOf(groupKey);
    const releasedLists = lists.value.filter((list) => list.groupId === id).sort((a, b) => a.order - b.order);
    releasedLists.forEach((list) => { list.groupId = null; });
    groups.value = groups.value.filter((item) => item.id !== id);
    const nextRootOrder = sidebarRootOrder.value.filter((key) => key !== groupKey && !releasedLists.some((list) => key === `list:${list.id}`));
    nextRootOrder.splice(groupIndex < 0 ? nextRootOrder.length : groupIndex, 0, ...releasedLists.map((list) => `list:${list.id}`));
    sidebarRootOrder.value = nextRootOrder;
    persistPreferences();
  } else {
    const list = listById(id);
    const count = tasks.value.filter((task) => task.listId === id).length;
    if (!list || !window.confirm(`Delete list “${list.name}” and its ${count} task${count === 1 ? "" : "s"}? This cannot be undone in this mock session.`)) return;
    const wasActiveList = activeListId.value === id;
    tasks.value = tasks.value.filter((task) => task.listId !== id);
    delete listMemberIds[id];
    delete shareTokens[id];
    delete listTaskSortModes[id];
    lists.value = lists.value.filter((item) => item.id !== id);
    sidebarRootOrder.value = sidebarRootOrder.value.filter((key) => key !== `list:${id}`);
    visibleListIds.value = visibleListIds.value.filter((item) => item !== id);
    const generatedList = ensureListExists();
    if (generatedList) {
      if (wasActiveList) selectView(`list:${generatedList.id}`);
      liveMessage.value = `${list.name} deleted. My Tasks was created because every workspace needs at least one list.`;
    } else if (wasActiveList) selectView("all");
    persistPreferences();
    persistCollaboration();
  }
  entityMenuId.value = null;
  columnMenuId.value = null;
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  if (assignmentTaskId.value) closeAssignmentPopover();
  else if (joinPreviewOpen.value) joinPreviewOpen.value = false;
  else if (shareListId.value) closeShareDialog();
  else if (manageVisibleOpen.value) manageVisibleOpen.value = false;
  else if (demoGuideOpen.value) demoGuideOpen.value = false;
  else if (mobileWorkspaceSearchOpen.value) mobileWorkspaceSearchOpen.value = false;
  else if (selectedTaskId.value) selectedTaskId.value = null;
  else if (mobileSidebarOpen.value) mobileSidebarOpen.value = false;
  else if (profileMenuOpen.value) profileMenuOpen.value = false;
  else if (customizeListId.value) customizeListId.value = null;
  else if (topMenuOpen.value || entityMenuId.value || columnMenuId.value) {
    topMenuOpen.value = false;
    entityMenuId.value = null;
    columnMenuId.value = null;
  }
  else if (collapsedGroupFlyoutId.value) collapsedGroupFlyoutId.value = null;
  else if (inlineGroupRename.groupId) cancelRenameGroup();
  else if (inlineRename.listId) cancelRenameList();
  else cancelComposer();
}

function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (!target.closest(".menu-anchor, .smart-view-context-menu")) topMenuOpen.value = false;
  if (!target.closest(".profile-menu-anchor")) profileMenuOpen.value = false;
  if (!target.closest(".group-block, .list-nav-wrap")) entityMenuId.value = null;
  if (!target.closest(".column-menu-anchor")) columnMenuId.value = null;
  if (!target.closest(".list-customizer")) customizeListId.value = null;
  if (!target.closest(".collapsed-group-wrap")) collapsedGroupFlyoutId.value = null;
  if (!target.closest(".assignment-popover, .assignment-trigger")) closeAssignmentPopover();
  if (mobileWorkspaceSearchOpen.value && !target.closest(".workspace-search")) mobileWorkspaceSearchOpen.value = false;
}

watch(
  () => selectedTask.value ? JSON.stringify(selectedTask.value) : null,
  (next, previous) => {
    if (!next || !previous || next === previous) return;
    savingState.value = "saving";
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { savingState.value = "saved"; }, 550);
  },
);

watch(
  () => selectedTask.value?.listId,
  (listId) => {
    const task = selectedTask.value;
    if (!task || !listId) return;
    const assigneeId = taskAssignees[task.id];
    if (assigneeId && !membersForList(listId).some((member) => member.id === assigneeId)) {
      taskAssignees[task.id] = null;
      persistCollaboration();
      liveMessage.value = "Assignee removed because they are not a member of the destination list.";
    }
  },
);

onMounted(() => {
  updateViewportMode();
  try {
    const saved = JSON.parse(localStorage.getItem(PREFERENCE_KEY) || "null") as { visibleListIds?: string[]; hiddenListIds?: string[]; hiddenCompleted?: Record<string, boolean>; sidebarCollapsed?: boolean; taskSortMode?: TaskSortMode; listTaskSortModes?: Record<string, ListTaskSortMode>; listAppearance?: Record<string, { color?: string; icon?: string }>; sidebarRootOrder?: string[]; drawerWidth?: number } | null;
    const allListIds = lists.value.map((list) => list.id);
    if (Array.isArray(saved?.hiddenListIds)) {
      const hiddenIds = new Set(saved.hiddenListIds.filter((id) => allListIds.includes(id)));
      const savedOrder = (saved.visibleListIds ?? []).filter((id) => allListIds.includes(id) && !hiddenIds.has(id));
      const newVisibleIds = allListIds.filter((id) => !hiddenIds.has(id) && !savedOrder.includes(id));
      visibleListIds.value = [...savedOrder, ...newVisibleIds];
    } else if (saved?.visibleListIds?.length) {
      const restoredIds = saved.visibleListIds.filter((id) => allListIds.includes(id));
      visibleListIds.value = restoredIds.length ? restoredIds : allListIds;
    } else {
      visibleListIds.value = allListIds;
    }
    if (saved?.hiddenCompleted) Object.assign(hiddenCompleted, saved.hiddenCompleted);
    if (typeof saved?.sidebarCollapsed === "boolean") sidebarCollapsed.value = saved.sidebarCollapsed;
    if (saved?.taskSortMode === "manual" || saved?.taskSortMode === "due") taskSortMode.value = saved.taskSortMode;
    if (saved?.listTaskSortModes) {
      const validModes: ListTaskSortMode[] = ["manual", "importance", "due", "alphabetical", "created"];
      Object.entries(saved.listTaskSortModes).forEach(([listId, mode]) => {
        if (listById(listId) && validModes.includes(mode)) listTaskSortModes[listId] = mode;
      });
    }
    if (saved?.listAppearance) {
      lists.value.forEach((list) => {
        const appearance = saved.listAppearance?.[list.id];
        if (appearance?.color) list.color = appearance.color;
        if (appearance?.icon) list.icon = appearance.icon;
      });
    }
    if (Array.isArray(saved?.sidebarRootOrder)) sidebarRootOrder.value = saved.sidebarRootOrder;
    if (typeof saved?.drawerWidth === "number") drawerWidth.value = clampDrawerWidth(saved.drawerWidth);
    syncSidebarRootOrder();
  } catch {}
  try {
    const savedCollaboration = JSON.parse(localStorage.getItem(COLLABORATION_KEY) || "null") as { listMemberIds?: Record<string, string[]>; shareTokens?: Record<string, string>; taskAssignees?: Record<string, string | null>; taskAttachments?: Record<string, TaskAttachment[]> } | null;
    if (savedCollaboration) {
      Object.keys(listMemberIds).forEach((key) => delete listMemberIds[key]);
      Object.keys(shareTokens).forEach((key) => delete shareTokens[key]);
      Object.keys(taskAssignees).forEach((key) => delete taskAssignees[key]);
      Object.keys(taskAttachments).forEach((key) => delete taskAttachments[key]);
      if (savedCollaboration.listMemberIds) Object.assign(listMemberIds, savedCollaboration.listMemberIds);
      if (savedCollaboration.shareTokens) Object.assign(shareTokens, savedCollaboration.shareTokens);
      if (savedCollaboration.taskAssignees) Object.assign(taskAssignees, savedCollaboration.taskAssignees);
      if (savedCollaboration.taskAttachments) Object.assign(taskAttachments, savedCollaboration.taskAttachments);
    }
  } catch {}
  ensureListExists();
  const inviteQuery = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const invitedListId = inviteQuery.get("list");
  if (inviteQuery.get("invite") && invitedListId && listById(invitedListId)) {
    if (!listMemberIds[invitedListId]) listMemberIds[invitedListId] = [currentMemberId];
    shareListId.value = invitedListId;
    joinPreviewOpen.value = true;
  }
  window.addEventListener("keydown", onEscape);
  window.addEventListener("resize", closeSidebarContextMenu);
  window.addEventListener("resize", closeColumnPointerMenu);
  window.addEventListener("resize", closeAllTasksPointerMenu);
  window.addEventListener("resize", closeListCustomizer);
  window.addEventListener("resize", updateViewportMode);
  document.addEventListener("scroll", closeSidebarContextMenu, true);
  document.addEventListener("scroll", closeColumnPointerMenu, true);
  document.addEventListener("scroll", closeAllTasksPointerMenu, true);
  document.addEventListener("scroll", closeListCustomizer, true);
  document.addEventListener("pointerdown", onDocumentPointerDown);
});

onBeforeUnmount(() => {
  finishDrawerResize();
  window.removeEventListener("keydown", onEscape);
  window.removeEventListener("resize", closeSidebarContextMenu);
  window.removeEventListener("resize", closeColumnPointerMenu);
  window.removeEventListener("resize", closeAllTasksPointerMenu);
  window.removeEventListener("resize", closeListCustomizer);
  window.removeEventListener("resize", updateViewportMode);
  document.removeEventListener("scroll", closeSidebarContextMenu, true);
  document.removeEventListener("scroll", closeColumnPointerMenu, true);
  document.removeEventListener("scroll", closeAllTasksPointerMenu, true);
  document.removeEventListener("scroll", closeListCustomizer, true);
  document.removeEventListener("pointerdown", onDocumentPointerDown);
  if (saveTimer) clearTimeout(saveTimer);
});
</script>

<template>
  <div class="task-manager-page">
    <section class="task-app-shell" :class="{ 'has-drawer': selectedTask, 'sidebar-is-collapsed': effectiveSidebarCollapsed }">
      <div v-if="mobileSidebarOpen" class="mobile-backdrop" @click="mobileSidebarOpen = false"></div>

      <header class="task-global-topbar">
        <div class="topbar-brand">
          <svg class="mitreka-brand-logo" viewBox="0 0 158.25 105.5" aria-hidden="true">
            <polygon fill="#025097" points="46.55 58.99 72.93 85.37 52.75 105.5 0 105.5 0 0 52.75 0 72.93 20.18 46.55 46.55 40.31 52.75 46.55 58.99" />
            <polygon fill="#ee3032" points="158.25 0 158.25 105.5 105.5 105.5 85.37 85.37 111.7 58.99 117.94 52.75 111.7 46.55 85.32 20.18 105.5 0 158.25 0" />
            <rect fill="currentColor" x="60.47" y="34.1" width="37.3" height="37.3" transform="translate(-14.12 71.4) rotate(-45)" />
          </svg>
          <div><strong>Mitreka Tasks</strong><small>Personal workspace</small></div>
        </div>
        <div class="topbar-main">
          <div class="header-title-wrap">
            <button class="icon-button mobile-only mobile-menu-button" type="button" aria-label="Open navigation" title="Open navigation" @click="openMobileSidebar"><Icon name="menu" /></button>
            <div>
              <div class="title-line"><span v-if="activeList" class="title-list-dot" :style="{ background: activeList.color }"></span><h1>{{ viewTitle }}</h1></div>
              <p>{{ viewSubtitle }}</p>
            </div>
          </div>

          <label class="workspace-search" :class="{ 'is-mobile-open': mobileWorkspaceSearchOpen }" @click="activateWorkspaceSearch">
            <Icon name="search" />
            <input ref="workspaceSearchInput" v-model="workspaceSearchQuery" type="search" :placeholder="activeList ? `Search in ${activeList.name}` : 'Search tasks in workspace'" aria-label="Search tasks in workspace" @keydown.enter.prevent="mobileWorkspaceSearchOpen = false" @keydown.esc.prevent="closeMobileWorkspaceSearch" />
            <button v-if="workspaceSearchQuery || mobileWorkspaceSearchOpen" type="button" :aria-label="mobileWorkspaceSearchOpen ? 'Close workspace search' : 'Clear workspace search'" @click.prevent.stop="mobileWorkspaceSearchOpen ? closeMobileWorkspaceSearch() : workspaceSearchQuery = ''"><Icon name="x" /></button>
          </label>

          <div class="header-actions">
            <Tooltip class="demo-guide-tooltip" text="Open demo guide" placement="bottom">
              <button class="icon-button large demo-guide-trigger" type="button" aria-label="Open demo guide" @click="openDemoGuide"><Icon name="info" /></button>
            </Tooltip>
            <div v-if="activeList" class="topbar-collaboration">
              <div v-if="membersForList(activeList.id).length > 1" class="member-avatar-stack" :aria-label="`${membersForList(activeList.id).length} list members`">
                <span v-for="member in membersForList(activeList.id).slice(0, 3)" :key="member.id" :style="{ '--member-color': member.color }" :title="member.name">{{ member.initials }}</span>
              </div>
              <button class="share-list-button" type="button" @click="openShareList(activeList.id)"><Icon name="users" /><span>Share</span></button>
            </div>
            <div class="header-profile profile-menu-anchor" data-task-popup>
              <button class="header-profile-button" type="button" aria-label="Open account menu" :aria-expanded="profileMenuOpen" @click="toggleProfileMenu"><span class="avatar">ED</span><span><strong>Eka Dian</strong><small>Product Designer</small></span><Icon name="chevron-down" /></button>
              <div v-if="profileMenuOpen" class="profile-dropdown">
                <div class="profile-dropdown-head"><span class="avatar">ED</span><div><strong>Eka Dian</strong><small>eka.dian@mitreka.com</small></div></div>
                <button type="button" class="mobile-only demo-guide-profile-link" @click="openDemoGuide"><Icon name="info" /> Demo guide</button>
                <button type="button" class="logout-button" @click="logout"><Icon name="log-out" /> Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Transition name="guide-drawer">
      <div v-if="demoGuideOpen" class="demo-guide-backdrop" @click.self="demoGuideOpen = false">
        <aside class="demo-guide-drawer" role="dialog" aria-modal="true" aria-labelledby="demo-guide-title">
          <header class="demo-guide-header">
            <div class="demo-guide-heading">
              <span><Icon name="book" /></span>
              <div><p>Feature reference</p><h2 id="demo-guide-title">What you can try</h2></div>
            </div>
            <button class="icon-button" type="button" aria-label="Close demo guide" @click="demoGuideOpen = false"><Icon name="x" /></button>
          </header>

          <div class="feature-guide-intro">
            <strong>Task Manager feature guide</strong>
            <p>Follow the steps below directly in the workspace. Features that use drag or right-click are labelled for easier discovery.</p>
          </div>

          <div class="demo-guide-body">
            <section v-for="section in featureGuideSections" :key="section.title" class="demo-guide-section">
              <header><div><h3>{{ section.title }}</h3><small>{{ section.description }}</small></div><span>{{ section.items.length }} features</span></header>
              <article v-for="item in section.items" :key="item.id" class="feature-guide-item" :class="{ expanded: expandedFeatureGuideId === item.id }">
                <button class="feature-guide-trigger" type="button" :aria-expanded="expandedFeatureGuideId === item.id" @click="expandedFeatureGuideId = expandedFeatureGuideId === item.id ? null : item.id">
                  <span class="feature-guide-badge">{{ item.interaction }}</span>
                  <span><strong>{{ item.label }}</strong><small>{{ item.description }}</small></span>
                  <Icon :name="expandedFeatureGuideId === item.id ? 'chevron-up' : 'chevron-down'" />
                </button>
                <ol v-if="expandedFeatureGuideId === item.id" class="feature-guide-steps">
                  <li v-for="instruction in item.steps" :key="instruction"><span>{{ instruction }}</span></li>
                </ol>
              </article>
            </section>
          </div>

          <footer class="demo-guide-footer">
            <span><Icon name="info" /> Tip</span>
            <small>Right-click and drag interactions are also available from visible option buttons.</small>
          </footer>
        </aside>
      </div>
      </Transition>

      <aside class="task-sidebar" :class="{ 'is-mobile-open': mobileSidebarOpen, 'is-collapsed': effectiveSidebarCollapsed }">
        <div class="sidebar-control-row">
          <label v-if="!effectiveSidebarCollapsed" class="sidebar-search" @click="activateSearch">
            <Icon name="search" />
            <input ref="searchInput" v-model="sidebarSearchQuery" type="search" placeholder="Filter groups & lists" aria-label="Filter groups and lists" />
            <button v-if="sidebarSearchQuery" type="button" aria-label="Clear sidebar filter" @click.prevent="sidebarSearchQuery = ''"><Icon name="x" /></button>
          </label>
          <button class="task-sidebar-collapse" type="button" :aria-label="effectiveSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'" :title="effectiveSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'" @click="sidebarCollapsed = !sidebarCollapsed; collapsedGroupFlyoutId = null; persistPreferences()">
            <svg v-if="effectiveSidebarCollapsed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
          </button>
          <button class="icon-button mobile-only" type="button" aria-label="Close navigation" title="Close navigation" @click="mobileSidebarOpen = false"><Icon name="x" /></button>
        </div>

        <nav aria-label="Task manager navigation">
          <p class="nav-eyebrow">Smart views</p>
          <div v-for="view in smartViews" :key="view.id" class="smart-view-wrap" :class="{ 'menu-anchor': view.id === 'all' }" :data-task-popup="view.id === 'all' ? '' : undefined" @contextmenu="openAllTasksContextMenu($event, view.id)">
            <button type="button" class="nav-row" :class="{ active: activeView === view.id, 'has-view-options': view.id === 'all' && !effectiveSidebarCollapsed }" :aria-label="effectiveSidebarCollapsed ? view.label : undefined" @click="selectView(view.id)">
              <Icon :name="view.icon" />
              <span>{{ view.label }}</span>
              <b v-if="view.id === 'today'">{{ tasks.filter(task => !task.isCompleted && task.dueAt && task.dueAt <= todayKey).length }}</b>
              <b v-else-if="view.id === 'important'">{{ tasks.filter(task => task.isImportant && !task.isCompleted).length }}</b>
              <b v-else-if="view.id === 'completed'">{{ tasks.filter(task => task.isCompleted).length }}</b>
              <small v-if="effectiveSidebarCollapsed" class="rail-tooltip" role="tooltip">{{ view.label }}</small>
            </button>
            <button v-if="view.id === 'all' && !effectiveSidebarCollapsed" class="icon-button compact smart-view-menu-button" type="button" aria-label="All Tasks options" title="All Tasks options" @click.stop="toggleAllTasksMenu"><Icon name="ellipsis" /></button>
            <Teleport to=".task-manager-page" :disabled="!topMenuFromPointer">
            <div v-if="view.id === 'all' && topMenuOpen" class="context-menu smart-view-context-menu" :class="{ 'pointer-context-menu': topMenuFromPointer }" :style="topMenuFromPointer ? { left: `${topMenuPosition.x}px`, top: `${topMenuPosition.y}px` } : undefined">
              <button type="button" @click="openManageVisible"><Icon name="eye" /> Manage visible lists</button>
              <div class="context-menu-divider"></div>
              <div class="sort-toggle-block">
                <div class="sort-toggle-label"><Icon name="arrow-down" /> Sort by</div>
                <div class="sort-toggle-tabs" role="group" aria-label="Sort tasks">
                  <button type="button" :class="{ active: taskSortMode === 'manual' }" :aria-pressed="taskSortMode === 'manual'" @click="setTaskSortMode('manual')">My order</button>
                  <button type="button" :class="{ active: taskSortMode === 'due' }" :aria-pressed="taskSortMode === 'due'" @click="setTaskSortMode('due')">Due date</button>
                </div>
              </div>
            </div>
            </Teleport>
          </div>

          <div class="nav-section-heading">
            <p class="nav-eyebrow">Groups &amp; lists</p>
          </div>

          <div class="sidebar-root-tree">
          <template v-for="group in sidebarGroups" :key="group.id">
          <div v-if="draggedListId || draggedRootGroupId" class="root-drop-zone" :class="{ active: rootDropBeforeKey === `group:${group.id}` }" :style="{ order: sidebarRootOrder.indexOf(`group:${group.id}`) * 2 }" @dragover.stop="onRootDropZoneDragOver($event, `group:${group.id}`)" @dragleave.stop="rootDropBeforeKey = undefined" @drop.stop="onRootDrop($event, `group:${group.id}`)"></div>
          <div class="group-block collapsed-group-wrap" :class="{ 'is-root-dragging': draggedRootGroupId === group.id, 'is-list-group-drop-target': dragOverSidebarGroupId === group.id }" :style="{ order: sidebarRootOrder.indexOf(`group:${group.id}`) * 2 + 1 }" data-task-popup @dragover="onSidebarGroupDragOver($event, group.id)" @dragleave="onSidebarGroupDragLeave" @drop="onListDropOnGroup($event, group.id)">
            <div class="group-row" :draggable="inlineGroupRename.groupId !== group.id" @dragstart.stop="onRootGroupDragStart($event, group)" @dragend="finishRootDrag" @contextmenu.prevent="openSidebarContextMenu($event, 'group', group.id)">
              <div v-if="inlineGroupRename.groupId === group.id" class="group-toggle inline-group-rename" @contextmenu.stop>
                <Icon name="layout-panel-left" class="group-icon" />
                <Icon :name="expandedGroups[group.id] ? 'chevron-down' : 'chevron-right'" class="group-chevron" />
                <input v-model="inlineGroupRename.name" aria-label="Rename group" @click.stop @keydown.enter.prevent="commitRenameGroup" @keydown.esc.prevent="cancelRenameGroup" @blur="commitRenameGroup" />
              </div>
              <button v-else type="button" class="group-toggle" :class="{ 'has-active-list': groupLists(group.id).some(list => activeView === `list:${list.id}`) }" :aria-expanded="effectiveSidebarCollapsed ? collapsedGroupFlyoutId === group.id : expandedGroups[group.id]" :aria-label="effectiveSidebarCollapsed ? group.name : undefined" @click="effectiveSidebarCollapsed ? toggleCollapsedGroupFlyout(group.id) : expandedGroups[group.id] = !expandedGroups[group.id]">
                <Icon name="layout-panel-left" class="group-icon" />
                <Icon v-if="!effectiveSidebarCollapsed" :name="expandedGroups[group.id] ? 'chevron-down' : 'chevron-right'" class="group-chevron" />
                <span>{{ group.name }}</span>
                <i v-if="effectiveSidebarCollapsed && groupLists(group.id).length" class="group-child-indicator"><Icon name="chevron-right" /></i>
              </button>
              <div v-if="entityMenuId === `group:${group.id}`" class="context-menu pointer-context-menu" :style="{ left: `${entityMenuPosition.x}px`, top: `${entityMenuPosition.y}px` }">
                <button type="button" @click="startInlineCreate('list', group.id)"><Icon name="plus" /> New list</button>
                <button type="button" @click="renameEntity('group', group.id)"><Icon name="pencil" /> Rename</button>
                <button type="button" class="danger" @click="deleteEntity('group', group.id)"><Icon name="trash" /> Delete group</button>
              </div>
            </div>

            <div v-if="!effectiveSidebarCollapsed && (expandedGroups[group.id] || sidebarSearchQuery)" class="group-lists">
              <div v-for="list in sidebarGroupLists(group.id)" :key="list.id" class="list-nav-wrap" :class="{ 'is-list-dragging': draggedListId === list.id, 'is-list-drag-over': dragOverListId === list.id }" data-task-popup @contextmenu.prevent.stop="openSidebarContextMenu($event, 'list', list.id)" @dragover.prevent.stop="dragOverListId = list.id" @drop.stop="onListDropOnList($event, list)">
                <div v-if="inlineRename.listId === list.id && inlineRename.context === 'sidebar'" class="nav-row list-nav active inline-rename-nav">
                  <span class="list-dot" :style="{ background: list.color }"></span>
                  <input ref="renameInput" v-model="inlineRename.name" aria-label="Rename list" @keydown.enter.prevent="commitRenameList" @keydown.esc.prevent="cancelRenameList" @blur="commitRenameList" />
                </div>
                <button v-else type="button" class="nav-row list-nav" :class="{ active: activeView === `list:${list.id}` }" draggable="true" @dragstart.stop="onListDragStart($event, list)" @dragend="finishListDrag" @click="selectView(`list:${list.id}`)">
                  <span class="list-dot" :style="{ background: list.color }"></span>
                  <span>{{ list.name }}</span><Icon v-if="listIsShared(list.id)" name="users" class="list-shared-indicator" /><b>{{ listOpenCount(list.id) }}</b>
                </button>
              <div v-if="entityMenuId === `list:${list.id}`" class="context-menu pointer-context-menu" :style="{ left: `${entityMenuPosition.x}px`, top: `${entityMenuPosition.y}px` }">
                  <button type="button" @click="openShareList(list.id)"><Icon name="users" /> Share list</button>
                  <button type="button" @click="openListCustomizer($event, list.id)"><Icon name="palette" /> Customize list</button>
                  <button type="button" @click="renameEntity('list', list.id)"><Icon name="pencil" /> Rename</button>
                  <button type="button" class="danger" @click="deleteEntity('list', list.id)"><Icon name="trash" /> Delete list</button>
                </div>
              </div>
              <div v-if="inlineCreation.kind === 'list' && inlineCreation.groupId === group.id" class="inline-create-row">
                <span class="new-list-circle"></span>
                <input ref="creationInput" v-model="inlineCreation.name" aria-label="New list name" @keydown.enter.prevent="commitInlineCreate" @keydown.esc.prevent="cancelInlineCreate" @blur="commitInlineCreate" />
              </div>
            </div>

            <div v-if="effectiveSidebarCollapsed" class="collapsed-group-flyout" :class="{ 'is-open': collapsedGroupFlyoutId === group.id }">
              <header><span><Icon name="layout-panel-left" /></span><div><strong>{{ group.name }}</strong><small>{{ groupLists(group.id).length }} lists</small></div></header>
              <div class="collapsed-group-flyout-list">
                <button v-for="list in groupLists(group.id)" :key="list.id" type="button" :class="{ active: activeView === `list:${list.id}` }" @click="selectView(`list:${list.id}`)"><i :style="{ background: list.color }"></i><span class="collapsed-list-name">{{ list.name }}</span><span v-if="listIsShared(list.id)" class="collapsed-shared-icon" title="Shared list"><Icon name="users" /></span><b>{{ listOpenCount(list.id) }}</b></button>
                <div v-if="!groupLists(group.id).length" class="collapsed-group-empty">No lists in this group.</div>
              </div>
            </div>
          </div>
          </template>

          <div class="ungrouped-block">
            <template v-for="list in sidebarUngroupedLists" :key="list.id">
            <div v-if="draggedListId || draggedRootGroupId" class="root-drop-zone" :class="{ active: rootDropBeforeKey === `list:${list.id}` }" :style="{ order: sidebarRootOrder.indexOf(`list:${list.id}`) * 2 }" @dragover.stop="onRootDropZoneDragOver($event, `list:${list.id}`)" @dragleave.stop="rootDropBeforeKey = undefined" @drop.stop="onRootDrop($event, `list:${list.id}`)"></div>
            <div class="list-nav-wrap ungrouped-list" :class="{ 'is-list-dragging': draggedListId === list.id, 'is-list-drag-over': dragOverListId === list.id }" :style="{ order: sidebarRootOrder.indexOf(`list:${list.id}`) * 2 + 1 }" data-task-popup @contextmenu.prevent.stop="openSidebarContextMenu($event, 'list', list.id)" @dragover.prevent.stop="dragOverListId = list.id" @drop.stop="onListDropOnList($event, list)">
              <div v-if="inlineRename.listId === list.id && inlineRename.context === 'sidebar'" class="nav-row list-nav active inline-rename-nav"><span class="list-dot" :style="{ background: list.color }"></span><input ref="renameInput" v-model="inlineRename.name" aria-label="Rename list" @keydown.enter.prevent="commitRenameList" @keydown.esc.prevent="cancelRenameList" @blur="commitRenameList" /></div>
              <button v-else type="button" class="nav-row list-nav" :class="{ active: activeView === `list:${list.id}` }" :aria-label="effectiveSidebarCollapsed ? list.name : undefined" draggable="true" @dragstart.stop="onListDragStart($event, list)" @dragend="finishListDrag" @click="selectView(`list:${list.id}`)"><span class="list-dot" :style="{ background: list.color }"></span><span>{{ list.name }}</span><Icon v-if="!effectiveSidebarCollapsed && listIsShared(list.id)" name="users" class="list-shared-indicator" /><b>{{ listOpenCount(list.id) }}</b><small v-if="effectiveSidebarCollapsed" class="rail-tooltip" role="tooltip">{{ list.name }}</small></button>
              <div v-if="entityMenuId === `list:${list.id}`" class="context-menu pointer-context-menu" :style="{ left: `${entityMenuPosition.x}px`, top: `${entityMenuPosition.y}px` }"><button type="button" @click="openShareList(list.id)"><Icon name="users" /> Share list</button><button type="button" @click="openListCustomizer($event, list.id)"><Icon name="palette" /> Customize list</button><button type="button" @click="renameEntity('list', list.id)"><Icon name="pencil" /> Rename</button><button type="button" class="danger" @click="deleteEntity('list', list.id)"><Icon name="trash" /> Delete list</button></div>
            </div>
            </template>
            <div v-if="inlineCreation.kind === 'list' && inlineCreation.groupId === null" class="inline-create-row ungrouped-list root-inline-create">
              <span class="new-list-circle"></span>
              <input ref="creationInput" v-model="inlineCreation.name" aria-label="New list name" @keydown.enter.prevent="commitInlineCreate" @keydown.esc.prevent="cancelInlineCreate" @blur="commitInlineCreate" />
            </div>
          </div>

          <div v-if="inlineCreation.kind === 'group'" class="inline-create-row inline-group-row root-inline-create">
            <Icon name="layout-panel-left" />
            <input ref="creationInput" v-model="inlineCreation.name" aria-label="New group name" @keydown.enter.prevent="commitInlineCreate" @keydown.esc.prevent="cancelInlineCreate" @blur="commitInlineCreate" />
            <Icon name="chevron-down" />
          </div>
          <div v-if="draggedListId || draggedRootGroupId" class="root-drop-zone root-drop-zone-end" :class="{ active: rootDropBeforeKey === null }" @dragover.stop="onRootDropZoneDragOver($event, null)" @dragleave.stop="rootDropBeforeKey = undefined" @drop.stop="onRootDrop($event, null)"></div>
          </div>
        </nav>

        <div class="sidebar-create-footer">
          <button type="button" @click="startInlineCreate('list', null)"><Icon name="plus" /><span>New list</span></button>
          <button type="button" @click="startInlineCreate('group')"><Icon name="layout-panel-left" /><span>New group</span></button>
        </div>
      </aside>

      <main class="task-main">
        <section v-if="activeView === 'all'" class="all-tasks-view" aria-label="All task lists" @contextmenu="openAllTasksContextMenu">
          <div v-if="displayedVisibleLists.length" class="list-columns">
            <article v-for="list in displayedVisibleLists" :key="list.id" class="list-column" :class="{ 'is-task-list-drag-over': dragOverTaskListId === list.id, 'is-column-dragging': draggedColumnId === list.id, 'is-column-drag-over': dragOverColumnId === list.id }" @dragover.prevent="draggedColumnId ? dragOverColumnId = list.id : dragOverTaskListId = list.id" @drop.prevent="draggedColumnId ? onColumnDrop(list.id) : moveDraggedTask(list.id)">
              <Tooltip :text="taskSortMode === 'due' ? 'Switch to My order to reorder lists' : 'Drag to reorder list'" position="top" :delay="350" class="column-header-tooltip">
              <header class="column-header" :class="{ 'is-sort-locked': taskSortMode === 'due' }" :draggable="taskSortMode === 'manual' && inlineRename.listId !== list.id" @contextmenu.prevent.stop="openColumnContextMenu($event, list.id)" @dragstart.stop="onColumnDragStart($event, list.id)" @dragend="finishColumnDrag">
                <div class="column-identity">
                  <span class="list-icon" :style="{ '--list-color': list.color }"><Icon :name="list.icon as any" /></span>
                  <div>
                    <input v-if="inlineRename.listId === list.id && inlineRename.context === 'column'" ref="renameInput" v-model="inlineRename.name" class="column-rename-input" aria-label="Rename list" @keydown.enter.prevent="commitRenameList" @keydown.esc.prevent="cancelRenameList" @blur="commitRenameList" />
                    <h2 v-else>{{ list.name }}</h2>
                    <p class="column-stats"><span>{{ listOpenCount(list.id) }} open tasks</span><span v-if="listIsShared(list.id)" class="column-member-stat" :title="`${membersForList(list.id).length} list members`"><Icon name="users" /> {{ membersForList(list.id).length }}</span></p>
                  </div>
                </div>
                <div class="column-menu-anchor" data-task-popup @pointerdown.stop @dragstart.stop.prevent>
                  <button class="icon-button column-menu-button" type="button" :aria-label="`Options for ${list.name}`" :title="`Options for ${list.name}`" @click="toggleColumnMenu(list.id)"><Icon name="ellipsis" /></button>
                  <div v-if="columnMenuId === list.id" class="context-menu column-context-menu" :class="{ 'pointer-context-menu': columnMenuFromPointer }" :style="columnMenuFromPointer ? { left: `${columnMenuPosition.x}px`, top: `${columnMenuPosition.y}px` } : undefined">
                    <button type="button" @click="openListFromColumn(list.id)"><Icon name="arrow-right" /> Open list</button>
                    <button type="button" @click="openShareList(list.id)"><Icon name="users" /> Share list</button>
                    <button type="button" @click="startRenameList(list, 'column')"><Icon name="pencil" /> Rename list</button>
                    <button type="button" @click="openListCustomizer($event, list.id)"><Icon name="palette" /> Customize list</button>
                    <div class="context-menu-divider"></div>
                    <div class="list-sort-menu-item" @pointerenter="listSortPickerId = list.id" @pointerleave="listSortPickerId = null">
                      <button class="list-sort-trigger" type="button" :aria-expanded="listSortPickerId === list.id" @click.stop="toggleListSortPicker(list.id)"><Icon name="arrow-down-up" /><span class="list-sort-label">Sort by</span><Icon name="chevron-right" /></button>
                      <div v-if="listSortPickerId === list.id" class="list-sort-flyout" role="menu" :aria-label="`Sort ${list.name} by`">
                        <strong>Sort by</strong>
                        <button v-for="option in listSortOptions" :key="option.id" type="button" :class="{ active: listTaskSortMode(list.id) === option.id }" @click="setListTaskSortMode(list.id, option.id)"><Icon name="check" /> {{ option.label }}</button>
                      </div>
                    </div>
                    <div class="context-menu-divider"></div>
                    <button type="button" class="danger" @click="deleteEntity('list', list.id)"><Icon name="trash" /> Delete list</button>
                  </div>
                </div>
              </header>
              </Tooltip>

              <form v-if="activeComposerId === list.id" class="task-composer" @submit.prevent="createTask(list.id)">
                <span class="empty-check"></span>
                <input v-model="composerDrafts[list.id]" autofocus type="text" placeholder="Task name" aria-label="New task name" @keydown.esc="cancelComposer" />
                <button type="submit" :disabled="!composerDrafts[list.id]?.trim()" aria-label="Save task" title="Save task"><Icon name="arrow-right" /></button>
              </form>
              <button v-else class="add-inline" type="button" @click="openComposer(list.id)"><Icon name="plus" /> Add a task</button>

              <div class="task-stack">
                <article v-for="task in tasksForList(list.id, false)" :key="task.id" class="task-card" :class="{ 'is-task-dragging': draggedTaskId === task.id, 'is-task-drag-over': dragOverTaskId === task.id }" draggable="true" @dragstart="onTaskDragStart($event, task)" @dragend="finishTaskDrag" @dragover.prevent.stop="dragOverTaskId = task.id; dragOverTaskListId = list.id" @drop.prevent.stop="moveDraggedTask(list.id, task.id)" @click="openTask(task)">
                  <button class="task-check" type="button" :aria-label="`Complete ${task.title}`" @click.stop="toggleTask(task)"><Icon name="check" /></button>
                  <div class="task-copy"><h3>{{ task.title }}</h3><div class="task-meta">
                    <span v-if="task.dueAt" :class="dueTone(task)"><Icon name="calendar" /> {{ formatDate(task.dueAt) }}</span>
                    <span v-if="task.subtasks.length"><Icon name="check-check" /> {{ subtaskProgress(task) }}/{{ task.subtasks.length }}</span>
                    <span v-if="task.recurrenceRule"><Icon name="repeat" /></span>
                    <span v-if="task.notes.trim()" class="task-note-indicator" aria-label="Has notes" title="Has notes"><Icon name="fileText" /></span>
                    <span v-if="attachmentsForTask(task.id).length" class="task-attachment-indicator" title="Attachments"><Icon name="file" /> {{ attachmentsForTask(task.id).length }}</span>
                  </div></div>
                  <button v-if="assigneeForTask(task.id)" class="task-assignee-button assignment-trigger" type="button" :aria-label="`Assigned to ${assigneeForTask(task.id)?.name}`" :title="`Assigned to ${assigneeForTask(task.id)?.name}`" @dragstart.stop.prevent @click.stop="openAssignmentPopover($event, task)"><span class="task-assignee-avatar" :style="{ '--member-color': assigneeForTask(task.id)?.color }">{{ assigneeForTask(task.id)?.initials }}</span></button>
                  <button class="star-button" :class="{ active: task.isImportant }" type="button" :aria-label="`${task.isImportant ? 'Remove' : 'Mark'} important`" @click.stop="toggleImportant(task)"><Icon name="star" /></button>
                </article>

                <div v-if="!tasksForList(list.id, false).length && !workspaceSearchQuery" class="column-empty">
                  <span><Icon name="circle-check" /></span><h3>You’re all caught up</h3><p>Add a task when something comes up.</p>
                </div>
              </div>

              <div v-if="tasksForList(list.id, true).length" class="completed-section">
                <button type="button" @click="hiddenCompleted[list.id] = !hiddenCompleted[list.id]; persistPreferences()">
                  <Icon :name="hiddenCompleted[list.id] ? 'chevron-right' : 'chevron-down'" />
                  <span>Completed</span>
                  <span class="completed-count">{{ tasksForList(list.id, true).length }}</span>
                </button>
                <div v-if="!hiddenCompleted[list.id]" class="task-stack completed-stack">
                  <article v-for="task in tasksForList(list.id, true)" :key="task.id" class="task-card is-completed" :class="{ 'is-task-dragging': draggedTaskId === task.id, 'is-task-drag-over': dragOverTaskId === task.id }" draggable="true" @dragstart="onTaskDragStart($event, task)" @dragend="finishTaskDrag" @dragover.prevent.stop="dragOverTaskId = task.id; dragOverTaskListId = list.id" @drop.prevent.stop="moveDraggedTask(list.id, task.id)" @click="openTask(task)">
                    <button class="task-check checked" type="button" :aria-label="`Reopen ${task.title}`" @click.stop="toggleTask(task)"><Icon name="check" /></button>
                    <div class="task-copy"><h3>{{ task.title }}</h3></div>
                    <span v-if="task.notes.trim()" class="completed-note-indicator" aria-label="Has notes" title="Has notes"><Icon name="fileText" /></span>
                    <span v-if="attachmentsForTask(task.id).length" class="completed-note-indicator" title="Attachments"><Icon name="file" /> {{ attachmentsForTask(task.id).length }}</span>
                    <button v-if="assigneeForTask(task.id)" class="task-assignee-button assignment-trigger" type="button" :aria-label="`Assigned to ${assigneeForTask(task.id)?.name}`" :title="`Assigned to ${assigneeForTask(task.id)?.name}`" @dragstart.stop.prevent @click.stop="openAssignmentPopover($event, task)"><span class="task-assignee-avatar" :style="{ '--member-color': assigneeForTask(task.id)?.color }">{{ assigneeForTask(task.id)?.initials }}</span></button>
                    <button class="star-button" :class="{ active: task.isImportant }" type="button" aria-label="Toggle important" @click.stop="toggleImportant(task)"><Icon name="star" /></button>
                  </article>
                </div>
              </div>
            </article>
          </div>

          <div v-else-if="workspaceSearchQuery" class="zero-state">
            <span class="zero-illustration"><Icon name="search" /></span><h2>No matching tasks</h2>
            <p>Try another task name or clear the workspace search.</p>
            <button class="secondary-button" type="button" @click="workspaceSearchQuery = ''"><Icon name="x" /> Clear search</button>
          </div>
          <div v-else class="zero-state">
            <span class="zero-illustration"><Icon name="layout-panel-left" /></span><h2>No lists are visible</h2>
            <p>Your lists are safe. Choose which ones should appear as columns in All Tasks.</p>
            <button class="primary-button" type="button" @click="openManageVisible"><Icon name="eye" /> Choose lists</button>
          </div>
        </section>

        <section v-else class="focus-view">
          <div v-if="activeList" class="list-progress-card" @contextmenu.prevent.stop="openColumnContextMenu($event, activeList.id)">
            <div><span :style="{ background: activeList.color }"><Icon :name="activeList.icon as any" /></span><div><strong>{{ activeListStats.completed }} of {{ activeListStats.total }} completed</strong><small>Keep going—your list is moving forward.</small></div></div>
            <input v-if="inlineRename.listId === activeList.id && inlineRename.context === 'progress'" ref="renameInput" v-model="inlineRename.name" class="progress-list-rename-input" aria-label="Rename list" @keydown.enter.prevent="commitRenameList" @keydown.esc.prevent="cancelRenameList" @blur="commitRenameList" />
            <div class="column-menu-anchor progress-list-menu-anchor" data-task-popup @pointerdown.stop>
              <button class="icon-button column-menu-button" type="button" :aria-label="`Options for ${activeList.name}`" :aria-expanded="columnMenuId === activeList.id" @click="toggleColumnMenu(activeList.id)"><Icon name="ellipsis" /></button>
              <div v-if="columnMenuId === activeList.id" class="context-menu column-context-menu progress-list-context-menu" :class="{ 'pointer-context-menu': columnMenuFromPointer }" :style="columnMenuFromPointer ? { left: `${columnMenuPosition.x}px`, top: `${columnMenuPosition.y}px` } : undefined">
                <button type="button" @click="openShareList(activeList.id)"><Icon name="users" /> Share list</button>
                <button type="button" @click="startRenameList(activeList, 'progress')"><Icon name="pencil" /> Rename list</button>
                <button type="button" @click="openListCustomizer($event, activeList.id)"><Icon name="palette" /> Customize list</button>
                <div class="context-menu-divider"></div>
                <div class="list-sort-menu-item" @pointerenter="listSortPickerId = activeList.id" @pointerleave="listSortPickerId = null">
                  <button class="list-sort-trigger" type="button" :aria-expanded="listSortPickerId === activeList.id" @click.stop="toggleListSortPicker(activeList.id)"><Icon name="arrow-down-up" /><span class="list-sort-label">Sort by</span><Icon name="chevron-right" /></button>
                  <div v-if="listSortPickerId === activeList.id" class="list-sort-flyout" role="menu" :aria-label="`Sort ${activeList.name} by`">
                    <strong>Sort by</strong>
                    <button v-for="option in listSortOptions" :key="option.id" type="button" :class="{ active: activeListTaskSortMode === option.id }" @click="setListTaskSortMode(activeList.id, option.id)"><Icon name="check" /> {{ option.label }}</button>
                  </div>
                </div>
                <div class="context-menu-divider"></div>
                <button type="button" class="danger" @click="deleteEntity('list', activeList.id)"><Icon name="trash" /> Delete list</button>
              </div>
            </div>
            <div class="progress-track"><i :style="{ width: `${activeListStats.percent}%`, background: activeList.color }"></i></div>
          </div>

          <form v-if="activeComposerId" class="focus-composer" @submit.prevent="createTask(activeComposerId)">
            <span class="empty-check"></span><input v-model="composerDrafts[activeComposerId]" autofocus type="text" placeholder="What needs to be done?" aria-label="New task name" @keydown.esc="cancelComposer" />
            <span class="composer-hint">Adding to {{ listById(activeComposerId)?.name }} · Enter to add</span><button class="primary-button" type="submit">Add task</button>
          </form>

          <div v-if="filteredFocusTasks.length" class="focus-task-list" @dragover="activeList ? $event.preventDefault() : undefined" @drop="activeList ? moveDraggedFocusTask() : undefined">
            <Tooltip v-for="task in focusPrimaryTasks" :key="task.id" :text="activeList ? (activeListTaskSortMode === 'manual' ? 'Drag to reorder task' : 'Switch sorting to My order to reorder') : ''" position="top" :delay="350" class="focus-task-tooltip">
            <article class="focus-task-row" :class="{ 'is-completed': task.isCompleted, 'is-reorderable': Boolean(activeList) && activeListTaskSortMode === 'manual', 'is-task-dragging': draggedTaskId === task.id, 'is-task-drag-over': dragOverTaskId === task.id }" :draggable="Boolean(activeList) && activeListTaskSortMode === 'manual'" @dragstart="activeList && activeListTaskSortMode === 'manual' ? onTaskDragStart($event, task) : $event.preventDefault()" @dragend="finishTaskDrag" @dragover.prevent.stop="activeList && activeListTaskSortMode === 'manual' ? (dragOverTaskId = task.id) : undefined" @drop.prevent.stop="activeList && activeListTaskSortMode === 'manual' ? moveDraggedFocusTask(task.id) : undefined" @click="openTask(task)">
              <button class="task-check" :class="{ checked: task.isCompleted }" type="button" :aria-label="`Toggle ${task.title}`" @click.stop="toggleTask(task)"><Icon name="check" /></button>
              <div class="focus-task-copy"><h3>{{ task.title }}</h3><div class="task-meta">
                <span class="source-list"><i :style="{ background: listById(task.listId)?.color }"></i>{{ listById(task.listId)?.name }}</span>
                <span v-if="task.dueAt" :class="dueTone(task)"><Icon name="calendar" /> {{ formatDate(task.dueAt) }}</span>
                <span v-if="task.subtasks.length"><Icon name="check-check" /> {{ subtaskProgress(task) }}/{{ task.subtasks.length }} subtasks</span>
                <span v-if="task.reminderAt"><Icon name="bell" /> {{ task.reminderAt }}</span>
                <span v-if="task.notes.trim()" class="task-note-indicator" aria-label="Has notes" title="Has notes"><Icon name="fileText" /></span>
                <span v-if="attachmentsForTask(task.id).length" class="task-attachment-indicator" title="Attachments"><Icon name="file" /> {{ attachmentsForTask(task.id).length }}</span>
              </div></div>
              <button v-if="assigneeForTask(task.id)" class="task-assignee-button assignment-trigger" type="button" :aria-label="`Assigned to ${assigneeForTask(task.id)?.name}`" :title="`Assigned to ${assigneeForTask(task.id)?.name}`" @dragstart.stop.prevent @click.stop="openAssignmentPopover($event, task)"><span class="task-assignee-avatar" :style="{ '--member-color': assigneeForTask(task.id)?.color }">{{ assigneeForTask(task.id)?.initials }}</span></button>
              <button class="star-button" :class="{ active: task.isImportant }" type="button" aria-label="Toggle important" @click.stop="toggleImportant(task)"><Icon name="star" /></button>
              <Icon name="chevron-right" class="row-chevron" />
            </article>
            </Tooltip>
            <section v-if="activeList && focusCompletedTasks.length" class="focus-completed-section">
              <button type="button" :aria-expanded="!hiddenCompleted[activeList.id]" @click="hiddenCompleted[activeList.id] = !hiddenCompleted[activeList.id]; persistPreferences()">
                <Icon :name="hiddenCompleted[activeList.id] ? 'chevron-right' : 'chevron-down'" />
                <span>Completed</span><span class="completed-count">{{ focusCompletedTasks.length }}</span>
              </button>
              <div v-if="!hiddenCompleted[activeList.id]" class="focus-completed-list">
                <Tooltip v-for="task in focusCompletedTasks" :key="task.id" :text="activeListTaskSortMode === 'manual' ? 'Drag to reorder task' : 'Switch sorting to My order to reorder'" position="top" :delay="350" class="focus-task-tooltip">
                <article class="focus-task-row is-completed" :class="{ 'is-reorderable': activeListTaskSortMode === 'manual', 'is-task-dragging': draggedTaskId === task.id, 'is-task-drag-over': dragOverTaskId === task.id }" :draggable="activeListTaskSortMode === 'manual'" @dragstart="activeListTaskSortMode === 'manual' ? onTaskDragStart($event, task) : $event.preventDefault()" @dragend="finishTaskDrag" @dragover.prevent.stop="activeListTaskSortMode === 'manual' ? (dragOverTaskId = task.id) : undefined" @drop.prevent.stop="activeListTaskSortMode === 'manual' ? moveDraggedFocusTask(task.id) : undefined" @click="openTask(task)">
                  <button class="task-check checked" type="button" :aria-label="`Toggle ${task.title}`" @click.stop="toggleTask(task)"><Icon name="check" /></button>
                  <div class="focus-task-copy"><h3>{{ task.title }}</h3><div class="task-meta">
                    <span class="source-list"><i :style="{ background: listById(task.listId)?.color }"></i>{{ listById(task.listId)?.name }}</span>
                    <span v-if="task.dueAt" :class="dueTone(task)"><Icon name="calendar" /> {{ formatDate(task.dueAt) }}</span>
                    <span v-if="task.subtasks.length"><Icon name="check-check" /> {{ subtaskProgress(task) }}/{{ task.subtasks.length }} subtasks</span>
                    <span v-if="task.reminderAt"><Icon name="bell" /> {{ task.reminderAt }}</span>
                    <span v-if="task.notes.trim()" class="task-note-indicator" aria-label="Has notes" title="Has notes"><Icon name="fileText" /></span>
                    <span v-if="attachmentsForTask(task.id).length" class="task-attachment-indicator" title="Attachments"><Icon name="file" /> {{ attachmentsForTask(task.id).length }}</span>
                  </div></div>
                  <button v-if="assigneeForTask(task.id)" class="task-assignee-button assignment-trigger" type="button" :aria-label="`Assigned to ${assigneeForTask(task.id)?.name}`" :title="`Assigned to ${assigneeForTask(task.id)?.name}`" @dragstart.stop.prevent @click.stop="openAssignmentPopover($event, task)"><span class="task-assignee-avatar" :style="{ '--member-color': assigneeForTask(task.id)?.color }">{{ assigneeForTask(task.id)?.initials }}</span></button>
                  <button class="star-button" :class="{ active: task.isImportant }" type="button" aria-label="Toggle important" @click.stop="toggleImportant(task)"><Icon name="star" /></button>
                  <Icon name="chevron-right" class="row-chevron" />
                </article>
                </Tooltip>
              </div>
            </section>
          </div>
          <div v-else class="zero-state focus-empty"><span class="zero-illustration"><Icon name="sparkles" /></span><h2>{{ workspaceSearchQuery ? "No matching tasks" : "Nothing here yet" }}</h2><p>{{ workspaceSearchQuery ? "Try adjusting your search." : "Enjoy the calm, or add a new task when you’re ready." }}</p><button v-if="activeList" class="primary-button" type="button" @click="openComposer(activeList.id)"><Icon name="plus" /> Add first task</button></div>
        </section>
      </main>

      <div v-if="customizedList" class="list-customizer" role="dialog" :aria-label="`Customize ${customizedList.name}`" :style="{ left: `${customizePosition.x}px`, top: `${customizePosition.y}px`, '--list-color': customizedList.color }" @pointerdown.stop>
        <header>
          <div><span class="customizer-preview" :style="{ '--list-color': customizedList.color }"><Icon :name="customizedList.icon as any" /></span><div><strong>Customize list</strong><small>{{ customizedList.name }}</small></div></div>
          <button type="button" aria-label="Close customize list" @click="closeListCustomizer"><Icon name="x" /></button>
        </header>
        <section>
          <span class="customizer-label">Color</span>
          <div class="customizer-color-grid">
            <button v-for="color in listColorOptions" :key="color" type="button" :class="{ active: customizedList.color === color }" :style="{ '--swatch': color }" :aria-label="`Use color ${color}`" :aria-pressed="customizedList.color === color" @click="setListColor(color)"><Icon name="check" /></button>
          </div>
          <div class="custom-color-control">
            <button type="button" :aria-expanded="customColorExpanded" @click="customColorExpanded = !customColorExpanded"><i :style="{ background: customizedList.color }"></i><Icon name="palette" /><span>Custom color</span><Icon :name="customColorExpanded ? 'chevron-up' : 'chevron-down'" /></button>
            <input :value="customizedList.color.toUpperCase()" type="text" maxlength="7" spellcheck="false" aria-label="Custom list color hex value" @change="applyCustomListColor" @keydown.enter.prevent="applyCustomListColor" />
          </div>
          <div v-if="customColorExpanded" class="inline-color-picker">
            <div class="custom-color-plane" :style="{ '--picker-hue': `hsl(${customColorHue} 100% 50%)` }" @pointerdown.prevent="updateCustomColorPlane($event, true)" @pointermove.prevent="customColorDragging && updateCustomColorPlane($event)" @pointerup="customColorDragging = false" @pointercancel="customColorDragging = false">
              <i :style="{ left: `${customColorSaturation}%`, top: `${100 - customColorValue}%` }"></i>
            </div>
            <input class="custom-hue-slider" type="range" min="0" max="359" :value="customColorHue" aria-label="Custom color hue" @input="updateCustomColorHue" />
          </div>
        </section>
        <section>
          <span class="customizer-label">Icon</span>
          <div class="customizer-icon-grid">
            <button v-for="option in listIconOptions" :key="option.icon" type="button" :class="{ active: customizedList.icon === option.icon }" :aria-label="option.label" :title="option.label" :aria-pressed="customizedList.icon === option.icon" @click="setListIcon(option.icon)"><Icon :name="option.icon as any" /></button>
          </div>
        </section>
      </div>

      <div v-if="assignmentTask && assignmentList" class="assignment-popover" role="dialog" aria-label="Assign task" :style="{ left: `${assignmentPosition.x}px`, top: `${assignmentPosition.y}px` }" @pointerdown.stop>
        <header><div><strong>Assign to</strong><small>{{ assignmentList.name }}</small></div><button type="button" aria-label="Close assignment" @click="closeAssignmentPopover"><Icon name="x" /></button></header>
        <template v-if="assignmentListIsShared">
          <section class="assignment-member-section">
            <span class="assignment-eyebrow">List members</span>
            <button type="button" class="assignment-member-option unassigned-option" :class="{ active: !taskAssignees[assignmentTask.id] }" @click="setTaskAssignee(null)"><span class="unassigned-avatar"><Icon name="user" /></span><span>Unassigned</span><Icon v-if="!taskAssignees[assignmentTask.id]" name="check" /></button>
            <button v-for="member in assignmentMembers" :key="member.id" type="button" class="assignment-member-option" :class="{ active: taskAssignees[assignmentTask.id] === member.id }" @click="setTaskAssignee(member.id)">
              <span class="member-avatar" :style="{ '--member-color': member.color }">{{ member.initials }}</span><span><strong>{{ member.name }}</strong><small v-if="member.id === currentMemberId">Assign to me</small></span><Icon v-if="taskAssignees[assignmentTask.id] === member.id" name="check" />
            </button>
          </section>
          <section class="assignment-invite-section">
            <span class="assignment-eyebrow">Invite another person</span>
            <p>New people must join this list before they can be assigned.</p>
            <div v-if="shareTokens[assignmentList.id]" class="assignment-link"><input :value="invitationLink(assignmentList.id)" readonly tabindex="-1" /><button type="button" @click="copyListInvitationLink(assignmentList.id)"><Icon :name="copiedInviteLink ? 'check' : 'fileText'" />{{ copiedInviteLink ? 'Copied' : 'Copy link' }}</button></div>
            <button v-else type="button" class="assignment-create-link" @click="generateInviteLink(assignmentList.id)"><Icon name="users" /> Create invitation link</button>
          </section>
        </template>
        <section v-else class="assignment-share-empty"><span><Icon name="users" /></span><h3>Share this list first</h3><p>Create an invitation link so other people can join before you assign tasks to them.</p><button type="button" class="primary-button" @click="generateInviteLink(assignmentList.id)">Create invitation link</button></section>
        <footer><button type="button" @click="openShareList(assignmentList.id)"><Icon name="users" /> Manage members</button><button type="button" @click="closeAssignmentPopover">Close</button></footer>
      </div>

      <Transition name="fade">
        <button v-if="selectedTask" type="button" class="drawer-backdrop" aria-label="Close task details" @click="selectedTaskId = null"></button>
      </Transition>
      <Transition name="drawer">
        <aside v-if="selectedTask" class="task-detail-drawer" :class="{ 'is-resizing': drawerResizing }" :style="{ '--drawer-width': `${drawerWidth}px` }" aria-label="Task details">
          <div class="drawer-resize-handle" role="separator" aria-label="Resize task details" aria-orientation="vertical" :aria-valuenow="drawerWidth" aria-valuemin="380" aria-valuemax="720" tabindex="0" title="Drag to resize · Double-click to reset" @pointerdown="startDrawerResize" @keydown="resizeDrawerWithKeyboard" @dblclick="resetDrawerWidth"><span></span></div>
          <header class="drawer-header"><div><span :style="{ background: selectedList?.color }"></span>{{ selectedList?.name }}</div><div><small>{{ savingState === 'saving' ? 'Saving…' : 'All changes saved' }}</small><button class="icon-button" type="button" aria-label="Close details" title="Close details" @click="selectedTaskId = null"><Icon name="x" /></button></div></header>
          <div class="drawer-body">
            <div class="drawer-title-row"><button class="task-check large-check" :class="{ checked: selectedTask.isCompleted }" type="button" aria-label="Toggle task completion" @click="toggleTask(selectedTask)"><Icon name="check" /></button><textarea v-model="selectedTask.title" rows="2" aria-label="Task title"></textarea><button class="star-button large-star" :class="{ active: selectedTask.isImportant }" type="button" aria-label="Toggle important" @click="toggleImportant(selectedTask)"><Icon name="star" /></button></div>

            <section class="drawer-section"><h3>Task details</h3>
              <label class="detail-field"><span><Icon name="layout-list" /> List</span><select v-model="selectedTask.listId"><option v-for="list in lists" :key="list.id" :value="list.id">{{ list.name }}</option></select></label>
              <div class="detail-field assignment-field">
                <span><Icon name="user" /> Assign to</span>
                <div class="assignment-value">
                  <button type="button" class="assignment-summary assignment-trigger" aria-label="Choose assignee" @click="openAssignmentPopover($event, selectedTask)">
                    <span v-if="assigneeForTask(selectedTask.id)" class="task-assignee-avatar" :style="{ '--member-color': assigneeForTask(selectedTask.id)?.color }">{{ assigneeForTask(selectedTask.id)?.initials }}</span>
                    <span>{{ assigneeForTask(selectedTask.id)?.name ?? (membersForList(selectedTask.listId).length > 1 || shareTokens[selectedTask.listId] ? 'Choose assignee' : 'Share list first') }}</span>
                  </button>
                  <button v-if="assigneeForTask(selectedTask.id)" type="button" class="clear-assignee" aria-label="Remove assignee" title="Unassign" @click.stop="setTaskAssignee(null)"><Icon name="x" /></button>
                </div>
              </div>
              <label class="detail-field"><span><Icon name="calendar" /> Due date</span><input v-model="selectedTask.dueAt" type="date" /></label>
              <label class="detail-field"><span><Icon name="bell" /> Reminder</span><input v-model="selectedTask.reminderAt" type="time" /></label>
              <label class="detail-field"><span><Icon name="repeat" /> Repeat</span><select v-model="selectedTask.recurrenceRule"><option :value="null">Does not repeat</option><option>Every day</option><option>Every week</option><option>Every month</option></select></label>
            </section>

            <section class="drawer-section"><div class="section-title"><h3>Subtasks</h3><span>{{ subtaskProgress(selectedTask) }}/{{ selectedTask.subtasks.length }}</span></div>
              <div class="subtask-list"><div v-for="(subtask, index) in selectedTask.subtasks" :key="subtask.id" class="subtask-row"><button class="task-check mini-check" :class="{ checked: subtask.isCompleted }" type="button" aria-label="Toggle subtask" @click="subtask.isCompleted = !subtask.isCompleted"><Icon name="check" /></button><input v-model="subtask.title" :class="{ done: subtask.isCompleted }" aria-label="Subtask title" /><div class="subtask-actions"><button type="button" :disabled="index === 0" aria-label="Move subtask up" title="Move up" @click="moveSubtask(index, -1)"><Icon name="chevron-up" /></button><button type="button" :disabled="index === selectedTask.subtasks.length - 1" aria-label="Move subtask down" title="Move down" @click="moveSubtask(index, 1)"><Icon name="chevron-down" /></button><button type="button" aria-label="Delete subtask" title="Delete subtask" @click="selectedTask.subtasks.splice(index, 1)"><Icon name="x" /></button></div></div></div>
              <button v-if="!subtaskComposerOpen" class="subtask-add-trigger" type="button" @click="openSubtaskComposer"><Icon name="plus" /> Add a subtask</button>
              <form v-else class="subtask-composer" @submit.prevent="addSubtask"><Icon name="plus" /><input v-model="newSubtask" placeholder="Subtask name" aria-label="New subtask title" @keydown.esc.prevent="cancelSubtaskComposer" /><button type="submit" :disabled="!newSubtask.trim()">Add</button></form>
            </section>

            <section class="drawer-section attachment-section">
              <div class="section-title"><h3>Attachments</h3><span>{{ attachmentsForTask(selectedTask.id).length }}</span></div>
              <div v-if="attachmentsForTask(selectedTask.id).length" class="attachment-list">
                <div v-for="attachment in attachmentsForTask(selectedTask.id)" :key="attachment.id" class="attachment-row">
                  <span class="attachment-icon"><Icon name="file" /></span>
                  <div><strong>{{ attachment.name }}</strong><small>{{ formatFileSize(attachment.size) }} · Added just now</small></div>
                  <button type="button" :aria-label="`Remove ${attachment.name}`" title="Remove file" @click="removeTaskFile(selectedTask.id, attachment.id)"><Icon name="x" /></button>
                </div>
              </div>
              <label class="attachment-upload"><Icon name="upload" /><span>Add file</span><input type="file" multiple @change="addTaskFiles" /></label>
            </section>

            <section class="drawer-section"><h3>Notes</h3><textarea v-model="selectedTask.notes" class="notes-input" rows="6" placeholder="Add notes, links, or context…"></textarea></section>
          </div>
          <footer class="drawer-footer"><span>Created {{ formatDate(selectedTask.createdAt.slice(0, 10)) }}</span><button type="button" @click="deleteSelectedTask"><Icon name="trash" /> Delete task</button></footer>
        </aside>
      </Transition>
    </section>

    <div v-if="shareDialogList" class="modal-backdrop" @click.self="closeShareDialog">
      <section class="share-dialog" role="dialog" aria-modal="true" aria-labelledby="share-list-title">
        <template v-if="!joinPreviewOpen">
          <header>
            <div class="share-dialog-heading"><span class="share-list-icon" :style="{ '--list-color': shareDialogList.color }"><Icon :name="shareDialogList.icon as any" /></span><div><h2 id="share-list-title">Share “{{ shareDialogList.name }}”</h2><p>Anyone who joins can view and update tasks in this list.</p></div></div>
            <button class="icon-button" type="button" aria-label="Close share dialog" @click="closeShareDialog"><Icon name="x" /></button>
          </header>
          <div class="share-dialog-body">
            <section class="share-members-section">
              <div class="share-section-title"><strong>List members</strong><span>{{ shareDialogMembers.length }}</span></div>
              <div class="share-member-list">
                <div v-for="member in shareDialogMembers" :key="member.id" class="share-member-row">
                  <span class="member-avatar" :style="{ '--member-color': member.color }">{{ member.initials }}</span>
                  <div><strong>{{ member.name }} <small v-if="member.id === currentMemberId">(You)</small></strong><span>{{ member.email }}</span></div>
                  <em>{{ member.id === currentMemberId ? 'Owner' : 'Member' }}</em>
                  <button v-if="member.id !== currentMemberId" type="button" :aria-label="`Remove ${member.name}`" title="Remove member" @click="removeListMember(member.id)"><Icon name="x" /></button>
                </div>
              </div>
            </section>
            <section class="invite-link-section">
              <div class="share-section-title"><strong>Invitation link</strong><span>{{ shareTokens[shareDialogList.id] ? 'Active' : 'Not created' }}</span></div>
              <p>People will be asked to sign in and confirm before joining this list.</p>
              <div v-if="shareTokens[shareDialogList.id]" class="invite-link-field"><input :value="invitationLink(shareDialogList.id)" readonly aria-label="Invitation link" /><button type="button" @click="copyInvitationLink"><Icon :name="copiedInviteLink ? 'check' : 'fileText'" /> {{ copiedInviteLink ? 'Copied' : 'Copy' }}</button></div>
              <button v-else class="primary-button create-invite-button" type="button" @click="generateInviteLink()"><Icon name="users" /> Create invitation link</button>
              <div v-if="shareTokens[shareDialogList.id]" class="invite-link-actions"><button type="button" @click="generateInviteLink()">Generate new link</button><button v-if="previewJoinMember" type="button" @click="joinPreviewOpen = true">Preview join flow</button><button class="danger-text" type="button" @click="revokeInviteLink">Disable link</button></div>
            </section>
          </div>
          <footer><span><Icon name="shield" /> Owner controls the invitation link and members.</span><button class="primary-button" type="button" @click="closeShareDialog">Done</button></footer>
        </template>
        <template v-else>
          <header><div class="share-dialog-heading"><span class="share-list-icon" :style="{ '--list-color': shareDialogList.color }"><Icon name="users" /></span><div><h2 id="share-list-title">Join “{{ shareDialogList.name }}”?</h2><p>Invitation preview as another signed-in user.</p></div></div><button class="icon-button" type="button" aria-label="Back to sharing" @click="joinPreviewOpen = false"><Icon name="x" /></button></header>
          <div class="join-confirmation">
            <span v-if="previewJoinMember" class="member-avatar large" :style="{ '--member-color': previewJoinMember.color }">{{ previewJoinMember.initials }}</span>
            <h3>{{ previewJoinMember?.name }}</h3><p>You’ll be able to view, add, edit, complete, and assign tasks in this list.</p>
            <div><button class="secondary-button" type="button" @click="joinPreviewOpen = false">Cancel</button><button class="primary-button" type="button" @click="confirmPreviewJoin">Join list</button></div>
          </div>
        </template>
      </section>
    </div>

    <div v-if="manageVisibleOpen" class="modal-backdrop" @click.self="manageVisibleOpen = false">
      <section class="manage-dialog" role="dialog" aria-modal="true" aria-labelledby="manage-lists-title">
        <header><div><span><Icon name="eye" /></span><div><h2 id="manage-lists-title">Manage visible lists</h2><p>Choose which list columns appear in All Tasks.</p></div></div><button class="icon-button" type="button" aria-label="Close dialog" @click="manageVisibleOpen = false"><Icon name="x" /></button></header>
        <div class="manage-quick-actions"><div><strong>All lists</strong><small>{{ manageDraftIds.length }} of {{ lists.length }} visible</small></div><input class="checkbox checkbox-sm checkbox-primary manage-visibility-checkbox" type="checkbox" :checked="manageAllChecked" :indeterminate.prop="manageAllIndeterminate" aria-label="Toggle all lists" @change="toggleManageAll" /></div>
        <div class="manage-list-groups">
          <section v-for="group in groups" :key="group.id" class="manage-group">
            <header class="manage-group-header"><button type="button" :aria-expanded="manageExpandedGroups[group.id]" @click="manageExpandedGroups[group.id] = !manageExpandedGroups[group.id]"><Icon :name="manageExpandedGroups[group.id] ? 'chevron-down' : 'chevron-right'" /><Icon name="layout-panel-left" /><span>{{ group.name }}</span><small>{{ groupLists(group.id).length }} lists</small></button><input class="checkbox checkbox-sm checkbox-primary manage-visibility-checkbox" type="checkbox" :checked="manageGroupState(group.id).checked" :indeterminate.prop="manageGroupState(group.id).indeterminate" :aria-label="`Toggle all lists in ${group.name}`" @change="toggleManageGroup(group.id)" /></header>
            <div v-if="manageExpandedGroups[group.id]" class="manage-group-lists"><div v-for="list in groupLists(group.id)" :key="list.id" class="manage-list-row"><span class="list-dot" :style="{ background: list.color }"></span><div><strong>{{ list.name }}</strong><small>{{ listOpenCount(list.id) }} open tasks</small></div><input class="checkbox checkbox-sm checkbox-primary manage-visibility-checkbox" type="checkbox" :checked="manageDraftIds.includes(list.id)" :aria-label="`Toggle ${list.name}`" @change="toggleDraftVisibility(list.id)" /></div></div>
          </section>
          <section v-if="ungroupedLists.length" class="manage-group">
            <header class="manage-group-header"><button type="button" :aria-expanded="manageExpandedGroups.__ungrouped" @click="manageExpandedGroups.__ungrouped = !manageExpandedGroups.__ungrouped"><Icon :name="manageExpandedGroups.__ungrouped ? 'chevron-down' : 'chevron-right'" /><Icon name="layout-list" /><span>Ungrouped</span><small>{{ ungroupedLists.length }} lists</small></button><input class="checkbox checkbox-sm checkbox-primary manage-visibility-checkbox" type="checkbox" :checked="manageGroupState(null).checked" :indeterminate.prop="manageGroupState(null).indeterminate" aria-label="Toggle all ungrouped lists" @change="toggleManageGroup(null)" /></header>
            <div v-if="manageExpandedGroups.__ungrouped" class="manage-group-lists"><div v-for="list in ungroupedLists" :key="list.id" class="manage-list-row"><span class="list-dot" :style="{ background: list.color }"></span><div><strong>{{ list.name }}</strong><small>{{ listOpenCount(list.id) }} open tasks</small></div><input class="checkbox checkbox-sm checkbox-primary manage-visibility-checkbox" type="checkbox" :checked="manageDraftIds.includes(list.id)" :aria-label="`Toggle ${list.name}`" @change="toggleDraftVisibility(list.id)" /></div></div>
          </section>
        </div>
        <footer><button class="secondary-button" type="button" @click="manageVisibleOpen = false">Cancel</button><button class="primary-button" type="button" @click="applyVisibleLists">Apply changes</button></footer>
      </section>
    </div>

    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
  </div>
</template>

<style scoped>
.task-manager-page { --tm-primary:var(--color-primary); --tm-primary-content:var(--color-primary-content); --tm-link:var(--color-link); --tm-accent:var(--color-primary); --tm-accent-soft:color-mix(in oklch,var(--color-primary),transparent 90%); --tm-bg:var(--color-base-200); --tm-surface:var(--color-base-100); --tm-surface-2:var(--color-base-200); --tm-border:var(--color-base-300); --tm-text:var(--color-base-content); --tm-muted:color-mix(in oklch,var(--color-base-content),transparent 42%); --tm-sidebar:var(--color-layout-sidebar-bg); --tm-danger:var(--color-error); --tm-danger-content:var(--color-error-content); --tm-warning:var(--color-warning); --tm-success:var(--color-success); --tm-info:var(--color-info); --tm-shadow-color:color-mix(in oklch,var(--color-base-content),transparent 88%); --tm-overlay:color-mix(in oklch,var(--color-neutral),transparent 54%); width:100%; height:100dvh; overflow:hidden; background:var(--tm-bg); color:var(--tm-text); font-family:var(--font-sans); font-size:var(--font-size-sm); }
button,input,select,textarea { font:inherit; }
button { color:inherit; }
.task-app-shell { position:relative; display:grid; grid-template-columns:248px minmax(0,1fr); width:100%; height:100dvh; min-height:0; overflow:hidden; background:var(--tm-bg); }
.task-sidebar { z-index:20; display:flex; min-height:0; flex-direction:column; padding:18px 14px 14px; border-right:1px solid var(--tm-border); background:var(--tm-sidebar); }
.workspace-brand,.sidebar-profile { display:flex; align-items:center; gap:10px; }
.workspace-brand { padding:0 6px 18px; }.workspace-brand>div,.sidebar-profile>div { min-width:0; flex:1; }.workspace-brand strong,.sidebar-profile strong { display:block; font-weight:750; }.workspace-brand small,.sidebar-profile small { display:block; margin-top:2px; color:var(--tm-muted); font-size:11px; }
.brand-mark { display:grid; width:34px; height:34px; place-items:center; border-radius:10px; color:white; background:linear-gradient(145deg,#617cf2,#7658da); box-shadow:0 7px 16px rgba(86,115,238,.25); }.brand-mark :deep(svg){width:18px;height:18px}.avatar { display:grid; width:34px; height:34px; place-items:center; border-radius:50%; color:#365ed1; background:#dfe7ff; font-size:11px; font-weight:800; }
.sidebar-search { display:flex; align-items:center; gap:8px; height:38px; margin-bottom:18px; padding:0 10px; border:1px solid var(--tm-border); border-radius:9px; background:var(--tm-surface); color:var(--tm-muted); }.sidebar-search :deep(svg){width:16px;height:16px}.sidebar-search input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--tm-text)}.sidebar-search kbd{padding:1px 5px;border:1px solid var(--tm-border);border-radius:4px;background:var(--tm-surface-2);font-size:10px}
.task-sidebar nav { min-height:0; flex:1; overflow-y:auto; }.nav-eyebrow { margin:0 8px 7px; color:var(--tm-muted); font-size:10px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }.nav-row { position:relative; display:flex; width:100%; min-height:38px; align-items:center; gap:10px; padding:8px 9px; border:0; border-radius:8px; background:transparent; color:var(--tm-muted); text-align:left; cursor:pointer; }.nav-row:hover{background:var(--tm-surface-2);color:var(--tm-text)}.nav-row.active{background:var(--tm-accent-soft);color:var(--tm-accent);font-weight:700}.nav-row :deep(svg){width:17px;height:17px;flex:none}.nav-row span:nth-child(2){min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nav-row b{font-size:10px;font-weight:700}.nav-section-heading{display:flex;align-items:center;justify-content:space-between;margin-top:19px}.group-block{position:relative;margin-bottom:2px}.group-row{position:relative;display:flex;align-items:center}.group-toggle{display:flex;min-width:0;flex:1;align-items:center;gap:7px;padding:7px 8px;border:0;background:transparent;font-size:12px;font-weight:700;cursor:pointer}.group-toggle :deep(svg){width:14px;height:14px;transition:transform .18s}.rotated{transform:rotate(90deg)}.group-lists{padding-left:13px}.list-nav{padding-right:30px}.list-dot{width:8px;height:8px;flex:none;border-radius:50%}.list-nav-wrap{position:relative}.row-menu-trigger{opacity:0}.group-row:hover>.row-menu-trigger,.list-nav-wrap:hover>.row-menu-trigger{opacity:1}.list-menu{position:absolute;right:4px;top:5px}.sidebar-create{display:flex;width:100%;align-items:center;gap:8px;margin-top:10px;padding:9px;border:1px dashed var(--tm-border);border-radius:8px;background:transparent;color:var(--tm-muted);font-size:12px;cursor:pointer}.sidebar-create:hover{border-color:var(--tm-accent);color:var(--tm-accent)}.sidebar-create :deep(svg){width:15px;height:15px}.sidebar-profile{margin-top:12px;padding:13px 7px 0;border-top:1px solid var(--tm-border)}
.icon-button{display:inline-grid;width:34px;height:34px;flex:none;place-items:center;border:0;border-radius:8px;background:transparent;color:var(--tm-muted);cursor:pointer}.icon-button:hover{background:var(--tm-surface-2);color:var(--tm-text)}.icon-button :deep(svg){width:17px;height:17px}.icon-button.compact{width:28px;height:28px}.icon-button.compact :deep(svg){width:14px;height:14px}.icon-button.large{width:40px;height:40px;border:1px solid var(--tm-border);background:var(--tm-surface)}
.context-menu{position:absolute;z-index:80;top:32px;right:0;min-width:166px;padding:5px;border:1px solid var(--tm-border);border-radius:10px;background:var(--tm-surface);box-shadow:0 14px 35px rgba(18,24,40,.16)}.context-menu button{display:flex;width:100%;align-items:center;gap:9px;padding:8px;border:0;border-radius:7px;background:transparent;text-align:left;font-size:12px;cursor:pointer}.context-menu button:hover{background:var(--tm-surface-2)}.context-menu button.danger{color:#d84d5f}.context-menu :deep(svg){width:14px;height:14px}.list-context{top:34px;right:4px}.menu-anchor{position:relative}.top-context{top:45px;right:0;min-width:200px}
.task-main{display:flex;min-width:0;min-height:0;flex-direction:column;overflow:hidden}.view-header{display:flex;min-height:86px;align-items:center;justify-content:space-between;gap:18px;padding:17px 24px;border-bottom:1px solid var(--tm-border);background:color-mix(in srgb,var(--tm-surface) 92%,transparent)}.header-title-wrap,.title-line,.header-actions{display:flex;align-items:center}.header-title-wrap{min-width:0;gap:10px}.title-line{gap:9px}.title-line h1{margin:0;font-size:23px;line-height:1.2;font-weight:780;letter-spacing:-.025em}.header-title-wrap p{margin:4px 0 0;color:var(--tm-muted);font-size:12px}.title-list-dot{width:10px;height:10px;border-radius:50%}.header-actions{gap:8px}.primary-button,.secondary-button{display:inline-flex;min-height:40px;align-items:center;justify-content:center;gap:8px;padding:0 15px;border-radius:9px;font-weight:700;cursor:pointer}.primary-button{border:1px solid var(--tm-accent);background:var(--tm-accent);color:#fff;box-shadow:0 6px 15px color-mix(in srgb,var(--tm-accent) 24%,transparent)}.primary-button:hover{filter:brightness(1.05)}.secondary-button{border:1px solid var(--tm-border);background:var(--tm-surface);color:var(--tm-muted)}.primary-button :deep(svg),.secondary-button :deep(svg){width:16px;height:16px}.search-result-banner{display:flex;align-items:center;gap:8px;padding:9px 24px;border-bottom:1px solid var(--tm-border);background:var(--tm-accent-soft);color:var(--tm-muted);font-size:12px}.search-result-banner :deep(svg){width:15px;height:15px}.search-result-banner span{flex:1}.search-result-banner button{border:0;background:transparent;color:var(--tm-accent);font-weight:700;cursor:pointer}
.all-tasks-view,.focus-view{min-height:0;flex:1;overflow:auto}.list-columns{display:flex;min-width:max-content;height:100%;align-items:flex-start;gap:16px;padding:20px}.list-column{display:flex;width:310px;max-height:100%;flex-direction:column;padding:14px;border:1px solid var(--tm-border);border-radius:13px;background:var(--tm-surface);box-shadow:0 4px 12px rgba(24,30,50,.035)}.column-header{display:flex;align-items:center;justify-content:space-between;padding:1px 0 13px}.column-identity{display:flex;min-width:0;align-items:center;gap:10px}.list-icon{display:grid;width:34px;height:34px;place-items:center;border-radius:9px;color:var(--list-color);background:color-mix(in srgb,var(--list-color) 13%,var(--tm-surface))}.list-icon :deep(svg){width:17px;height:17px}.column-header h2{margin:0;font-size:14px;font-weight:760}.column-header p{margin:3px 0 0;color:var(--tm-muted);font-size:10px}.add-inline{display:flex;width:100%;align-items:center;gap:8px;padding:9px;border:1px dashed var(--tm-border);border-radius:8px;background:var(--tm-surface-2);color:var(--tm-muted);font-size:12px;cursor:pointer}.add-inline:hover{border-color:var(--tm-accent);color:var(--tm-accent)}.add-inline :deep(svg){width:14px;height:14px}.task-composer{display:flex;align-items:center;gap:8px;padding:7px 8px;border:1px solid var(--tm-accent);border-radius:9px;background:var(--tm-surface);box-shadow:0 0 0 3px color-mix(in srgb,var(--tm-accent) 10%,transparent)}.task-composer input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--tm-text)}.task-composer button{display:grid;width:28px;height:28px;place-items:center;border:0;border-radius:7px;background:var(--tm-accent);color:white}.task-composer button:disabled{opacity:.4}.empty-check{width:16px;height:16px;flex:none;border:1.5px solid #aeb5c3;border-radius:50%}.task-stack{min-height:0;margin-top:10px;overflow-y:auto}.task-card{display:flex;align-items:flex-start;gap:9px;margin-bottom:7px;padding:11px 9px;border:1px solid var(--tm-border);border-radius:9px;background:var(--tm-surface);cursor:pointer;transition:border-color .15s,box-shadow .15s,transform .15s}.task-card:hover{transform:translateY(-1px);border-color:color-mix(in srgb,var(--tm-accent) 38%,var(--tm-border));box-shadow:0 7px 17px rgba(26,32,55,.07)}.task-check{display:grid;width:19px;height:19px;flex:none;place-items:center;margin-top:1px;border:1.5px solid #aeb5c3;border-radius:50%;background:transparent;color:transparent;cursor:pointer}.task-check:hover{border-color:var(--tm-accent);color:var(--tm-accent-soft)}.task-check :deep(svg){width:12px;height:12px}.task-check.checked,.is-completed .task-check{border-color:var(--tm-accent);background:var(--tm-accent);color:white}.task-copy{min-width:0;flex:1}.task-copy h3,.focus-task-copy h3{margin:0;color:var(--tm-text);font-size:12px;font-weight:650;line-height:1.35}.task-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px;color:var(--tm-muted);font-size:10px}.task-meta span{display:inline-flex;align-items:center;gap:3px}.task-meta :deep(svg){width:11px;height:11px}.task-meta .is-overdue{color:#e25060}.task-meta .is-today{color:#d7832f}.star-button{display:grid;width:25px;height:25px;flex:none;place-items:center;border:0;background:transparent;color:#b6bdca;cursor:pointer}.star-button :deep(svg){width:15px;height:15px}.star-button.active{color:#e0a32e}.star-button.active :deep(svg){fill:currentColor}.task-card.is-completed h3,.focus-task-row.is-completed h3{text-decoration:line-through;color:var(--tm-muted)}.column-empty{padding:28px 12px;text-align:center}.column-empty span{display:grid;width:36px;height:36px;margin:0 auto 8px;place-items:center;border-radius:50%;background:var(--tm-surface-2);color:var(--tm-muted)}.column-empty span :deep(svg){width:18px;height:18px}.column-empty h3{margin:0;font-size:12px}.column-empty p{margin:4px 0 0;color:var(--tm-muted);font-size:10px}.completed-section{padding-top:10px;border-top:1px solid var(--tm-border)}.completed-section>button{display:flex;width:100%;align-items:center;gap:6px;padding:4px;border:0;background:transparent;color:var(--tm-muted);font-size:10px;font-weight:700;cursor:pointer}.completed-section>button :deep(svg){width:12px;height:12px;transition:transform .18s}.completed-section>button span{margin-left:auto}.completed-stack{max-height:145px}.zero-state{display:flex;min-height:100%;flex-direction:column;align-items:center;justify-content:center;padding:36px;text-align:center}.zero-illustration{display:grid;width:64px;height:64px;place-items:center;margin-bottom:16px;border-radius:18px;background:var(--tm-accent-soft);color:var(--tm-accent)}.zero-illustration :deep(svg){width:28px;height:28px}.zero-state h2{margin:0;font-size:18px}.zero-state p{max-width:380px;margin:7px 0 20px;color:var(--tm-muted);line-height:1.55}
.focus-view{padding:22px 24px}.list-progress-card{max-width:860px;margin:0 auto 16px;padding:14px 16px;border:1px solid var(--tm-border);border-radius:12px;background:var(--tm-surface)}.list-progress-card>div:first-child{display:flex;align-items:center;gap:11px}.list-progress-card>div:first-child>span{display:grid;width:36px;height:36px;place-items:center;border-radius:9px;color:white}.list-progress-card :deep(svg){width:17px;height:17px}.list-progress-card strong,.list-progress-card small{display:block}.list-progress-card small{margin-top:3px;color:var(--tm-muted);font-size:11px}.progress-track{height:5px;margin-top:12px;overflow:hidden;border-radius:6px;background:var(--tm-surface-2)}.progress-track i{display:block;height:100%;border-radius:inherit}.focus-composer{display:flex;max-width:860px;align-items:center;gap:10px;margin:0 auto 14px;padding:11px 12px;border:1px solid var(--tm-accent);border-radius:11px;background:var(--tm-surface);box-shadow:0 0 0 3px color-mix(in srgb,var(--tm-accent) 9%,transparent)}.focus-composer input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--tm-text)}.composer-hint{color:var(--tm-muted);font-size:10px}.focus-task-list{max-width:860px;margin:0 auto;border:1px solid var(--tm-border);border-radius:12px;background:var(--tm-surface);overflow:hidden}.focus-task-row{display:flex;align-items:center;gap:11px;padding:14px 15px;border-bottom:1px solid var(--tm-border);cursor:pointer}.focus-task-row:last-child{border-bottom:0}.focus-task-row:hover{background:var(--tm-surface-2)}.focus-task-copy{min-width:0;flex:1}.focus-task-copy h3{font-size:13px}.source-list i{width:6px;height:6px;border-radius:50%}.row-chevron{width:15px;height:15px;color:var(--tm-muted)}.focus-empty{min-height:420px}
.task-detail-drawer{position:absolute;z-index:40;top:0;right:0;display:flex;width:390px;height:100%;flex-direction:column;border-left:1px solid var(--tm-border);background:var(--tm-surface);box-shadow:-16px 0 36px rgba(20,25,43,.12)}.drawer-header{display:flex;min-height:60px;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--tm-border)}.drawer-header>div{display:flex;align-items:center;gap:7px;color:var(--tm-muted);font-size:11px;font-weight:700}.drawer-header>div:first-child>span{width:7px;height:7px;border-radius:50%}.drawer-header small{font-weight:500}.drawer-body{min-height:0;flex:1;overflow-y:auto;padding:20px}.drawer-title-row{display:flex;align-items:flex-start;gap:10px}.large-check{width:23px;height:23px;margin-top:5px}.drawer-title-row textarea{min-width:0;flex:1;resize:none;border:0;outline:0;background:transparent;color:var(--tm-text);font-size:19px;font-weight:750;line-height:1.35}.large-star{width:32px;height:32px}.large-star :deep(svg){width:19px;height:19px}.drawer-section{margin-top:23px;padding-top:18px;border-top:1px solid var(--tm-border)}.drawer-section>h3,.section-title h3{margin:0 0 10px;color:var(--tm-muted);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.detail-field{display:flex;min-height:42px;align-items:center;justify-content:space-between;gap:14px;border-bottom:1px solid var(--tm-border)}.detail-field>span{display:flex;align-items:center;gap:9px;color:var(--tm-muted);font-size:12px}.detail-field>span :deep(svg){width:15px;height:15px}.detail-field input,.detail-field select{max-width:190px;border:0;outline:0;background:transparent;color:var(--tm-text);font-size:12px;text-align:right}.section-title{display:flex;align-items:center;justify-content:space-between}.section-title span{color:var(--tm-muted);font-size:10px}.subtask-row{display:flex;align-items:center;gap:7px;min-height:36px}.mini-check{width:17px;height:17px}.subtask-row>input{min-width:0;flex:1;padding:5px;border:0;border-bottom:1px solid transparent;outline:0;background:transparent;color:var(--tm-text);font-size:12px}.subtask-row>input:focus{border-color:var(--tm-accent)}.subtask-row>input.done{text-decoration:line-through;color:var(--tm-muted)}.subtask-actions{display:flex;opacity:0}.subtask-row:hover .subtask-actions{opacity:1}.subtask-actions button{display:grid;width:23px;height:23px;place-items:center;border:0;background:transparent;color:var(--tm-muted);cursor:pointer}.subtask-actions button:disabled{opacity:.25}.subtask-actions :deep(svg){width:12px;height:12px}.subtask-composer{display:flex;align-items:center;gap:8px;margin-top:7px;padding:8px;border:1px dashed var(--tm-border);border-radius:8px;color:var(--tm-muted)}.subtask-composer :deep(svg){width:14px;height:14px}.subtask-composer input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--tm-text)}.subtask-composer button{border:0;background:transparent;color:var(--tm-accent);font-size:11px;font-weight:700}.subtask-composer button:disabled{opacity:.4}.notes-input{width:100%;padding:11px;border:1px solid var(--tm-border);border-radius:9px;outline:0;resize:vertical;background:var(--tm-surface-2);color:var(--tm-text);font-size:12px;line-height:1.55}.notes-input:focus{border-color:var(--tm-accent)}.drawer-footer{display:flex;min-height:54px;align-items:center;justify-content:space-between;padding:0 17px;border-top:1px solid var(--tm-border);color:var(--tm-muted);font-size:10px}.drawer-footer button{display:flex;align-items:center;gap:6px;border:0;background:transparent;color:#d84d5f;font-size:11px;font-weight:700;cursor:pointer}.drawer-footer button :deep(svg){width:14px;height:14px}.drawer-enter-active,.drawer-leave-active{transition:transform .22s ease,opacity .22s}.drawer-enter-from,.drawer-leave-to{transform:translateX(100%);opacity:.5}
.modal-backdrop,.mobile-backdrop{position:fixed;inset:0;background:rgba(12,16,28,.45);backdrop-filter:blur(2px)}.modal-backdrop{z-index:100;display:grid;place-items:center;padding:20px}.manage-dialog{display:flex;width:min(540px,100%);max-height:min(720px,90dvh);flex-direction:column;overflow:hidden;border:1px solid var(--tm-border);border-radius:16px;background:var(--tm-surface);box-shadow:0 25px 70px rgba(10,14,28,.25)}.manage-dialog>header{display:flex;align-items:flex-start;justify-content:space-between;padding:20px;border-bottom:1px solid var(--tm-border)}.manage-dialog>header>div{display:flex;gap:12px}.manage-dialog>header>div>span{display:grid;width:38px;height:38px;place-items:center;border-radius:10px;background:var(--tm-accent-soft);color:var(--tm-accent)}.manage-dialog>header>div>span :deep(svg){width:19px;height:19px}.manage-dialog h2{margin:0;font-size:17px}.manage-dialog header p{margin:4px 0 0;color:var(--tm-muted);font-size:11px}.manage-quick-actions{display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--tm-border)}.manage-quick-actions button{padding:5px 9px;border:1px solid var(--tm-border);border-radius:7px;background:var(--tm-surface-2);color:var(--tm-muted);font-size:10px;cursor:pointer}.manage-quick-actions span{margin-left:auto;color:var(--tm-muted);font-size:10px}.manage-list-groups{overflow-y:auto;padding:6px 20px 16px}.manage-list-groups h3{margin:16px 0 6px;color:var(--tm-muted);font-size:10px;letter-spacing:.08em;text-transform:uppercase}.manage-list-row{display:flex;min-height:52px;align-items:center;gap:10px;padding:7px 4px;border-bottom:1px solid var(--tm-border)}.visibility-check{display:grid;width:20px;height:20px;place-items:center;border:1.5px solid #abb3c2;border-radius:6px;background:transparent;color:transparent;cursor:pointer}.visibility-check.checked{border-color:var(--tm-accent);background:var(--tm-accent);color:#fff}.visibility-check :deep(svg){width:13px;height:13px}.manage-list-row>div:nth-of-type(1){min-width:0;flex:1}.manage-list-row strong,.manage-list-row small{display:block}.manage-list-row strong{font-size:12px}.manage-list-row small{margin-top:2px;color:var(--tm-muted);font-size:10px}.order-badge{padding:2px 6px;border-radius:5px;background:var(--tm-accent-soft);color:var(--tm-accent);font-size:9px;font-weight:800}.reorder-buttons{display:flex}.reorder-buttons button{display:grid;width:27px;height:27px;place-items:center;border:0;background:transparent;color:var(--tm-muted);cursor:pointer}.reorder-buttons button:disabled{opacity:.22}.reorder-buttons :deep(svg){width:13px;height:13px}.manage-dialog>footer{display:flex;justify-content:flex-end;gap:8px;padding:14px 20px;border-top:1px solid var(--tm-border)}
.mobile-only{display:none}.mobile-backdrop{z-index:18}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media (max-width:1023px){.task-app-shell{grid-template-columns:218px minmax(0,1fr)}.task-sidebar{padding-inline:10px}.task-detail-drawer{width:min(390px,55vw)}.desktop-action{display:none}.list-column{width:292px}}
@media (max-width:767px){.task-manager-page{margin:-4px}.task-app-shell{display:block;height:calc(100dvh - 116px);min-height:620px;border-radius:13px}.task-sidebar{position:absolute;top:0;bottom:0;left:0;width:min(290px,86vw);transform:translateX(-102%);transition:transform .22s ease;box-shadow:18px 0 35px rgba(12,16,28,.18)}.task-sidebar.is-mobile-open{transform:translateX(0)}.mobile-only{display:inline-grid}.view-header{min-height:78px;padding:13px 14px}.title-line h1{font-size:19px}.header-title-wrap p{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-actions{gap:5px}.primary-button span{display:none}.primary-button{padding-inline:12px}.list-columns{height:100%;padding:14px;scroll-snap-type:x mandatory}.list-column{width:calc(100vw - 69px);scroll-snap-align:center}.focus-view{padding:14px}.composer-hint{display:none}.task-detail-drawer{position:absolute;width:100%;border-left:0}.drawer-header{min-height:56px}.modal-backdrop{padding:10px}.manage-dialog{max-height:94dvh}.manage-dialog>header,.manage-list-groups{padding-inline:15px}}
.profile-menu-anchor{position:relative}.profile-dropdown{position:absolute;z-index:90;right:0;bottom:calc(100% + 10px);width:225px;padding:7px;border:1px solid var(--tm-border);border-radius:11px;background:var(--tm-surface);box-shadow:0 16px 38px rgba(18,24,40,.2)}.profile-dropdown::after{position:absolute;right:15px;bottom:-5px;width:9px;height:9px;content:"";transform:rotate(45deg);border-right:1px solid var(--tm-border);border-bottom:1px solid var(--tm-border);background:var(--tm-surface)}.profile-dropdown-head{display:flex;align-items:center;gap:9px;padding:8px 8px 11px;border-bottom:1px solid var(--tm-border)}.profile-dropdown-head>div{min-width:0}.profile-dropdown-head strong,.profile-dropdown-head small{display:block}.profile-dropdown-head strong{font-size:12px}.profile-dropdown-head small{max-width:150px;margin-top:2px;overflow:hidden;color:var(--tm-muted);font-size:10px;text-overflow:ellipsis}.logout-button{display:flex;width:100%;align-items:center;gap:9px;margin-top:5px;padding:9px;border:0;border-radius:7px;background:transparent;color:#d84d5f;font-size:12px;font-weight:700;text-align:left;cursor:pointer}.logout-button:hover{background:color-mix(in srgb,#d84d5f 9%,transparent)}.logout-button :deep(svg){width:15px;height:15px}
.drawer-backdrop{position:absolute;z-index:30;inset:0;border:0;background:rgba(12,16,28,.18);cursor:default}.fade-enter-active,.fade-leave-active{transition:opacity .18s}.fade-enter-from,.fade-leave-to{opacity:0}
.view-header{min-height:64px;padding:8px 18px}.title-line h1{font-size:18px}.header-title-wrap p{margin-top:2px;font-size:11px}.header-actions{gap:6px}.icon-button.large{width:34px;height:34px}.header-profile{position:relative;margin-left:2px}.header-profile-button{display:flex;min-height:42px;align-items:center;gap:8px;padding:4px 7px 4px 5px;border:0;border-radius:9px;background:transparent;cursor:pointer}.header-profile-button:hover,.header-profile-button[aria-expanded="true"]{background:var(--tm-surface-2)}.header-profile-button>span:nth-child(2){min-width:0;text-align:left}.header-profile-button strong,.header-profile-button small{display:block;white-space:nowrap}.header-profile-button strong{font-size:11px}.header-profile-button small{margin-top:1px;color:var(--tm-muted);font-size:9px}.header-profile-button>:deep(svg){width:13px;height:13px;color:var(--tm-muted)}.header-profile .profile-dropdown{top:calc(100% + 7px);right:0;bottom:auto}.header-profile .profile-dropdown::after{top:-5px;right:15px;bottom:auto;transform:rotate(225deg)}
.sidebar-create-footer{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid var(--tm-border)}.sidebar-create-footer button{display:flex;min-height:38px;align-items:center;justify-content:center;gap:7px;padding:7px;border:0;border-radius:8px;background:transparent;color:var(--tm-muted);font-size:11px;font-weight:700;cursor:pointer}.sidebar-create-footer button:hover{background:var(--tm-surface-2);color:var(--tm-accent)}.sidebar-create-footer :deep(svg){width:15px;height:15px}.inline-create-row{display:flex;min-height:38px;align-items:center;gap:7px;margin:3px 1px;padding:5px 8px;border:1px solid var(--tm-accent);border-radius:8px;background:var(--tm-surface);box-shadow:0 0 0 2px color-mix(in srgb,var(--tm-accent) 10%,transparent);color:var(--tm-accent)}.inline-create-row>:deep(svg){width:14px;height:14px;flex:none}.inline-create-row input{min-width:0;flex:1;padding:3px 1px;border:0;border-bottom:1px solid var(--tm-accent);outline:0;background:transparent;color:var(--tm-text);font-size:12px;font-weight:650}.inline-group-row{margin-top:6px}.ungrouped-block{position:relative;min-height:8px;margin-top:4px;transition:min-height .15s}.ungrouped-list{margin-left:0}.ungrouped-block.is-ungroup-drop-ready,.ungrouped-block.is-ungroup-drop-target{min-height:38px}.ungrouped-block.is-ungroup-drop-target::before{position:absolute;z-index:9;top:0;right:0;left:0;height:2px;content:"";border-radius:2px;background:var(--tm-accent);box-shadow:0 0 0 2px var(--tm-accent-soft)}
.new-list-circle{width:17px;height:17px;flex:none;border:1.5px solid var(--tm-muted);border-radius:50%;background:transparent}
.list-nav-wrap{transition:opacity .15s,transform .15s,background .15s}.list-nav{padding-left:27px}.list-drag-handle{position:absolute;z-index:3;top:10px;left:6px;display:grid;width:16px;height:18px;place-items:center;color:var(--tm-muted);cursor:grab;opacity:0}.list-nav-wrap:hover .list-drag-handle,.list-drag-handle:focus{opacity:.7}.list-drag-handle:active{cursor:grabbing}.list-drag-handle :deep(svg){width:13px;height:13px}.is-list-dragging{opacity:.35}.is-list-drag-over::before{position:absolute;z-index:8;top:-2px;right:4px;left:4px;height:2px;content:"";border-radius:2px;background:var(--tm-accent)}
.task-card{position:relative;cursor:grab}.task-card:active{cursor:grabbing}.task-card.is-task-dragging{opacity:.35;transform:scale(.985)}.task-card.is-task-drag-over::before{position:absolute;top:-5px;right:5px;left:5px;height:2px;content:"";border-radius:2px;background:var(--tm-accent);box-shadow:0 0 0 2px var(--tm-accent-soft)}.list-column.is-task-list-drag-over{border-color:color-mix(in srgb,var(--tm-accent) 55%,var(--tm-border));background:color-mix(in srgb,var(--tm-accent-soft) 32%,var(--tm-surface))}
.task-app-shell.sidebar-is-collapsed{grid-template-columns:72px minmax(0,1fr)}.task-sidebar{position:relative}.task-sidebar-collapse{position:absolute;z-index:95;top:62px;right:-11px;display:grid;width:22px;height:34px;place-items:center;border:1px solid var(--tm-border);border-radius:0 8px 8px 0;background:var(--tm-surface);color:var(--tm-muted);box-shadow:3px 3px 9px rgba(18,24,40,.08);cursor:pointer}.task-sidebar-collapse :deep(svg){width:12px;height:12px}.task-sidebar.is-collapsed{padding-inline:9px}.task-sidebar.is-collapsed .workspace-brand{justify-content:center;padding-inline:0}.task-sidebar.is-collapsed .workspace-brand>div,.task-sidebar.is-collapsed .workspace-brand>.mobile-only,.task-sidebar.is-collapsed .sidebar-search input,.task-sidebar.is-collapsed .sidebar-search kbd,.task-sidebar.is-collapsed .nav-eyebrow,.task-sidebar.is-collapsed .nav-row>span,.task-sidebar.is-collapsed .nav-row>b,.task-sidebar.is-collapsed .group-toggle>span,.task-sidebar.is-collapsed .row-menu-trigger,.task-sidebar.is-collapsed .list-drag-handle,.task-sidebar.is-collapsed .sidebar-create-footer span{display:none}.task-sidebar.is-collapsed .nav-row>.list-dot{display:block}.task-sidebar.is-collapsed .sidebar-search{width:38px;margin-inline:auto;padding:0;justify-content:center}.task-sidebar.is-collapsed .nav-row{justify-content:center;padding-inline:5px}.task-sidebar.is-collapsed .nav-section-heading{height:12px;margin-top:11px}.task-sidebar.is-collapsed .group-row{justify-content:center}.task-sidebar.is-collapsed .group-toggle{flex:0 0 32px;justify-content:center}.task-sidebar.is-collapsed .group-lists{padding-left:0}.task-sidebar.is-collapsed .list-nav,.task-sidebar.is-collapsed .ungrouped-list{margin-left:0;padding-inline:5px}.task-sidebar.is-collapsed .sidebar-create-footer{grid-template-columns:1fr}.task-sidebar.is-collapsed .sidebar-create-footer button{padding:5px}.task-sidebar.is-collapsed .inline-create-row{padding:5px;justify-content:center}.task-sidebar.is-collapsed .inline-create-row input{display:none}
.inline-rename-nav{cursor:text}.inline-rename-nav input{min-width:0;flex:1;padding:2px 1px;border:0;border-bottom:1px solid var(--tm-accent);outline:0;background:transparent;color:var(--tm-text);font-size:12px;font-weight:700}.column-identity{cursor:grab}.column-identity:active{cursor:grabbing}.column-identity>div{min-width:0}.column-rename-input{width:190px;max-width:100%;padding:1px 0;border:0;border-bottom:1px solid var(--tm-accent);outline:0;background:transparent;color:var(--tm-text);font-size:14px;font-weight:760}.column-menu-anchor{position:relative}.column-menu-button{border-radius:50%;background:var(--tm-surface-2)}.column-context-menu{top:39px;right:0;min-width:205px}.column-context-menu button:disabled{cursor:not-allowed;opacity:.4}.list-column.is-column-dragging{opacity:.35;transform:scale(.985)}.list-column.is-column-drag-over{position:relative;border-color:var(--tm-accent)}.list-column.is-column-drag-over::before{position:absolute;z-index:20;top:10px;bottom:10px;left:-10px;width:3px;content:"";border-radius:3px;background:var(--tm-accent);box-shadow:0 0 0 3px var(--tm-accent-soft)}
.task-app-shell{transition:grid-template-columns .28s cubic-bezier(.22,.75,.2,1)}.task-sidebar{transition:padding .24s ease}.workspace-brand,.sidebar-search,.nav-row,.group-toggle,.sidebar-create-footer button{transition:all .22s ease}.task-sidebar-collapse{position:static;width:28px;height:28px;margin-left:auto;border:0;border-radius:8px;background:var(--tm-surface-2);box-shadow:none;transition:background .18s,transform .18s;color:var(--tm-muted)}.task-sidebar-collapse:hover{background:var(--tm-accent-soft);color:var(--tm-accent);transform:scale(1.04)}.task-sidebar.is-collapsed .workspace-brand{flex-direction:column;gap:8px;padding-bottom:13px}.task-sidebar.is-collapsed .workspace-brand>div{display:block;width:0;max-width:0;height:0;overflow:hidden;opacity:0}.task-sidebar.is-collapsed .task-sidebar-collapse{margin:0}.task-sidebar.is-collapsed .nav-row>.inline-flex,.task-sidebar.is-collapsed .group-toggle>.inline-flex,.task-sidebar.is-collapsed .sidebar-create-footer .inline-flex{display:inline-flex}.task-sidebar.is-collapsed .nav-row{width:42px;min-height:42px;margin-inline:auto;border-radius:11px}.task-sidebar.is-collapsed .nav-row.active{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tm-accent) 12%,transparent)}.task-sidebar.is-collapsed .group-toggle{width:38px;height:32px;margin-inline:auto;border-radius:8px;color:var(--tm-muted)}.task-sidebar.is-collapsed .group-toggle:hover{background:var(--tm-surface-2);color:var(--tm-accent)}.task-sidebar.is-collapsed .list-dot{width:10px;height:10px;box-shadow:0 0 0 4px color-mix(in srgb,currentColor 7%,transparent)}.task-sidebar.is-collapsed .sidebar-create-footer{gap:4px}.task-sidebar.is-collapsed .sidebar-create-footer button{width:42px;height:38px;margin-inline:auto;border-radius:10px}.column-header{cursor:grab;user-select:none;transition:background .15s}.column-header:active{cursor:grabbing}.column-header:hover{background:color-mix(in srgb,var(--tm-surface-2) 70%,transparent)}.column-identity{cursor:inherit}.column-menu-anchor,.column-menu-anchor *{cursor:pointer}.column-rename-input{user-select:text;cursor:text}
.column-header.is-sort-locked,.column-header.is-sort-locked:active{cursor:default}
.task-stack{margin:7px -3px 0;padding:3px;overflow-x:hidden}
.task-card{width:100%;box-sizing:border-box}
.task-sidebar:not(.is-collapsed) .nav-row:hover,.task-sidebar:not(.is-collapsed) .group-toggle:hover{border-radius:8px;background:var(--tm-accent-soft);color:var(--tm-accent)}
.task-sidebar:not(.is-collapsed) .group-toggle:hover>.group-icon,.task-sidebar:not(.is-collapsed) .group-toggle:hover>.group-chevron{color:var(--tm-accent)}
.completed-section>button{justify-content:flex-start}
.completed-section>button span{margin-left:0}
.completed-section>button .completed-count{color:var(--tm-muted);font-weight:700}
.list-customizer{position:fixed;z-index:130;width:248px;max-height:calc(100dvh - 16px);overflow-y:auto;padding:6px;border:1px solid var(--tm-border);border-radius:12px;background:var(--tm-surface);box-shadow:0 18px 42px rgba(18,24,40,.2)}
.list-customizer>header{display:flex;align-items:center;justify-content:space-between;padding:7px 7px 10px;border-bottom:1px solid var(--tm-border)}
.list-customizer>header>div{display:flex;min-width:0;align-items:center;gap:9px}
.list-customizer>header strong,.list-customizer>header small{display:block}
.list-customizer>header strong{font-size:12px}.list-customizer>header small{max-width:145px;margin-top:2px;overflow:hidden;color:var(--tm-muted);font-size:9px;text-overflow:ellipsis;white-space:nowrap}
.list-customizer>header>button{display:grid;width:27px;height:27px;place-items:center;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);cursor:pointer}.list-customizer>header>button:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}
.list-customizer>header>button :deep(svg){width:14px;height:14px}.customizer-preview{display:grid;width:32px;height:32px;flex:none;place-items:center;border-radius:8px;background:color-mix(in srgb,var(--list-color) 13%,var(--tm-surface));color:var(--list-color)}.customizer-preview :deep(svg){width:16px;height:16px}
.list-customizer>section{padding:10px 7px 6px}.customizer-label{display:block;margin-bottom:7px;color:var(--tm-muted);font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.customizer-color-grid,.customizer-icon-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}.customizer-color-grid button,.customizer-icon-grid button{display:grid;width:23px;height:23px;place-items:center;padding:0;border:0;cursor:pointer}
.customizer-color-grid button{border-radius:50%;background:var(--swatch);color:transparent;box-shadow:0 0 0 1px color-mix(in srgb,var(--swatch) 45%,var(--tm-border))}.customizer-color-grid button:hover,.customizer-color-grid button.active{box-shadow:0 0 0 2px var(--tm-surface),0 0 0 4px var(--swatch)}.customizer-color-grid button.active{color:#fff}.customizer-color-grid :deep(svg){width:12px;height:12px;stroke-width:2.5}
.custom-color-control{display:flex;align-items:center;gap:6px;margin-top:10px;padding-top:9px;border-top:1px solid var(--tm-border)}.custom-color-control>button{display:flex;min-width:0;flex:1;align-items:center;gap:6px;padding:0;border:0;background:transparent;color:var(--tm-text);font-size:10px;font-weight:700;cursor:pointer}.custom-color-control>button>i{width:24px;height:24px;flex:none;border:2px solid var(--tm-surface);border-radius:50%;box-shadow:0 0 0 1px var(--tm-border)}.custom-color-control>button :deep(svg){width:13px;height:13px;flex:none;color:var(--tm-muted)}.custom-color-control>button :deep(svg:last-child){margin-left:auto}.custom-color-control>input{width:68px;padding:6px;border:1px solid var(--tm-border);border-radius:7px;outline:0;background:var(--tm-surface-2);color:var(--tm-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9px;text-transform:uppercase}.custom-color-control>input:focus{border-color:var(--tm-primary);background:var(--tm-surface)}
.inline-color-picker{display:grid;gap:8px;padding-top:10px}.custom-color-plane{position:relative;height:108px;overflow:hidden;border:1px solid var(--tm-border);border-radius:9px;background:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,var(--picker-hue));cursor:crosshair;touch-action:none}.custom-color-plane>i{position:absolute;width:12px;height:12px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,.55),0 1px 4px rgba(0,0,0,.35);transform:translate(-50%,-50%);pointer-events:none}.custom-hue-slider{width:100%;height:10px;margin:0;appearance:none;border:0;border-radius:10px;outline:0;background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);cursor:pointer}.custom-hue-slider::-webkit-slider-thumb{width:15px;height:15px;appearance:none;border:2px solid #fff;border-radius:50%;background:transparent;box-shadow:0 0 0 1px rgba(0,0,0,.55)}.custom-hue-slider::-moz-range-thumb{width:12px;height:12px;border:2px solid #fff;border-radius:50%;background:transparent;box-shadow:0 0 0 1px rgba(0,0,0,.55)}
.customizer-icon-grid button{border-radius:7px;background:var(--tm-surface-2);color:var(--tm-muted)}.customizer-icon-grid button:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}.customizer-icon-grid button.active{background:color-mix(in srgb,var(--list-color, var(--tm-accent)) 13%,var(--tm-surface));color:var(--tm-accent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tm-accent) 35%,var(--tm-border))}.customizer-icon-grid :deep(svg){width:14px;height:14px}
.inline-group-rename{border:1px solid var(--tm-accent);border-radius:8px;background:var(--tm-surface);box-shadow:0 0 0 2px color-mix(in srgb,var(--tm-accent) 10%,transparent);cursor:text}
.inline-group-rename input{min-width:0;flex:1;padding:2px 1px;border:0;border-bottom:1px solid var(--tm-accent);outline:0;background:transparent;color:var(--tm-text);font-size:12px;font-weight:700}
.subtask-add-trigger{display:flex;width:100%;align-items:center;gap:8px;margin-top:7px;padding:8px;border:1px dashed var(--tm-border);border-radius:8px;background:transparent;color:var(--tm-muted);font-size:11px;text-align:left;cursor:pointer}.subtask-add-trigger:hover{border-color:var(--tm-accent);background:var(--tm-accent-soft);color:var(--tm-accent)}.subtask-add-trigger :deep(svg){width:14px;height:14px}
.sidebar-root-tree{display:flex;min-height:8px;flex-direction:column}
.sidebar-root-tree>.ungrouped-block{display:contents}
.root-inline-create{order:99998}
.root-drop-zone{position:relative;height:8px;flex:none;order:99999}
.root-drop-zone.active::after{position:absolute;z-index:12;top:3px;right:0;left:0;height:2px;content:"";border-radius:2px;background:var(--tm-accent);box-shadow:0 0 0 2px var(--tm-accent-soft)}
.root-drop-zone-end{order:99999}
.group-block.is-root-dragging{opacity:.35;transform:scale(.985)}
.group-block.is-list-group-drop-target>.group-row .group-toggle{background:var(--tm-accent-soft);color:var(--tm-accent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tm-accent) 28%,var(--tm-border))}.group-block.is-list-group-drop-target>.group-row .group-icon,.group-block.is-list-group-drop-target>.group-row .group-chevron{color:var(--tm-accent)}
.task-sidebar-collapse{position:absolute;z-index:95;top:35px;right:-10px;width:20px;height:34px;margin:0;border:1px solid var(--tm-border);border-radius:8px;background:var(--tm-surface);box-shadow:0 3px 10px rgba(18,24,40,.08);transform:none}.task-sidebar-collapse:hover{transform:none}.task-sidebar.is-collapsed .workspace-brand{gap:0;padding-bottom:10px}.task-sidebar.is-collapsed .sidebar-search{margin-top:0}
@media (max-width:767px){.task-manager-page{margin:0}.task-app-shell{height:100dvh;min-height:0;border-radius:0}}
@media (max-width:767px){.task-app-shell.sidebar-is-collapsed{display:block}.task-sidebar.is-collapsed{width:min(290px,86vw);padding-inline:10px}.task-sidebar.is-collapsed .workspace-brand>div,.task-sidebar.is-collapsed .sidebar-search input,.task-sidebar.is-collapsed .sidebar-search kbd,.task-sidebar.is-collapsed .nav-eyebrow,.task-sidebar.is-collapsed .nav-row>span,.task-sidebar.is-collapsed .nav-row>b,.task-sidebar.is-collapsed .group-toggle>span,.task-sidebar.is-collapsed .sidebar-create-footer span,.task-sidebar.is-collapsed .inline-create-row input{display:initial}.task-sidebar.is-collapsed .task-sidebar-collapse{display:none}.view-header{min-height:60px;padding:7px 10px}.header-title-wrap p{display:none}.header-profile-button>span:nth-child(2),.header-profile-button>:deep(svg){display:none}.header-profile-button{padding:3px}.header-profile .profile-dropdown{right:0}.sidebar-create-footer{grid-template-columns:1fr}.list-drag-handle{opacity:.55}}

/* Task workspace shell: one global topbar, with navigation and content below it. */
.task-app-shell{
  --tm-sidebar-width-expanded:248px;
  --tm-sidebar-width-current:var(--tm-sidebar-width-expanded);
  grid-template-columns:var(--tm-sidebar-width-current) minmax(0,1fr);
  grid-template-rows:64px minmax(0,1fr);
  transition:grid-template-columns .28s cubic-bezier(.22,.75,.2,1);
}
.task-app-shell.sidebar-is-collapsed{--tm-sidebar-width-current:72px;grid-template-columns:var(--tm-sidebar-width-current) minmax(0,1fr)}
.task-global-topbar{z-index:30;grid-column:1/-1;grid-row:1;display:grid;grid-template-columns:var(--tm-sidebar-width-current) minmax(0,1fr);min-width:0;border-bottom:1px solid var(--tm-border);background:color-mix(in srgb,var(--tm-surface) 94%,transparent)}
.topbar-brand{display:flex;min-width:0;align-items:center;gap:10px;padding:0 14px;border-right:1px solid var(--tm-border);overflow:hidden}
.topbar-brand .brand-mark{width:36px;height:36px;flex:none}
.topbar-brand>div{min-width:0;overflow:hidden;transition:max-width .24s ease,opacity .18s ease,transform .24s ease;max-width:160px;opacity:1}
.topbar-brand strong,.topbar-brand small{display:block;white-space:nowrap}
.topbar-brand strong{font-size:13px;font-weight:780}
.topbar-brand small{margin-top:2px;color:var(--tm-muted);font-size:10px}
.sidebar-is-collapsed .topbar-brand{justify-content:center;padding-inline:0}
.sidebar-is-collapsed .topbar-brand>div{max-width:0;opacity:0;transform:translateX(-8px)}
.topbar-main{display:grid;grid-template-columns:minmax(160px,1fr) minmax(220px,440px) auto;min-width:0;align-items:center;gap:16px;padding:0 16px}
.topbar-main .header-title-wrap{overflow:hidden}
.topbar-main .header-title-wrap>div{min-width:0}
.topbar-main .title-line h1{overflow:hidden;font-size:17px;text-overflow:ellipsis;white-space:nowrap}
.topbar-main .header-title-wrap p{overflow:hidden;margin-top:2px;font-size:10px;text-overflow:ellipsis;white-space:nowrap}
.workspace-search{display:flex;min-width:0;height:38px;align-items:center;gap:8px;padding:0 10px;border:1px solid var(--tm-border);border-radius:9px;background:var(--tm-surface-2);color:var(--tm-muted);transition:border-color .18s,background .18s,box-shadow .18s}
.workspace-search:focus-within{border-color:var(--tm-accent);background:var(--tm-surface);box-shadow:0 0 0 3px color-mix(in srgb,var(--tm-accent) 10%,transparent)}
.workspace-search :deep(svg){width:16px;height:16px;flex:none}
.workspace-search input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--tm-text)}
.workspace-search button,.sidebar-search button{display:grid;width:22px;height:22px;flex:none;place-items:center;padding:0;border:0;border-radius:6px;background:transparent;color:var(--tm-muted);cursor:pointer}
.workspace-search button:hover,.sidebar-search button:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}
.workspace-search button :deep(svg),.sidebar-search button :deep(svg){width:13px;height:13px}
.task-sidebar{grid-column:1;grid-row:2;padding:12px 12px 12px;transition:padding .24s ease}
.task-main{grid-column:2;grid-row:2}
.sidebar-control-row{display:flex;min-height:38px;align-items:center;gap:7px;margin-bottom:15px}
.sidebar-control-row .sidebar-search{min-width:0;flex:1;margin:0}
.sidebar-control-row .task-sidebar-collapse{position:static;z-index:auto;display:grid;width:30px;height:38px;flex:none;place-items:center;margin:0;border:1px solid var(--tm-border);border-radius:9px;background:var(--tm-surface);box-shadow:none;color:var(--tm-muted);transform:none;transition:border-color .18s,background .18s,color .18s}
.sidebar-control-row .task-sidebar-collapse:hover{border-color:color-mix(in srgb,var(--tm-accent) 35%,var(--tm-border));background:var(--tm-accent-soft);color:var(--tm-accent);transform:none}
.sidebar-control-row .task-sidebar-collapse :deep(svg){width:13px;height:13px}
.task-sidebar.is-collapsed{padding-inline:10px}
.task-sidebar.is-collapsed .sidebar-control-row{justify-content:center}
.task-sidebar.is-collapsed .sidebar-control-row .task-sidebar-collapse{display:grid;width:20px;height:36px;margin:0;border-radius:7px}
.task-sidebar.is-collapsed nav{overflow:visible}
.task-sidebar.is-collapsed .nav-section-heading{margin-top:10px}
.task-sidebar.is-collapsed .group-block{margin-block:3px}
.task-sidebar.is-collapsed .group-row{justify-content:center}
.task-sidebar.is-collapsed .group-toggle{position:relative;display:flex;width:42px;height:42px;flex:0 0 42px;align-items:center;justify-content:center;margin-inline:auto;border-radius:11px;color:var(--tm-muted)}
.task-sidebar.is-collapsed .group-toggle:hover,.task-sidebar.is-collapsed .group-toggle[aria-expanded="true"]{background:var(--tm-surface-2);color:var(--tm-accent)}
.task-sidebar.is-collapsed .group-toggle.has-active-list{background:var(--tm-accent-soft);color:var(--tm-accent)}
.task-sidebar.is-collapsed .group-toggle>.inline-flex{display:inline-flex}
.group-child-indicator{position:absolute;right:2px;bottom:2px;display:grid;width:13px;height:13px;place-items:center;border:2px solid var(--tm-sidebar);border-radius:50%;background:var(--tm-accent);color:#fff}
.group-child-indicator :deep(svg){width:7px!important;height:7px!important}
.collapsed-group-wrap{position:relative}
.collapsed-group-flyout{position:absolute;z-index:120;top:-6px;left:calc(100% + 14px);width:230px;padding:8px;border:1px solid var(--tm-border);border-radius:12px;background:var(--tm-surface);box-shadow:0 18px 44px rgba(18,24,40,.18)}
.collapsed-group-flyout::before{position:absolute;top:20px;left:-6px;width:10px;height:10px;content:"";transform:rotate(45deg);border-bottom:1px solid var(--tm-border);border-left:1px solid var(--tm-border);background:var(--tm-surface)}
.collapsed-group-flyout>header{display:flex;align-items:center;gap:9px;padding:7px 8px 10px;border-bottom:1px solid var(--tm-border)}
.collapsed-group-flyout>header>span{display:grid;width:30px;height:30px;place-items:center;border-radius:8px;background:var(--tm-accent-soft);color:var(--tm-accent)}
.collapsed-group-flyout>header>span :deep(svg){width:15px;height:15px}
.collapsed-group-flyout>header strong,.collapsed-group-flyout>header small{display:block}
.collapsed-group-flyout>header strong{font-size:12px}
.collapsed-group-flyout>header small{margin-top:2px;color:var(--tm-muted);font-size:9px}
.collapsed-group-flyout-list{padding-top:5px}
.collapsed-group-flyout-list button{display:flex;width:100%;min-height:36px;align-items:center;gap:9px;padding:7px 8px;border:0;border-radius:8px;background:transparent;color:var(--tm-muted);text-align:left;cursor:pointer}
.collapsed-group-flyout-list button:hover,.collapsed-group-flyout-list button.active{background:var(--tm-accent-soft);color:var(--tm-accent)}
.collapsed-group-flyout-list button i{width:8px;height:8px;flex:none;border-radius:50%}
.collapsed-group-flyout-list .collapsed-list-name{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}
.collapsed-group-flyout-list .collapsed-shared-icon{display:grid;width:14px;height:14px;flex:0 0 14px;place-items:center;overflow:visible;color:var(--tm-muted)}
.collapsed-group-flyout-list .collapsed-shared-icon :deep(.inline-flex){width:14px;height:14px;align-items:center;justify-content:center}
.collapsed-group-flyout-list .collapsed-shared-icon :deep(svg){display:block;width:13px!important;height:13px!important}
.collapsed-group-flyout-list button b{font-size:9px}
.collapsed-group-empty{padding:12px 8px;color:var(--tm-muted);font-size:10px}

@media (max-width:1023px) and (min-width:768px){
  .task-app-shell{--tm-sidebar-width-expanded:218px;--tm-sidebar-width-current:var(--tm-sidebar-width-expanded)}
  .task-app-shell.sidebar-is-collapsed{--tm-sidebar-width-current:72px}
  .topbar-main{grid-template-columns:minmax(145px,1fr) minmax(190px,340px) auto;gap:10px;padding-inline:12px}
  .header-profile-button>span:nth-child(2){display:none}
}
@media (max-width:767px){
  .task-app-shell,.task-app-shell.sidebar-is-collapsed{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:60px minmax(0,1fr);height:100dvh}
  .task-global-topbar{grid-column:1;grid-row:1;grid-template-columns:68px minmax(0,1fr)}
  .topbar-brand{justify-content:center;padding:0;border-right:1px solid var(--tm-border)}
  .topbar-brand>div{display:none}
  .topbar-main{grid-template-columns:minmax(0,1fr) auto;gap:6px;padding:0 8px}
  .topbar-main .header-title-wrap p{display:none}
  .topbar-main .title-line h1{font-size:15px}
  .workspace-search{width:36px;min-width:36px;padding:0;justify-content:center;border:0;background:transparent}
  .workspace-search input,.workspace-search button{display:none}
  .topbar-main .header-actions{gap:2px}
  .header-profile-button>span:nth-child(2),.header-profile-button>:deep(svg){display:none}
  .header-profile-button{padding:3px}
  .task-sidebar,.task-sidebar.is-collapsed{position:absolute;z-index:40;top:60px;bottom:0;left:0;grid-column:auto;grid-row:auto;width:min(290px,86vw);padding:12px;transform:translateX(-102%);transition:transform .22s ease;box-shadow:18px 0 35px rgba(12,16,28,.18)}
  .task-sidebar.is-mobile-open{transform:translateX(0)}
  .task-sidebar.is-collapsed .sidebar-control-row .task-sidebar-collapse{display:grid;width:30px}
  .task-sidebar.is-collapsed nav{overflow-y:auto}
  .task-main{grid-column:1;grid-row:2}
  .mobile-backdrop{top:60px}
  .collapsed-group-flyout{display:none}
}

/* Refined shell rhythm: the topbar brand is global and the sidebar rail is self-contained. */
.task-global-topbar{display:flex;grid-template-columns:none}
.topbar-brand{position:relative;box-sizing:border-box;width:var(--tm-sidebar-width-expanded);flex:none;justify-content:flex-start;padding:0 0 0 18px;border-right:0;overflow:visible}
.topbar-brand::after{width:1px;height:30px;margin-left:auto;content:"";background:var(--tm-border)}
.sidebar-is-collapsed .topbar-brand{justify-content:flex-start;padding:0 0 0 18px}
.sidebar-is-collapsed .topbar-brand>div{max-width:160px;opacity:1;transform:none}
.topbar-main{min-width:0;flex:1;padding-left:16px}
.mitreka-brand-logo{display:block;width:auto;height:30px;flex:none;color:var(--tm-text);filter:drop-shadow(0 2px 3px rgba(18,24,40,.1))}

.sidebar-control-row{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--tm-border)}
.sidebar-control-row .task-sidebar-collapse{width:32px;height:38px;border:0;background:transparent;box-shadow:none}
.sidebar-control-row .task-sidebar-collapse:hover{border-color:transparent;background:var(--tm-accent-soft);color:var(--tm-accent)}
.task-sidebar.is-collapsed .sidebar-control-row .task-sidebar-collapse{width:42px;height:42px;border:0;border-radius:11px;background:transparent}
.task-sidebar.is-collapsed .sidebar-control-row .task-sidebar-collapse:hover{background:var(--tm-accent-soft)}
.sidebar-control-row .task-sidebar-collapse>svg{width:24px;height:24px}
.task-sidebar.is-collapsed .sidebar-create-footer{display:none}
.rail-tooltip{position:absolute;z-index:140;top:50%;left:calc(100% + 11px);visibility:hidden;width:max-content;max-width:180px;padding:6px 9px;border-radius:7px;background:#202636;color:#fff;font-size:10px;font-weight:650;line-height:1.2;letter-spacing:0;white-space:nowrap;opacity:0;pointer-events:none;transform:translate(-4px,-50%);box-shadow:0 8px 22px rgba(18,24,40,.2);transition:visibility .12s,opacity .12s ease,transform .15s ease}
.rail-tooltip::before{position:absolute;top:50%;left:-4px;width:8px;height:8px;content:"";transform:translateY(-50%) rotate(45deg);background:#202636}
.task-sidebar.is-collapsed .nav-row:hover>.rail-tooltip,.task-sidebar.is-collapsed .nav-row:focus-visible>.rail-tooltip{visibility:visible;opacity:1;transform:translate(0,-50%)}
:global(.dark) .rail-tooltip{border:1px solid var(--tm-border);background:var(--tm-surface);color:var(--tm-text)}
:global(.dark) .rail-tooltip::before{border-bottom:1px solid var(--tm-border);border-left:1px solid var(--tm-border);background:var(--tm-surface)}
.group-lists{padding-left:11px}
.list-nav{padding-right:44px;padding-left:9px;cursor:grab}
.list-nav:active{cursor:grabbing}
.inline-rename-nav,.inline-rename-nav:active{cursor:text}
.list-menu{right:3px;border-radius:8px}
.row-menu-trigger:hover,.row-menu-trigger:focus-visible{background:var(--tm-accent-soft);color:var(--tm-accent)}
.list-nav b{flex:none;margin-left:auto}
.group-toggle>.group-icon{flex:none;color:var(--tm-muted)}
.group-toggle>.group-chevron{flex:none;color:var(--tm-muted)}
.group-toggle>.group-icon :deep(svg){width:16px;height:16px}
.group-toggle>.group-chevron :deep(svg){width:12px;height:12px}
.group-toggle>span:not(.inline-flex){min-width:0;flex:1;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap}
.group-toggle.has-active-list>.group-icon{color:var(--tm-accent)}
.list-nav{padding-right:9px}
.pointer-context-menu{position:fixed;z-index:180;right:auto;min-width:170px}
.smart-view-wrap{position:relative}
.nav-row.has-view-options{padding-right:42px}
.smart-view-menu-button{position:absolute;z-index:3;top:5px;right:4px;border-radius:8px;background:transparent}
.smart-view-menu-button:hover,.smart-view-menu-button:focus-visible{background:var(--tm-accent-soft);color:var(--tm-accent)}
.smart-view-context-menu{top:41px;right:3px;min-width:205px}
.smart-view-context-menu.pointer-context-menu{right:auto;width:205px;max-width:calc(100vw - 16px)}
.context-menu-divider{height:1px;margin:4px -5px;background:var(--tm-border)}
.sort-toggle-block{padding:6px 5px 5px}
.sort-toggle-label{display:flex;align-items:center;gap:8px;margin-bottom:7px;color:var(--tm-muted);font-size:11px;font-weight:700}
.sort-toggle-label :deep(svg){width:14px;height:14px}
.sort-toggle-tabs{display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:3px;border:1px solid var(--tm-border);border-radius:9px;background:var(--tm-surface-2)}
.context-menu .sort-toggle-tabs button{display:flex;width:auto;min-height:29px;align-items:center;justify-content:center;padding:0 7px;border:0;border-radius:6px;background:transparent;color:var(--tm-muted);font-size:10px;font-weight:700;text-align:center}
.context-menu .sort-toggle-tabs button:hover{background:color-mix(in srgb,var(--tm-surface) 75%,transparent);color:var(--tm-text)}
.context-menu .sort-toggle-tabs button.active{background:var(--tm-surface);color:var(--tm-accent);box-shadow:0 2px 7px rgba(18,24,40,.09)}

.nav-section-heading{margin-top:12px;padding-top:13px;border-top:1px solid var(--tm-border)}
.task-sidebar.is-collapsed .nav-section-heading{width:42px;height:13px;margin:9px auto 7px;padding:0;border-top:1px solid var(--tm-border)}

.collapsed-group-flyout{left:calc(100% + 8px);visibility:hidden;opacity:0;pointer-events:none;transform:translateX(-5px);transition:visibility .15s,opacity .15s ease,transform .18s ease}
.collapsed-group-flyout::after{position:absolute;top:0;bottom:0;left:-12px;width:12px;content:""}
.collapsed-group-wrap:hover>.collapsed-group-flyout,.collapsed-group-wrap:focus-within>.collapsed-group-flyout,.collapsed-group-flyout.is-open{visibility:visible;opacity:1;pointer-events:auto;transform:translateX(0)}

.task-copy h3,.focus-task-copy h3{display:-webkit-box;overflow:hidden;overflow-wrap:anywhere;-webkit-box-orient:vertical;-webkit-line-clamp:2}
.task-note-indicator,.completed-note-indicator{display:inline-flex;flex:none;align-items:center;color:var(--tm-muted)}.task-note-indicator :deep(svg),.completed-note-indicator :deep(svg){width:12px;height:12px}.completed-note-indicator{align-self:center}
.focus-task-row.is-reorderable{cursor:grab;user-select:none}.focus-task-row.is-reorderable:active{cursor:grabbing}.focus-task-row.is-task-dragging{opacity:.35}.focus-task-row.is-task-drag-over{background:var(--tm-accent-soft);box-shadow:inset 0 2px 0 var(--tm-accent)}
.focus-completed-section>button{display:flex;width:100%;align-items:center;gap:6px;padding:10px 15px;border:0;background:var(--tm-surface-2);color:var(--tm-muted);font-size:10px;font-weight:700;text-align:left;cursor:pointer}.focus-completed-section>button:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}.focus-completed-section>button :deep(svg){width:12px;height:12px}.focus-completed-section .completed-count{margin-left:0}.focus-completed-list .focus-task-row:last-child{border-bottom:0}
.topbar-collaboration{display:flex;align-items:center;gap:8px}.member-avatar-stack{display:flex;padding-left:8px}.member-avatar-stack>span,.member-avatar,.task-assignee-avatar{display:grid;place-items:center;border-radius:50%;background:var(--member-color);color:#fff;font-weight:800;box-shadow:0 0 0 2px var(--tm-surface)}.member-avatar-stack>span{width:28px;height:28px;margin-left:-8px;font-size:8px}.share-list-button{display:flex;height:34px;align-items:center;gap:7px;padding:0 11px;border:1px solid var(--tm-border);border-radius:8px;background:var(--tm-surface);color:var(--tm-muted);font-size:11px;font-weight:700;cursor:pointer}.share-list-button:hover{border-color:color-mix(in srgb,var(--tm-accent) 35%,var(--tm-border));background:var(--tm-accent-soft);color:var(--tm-accent)}.share-list-button :deep(svg){width:14px;height:14px}
.task-assignee-avatar{width:22px;height:22px;flex:none;font-size:7px;box-shadow:none}.task-assignee-button{display:grid;width:26px;height:26px;flex:none;place-items:center;margin-right:-7px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer}.task-assignee-button:hover{box-shadow:0 0 0 3px var(--tm-accent-soft)}.task-attachment-indicator{color:var(--tm-muted)}.task-attachment-indicator :deep(svg){width:11px;height:11px}.completed-note-indicator{gap:3px;font-size:9px}
.list-shared-indicator{flex:none;color:var(--tm-muted)}.nav-row .list-shared-indicator :deep(svg),.collapsed-group-flyout-list .list-shared-indicator :deep(svg){width:13px;height:13px}.nav-row.active .list-shared-indicator{color:var(--tm-accent)}.column-header p.column-stats{display:flex;align-items:center;gap:8px}.column-member-stat{display:inline-flex;align-items:center;gap:3px}.column-member-stat :deep(svg){width:11px;height:11px}.collapsed-group-flyout-list .list-shared-indicator{display:inline-flex;flex:none;color:var(--tm-muted)}
/* Mitreka Design System semantic alignment */
.primary-button,.task-composer button,.assignment-link button,.assignment-create-link,.invite-link-field button{border-color:var(--tm-primary);background:var(--tm-primary);color:var(--tm-primary-content)}
.primary-button:hover,.task-composer button:hover,.assignment-link button:hover,.assignment-create-link:hover,.invite-link-field button:hover{filter:none;background:color-mix(in oklch,var(--tm-primary),black 15%)}
.secondary-button{border-color:var(--tm-border);background:var(--tm-surface);color:var(--tm-text)}
.task-check,.empty-check,.visibility-check{border-color:color-mix(in oklch,var(--tm-text),transparent 62%)}
.task-check.checked,.is-completed .task-check,.visibility-check.checked{border-color:var(--tm-primary);background:var(--tm-primary);color:var(--tm-primary-content)}
.star-button{color:color-mix(in oklch,var(--tm-text),transparent 68%)}.star-button.active{color:var(--tm-warning)}
.task-meta .is-overdue{color:var(--tm-danger)}.task-meta .is-today{color:var(--tm-warning)}
.context-menu button.danger,.drawer-footer button,.logout-button,.invite-link-actions .danger-text{color:var(--tm-danger)}
.logout-button:hover,.clear-assignee:hover,.attachment-row>button:hover,.share-member-row>button:hover{background:color-mix(in oklch,var(--tm-danger),transparent 90%);color:var(--tm-danger)}
.avatar{background:color-mix(in oklch,var(--tm-primary),transparent 86%);color:var(--tm-primary)}
.nav-row.active{background:var(--color-sidebar-active-bg);color:var(--color-sidebar-active-text)}
.task-sidebar:not(.is-collapsed) .nav-row:hover,.task-sidebar:not(.is-collapsed) .group-toggle:hover{background:var(--color-sidebar-hover-bg);color:var(--color-layout-sidebar-text)}
.task-sidebar:not(.is-collapsed) .group-toggle:hover>.group-icon,.task-sidebar:not(.is-collapsed) .group-toggle:hover>.group-chevron,.group-toggle.has-active-list>.group-icon{color:var(--color-sidebar-active-text)}
.nav-row.active .list-shared-indicator{color:var(--color-sidebar-active-text)}
.invite-link-actions button,.assignment-popover>footer button:first-child,.subtask-composer button{color:var(--tm-link)}
.sidebar-control-row .task-sidebar-collapse:hover,.task-sidebar.is-collapsed .group-toggle:hover{background:var(--color-sidebar-active-bg);color:var(--color-sidebar-active-text)}
.modal-backdrop,.mobile-backdrop{background:var(--tm-overlay)}.drawer-backdrop{background:color-mix(in oklch,var(--color-neutral),transparent 82%)}
.rail-tooltip{background:var(--color-neutral);color:var(--color-neutral-content);box-shadow:0 8px 22px var(--tm-shadow-color)}.rail-tooltip::before{background:var(--color-neutral)}
.list-column,.list-progress-card,.focus-task-list,.manage-dialog,.share-dialog{border-radius:var(--radius-box)}
.task-card,.add-inline,.task-composer,.focus-composer,.notes-input,.attachment-row,.attachment-upload,.assignment-member-option,.workspace-search,.sidebar-search{border-radius:var(--radius-field-md)}
.context-menu,.profile-dropdown,.list-customizer,.collapsed-group-flyout,.assignment-popover{border-radius:var(--radius-box)}
.primary-button,.secondary-button,.share-list-button,.header-profile-button,.icon-button,.assignment-summary{border-radius:var(--radius-field-md)}
.list-column,.list-progress-card{box-shadow:0 1px calc(2px * var(--depth,1)) var(--tm-shadow-color)}
.task-card:hover{box-shadow:0 4px 12px var(--tm-shadow-color)}
.context-menu,.profile-dropdown,.list-customizer,.collapsed-group-flyout,.assignment-popover{box-shadow:0 12px 32px var(--tm-shadow-color)}
.manage-dialog,.share-dialog{box-shadow:0 20px 55px color-mix(in oklch,var(--color-neutral),transparent 76%)}.task-detail-drawer{box-shadow:-16px 0 36px color-mix(in oklch,var(--color-neutral),transparent 82%)}
.task-manager-page button:focus-visible,.task-manager-page input:focus-visible,.task-manager-page select:focus-visible,.task-manager-page textarea:focus-visible{outline:none;box-shadow:0 0 0 3px color-mix(in oklch,var(--tm-primary),transparent 72%)}
.assignment-value{display:flex;min-width:0;align-items:center;gap:3px}.assignment-summary{display:flex;min-width:0;align-items:center;justify-content:flex-end;gap:7px;padding:5px 7px;border:0;border-radius:8px;background:transparent;color:var(--tm-text);font-size:11px;cursor:pointer}.assignment-summary:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}.assignment-summary>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.clear-assignee{display:grid;width:25px;height:25px;flex:none;place-items:center;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);cursor:pointer}.clear-assignee:hover{background:color-mix(in srgb,#d84d5f 10%,transparent);color:#d84d5f}.clear-assignee :deep(svg){width:12px;height:12px}
.assignment-popover{position:fixed;z-index:210;width:min(340px,calc(100vw - 16px));max-height:calc(100dvh - 16px);overflow-y:auto;border:1px solid var(--tm-border);border-radius:13px;background:var(--tm-surface);box-shadow:0 20px 55px rgba(18,24,40,.22)}.assignment-popover>header{position:sticky;z-index:2;top:0;display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-bottom:1px solid var(--tm-border);background:var(--tm-surface)}.assignment-popover>header strong,.assignment-popover>header small{display:block}.assignment-popover>header strong{font-size:13px}.assignment-popover>header small{margin-top:2px;color:var(--tm-muted);font-size:9px}.assignment-popover>header>button{display:grid;width:27px;height:27px;place-items:center;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);cursor:pointer}.assignment-popover>header>button:hover{background:var(--tm-surface-2);color:var(--tm-text)}.assignment-popover>header>button :deep(svg){width:13px;height:13px}.assignment-member-section,.assignment-invite-section{padding:12px}.assignment-eyebrow{display:block;margin:0 3px 7px;color:var(--tm-muted);font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.assignment-member-option{display:flex;width:100%;min-height:44px;align-items:center;gap:9px;padding:6px 8px;border:0;border-radius:9px;background:transparent;color:var(--tm-text);text-align:left;cursor:pointer}.assignment-member-option:hover,.assignment-member-option.active{background:var(--tm-accent-soft)}.assignment-member-option>span:nth-child(2){min-width:0;flex:1}.assignment-member-option strong,.assignment-member-option small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.assignment-member-option strong{font-size:11px}.assignment-member-option small{margin-top:2px;color:var(--tm-accent);font-size:9px}.assignment-member-option>:deep(svg){width:14px;height:14px;flex:none;color:var(--tm-accent)}.unassigned-avatar{display:grid;width:32px;height:32px;flex:none;place-items:center;border-radius:50%;background:var(--tm-surface-2);color:var(--tm-muted)}.unassigned-avatar :deep(svg){width:14px;height:14px}.unassigned-option>span:nth-child(2){font-size:11px}.assignment-invite-section{border-top:1px solid var(--tm-border)}.assignment-invite-section>p{margin:0 3px 9px;color:var(--tm-muted);font-size:9px;line-height:1.45}.assignment-link{display:flex;gap:6px}.assignment-link input{min-width:0;flex:1;padding:8px;border:1px solid var(--tm-border);border-radius:8px;background:var(--tm-surface-2);color:var(--tm-muted);font-size:9px}.assignment-link button,.assignment-create-link{display:flex;align-items:center;justify-content:center;gap:5px;border:0;border-radius:8px;background:var(--tm-accent);color:#fff;font-size:9px;font-weight:700;cursor:pointer}.assignment-link button{padding:0 9px}.assignment-create-link{width:100%;min-height:36px}.assignment-link button :deep(svg),.assignment-create-link :deep(svg){width:12px;height:12px}.assignment-share-empty{display:flex;flex-direction:column;align-items:center;padding:26px 22px;text-align:center}.assignment-share-empty>span{display:grid;width:46px;height:46px;place-items:center;border-radius:13px;background:var(--tm-accent-soft);color:var(--tm-accent)}.assignment-share-empty>span :deep(svg){width:20px;height:20px}.assignment-share-empty h3{margin:12px 0 4px;font-size:13px}.assignment-share-empty p{margin:0 0 15px;color:var(--tm-muted);font-size:10px;line-height:1.5}.assignment-share-empty .primary-button{min-height:36px;font-size:10px}.assignment-popover>footer{position:sticky;bottom:0;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-top:1px solid var(--tm-border);background:var(--tm-surface)}.assignment-popover>footer button{display:flex;align-items:center;gap:6px;padding:7px 8px;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);font-size:9px;font-weight:700;cursor:pointer}.assignment-popover>footer button:hover{background:var(--tm-surface-2);color:var(--tm-text)}.assignment-popover>footer button:first-child{color:var(--tm-accent)}.assignment-popover>footer button :deep(svg){width:12px;height:12px}
.attachment-list{display:grid;gap:7px;margin-bottom:9px}.attachment-row{display:flex;min-width:0;align-items:center;gap:9px;padding:8px;border:1px solid var(--tm-border);border-radius:9px;background:var(--tm-surface-2)}.attachment-icon{display:grid;width:30px;height:30px;flex:none;place-items:center;border-radius:7px;background:var(--tm-accent-soft);color:var(--tm-accent)}.attachment-icon :deep(svg){width:14px;height:14px}.attachment-row>div{min-width:0;flex:1}.attachment-row strong,.attachment-row small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.attachment-row strong{font-size:11px}.attachment-row small{margin-top:2px;color:var(--tm-muted);font-size:9px}.attachment-row>button{display:grid;width:26px;height:26px;flex:none;place-items:center;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);cursor:pointer}.attachment-row>button:hover{background:color-mix(in srgb,#d84d5f 10%,transparent);color:#d84d5f}.attachment-row>button :deep(svg){width:13px;height:13px}.attachment-upload{display:flex;min-height:40px;align-items:center;justify-content:center;gap:7px;border:1px dashed var(--tm-border);border-radius:9px;background:var(--tm-surface-2);color:var(--tm-muted);font-size:11px;font-weight:700;cursor:pointer}.attachment-upload:hover{border-color:var(--tm-accent);color:var(--tm-accent)}.attachment-upload :deep(svg){width:14px;height:14px}.attachment-upload input{display:none}
.share-dialog{display:flex;width:min(560px,100%);max-height:min(760px,92dvh);flex-direction:column;overflow:hidden;border:1px solid var(--tm-border);border-radius:16px;background:var(--tm-surface);box-shadow:0 25px 70px rgba(10,14,28,.25)}.share-dialog>header{display:flex;align-items:flex-start;justify-content:space-between;padding:19px 20px;border-bottom:1px solid var(--tm-border)}.share-dialog-heading{display:flex;min-width:0;align-items:center;gap:11px}.share-list-icon{display:grid;width:40px;height:40px;flex:none;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--list-color) 13%,var(--tm-surface));color:var(--list-color)}.share-list-icon :deep(svg){width:19px;height:19px}.share-dialog h2{margin:0;font-size:17px}.share-dialog header p{margin:4px 0 0;color:var(--tm-muted);font-size:10px}.share-dialog-body{min-height:0;overflow-y:auto;padding:4px 20px 20px}.share-members-section,.invite-link-section{padding-top:17px}.share-section-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.share-section-title strong{font-size:11px;text-transform:uppercase;letter-spacing:.06em}.share-section-title>span{color:var(--tm-muted);font-size:9px}.share-member-list{display:grid;gap:4px}.share-member-row{display:flex;align-items:center;gap:9px;padding:7px;border-radius:9px}.share-member-row:hover{background:var(--tm-surface-2)}.member-avatar{width:32px;height:32px;flex:none;font-size:9px;box-shadow:none}.member-avatar.large{width:54px;height:54px;font-size:14px}.share-member-row>div{min-width:0;flex:1}.share-member-row strong,.share-member-row>div>span{display:block}.share-member-row strong{font-size:11px}.share-member-row strong small{color:var(--tm-muted);font-weight:500}.share-member-row>div>span{margin-top:2px;color:var(--tm-muted);font-size:9px}.share-member-row em{color:var(--tm-muted);font-size:9px;font-style:normal}.share-member-row>button{display:grid;width:25px;height:25px;place-items:center;border:0;border-radius:7px;background:transparent;color:var(--tm-muted);cursor:pointer}.share-member-row>button:hover{background:color-mix(in srgb,#d84d5f 10%,transparent);color:#d84d5f}.share-member-row>button :deep(svg){width:12px;height:12px}.invite-link-section{margin-top:8px;border-top:1px solid var(--tm-border)}.invite-link-section>p{margin:0 0 10px;color:var(--tm-muted);font-size:10px}.invite-link-field{display:flex;gap:7px}.invite-link-field input{min-width:0;flex:1;padding:9px 10px;border:1px solid var(--tm-border);border-radius:8px;outline:0;background:var(--tm-surface-2);color:var(--tm-muted);font-size:10px}.invite-link-field button{display:flex;align-items:center;gap:6px;padding:0 11px;border:0;border-radius:8px;background:var(--tm-accent);color:#fff;font-size:10px;font-weight:700;cursor:pointer}.invite-link-field button :deep(svg){width:12px;height:12px}.create-invite-button{min-height:38px}.invite-link-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px}.invite-link-actions button{padding:0;border:0;background:transparent;color:var(--tm-accent);font-size:9px;font-weight:700;cursor:pointer}.invite-link-actions .danger-text{margin-left:auto;color:#d84d5f}.share-dialog>footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 20px;border-top:1px solid var(--tm-border)}.share-dialog>footer>span{display:flex;align-items:center;gap:6px;color:var(--tm-muted);font-size:9px}.share-dialog>footer>span :deep(svg){width:13px;height:13px}.share-dialog>footer .primary-button{min-height:36px}.join-confirmation{display:flex;flex-direction:column;align-items:center;padding:40px 28px;text-align:center}.join-confirmation h3{margin:12px 0 4px;font-size:16px}.join-confirmation p{max-width:370px;margin:0;color:var(--tm-muted);font-size:11px;line-height:1.55}.join-confirmation>div{display:flex;gap:8px;margin-top:22px}
.drawer-section>.detail-field:last-child{border-bottom:0}
/* Keep the workspace subtly blue while deriving it from Mitreka foundation tokens. */
.task-main{background:color-mix(in srgb,var(--color-primary) 5%,var(--color-base-100))}
.task-sidebar:not(.is-collapsed) .nav-row{margin-block:1px}
.task-sidebar:not(.is-collapsed) .nav-row:hover,.task-sidebar:not(.is-collapsed) .group-toggle:hover{background:color-mix(in srgb,var(--color-primary) 5%,var(--color-base-100))}
.manage-quick-actions{justify-content:space-between}.manage-quick-actions>div{min-width:0}.manage-quick-actions strong,.manage-quick-actions small{display:block}.manage-quick-actions strong{font-size:12px}.manage-quick-actions small{margin-top:2px;color:var(--tm-muted);font-size:10px}.manage-quick-actions .visibility-check{width:20px;height:20px;flex:none;margin-left:0;padding:0;border:1.5px solid color-mix(in oklch,var(--tm-text),transparent 62%);border-radius:6px;background:transparent;color:transparent}.manage-quick-actions .visibility-check.checked{border-color:var(--tm-primary);background:var(--tm-primary);color:var(--tm-primary-content)}.manage-list-groups{padding-top:10px}.manage-group{border-bottom:1px solid var(--tm-border)}.manage-group:last-child{border-bottom:0}.manage-group-header{display:flex;min-height:48px;align-items:center;gap:10px}.manage-group-header>button:first-child{display:flex;min-width:0;flex:1;align-items:center;gap:8px;padding:8px 4px;border:0;background:transparent;color:var(--tm-text);text-align:left;cursor:pointer}.manage-group-header>button:first-child:hover{color:var(--tm-primary)}.manage-group-header>button:first-child :deep(svg){width:14px;height:14px;flex:none;color:var(--tm-muted)}.manage-group-header>button:first-child span{overflow:hidden;font-size:11px;font-weight:800;text-overflow:ellipsis;white-space:nowrap}.manage-group-header>button:first-child small{margin-left:auto;color:var(--tm-muted);font-size:9px}.manage-group-header>.visibility-check{flex:none}.manage-group-lists{padding:0 0 5px 25px}.manage-list-row{min-height:48px}.manage-list-row>div{min-width:0;flex:1}.manage-list-row>.visibility-check{margin-left:auto}.visibility-check.indeterminate{border-color:var(--tm-primary);background:var(--tm-primary);color:var(--tm-primary-content)}
.manage-list-row{padding-right:0}.manage-quick-actions .visibility-check.checked,.manage-quick-actions .visibility-check.indeterminate{border-color:var(--tm-primary);background:var(--tm-primary);color:var(--color-layout-topbar-text)}.manage-quick-actions .visibility-check.checked :deep(svg),.manage-quick-actions .visibility-check.indeterminate :deep(svg){color:var(--color-layout-topbar-text);stroke:currentColor}
.manage-visibility-checkbox{flex:none;margin-block:0}.manage-quick-actions>.manage-visibility-checkbox,.manage-list-row>.manage-visibility-checkbox{margin-left:auto}.manage-group-header>.manage-visibility-checkbox{margin-left:0}
.focus-task-row{width:100%;border-bottom:0}
.focus-task-row:hover{background:color-mix(in srgb,var(--color-info) 3%,var(--color-base-100))}
.focus-task-list :deep(.tooltip-root.focus-task-tooltip){display:flex;width:100%;border-bottom:1px solid var(--tm-border)}
.list-column :deep(.tooltip-root.column-header-tooltip){display:flex;width:100%}.column-header-tooltip .column-header{width:100%}
.list-progress-card{position:relative}.progress-list-menu-anchor{position:absolute;z-index:4;top:14px;right:14px}.progress-list-context-menu{top:39px;min-width:205px}.progress-list-rename-input{position:absolute;z-index:3;top:15px;left:63px;width:min(290px,calc(100% - 140px));padding:2px 0;border:0;border-bottom:1px solid var(--tm-primary);outline:0;background:var(--tm-surface);color:var(--tm-text);font-size:13px;font-weight:750}.list-sort-menu-item{position:relative}.list-sort-trigger>span{min-width:0;flex:1}.list-sort-trigger>:deep(svg:last-child){width:12px;height:12px}.list-sort-flyout{position:absolute;z-index:4;top:-5px;left:calc(100% - 2px);display:grid;width:190px;padding:5px;border:1px solid var(--tm-border);border-radius:var(--radius-box);background:var(--tm-surface);box-shadow:0 12px 32px var(--tm-shadow-color)}.list-sort-flyout>strong{padding:7px 9px 8px;color:var(--tm-muted);font-size:9px;letter-spacing:.06em;text-transform:uppercase}.context-menu .list-sort-flyout button{padding:8px;color:var(--tm-muted);font-size:11px}.context-menu .list-sort-flyout button :deep(svg){visibility:hidden;width:12px;height:12px}.context-menu .list-sort-flyout button.active{background:var(--tm-accent-soft);color:var(--tm-primary);font-weight:700}.context-menu .list-sort-flyout button.active :deep(svg){visibility:visible}
.list-sort-trigger>span{flex:none}.list-sort-trigger>.list-sort-label{min-width:0;flex:1}.list-sort-trigger>:deep(span:last-child){margin-left:auto}
.focus-task-list>.focus-task-tooltip:last-child,.focus-completed-list>.focus-task-tooltip:last-child{border-bottom:0}
.task-detail-drawer{width:min(var(--drawer-width,460px),calc(100% - 80px))}
.task-detail-drawer:not(.is-resizing){transition:width .12s ease,transform .22s ease,opacity .22s}
.drawer-resize-handle{position:absolute;z-index:4;top:0;bottom:0;left:-7px;display:flex;width:14px;align-items:center;justify-content:center;outline:0;cursor:col-resize;touch-action:none}
.drawer-resize-handle span{width:3px;height:42px;border-radius:4px;background:transparent;transition:height .16s,background .16s,box-shadow .16s}
.drawer-resize-handle:hover span,.drawer-resize-handle:focus-visible span,.task-detail-drawer.is-resizing .drawer-resize-handle span{height:58px;background:var(--tm-accent);box-shadow:0 0 0 3px var(--tm-accent-soft)}
.drawer-title-row textarea{field-sizing:content;min-height:58px;max-height:180px;overflow-y:auto;overflow-wrap:anywhere}
:global(body.is-resizing-task-drawer){cursor:col-resize;user-select:none}

@media (max-width:767px){
  .task-global-topbar{display:flex;grid-template-columns:none}
  .topbar-brand{width:68px;justify-content:center;padding:0}
  .topbar-brand::after{display:none}
  .sidebar-is-collapsed .topbar-brand{justify-content:center;padding:0}
  .topbar-main{padding-left:8px}
  .task-sidebar.is-collapsed .sidebar-control-row .task-sidebar-collapse{width:42px}
  .task-detail-drawer{width:100%}
  .drawer-resize-handle{display:none}
  .member-avatar-stack{display:none}.share-list-button{width:34px;padding:0;justify-content:center}.share-list-button span{display:none}
}
@media (max-width:767px){
  .task-app-shell,.task-app-shell.sidebar-is-collapsed{grid-template-rows:60px minmax(0,1fr)}
  .task-global-topbar{height:60px;min-width:0;align-items:stretch;overflow:visible}
  .topbar-brand,.sidebar-is-collapsed .topbar-brand{width:68px;flex:0 0 68px;justify-content:center;padding:0;border:0}
  .topbar-brand::after,.topbar-brand>div{display:none}
  .topbar-main{position:relative;display:flex;min-width:0;flex:1;align-items:center;gap:6px;padding:0 8px}
  .topbar-main .header-title-wrap{min-width:0;flex:1;gap:7px}
  .topbar-main .header-title-wrap>div{min-width:0;flex:1;overflow:hidden}
  .topbar-main .title-line{min-width:0;gap:7px}
  .topbar-main .title-line h1{min-width:0;overflow:hidden;font-size:15px;text-overflow:ellipsis;white-space:nowrap}
  .mobile-menu-button{display:grid;width:36px;height:36px;flex:0 0 36px;place-items:center;padding:0;border:0;background:transparent}
  .mobile-menu-button :deep(svg){width:19px;height:19px}
  .topbar-main .header-actions{display:flex;flex:none;align-items:center;gap:4px}
  .topbar-collaboration{display:none}
  .header-profile{margin:0}
  .header-profile-button{display:grid;width:36px;height:36px;min-height:36px;place-items:center;padding:0;overflow:hidden}
  .header-profile-button>.avatar{display:grid;width:32px;height:32px;place-items:center;margin:0;border-radius:50%;font-size:9px}
  .header-profile-button>span:nth-child(2),.header-profile-button>:deep(svg){display:none}
  .header-profile .profile-dropdown{position:fixed;z-index:220;top:66px;right:8px;bottom:auto;left:auto;width:min(260px,calc(100vw - 16px));max-width:none}
  .header-profile .profile-dropdown::after{top:-5px;right:15px;bottom:auto}
  .workspace-search{width:36px;min-width:36px;height:36px;flex:0 0 36px;justify-content:center;padding:0;border:0;background:transparent;cursor:pointer}
  .workspace-search input,.workspace-search button{display:none}
  .workspace-search.is-mobile-open{position:absolute;z-index:230;inset:9px 8px;width:auto;height:42px;display:flex;justify-content:flex-start;padding:0 10px;border:1px solid var(--tm-border);background:var(--tm-surface);box-shadow:0 8px 24px var(--tm-shadow-color);cursor:text}
  .workspace-search.is-mobile-open input{display:block}
  .workspace-search.is-mobile-open button{display:grid}
  .task-sidebar,.task-sidebar.is-collapsed{top:60px;width:min(320px,88vw);padding:12px;background:var(--tm-sidebar)}
  .task-sidebar .task-sidebar-collapse,.task-sidebar.is-collapsed .task-sidebar-collapse{display:none!important}
  .task-sidebar .sidebar-control-row{min-height:40px;gap:8px}
  .task-sidebar .sidebar-control-row>.mobile-only{display:grid;width:36px;height:36px;flex:none;place-items:center}
  .task-sidebar .sidebar-create-footer{grid-template-columns:1fr 1fr}
  .list-columns{gap:12px;padding:12px;scroll-padding-inline:12px;overscroll-behavior-inline:contain}
  .list-column{width:calc(100vw - 24px);max-width:none}
  .focus-view{padding:12px}
  .focus-task-row{padding:13px 12px;gap:9px}
  .list-progress-card{margin-bottom:12px;padding:12px 14px}
  .progress-list-menu-anchor{top:11px;right:11px}
  .progress-list-rename-input{top:13px;left:61px;width:calc(100% - 120px)}
  .pointer-context-menu{max-width:calc(100vw - 16px)!important}
  .list-sort-flyout{right:calc(100% - 2px);left:auto;width:min(190px,calc(100vw - 24px))}
  .modal-backdrop{padding:8px}
  .manage-dialog,.share-dialog{width:100%;max-height:calc(100dvh - 16px);border-radius:12px}
  .drawer-body{padding:16px}
}
.demo-guide-backdrop{position:fixed;z-index:260;inset:0;display:flex;justify-content:flex-end;background:var(--tm-overlay);backdrop-filter:blur(2px)}
.demo-guide-drawer{display:flex;width:min(460px,100vw);height:100dvh;flex-direction:column;border-left:1px solid var(--tm-border);background:var(--tm-surface);box-shadow:-18px 0 55px var(--tm-shadow-color);color:var(--tm-text)}
.demo-guide-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 18px 16px;border-bottom:1px solid var(--tm-border)}
.demo-guide-heading{display:flex;min-width:0;align-items:center;gap:11px}.demo-guide-heading>span{display:grid;width:40px;height:40px;flex:none;place-items:center;border-radius:var(--radius-field-md);background:var(--tm-accent-soft);color:var(--tm-accent)}.demo-guide-heading>span :deep(svg){width:20px;height:20px}.demo-guide-heading p{margin:0 0 2px;color:var(--tm-muted);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.demo-guide-heading h2{margin:0;font-size:18px}
.feature-guide-intro{padding:15px 18px;border-bottom:1px solid var(--tm-border);background:color-mix(in srgb,var(--tm-accent) 3%,var(--tm-surface))}.feature-guide-intro strong{display:block;font-size:13px}.feature-guide-intro p{margin:6px 0 0;color:var(--tm-muted);font-size:11px;line-height:1.5}
.demo-guide-body{min-height:0;flex:1;overflow-y:auto;padding:2px 18px 20px}.demo-guide-section{padding-top:19px}.demo-guide-section>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:9px}.demo-guide-section>header h3{margin:0;font-size:14px}.demo-guide-section>header small{display:block;margin-top:4px;color:var(--tm-muted);font-size:10px;line-height:1.4}.demo-guide-section>header>span{flex:none;padding-top:3px;color:var(--tm-muted);font-size:10px;font-weight:700}
.feature-guide-item{margin-top:8px;overflow:hidden;border:1px solid var(--tm-border);border-radius:var(--radius-field-md);background:var(--tm-surface);transition:border-color .15s,box-shadow .15s}.feature-guide-item.expanded{border-color:color-mix(in srgb,var(--tm-accent) 32%,var(--tm-border));box-shadow:0 3px 10px var(--tm-shadow-color)}.feature-guide-trigger{display:grid;width:100%;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;padding:11px;border:0;background:transparent;color:var(--tm-text);text-align:left;cursor:pointer}.feature-guide-trigger:hover{background:color-mix(in srgb,var(--tm-accent) 3%,var(--tm-surface))}.feature-guide-trigger>span:nth-child(2){min-width:0}.feature-guide-trigger strong,.feature-guide-trigger small{display:block}.feature-guide-trigger strong{font-size:12px}.feature-guide-trigger small{margin-top:4px;color:var(--tm-muted);font-size:10px;line-height:1.4}.feature-guide-trigger>:deep(svg){width:14px;height:14px;color:var(--tm-muted)}.feature-guide-badge{min-width:48px;padding:5px 7px;border-radius:6px;background:var(--tm-accent-soft);color:var(--tm-accent);font-size:8px;font-weight:800;text-align:center;text-transform:uppercase}.feature-guide-steps{display:grid;gap:8px;margin:0;padding:3px 13px 14px 43px;border-top:1px solid var(--tm-border);counter-reset:guide-step;list-style:none}.feature-guide-steps li{position:relative;padding:9px 0 0 24px;color:var(--tm-muted);font-size:10px;line-height:1.5;counter-increment:guide-step}.feature-guide-steps li::before{position:absolute;top:9px;left:0;display:grid;width:17px;height:17px;place-items:center;border-radius:50%;background:var(--tm-surface-2);color:var(--tm-accent);content:counter(guide-step);font-size:8px;font-weight:800}
.demo-guide-footer{display:flex;align-items:flex-start;gap:9px;padding:13px 18px;border-top:1px solid var(--tm-border);background:var(--tm-surface)}.demo-guide-footer>span{display:flex;flex:none;align-items:center;gap:5px;color:var(--tm-accent);font-size:9px;font-weight:800;text-transform:uppercase}.demo-guide-footer>span :deep(svg){width:13px;height:13px}.demo-guide-footer small{color:var(--tm-muted);font-size:10px;line-height:1.45}
.profile-dropdown .demo-guide-profile-link{width:100%;align-items:center;gap:9px;padding:10px 12px;border:0;border-radius:7px;background:transparent;color:var(--tm-text);text-align:left;cursor:pointer}.profile-dropdown .demo-guide-profile-link:hover{background:var(--tm-accent-soft);color:var(--tm-accent)}.profile-dropdown .demo-guide-profile-link :deep(svg){width:14px;height:14px}
.guide-drawer-enter-active,.guide-drawer-leave-active{transition:opacity .22s ease}.guide-drawer-enter-active .demo-guide-drawer,.guide-drawer-leave-active .demo-guide-drawer{transition:transform .22s ease,opacity .22s ease}.guide-drawer-enter-from,.guide-drawer-leave-to{opacity:0}.guide-drawer-enter-from .demo-guide-drawer,.guide-drawer-leave-to .demo-guide-drawer{transform:translateX(100%);opacity:.5}
@media (max-width:767px){.demo-guide-tooltip{display:none!important}.demo-guide-drawer{width:100vw;border-left:0}.demo-guide-header{padding-top:14px}.demo-guide-body{padding-inline:14px}.feature-guide-trigger{padding:11px 9px}.feature-guide-steps{padding-left:37px}.demo-guide-footer{padding-bottom:max(12px,env(safe-area-inset-bottom))}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}
</style>
