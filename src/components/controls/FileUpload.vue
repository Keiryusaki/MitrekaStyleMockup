<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Icon } from "@/composables/Icon";

interface PreviewItem {
  id: string;
  name: string;
  url: string;
  fileIndex: number;
}

interface FileListItem {
  index: number;
  name: string;
  file: File;
  isImage: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: File[];
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    maxFiles?: number;
    preview?: boolean;
    class?: string;
    dropzoneText?: string;
    browseText?: string;
    helperText?: string;
    maxSizeText?: string;
    emptyText?: string;
  }>(),
  {
    modelValue: () => [],
    multiple: false,
    accept: "",
    disabled: false,
    maxFiles: undefined,
    preview: false,
    class: "",
    dropzoneText: "Drag & drop files here",
    browseText: "or click to browse",
    helperText: "",
    maxSizeText: "",
    emptyText: "No files selected",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", files: File[]): void;
  (e: "change", files: File[]): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);
const files = ref<File[]>(props.modelValue ?? []);
const previewItems = ref<PreviewItem[]>([]);

const resolveLimitedFiles = (incoming: File[]) => {
  if (!props.maxFiles || props.maxFiles <= 0) return incoming;
  return incoming.slice(0, props.maxFiles);
};

const emitFiles = (nextFiles: File[]) => {
  files.value = resolveLimitedFiles(nextFiles);
  emit("update:modelValue", files.value);
  emit("change", files.value);
};

const hasFiles = computed(() => files.value.length > 0);
const listItems = computed<FileListItem[]>(() =>
  files.value.map((file, index) => ({
    index,
    name: file.name,
    file,
    isImage: file.type.startsWith("image/"),
  }))
);
const textListItems = computed(() =>
  props.preview ? listItems.value.filter((item) => !item.isImage) : listItems.value
);
const hasMetaText = computed(() => Boolean(props.helperText || props.maxSizeText));

const getFileIconName = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = file.type.toLowerCase();

  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf" || extension === "pdf") return "file-pdf";
  if (
    extension === "xls" ||
    extension === "xlsx" ||
    mimeType === "application/vnd.ms-excel" ||
    mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "file-xls";
  }
  if (extension === "csv" || mimeType === "text/csv") return "file-csv";
  if (
    extension === "doc" ||
    extension === "docx" ||
    mimeType === "application/msword" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "file-doc";
  }
  return "file";
};

const rebuildPreviewItems = () => {
  previewItems.value.forEach((item) => URL.revokeObjectURL(item.url));
  previewItems.value = files.value
    .map((file, fileIndex) => ({ file, fileIndex }))
    .filter((entry) => entry.file.type.startsWith("image/"))
    .map(({ file, fileIndex }) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${fileIndex}`,
      name: file.name,
      url: URL.createObjectURL(file),
      fileIndex,
    }));
};

const onInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const next = Array.from(input.files ?? []);
  if (!next.length) return;

  if (props.multiple) {
    emitFiles([...files.value, ...next]);
  } else {
    emitFiles([next[0]]);
  }

  input.value = "";
};

const onDrop = (event: DragEvent) => {
  if (props.disabled) return;
  isDragOver.value = false;
  const dropped = Array.from(event.dataTransfer?.files ?? []);
  if (!dropped.length) return;

  if (props.multiple) {
    emitFiles([...files.value, ...dropped]);
  } else {
    emitFiles([dropped[0]]);
  }
};

const removeFile = (index: number) => {
  const next = [...files.value];
  next.splice(index, 1);
  emitFiles(next);
};

watch(
  () => props.modelValue,
  (value) => {
    files.value = resolveLimitedFiles(value ?? []);
  }
);

watch(
  files,
  () => {
    rebuildPreviewItems();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  previewItems.value.forEach((item) => URL.revokeObjectURL(item.url));
});
</script>

<template>
  <div :class="['space-y-3', props.class]">
    <div
      class="dropzone"
      :class="[{ 'dropzone-active': isDragOver }, disabled ? 'opacity-60 pointer-events-none' : '']"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <Icon name="upload" class="w-10 h-10 opacity-50" />
      <p class="font-medium">{{ dropzoneText }}</p>
      <p class="text-sm opacity-60">{{ browseText }}</p>
      <div v-if="hasMetaText" class="text-xs opacity-60 space-y-1">
        <p v-if="helperText">{{ helperText }}</p>
        <p v-if="maxSizeText">{{ maxSizeText }}</p>
      </div>
      <input
        ref="inputRef"
        type="file"
        class="absolute inset-0 opacity-0 cursor-pointer"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="onInputChange"
      />
    </div>

    <div v-if="textListItems.length" class="space-y-2">
      <div
        v-for="item in textListItems"
        :key="`${item.name}-${item.index}`"
        class="flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
      >
        <span class="flex items-center gap-2 min-w-0">
          <Icon :name="getFileIconName(item.file)" class="w-4 h-4 shrink-0" />
          <span class="text-sm truncate">{{ item.name }}</span>
        </span>
        <button type="button" class="btn btn-ghost btn-xs btn-circle" @click="removeFile(item.index)">
          <Icon name="x" class="w-3 h-3" />
        </button>
      </div>
    </div>

    <div v-if="preview && previewItems.length" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="item in previewItems" :key="item.id" class="relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group">
        <img :src="item.url" :alt="item.name" class="w-full h-full object-cover" />
        <button
          type="button"
          class="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
          @click="removeFile(item.fileIndex)"
        >
          <Icon name="x" class="w-3 h-3 text-white" />
        </button>
      </div>
    </div>

    <p v-if="!hasFiles" class="text-xs opacity-60">{{ emptyText }}</p>
  </div>
</template>
