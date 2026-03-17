<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import { reactive } from "vue";

type WorkspaceRole = "member" | "creator";

type WorkspaceItem = {
  id: number;
  title: string;
  creator: string;
  role: WorkspaceRole;
  projectName?: string;
  color?: string;
  image?: string;
  isOfficeProject: boolean;
  isFavorite: boolean;
};

type WorkspaceCollectionItem = {
  title: string;
  subtitle?: string;
};

type WorkspaceCollection = {
  id: string;
  label: string;
  icon: string;
  count: number;
  tone?: "favorite" | "personal" | "tag" | "workspace" | "archived";
  items: WorkspaceCollectionItem[];
};

const workspaces: WorkspaceItem[] = [
  {
    id: 1,
    title: "Ide dan Masukan untuk TaskFlow",
    creator: "Agus Susanto",
    role: "member",
    projectName: "PRODUCT CORE FLOW",
    color: "#87a343",
    isOfficeProject: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Digital Rosters",
    creator: "Agus Susanto",
    role: "creator",
    projectName: "TNI",
    color: "#c14436",
    isOfficeProject: true,
    isFavorite: true,
  },
  {
    id: 3,
    title: "HRFlow",
    creator: "Agus Susanto",
    role: "member",
    projectName: "PRODUCT CORE FLOW",
    color: "#eda469",
    isOfficeProject: true,
    isFavorite: false,
  },
  {
    id: 4,
    title: "PIR 2025",
    creator: "Muhammad Nurtannio",
    role: "member",
    projectName: "BKPM",
    color: "#57c7bf",
    isOfficeProject: true,
    isFavorite: true,
  },
  {
    id: 5,
    title: "Design Manager",
    creator: "Eka Dian Purnama",
    role: "creator",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    isOfficeProject: false,
    isFavorite: true,
  },
  {
    id: 6,
    title: "Internal Portal System",
    creator: "Agus Susanto",
    role: "creator",
    projectName: "INTERNAL",
    color: "#4d5b74",
    isOfficeProject: true,
    isFavorite: false,
  },
  {
    id: 7,
    title: "Mobile App Refactoring",
    creator: "Muhammad Nurtannio",
    role: "member",
    projectName: "TECH STACK",
    color: "#5663cf",
    isOfficeProject: true,
    isFavorite: false,
  },
  {
    id: 8,
    title: "Photography Portfolio",
    creator: "Eka Dian Purnama",
    role: "creator",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
    isOfficeProject: false,
    isFavorite: false,
  },
  {
    id: 9,
    title: "Client Onboarding Flow",
    creator: "Agus Susanto",
    role: "member",
    projectName: "CUSTOMER SUCCESS",
    color: "#369a98",
    isOfficeProject: true,
    isFavorite: true,
  },
];

const favoriteWorkspaceCards: WorkspaceItem[] = [
  {
    id: 401,
    title: "Digital Rosters",
    creator: "Agus Susanto",
    role: "creator",
    projectName: "TNI",
    color: "#c14436",
    isOfficeProject: true,
    isFavorite: true,
  },
];

const personalWorkspaceCards: WorkspaceItem[] = [
  {
    id: 501,
    title: "Agus Susanto Workspace",
    creator: "Agus Susanto",
    role: "creator",
    projectName: "PERSONAL",
    color: "#3a7f7a",
    isOfficeProject: true,
    isFavorite: false,
  },
];

const tagWorkspaceMap: Record<string, WorkspaceItem[]> = {
  "tag-esdm": [
    {
      id: 101,
      title: "Nadin",
      creator: "Agus Susanto",
      role: "member",
      projectName: "ESDM",
      color: "#4e8f5f",
      isOfficeProject: true,
      isFavorite: true,
    },
    {
      id: 102,
      title: "Inline",
      creator: "Agus Susanto",
      role: "creator",
      projectName: "ESDM",
      color: "#2f7d8f",
      isOfficeProject: true,
      isFavorite: false,
    },
    {
      id: 103,
      title: "Simpeg",
      creator: "Muhammad Nurtannio",
      role: "member",
      projectName: "ESDM",
      color: "#5b72bb",
      isOfficeProject: true,
      isFavorite: false,
    },
    {
      id: 104,
      title: "Manage Service",
      creator: "Eka Dian Purnama",
      role: "creator",
      projectName: "ESDM",
      color: "#c57b39",
      isOfficeProject: true,
      isFavorite: true,
    },
  ],
  "tag-bkpm": [
    {
      id: 201,
      title: "Portal Investasi",
      creator: "Agus Susanto",
      role: "creator",
      projectName: "BKPM",
      color: "#389a94",
      isOfficeProject: true,
      isFavorite: true,
    },
    {
      id: 202,
      title: "OSS Monitoring",
      creator: "Muhammad Nurtannio",
      role: "member",
      projectName: "BKPM",
      color: "#5a65bc",
      isOfficeProject: true,
      isFavorite: false,
    },
    {
      id: 203,
      title: "Perizinan Tracker",
      creator: "Agus Susanto",
      role: "member",
      projectName: "BKPM",
      color: "#9d6847",
      isOfficeProject: true,
      isFavorite: false,
    },
  ],
  "tag-ahu": [
    {
      id: 301,
      title: "AHU Online",
      creator: "Agus Susanto",
      role: "member",
      projectName: "KEMENTERIAN AHU",
      color: "#4857a8",
      isOfficeProject: true,
      isFavorite: true,
    },
    {
      id: 302,
      title: "Notaris Hub",
      creator: "Eka Dian Purnama",
      role: "creator",
      projectName: "KEMENTERIAN AHU",
      color: "#5b8e56",
      isOfficeProject: true,
      isFavorite: false,
    },
    {
      id: 303,
      title: "Legal Entity Tracker",
      creator: "Muhammad Nurtannio",
      role: "member",
      projectName: "KEMENTERIAN AHU",
      color: "#a66745",
      isOfficeProject: true,
      isFavorite: false,
    },
  ],
};

const sectionWorkspaceMap: Record<string, WorkspaceItem[]> = {
  favorite: favoriteWorkspaceCards,
  personal: personalWorkspaceCards,
  ...tagWorkspaceMap,
};

const workspaceCollections: WorkspaceCollection[] = [
  {
    id: "favorite",
    label: "Favorite Workspaces",
    icon: "star",
    count: 1,
    tone: "favorite",
    items: [
      {
        title: "Digital Rosters",
        subtitle: "Workspace favorit untuk project konsultan aplikasi web TNI",
      },
    ],
  },
  {
    id: "personal",
    label: "Personal Workspaces",
    icon: "users",
    count: 1,
    tone: "personal",
    items: [
      {
        title: "Agus Susanto Workspace",
        subtitle: "Pemilik + member: diri sendiri",
      },
    ],
  },
  {
    id: "tag-esdm",
    label: "ESDM",
    icon: "fileText",
    count: 4,
    tone: "tag",
    items: [
      { title: "Nadin" },
      { title: "Inline" },
      { title: "Simpeg" },
      { title: "Manage Service" },
    ],
  },
  {
    id: "tag-bkpm",
    label: "BKPM",
    icon: "fileText",
    count: 3,
    tone: "tag",
    items: [
      { title: "Portal Investasi" },
      { title: "OSS Monitoring" },
      { title: "Perizinan Tracker" },
    ],
  },
  {
    id: "tag-ahu",
    label: "Kementerian AHU",
    icon: "fileText",
    count: 3,
    tone: "tag",
    items: [
      { title: "AHU Online" },
      { title: "Notaris Hub" },
      { title: "Legal Entity Tracker" },
    ],
  },
  {
    id: "your-workspaces",
    label: "Your Workspaces",
    icon: "box",
    count: 6,
    tone: "workspace",
    items: [
      {
        title: "Semua workspace non-personal",
      },
    ],
  },
  {
    id: "archived",
    label: "Archived Workspaces",
    icon: "trash",
    count: 0,
    tone: "archived",
    items: [],
  },
];

const collectionOpen = reactive<Record<string, boolean>>(
  Object.fromEntries(workspaceCollections.map((section) => [section.id, false]))
);

const toggleCollection = (id: string) => {
  collectionOpen[id] = !collectionOpen[id];
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      category="Mockup Pages"
      title="TaskFlow WorkSPace"
      description="Adaptasi dashboard workspace TaskFlow dengan style kartu, role actions, dan status favorit."
    />

    <section>
      <div class="workspace-collections">
        <div v-for="section in workspaceCollections" :key="section.id" class="workspace-collection-group">
          <button
            type="button"
            class="workspace-collection-row"
            @click="toggleCollection(section.id)"
          >
            <span class="workspace-collection-main">
              <span class="workspace-collection-icon" :class="`workspace-collection-icon-${section.tone || 'workspace'}`">
                <Icon :name="section.icon" class="h-4 w-4" />
              </span>
              <span class="workspace-collection-label">{{ section.label }}</span>
              <span class="workspace-collection-count">({{ section.count }})</span>
            </span>
            <Icon
              name="chevron-right"
              class="h-4 w-4 workspace-collection-caret"
              :class="{ 'workspace-collection-caret-open': collectionOpen[section.id] }"
            />
          </button>

          <div v-show="collectionOpen[section.id]" class="workspace-collection-content">
            <template v-if="section.id === 'your-workspaces'">
              <div class="workspace-grid workspace-grid-in-panel">
                <article v-for="ws in workspaces" :key="ws.id" class="workspace-card">
                  <div v-if="ws.isOfficeProject" class="workspace-ribbon" aria-hidden="true">
                    <span class="workspace-ribbon-top-cap"></span>
                    <span class="workspace-ribbon-body">
                      <span class="workspace-ribbon-icon">
                        <Icon name="fileText" class="h-4 w-4 text-white" />
                      </span>
                    </span>
                  </div>

                  <div class="workspace-actions">
                    <template v-if="ws.role === 'creator'">
                      <button class="workspace-action-btn" type="button" aria-label="Share workspace">
                        <Icon name="upload" class="h-3.5 w-3.5" />
                      </button>
                      <button class="workspace-action-btn" type="button" aria-label="Archive workspace">
                        <Icon name="trash" class="h-3.5 w-3.5" />
                      </button>
                      <button class="workspace-action-btn" type="button" aria-label="Edit workspace">
                        <Icon name="pencil" class="h-3.5 w-3.5" />
                      </button>
                    </template>
                    <template v-else>
                      <div class="workspace-owner-wrap">
                        <button class="workspace-action-btn" type="button" aria-label="Workspace owner">
                          <Icon name="user" class="h-3.5 w-3.5" />
                        </button>
                        <div class="workspace-owner-popover" role="tooltip">
                          <p class="workspace-owner-caption">DIBUAT OLEH</p>
                          <div class="workspace-owner-row">
                            <span class="workspace-owner-avatar">{{ ws.creator.charAt(0) }}</span>
                            <div>
                              <p class="workspace-owner-name">{{ ws.creator }}</p>
                              <p class="workspace-owner-role">Anggota Sistem</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <button
                      type="button"
                      class="workspace-action-btn workspace-favorite-btn"
                      :class="{ 'workspace-favorite-btn-active': ws.isFavorite }"
                      :aria-label="ws.isFavorite ? 'Favorited workspace' : 'Favorite workspace'"
                    >
                      <Icon name="star" class="h-3.5 w-3.5 workspace-favorite-icon" />
                    </button>
                  </div>

                  <div class="workspace-cover" :style="{ backgroundColor: ws.color || undefined }">
                    <img
                      v-if="ws.image"
                      :src="ws.image"
                      :alt="ws.title"
                      class="workspace-cover-image"
                      loading="lazy"
                    />

                    <span v-if="ws.projectName" class="workspace-pill">
                      {{ ws.projectName }}
                    </span>
                  </div>

                  <div class="workspace-body">
                    <h3>{{ ws.title }}</h3>
                  </div>
                </article>

                <article class="workspace-card workspace-card-add">
                  <button type="button" class="workspace-add-btn" aria-label="Add workspace">
                    <span class="workspace-add-icon">
                      <Icon name="plus" class="h-5 w-5" />
                    </span>
                    <span>WORKSPACE BARU</span>
                  </button>
                </article>
              </div>
            </template>
            <template v-else-if="sectionWorkspaceMap[section.id]?.length">
              <div class="workspace-grid workspace-grid-in-panel">
                <article
                  v-for="ws in sectionWorkspaceMap[section.id]"
                  :key="`${section.id}-${ws.id}`"
                  class="workspace-card"
                >
                  <div v-if="ws.isOfficeProject" class="workspace-ribbon" aria-hidden="true">
                    <span class="workspace-ribbon-top-cap"></span>
                    <span class="workspace-ribbon-body">
                      <span class="workspace-ribbon-icon">
                        <Icon name="fileText" class="h-4 w-4 text-white" />
                      </span>
                    </span>
                  </div>

                  <div class="workspace-actions">
                    <template v-if="ws.role === 'creator'">
                      <button class="workspace-action-btn" type="button" aria-label="Share workspace">
                        <Icon name="upload" class="h-3.5 w-3.5" />
                      </button>
                      <button class="workspace-action-btn" type="button" aria-label="Archive workspace">
                        <Icon name="trash" class="h-3.5 w-3.5" />
                      </button>
                      <button class="workspace-action-btn" type="button" aria-label="Edit workspace">
                        <Icon name="pencil" class="h-3.5 w-3.5" />
                      </button>
                    </template>
                    <template v-else>
                      <div class="workspace-owner-wrap">
                        <button class="workspace-action-btn" type="button" aria-label="Workspace owner">
                          <Icon name="user" class="h-3.5 w-3.5" />
                        </button>
                        <div class="workspace-owner-popover" role="tooltip">
                          <p class="workspace-owner-caption">DIBUAT OLEH</p>
                          <div class="workspace-owner-row">
                            <span class="workspace-owner-avatar">{{ ws.creator.charAt(0) }}</span>
                            <div>
                              <p class="workspace-owner-name">{{ ws.creator }}</p>
                              <p class="workspace-owner-role">Anggota Sistem</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <button
                      type="button"
                      class="workspace-action-btn workspace-favorite-btn"
                      :class="{ 'workspace-favorite-btn-active': ws.isFavorite }"
                      :aria-label="ws.isFavorite ? 'Favorited workspace' : 'Favorite workspace'"
                    >
                      <Icon name="star" class="h-3.5 w-3.5 workspace-favorite-icon" />
                    </button>
                  </div>

                  <div class="workspace-cover" :style="{ backgroundColor: ws.color || undefined }">
                    <span v-if="ws.projectName" class="workspace-pill">
                      {{ ws.projectName }}
                    </span>
                  </div>

                  <div class="workspace-body">
                    <h3>{{ ws.title }}</h3>
                  </div>
                </article>
              </div>
            </template>
            <template v-else-if="section.items.length">
              <div
                v-for="item in section.items"
                :key="`${section.id}-${item.title}`"
                class="workspace-collection-item"
              >
                <p>{{ item.title }}</p>
                <small v-if="item.subtitle">{{ item.subtitle }}</small>
              </div>
            </template>
            <p v-else class="workspace-collection-empty">Belum ada workspace pada kategori ini.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.workspace-collections {
  border: 1px solid #d9e0e9;
  border-radius: 0.9rem;
  background: #f7fafc;
  margin-bottom: 1rem;
  overflow: hidden;
}

.workspace-collection-row {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.62rem 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.16s ease;
}

.workspace-collection-row:hover {
  background: #eff4f9;
}

.workspace-collection-group + .workspace-collection-group {
  border-top: 1px solid #e4ebf2;
}

.workspace-collection-main {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.workspace-collection-icon {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.workspace-collection-icon-favorite {
  color: #f0b400;
}

.workspace-collection-icon-personal {
  color: #22a864;
}

.workspace-collection-icon-tag {
  color: #7b55e8;
}

.workspace-collection-icon-workspace {
  color: #1f9f8f;
}

.workspace-collection-icon-archived {
  color: #ea3b4f;
}

.workspace-collection-label {
  font-size: 1.02rem;
  font-weight: 800;
  color: #113355;
}

.workspace-collection-count {
  font-size: 0.95rem;
  color: #7b8da3;
}

.workspace-collection-caret {
  color: #8aa0b7;
  display: inline-block;
  transform-origin: center;
  transform: rotate(0deg);
  transition: transform 0.16s ease;
}

.workspace-collection-caret-open {
  transform: rotate(90deg);
}

.workspace-collection-content {
  border-bottom: 1px solid #e4ebf2;
  background: #fbfdff;
}

.workspace-collection-item {
  padding: 0.58rem 0.85rem 0.62rem 2rem;
  border-bottom: 1px dashed #e6edf5;
}

.workspace-collection-item:last-child {
  border-bottom: 0;
}

.workspace-collection-item p {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1f314d;
}

.workspace-collection-item small {
  display: block;
  margin-top: 0.15rem;
  color: #6d7f95;
  font-size: 0.72rem;
}

.workspace-collection-empty {
  margin: 0;
  padding: 0.62rem 0.85rem 0.7rem 2rem;
  font-size: 0.8rem;
  color: #7c8ca0;
}

.workspace-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

.workspace-grid-in-panel {
  padding: 0.9rem;
}

@media (min-width: 768px) {
  .workspace-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .workspace-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.workspace-card {
  position: relative;
  background: #ffffff;
  border-radius: 1.05rem;
  border: 1px solid #d9e0e9;
  overflow: visible;
  box-shadow: 0 1px 0 rgba(17, 51, 85, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.workspace-card:hover {
  transform: translateY(-2px);
  border-color: #c9d5e3;
  box-shadow: 0 10px 20px rgba(17, 51, 85, 0.12);
}

.workspace-ribbon {
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  z-index: 2;
  width: 2.05rem;
  height: 2.85rem;
}

.workspace-ribbon-body {
  position: absolute;
  inset: 0;
  border-radius: 0 0.44rem 0 0;
  background: linear-gradient(180deg, #28327e 0%, #1f2868 58%, #1a2258 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(8, 12, 34, 0.3);
}

.workspace-ribbon-body::before {
  content: "";
  position: absolute;
  top: 0.45rem;
  left: -0.2rem;
  width: 0.22rem;
  height: 1.65rem;
  clip-path: polygon(100% 0, 0 10%, 0 90%, 100% 100%, 66% 50%);
  background: linear-gradient(90deg, #131b4b 0%, #0b1031 100%);
  box-shadow: -2px 1px 4px rgba(15, 23, 42, 0.28);
}

.workspace-ribbon-top-cap {
  position: absolute;
  top: 0;
  left: -0.3rem;
  width: 2.22rem;
  height: 0.54rem;
  border-radius: 0.44rem 0.44rem 0.18rem 0.12rem;
  background: linear-gradient(180deg, #3f4fa9 0%, #2c387e 58%, #232d6f 100%);
  box-shadow:
    -2px 1px 4px rgba(11, 17, 44, 0.28),
    inset 0 -1px 0 rgba(6, 10, 30, 0.45);
}

.workspace-ribbon-icon {
  position: relative;
  z-index: 1;
}

.workspace-actions {
  position: absolute;
  top: 0.85rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.workspace-owner-wrap {
  position: relative;
  display: inline-flex;
}

.workspace-owner-popover {
  position: absolute;
  top: calc(100% + 0.35rem);
  right: -0.35rem;
  width: 13rem;
  border-radius: 0.8rem;
  border: 1px solid #d9e0e9;
  background: #f7f9fc;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
  transform-origin: top right;
  pointer-events: none;
  transition: opacity 0.16s ease, transform 0.16s ease;
  z-index: 6;
}

.workspace-owner-popover::before {
  content: "";
  position: absolute;
  top: -0.35rem;
  right: 0.9rem;
  width: 0.58rem;
  height: 0.58rem;
  background: #f7f9fc;
  border-top: 1px solid #d9e0e9;
  border-left: 1px solid #d9e0e9;
  transform: rotate(45deg);
}

.workspace-owner-wrap:hover .workspace-owner-popover,
.workspace-owner-wrap:focus-within .workspace-owner-popover {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.workspace-owner-caption {
  padding: 0.5rem 0.62rem 0.38rem;
  margin: 0;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #8d9bb0;
  border-bottom: 1px solid #e1e7ef;
}

.workspace-owner-row {
  display: flex;
  align-items: center;
  gap: 0.62rem;
  padding: 0.56rem 0.62rem 0.62rem;
}

.workspace-owner-avatar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #e8ecf8 0%, #d5ddf4 100%);
  color: #5162b6;
  font-size: 1.05rem;
  font-weight: 800;
}

.workspace-owner-name {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 800;
  color: #1f314d;
}

.workspace-owner-role {
  margin: 0.18rem 0 0;
  font-size: 0.66rem;
  color: #7585a0;
}

.workspace-action-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(16, 28, 48, 0.36);
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  box-shadow:
    0 3px 8px rgba(8, 15, 28, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transition: transform 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
}

.workspace-action-btn:hover {
  transform: translateY(-1px);
  background: rgba(16, 28, 48, 0.48);
  border-color: rgba(255, 255, 255, 0.24);
  box-shadow:
    0 5px 10px rgba(8, 15, 28, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.workspace-favorite-btn {
  background: rgba(16, 28, 48, 0.36);
  border-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.workspace-favorite-btn-active {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(255, 255, 255, 0.58);
  color: #f0b400;
  box-shadow: 0 3px 8px rgba(240, 180, 0, 0.18);
}

.workspace-favorite-btn:hover {
  background: rgba(16, 28, 48, 0.5);
}

.workspace-favorite-btn-active:hover {
  background: rgba(255, 255, 255, 1);
}

.workspace-favorite-btn :deep(svg) {
  fill: currentColor;
  stroke: currentColor;
}

.workspace-cover {
  height: 110px;
  background: #7b8aa2;
  position: relative;
  overflow: hidden;
  border-radius: 1.05rem 1.05rem 0 0;
}

.workspace-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.workspace-pill {
  position: absolute;
  right: 0.75rem;
  bottom: 0.65rem;
  border-radius: 999px;
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 650;
  color: #fff;
  background: rgba(17, 45, 78, 0.42);
  letter-spacing: 0.02em;
}

.workspace-body {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.workspace-body h3 {
  font-size: 1.02rem;
  font-weight: 700;
  color: #15365a;
  line-height: 1.34;
}

.workspace-card-add {
  border: 2px dashed #ccd4de;
  background: #f2f5f8;
  display: grid;
}

.workspace-add-btn {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  color: #c0c9d5;
  font-weight: 900;
  letter-spacing: 0.1em;
  font-size: 0.83rem;
  text-align: center;
}

.workspace-add-icon {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 999px;
  border: 2px dashed #ccd4de;
  display: grid;
  place-items: center;
  position: relative;
}

.workspace-add-icon :deep(svg) {
  position: absolute;
  inset: 0;
  margin: auto;
  display: block;
}
</style>
