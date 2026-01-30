import{g as C,r as f,d as S,i as D,c as I,j as u,a as e,b as g,e as r,y as a,u as l,l as L,f as T,o as B,z as R}from"./index-DiwQE97j.js";import{_ as k}from"./Icon.vue_vue_type_script_setup_true_lang-BEEEYq2J.js";import{_ as U}from"./PageHeader.vue_vue_type_script_setup_true_lang-CzeWLLsV.js";const h=f("mitrekalight");function M(){const p=d=>{h.value=d,document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},c=()=>{p(h.value==="mitrekalight"?"mitrekadark":"mitrekalight")};return C(()=>{const d=localStorage.getItem("theme")||"mitrekalight";p(d)}),{currentTheme:h,setTheme:p,toggleTheme:c}}const E={class:"space-y-8"},O={class:"card p-6 space-y-4"},V={class:"text-sm opacity-80"},q={class:"code-inline"},$={class:"flex flex-wrap items-end gap-4"},j={class:"p-4 bg-base-200 rounded-box"},A={class:"p-4 bg-base-200 rounded-box"},z={class:"p-4 bg-base-200 rounded-box"},P={class:"card p-6 space-y-4"},G={class:"code-block"},N={class:"card p-6 space-y-4"},W={class:"code-block"},K={class:"card p-6 space-y-4"},F={class:"code-block"},H={class:"card p-6 space-y-4"},J={class:"code-block"},Q={class:"card p-6 space-y-4"},X={class:"code-block"},Y=S({__name:"ThemeSwitcher",setup(p){const{currentTheme:c,toggleTheme:d,setTheme:y}=M(),x=[{value:"mitrekalight",label:"Light Mode"},{value:"mitrekadark",label:"Dark Mode"}],v=D({get:()=>c.value,set:s=>{s&&y(s)}}),i=f(null),m=async(s,t)=>{await navigator.clipboard.writeText(s),i.value=t,setTimeout(()=>i.value=null,2e3)},n={composable:`import { useTheme } from "@/composables/useTheme";

const { currentTheme, toggleTheme, setTheme } = useTheme();

// Toggle antara light/dark
toggleTheme();

// Set theme spesifik
setTheme("mitrekadark");
setTheme("mitrekalight");

// Baca current theme
console.log(currentTheme.value); // "mitrekalight" | "mitrekadark"`,component:`<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
<\/script>

<template>
  <ThemeSwitcher />
</template>`,selectDropdown:`<script setup>
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const { currentTheme, setTheme } = useTheme();

const themeOptions = [
  { value: "mitrekalight", label: "Light Mode" },
  { value: "mitrekadark", label: "Dark Mode" },
];

const selectedTheme = computed({
  get: () => currentTheme.value,
  set: (val) => setTheme(val),
});
<\/script>

<template>
  <SelectDropdown v-model="selectedTheme" :options="themeOptions" size="sm" />
</template>`,iconButton:`<script setup>
import { useTheme } from "@/composables/useTheme";
import { Icon } from "@/components/icons";

const { currentTheme, toggleTheme } = useTheme();
<\/script>

<template>
  <!-- Icon only -->
  <button @click="toggleTheme" class="btn btn-ghost btn-sm">
    <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" />
  </button>

  <!-- Icon + Text -->
  <button @click="toggleTheme" class="btn btn-outline btn-sm inline-flex items-center gap-2">
    <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" :size="16" />
    {{ currentTheme === 'mitrekalight' ? 'Dark Mode' : 'Light Mode' }}
  </button>
</template>`,useThemeTs:`// src/composables/useTheme.ts
import { ref, onMounted } from 'vue'

type Theme = 'mitrekalight' | 'mitrekadark'

const currentTheme = ref<Theme>('mitrekalight')

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const toggleTheme = () => {
    setTheme(currentTheme.value === 'mitrekalight' ? 'mitrekadark' : 'mitrekalight')
  }

  onMounted(() => {
    const saved = (localStorage.getItem('theme') as Theme) || 'mitrekalight'
    setTheme(saved)
  })

  return { currentTheme, setTheme, toggleTheme }
}`},w=async()=>{try{const s=(await T(async()=>{const{default:b}=await import("./useTheme-DLnMulaX.js");return{default:b}},[])).default,t=new Blob([s],{type:"text/plain"}),o=document.createElement("a");o.href=URL.createObjectURL(t),o.download="useTheme.ts",o.click(),URL.revokeObjectURL(o.href)}catch(s){console.error("Gagal download file:",s)}},_=async()=>{try{const s=(await T(async()=>{const{default:b}=await import("./ThemeSwitcher-BRWARfy8.js");return{default:b}},[])).default,t=new Blob([s],{type:"text/plain"}),o=document.createElement("a");o.href=URL.createObjectURL(t),o.download="ThemeSwitcher.vue",o.click(),URL.revokeObjectURL(o.href)}catch(s){console.error("Gagal download file:",s)}};return(s,t)=>(B(),I("div",E,[u(U,{category:"Components",title:"Theme Switcher",description:"Komponen dan composable untuk toggle dark/light mode."}),e("section",{class:"card p-4"},[e("div",{class:"flex flex-wrap items-center justify-between gap-4"},[t[8]||(t[8]=e("div",null,[e("h2",{class:"font-semibold"},"Download Files"),e("p",{class:"text-sm opacity-70"},"Copy ke project Anda")],-1)),e("div",{class:"flex gap-2"},[e("button",{class:"btn btn-accent btn-sm",onClick:w}," useTheme.ts "),e("button",{class:"btn btn-accent btn-sm",onClick:_}," ThemeSwitcher.vue ")])])]),e("section",O,[t[13]||(t[13]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Live Demo",-1)),e("p",V,[t[9]||(t[9]=r(" Current theme: ",-1)),e("code",q,a(l(c)),1)]),e("div",$,[e("div",j,[t[10]||(t[10]=e("p",{class:"text-xs opacity-60 mb-2"},"SelectDropdown",-1)),u(L,{modelValue:v.value,"onUpdate:modelValue":t[0]||(t[0]=o=>v.value=o),options:x,placeholder:"Pilih Theme",size:"sm"},null,8,["modelValue"])]),e("div",A,[t[11]||(t[11]=e("p",{class:"text-xs opacity-60 mb-2"},"Icon Button",-1)),e("button",{onClick:t[1]||(t[1]=(...o)=>l(d)&&l(d)(...o)),class:"btn btn-ghost btn-sm"},[u(l(k),{name:l(c)==="mitrekalight"?"moon":"sun",size:20},null,8,["name"])])]),e("div",z,[t[12]||(t[12]=e("p",{class:"text-xs opacity-60 mb-2"},"Button + Icon",-1)),e("button",{onClick:t[2]||(t[2]=(...o)=>l(d)&&l(d)(...o)),class:"btn btn-outline btn-sm inline-flex items-center gap-2"},[u(l(k),{name:l(c)==="mitrekalight"?"moon":"sun",size:16},null,8,["name"]),r(" "+a(l(c)==="mitrekalight"?"Dark Mode":"Light Mode"),1)])])])]),e("section",P,[t[14]||(t[14]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Using Composable",-1)),t[15]||(t[15]=e("p",{class:"text-sm opacity-80"},[r(" Cara paling fleksibel - gunakan "),e("code",{class:"code-inline"},"useTheme()"),r(" composable. ")],-1)),e("div",G,[e("button",{class:"copy-btn",onClick:t[3]||(t[3]=o=>m(n.composable,"composable"))},a(i.value==="composable"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(n.composable),1)])])]),e("section",N,[t[16]||(t[16]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Using Component",-1)),t[17]||(t[17]=e("p",{class:"text-sm opacity-80"}," Komponen siap pakai dengan toggle button dan select dropdown. ",-1)),e("div",W,[e("button",{class:"copy-btn",onClick:t[4]||(t[4]=o=>m(n.component,"component"))},a(i.value==="component"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(n.component),1)])])]),e("section",K,[t[18]||(t[18]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"With SelectDropdown",-1)),t[19]||(t[19]=e("p",{class:"text-sm opacity-80"},[r(" Gunakan "),e("code",{class:"code-inline"},"SelectDropdown"),r(" untuk pilihan tema yang lebih formal. ")],-1)),e("div",F,[e("button",{class:"copy-btn",onClick:t[5]||(t[5]=o=>m(n.selectDropdown,"selectDropdown"))},a(i.value==="selectDropdown"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(n.selectDropdown),1)])])]),e("section",H,[t[20]||(t[20]=g('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-6550771d>With Icon Button</h2><p class="text-sm opacity-80" data-v-6550771d> Gunakan <code class="code-inline" data-v-6550771d>Icon</code> component dengan nama <code class="code-inline" data-v-6550771d>sun</code> dan <code class="code-inline" data-v-6550771d>moon</code>. </p>',2)),e("div",J,[e("button",{class:"copy-btn",onClick:t[6]||(t[6]=o=>m(n.iconButton,"iconButton"))},a(i.value==="iconButton"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(n.iconButton),1)])])]),t[22]||(t[22]=g('<section class="card p-6 space-y-4" data-v-6550771d><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-6550771d>API Reference</h2><h3 class="font-medium" data-v-6550771d>useTheme() Returns</h3><div class="overflow-x-auto" data-v-6550771d><table class="min-w-full text-sm" data-v-6550771d><thead class="bg-base-200" data-v-6550771d><tr data-v-6550771d><th class="px-4 py-2 text-left" data-v-6550771d>Property</th><th class="px-4 py-2 text-left" data-v-6550771d>Type</th><th class="px-4 py-2 text-left" data-v-6550771d>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-6550771d><tr data-v-6550771d><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>currentTheme</code></td><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>Ref&lt;Theme&gt;</code></td><td class="px-4 py-2" data-v-6550771d>Reactive current theme value</td></tr><tr data-v-6550771d><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>toggleTheme</code></td><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>() =&gt; void</code></td><td class="px-4 py-2" data-v-6550771d>Toggle antara light dan dark</td></tr><tr data-v-6550771d><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>setTheme</code></td><td class="px-4 py-2" data-v-6550771d><code class="code-inline" data-v-6550771d>(theme: Theme) =&gt; void</code></td><td class="px-4 py-2" data-v-6550771d>Set theme spesifik</td></tr></tbody></table></div><h3 class="font-medium mt-4" data-v-6550771d>Theme Type</h3><div class="code-block" data-v-6550771d><pre data-v-6550771d><code data-v-6550771d>type Theme = &quot;mitrekalight&quot; | &quot;mitrekadark&quot;</code></pre></div></section><section class="card p-6 space-y-4" data-v-6550771d><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-6550771d>How It Works</h2><ul class="list-disc list-inside space-y-2 text-sm opacity-80" data-v-6550771d><li data-v-6550771d>Theme disimpan di <code class="code-inline" data-v-6550771d>localStorage</code> dengan key &quot;theme&quot;</li><li data-v-6550771d>Attribute <code class="code-inline" data-v-6550771d>data-theme</code> di-set pada <code class="code-inline" data-v-6550771d>&lt;html&gt;</code></li><li data-v-6550771d>CSS variables berubah berdasarkan <code class="code-inline" data-v-6550771d>[data-theme=&quot;mitrekadark&quot;]</code></li><li data-v-6550771d>Theme otomatis di-restore saat page load via <code class="code-inline" data-v-6550771d>onMounted</code></li></ul></section>',2)),e("section",Q,[t[21]||(t[21]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Source Code: useTheme.ts",-1)),e("div",X,[e("button",{class:"copy-btn",onClick:t[7]||(t[7]=o=>m(n.useThemeTs,"useThemeTs"))},a(i.value==="useThemeTs"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(n.useThemeTs),1)])])])]))}}),oe=R(Y,[["__scopeId","data-v-6550771d"]]);export{oe as default};
