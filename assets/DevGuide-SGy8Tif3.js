import{d as I,r as u,c as m,j as r,b as i,a as t,e as d,y as a,x as g,t as L,q as k,n as b,l as B,o as y,z as $}from"./index-DiwQE97j.js";import{_ as z}from"./Modal.vue_vue_type_style_index_0_lang-BAeMqSp-.js";import{F as O}from"./FloatingTOC-DYld3H6n.js";import{_ as M}from"./PageHeader.vue_vue_type_script_setup_true_lang-CzeWLLsV.js";const A={class:"space-y-8"},E={id:"installation",class:"card p-6 space-y-4"},P={class:"space-y-3"},V={class:"code-block"},D={class:"space-y-3"},G={class:"code-block"},H={class:"code-block"},j={class:"space-y-3"},W={class:"code-block"},R={id:"import",class:"card p-6 space-y-4"},N={class:"space-y-3"},J={class:"code-block"},U={class:"space-y-3"},K={class:"code-block"},F={id:"buttons",class:"card p-6 space-y-4"},Y={class:"space-y-3"},q={class:"code-block"},Q={class:"space-y-3"},X={class:"code-block"},Z={class:"space-y-3"},_={class:"code-block"},tt={class:"space-y-3"},st={class:"code-block"},et={class:"space-y-3"},at={class:"code-block"},ot={id:"icon-buttons",class:"card p-6 space-y-4"},lt={class:"text-sm opacity-80"},nt={class:"space-y-3"},it={class:"code-block"},dt={id:"inputs",class:"card p-6 space-y-4"},ct={class:"space-y-3"},rt={class:"code-block"},bt={class:"space-y-3"},pt={class:"code-block"},ut={id:"badges",class:"card p-6 space-y-4"},vt={class:"space-y-3"},mt={class:"code-block"},gt={class:"space-y-3"},yt={class:"code-block"},ft={class:"space-y-3"},kt={class:"code-block"},xt={id:"alerts",class:"card p-6 space-y-4"},ht={class:"space-y-3"},Ct={class:"code-block"},Bt={id:"cards",class:"card p-6 space-y-4"},wt={class:"space-y-3"},St={class:"code-block"},Tt={id:"collapse",class:"card p-6 space-y-4"},It={class:"space-y-3"},Lt={class:"max-w-md"},$t={class:"code-block"},zt={id:"accordion",class:"card p-6 space-y-4"},Ot={class:"space-y-3"},Mt={class:"max-w-md space-y-1"},At={class:"card p-0 overflow-hidden"},Et={class:"card p-0 overflow-hidden"},Pt={class:"code-block"},Vt={id:"switches",class:"card p-6 space-y-4"},Dt={class:"space-y-3"},Gt={class:"code-block"},Ht={id:"selects",class:"card p-6 space-y-4"},jt={class:"space-y-3"},Wt={class:"flex flex-wrap gap-4 max-w-md"},Rt={class:"code-block"},Nt={id:"tables",class:"card p-6 space-y-4"},Jt={class:"space-y-3"},Ut={class:"code-block"},Kt={id:"modal",class:"card p-6 space-y-4"},Ft={class:"text-sm opacity-80"},Yt={class:"space-y-3"},qt={class:"code-block"},Qt={id:"loading",class:"card p-6 space-y-4"},Xt={class:"text-sm opacity-80"},Zt={class:"space-y-3"},_t={class:"code-block"},ts={id:"vue",class:"card p-6 space-y-4"},ss={class:"code-block"},es={id:"composables",class:"card p-6 space-y-4"},as={class:"space-y-3"},os={class:"code-block"},ls={id:"theming",class:"card p-6 space-y-4"},ns={class:"space-y-3"},is={class:"code-block"},ds={class:"space-y-3"},cs={class:"code-block"},rs=I({__name:"DevGuide",setup(bs){const l=u(null),w=[{id:"installation",label:"1. Installation"},{id:"import",label:"2. Import CSS"},{id:"buttons",label:"3. Buttons"},{id:"icon-buttons",label:"4. Icon Buttons"},{id:"inputs",label:"5. Inputs"},{id:"badges",label:"6. Badges"},{id:"alerts",label:"7. Alerts"},{id:"cards",label:"8. Cards"},{id:"collapse",label:"9. Collapse"},{id:"accordion",label:"10. Accordion"},{id:"switches",label:"11. Switch/Checkbox/Radio"},{id:"selects",label:"12. Select"},{id:"tables",label:"13. Tables"},{id:"modal",label:"14. Modal"},{id:"loading",label:"15. Loading"},{id:"vue",label:"16. Vue Components"},{id:"composables",label:"17. Composables"},{id:"theming",label:"18. Theming"}],x=u("opt1"),S=[{value:"opt1",label:"Option 1"},{value:"opt2",label:"Option 2"},{value:"opt3",label:"Option 3"}],h=u("primary"),T=[{value:"primary",label:"Primary select"}],p=u(!0),c=u(0),n=async(C,s)=>{await navigator.clipboard.writeText(C),l.value=s,setTimeout(()=>l.value=null,2e3)},e={install:"npm install @keiryusaki/mitreka-ui",npmrc:`@keiryusaki:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
always-auth=true`,tokenPowershell:'$env:GITHUB_TOKEN="YOUR_TOKEN"',tokenBash:'export GITHUB_TOKEN="YOUR_TOKEN"',importAll:`// main.ts atau main.js
import "@keiryusaki/mitreka-ui/css";`,importIndividual:`// Import individual components
import "@keiryusaki/mitreka-ui/css/base";
import "@keiryusaki/mitreka-ui/css/components/button.css";
import "@keiryusaki/mitreka-ui/css/components/input.css";
import "@keiryusaki/mitreka-ui/css/components/badge.css";`,buttonBasic:`<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>`,buttonOutline:`<button class="btn btn-outline">Default</button>
<button class="btn btn-outline btn-outline-primary">Primary</button>
<button class="btn btn-outline btn-outline-success">Success</button>
<button class="btn btn-outline btn-outline-error">Error</button>`,buttonSoft:`<button class="btn btn-soft-primary">Primary</button>
<button class="btn btn-soft-success">Success</button>
<button class="btn btn-soft-warning">Warning</button>
<button class="btn btn-soft-error">Error</button>`,buttonSize:`<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Medium (default)</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>`,buttonGhost:'<button class="btn btn-ghost">Ghost Button</button>',inputBasic:`<input class="input" placeholder="Default input" />
<input class="input input-primary" placeholder="Primary focus" />
<input class="input input-error" placeholder="Error state" />
<input class="input input-success" placeholder="Success state" />`,inputSize:`<input class="input input-xs" placeholder="Extra small" />
<input class="input input-sm" placeholder="Small" />
<input class="input" placeholder="Medium (default)" />
<input class="input input-lg" placeholder="Large" />`,badgeBasic:`<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>`,badgeOutline:`<span class="badge badge-outline">Default</span>
<span class="badge badge-outline-primary">Primary</span>
<span class="badge badge-outline-success">Success</span>
<span class="badge badge-outline-error">Error</span>`,badgeSoft:`<span class="badge badge-soft-primary">Primary</span>
<span class="badge badge-soft-success">Success</span>
<span class="badge badge-soft-warning">Warning</span>
<span class="badge badge-soft-error">Error</span>`,alertBasic:`<div class="alert alert-info">Info alert message</div>
<div class="alert alert-success">Success alert message</div>
<div class="alert alert-warning">Warning alert message</div>
<div class="alert alert-error">Error alert message</div>`,cardBasic:`<div class="card p-4">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p class="text-sm opacity-80">Card content goes here.</p>
</div>`,collapseBasic:`<div class="collapse is-open">
  <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
    <span class="collapse-title font-medium">Click to toggle</span>
    <svg class="collapse-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
    </svg>
  </div>
  <div class="collapse-content">
    <div class="collapse-content-inner">
      <div class="collapse-body">
        Collapsible content here.
      </div>
    </div>
  </div>
</div>

<!-- Variants: collapse-borderless, collapse-ghost -->`,accordionBasic:`<div class="accordion">
  <div class="accordion-item is-open">
    <div class="accordion-header" onclick="...">
      <span>Item 1</span>
      <svg class="accordion-icon">...</svg>
    </div>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="accordion-body">Content 1</div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header">...</div>
    <div class="accordion-content">...</div>
  </div>
</div>

<!-- Variants: accordion-bordered, accordion-ghost -->`,switchBasic:`<!-- Switch -->
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="switch" />
  <span>Switch label</span>
</label>

<!-- Checkbox -->
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="checkbox" />
  <span>Checkbox label</span>
</label>

<!-- Radio Group -->
<div class="flex items-center gap-4">
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="group" class="radio" checked />
    <span>Option A</span>
  </label>
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="group" class="radio" />
    <span>Option B</span>
  </label>
</div>`,selectBasic:`<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>

<select class="select select-primary">
  <option>Primary select</option>
</select>`,tableBasic:`<div data-als data-density="cozy">
  <div class="als-viewport">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,modalVue:`<script setup>
import { ref } from "vue";
import Modal from "@/components/feedback/Modal.vue";

const showModal = ref(false);
<\/script>

<template>
  <button class="btn btn-primary" @click="showModal = true">
    Open Modal
  </button>
  
  <Modal 
    :open="showModal" 
    title="Confirm Action"
    size="md"
    @close="showModal = false"
    @confirm="handleConfirm"
  >
    <p>Are you sure you want to proceed?</p>
  </Modal>
</template>

<!-- Available sizes: sm (448px), md (768px), lg (1120px), xl (almost full), full (fullscreen) -->
<!-- Props: open, title, size, hideHeader, hideFooter, confirmText, cancelText, persistent -->`,vueComponents:`<script setup>
import { Button, Badge, Card, Modal } from "@keiryusaki/mitreka-ui/vue";
<\/script>

<template>
  <Button color="primary" size="md">Click me</Button>
  <Badge color="success" variant="soft">Active</Badge>
  <Card>
    <template #title>Card Title</template>
    Card content here
  </Card>
</template>`,composables:`<script setup>
import { useTheme } from "@keiryusaki/mitreka-ui/composables";

const { isDark, toggleTheme, setTheme } = useTheme();
<\/script>

<template>
  <button @click="toggleTheme">
    {{ isDark ? '🌙' : '☀️' }} Toggle Theme
  </button>
</template>`,themeHtml:`<!-- Light theme -->
<html data-theme="mitrekalight">

<!-- Dark theme -->
<html data-theme="mitrekadark">`,themeJs:`// Menggunakan composable
import { useTheme } from "@keiryusaki/mitreka-ui/composables";

const { setTheme } = useTheme();
setTheme("dark");  // "light" | "dark" | "system"`,iconButtonBasic:`<!-- Solid variants -->
<button class="icon-btn icon-btn-solid-primary icon-btn-sm">
  <Icon name="pencil" class="w-4 h-4" />
</button>
<button class="icon-btn icon-btn-solid-error icon-btn-sm">
  <Icon name="trash" class="w-4 h-4" />
</button>

<!-- Soft variants -->
<button class="icon-btn icon-btn-soft-primary icon-btn-sm">
  <Icon name="pencil" class="w-4 h-4" />
</button>

<!-- Ghost variants -->
<button class="icon-btn icon-btn-ghost-primary icon-btn-sm">
  <Icon name="pencil" class="w-4 h-4" />
</button>

<!-- Sizes: icon-btn-xs, icon-btn-sm, icon-btn-md, icon-btn-lg -->`,loadingBasic:`<script setup>
import LoadingLogo from '@/components/feedback/LoadingLogo.vue';
<\/script>

<template>
  <!-- Basic -->
  <LoadingLogo />

  <!-- Custom size -->
  <LoadingLogo :size="120" />

  <!-- With text (animated dots) -->
  <LoadingLogo :size="80" text="Memuat" />
</template>

<!-- Props: size (number, default: 80), text (string, default: '') -->`},v=u(!1);return(C,s)=>{const f=L("router-link");return y(),m("div",A,[r(M,{category:"Guides",title:"Developer Guide",description:"Panduan lengkap penggunaan @keiryusaki/mitreka-ui."}),s[110]||(s[110]=i('<nav class="card p-4" data-v-705c27eb><h2 class="font-semibold mb-3" data-v-705c27eb>Daftar Isi</h2><ul class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm" data-v-705c27eb><li data-v-705c27eb><a href="#installation" class="hover:text-primary" data-v-705c27eb>1. Installation</a></li><li data-v-705c27eb><a href="#import" class="hover:text-primary" data-v-705c27eb>2. Import CSS</a></li><li data-v-705c27eb><a href="#buttons" class="hover:text-primary" data-v-705c27eb>3. Buttons</a></li><li data-v-705c27eb><a href="#icon-buttons" class="hover:text-primary" data-v-705c27eb>4. Icon Buttons</a></li><li data-v-705c27eb><a href="#inputs" class="hover:text-primary" data-v-705c27eb>5. Inputs</a></li><li data-v-705c27eb><a href="#badges" class="hover:text-primary" data-v-705c27eb>6. Badges</a></li><li data-v-705c27eb><a href="#alerts" class="hover:text-primary" data-v-705c27eb>7. Alerts</a></li><li data-v-705c27eb><a href="#cards" class="hover:text-primary" data-v-705c27eb>8. Cards</a></li><li data-v-705c27eb><a href="#switches" class="hover:text-primary" data-v-705c27eb>9. Switch/Checkbox</a></li><li data-v-705c27eb><a href="#selects" class="hover:text-primary" data-v-705c27eb>10. Select</a></li><li data-v-705c27eb><a href="#tables" class="hover:text-primary" data-v-705c27eb>11. Tables</a></li><li data-v-705c27eb><a href="#modal" class="hover:text-primary" data-v-705c27eb>12. Modal</a></li><li data-v-705c27eb><a href="#loading" class="hover:text-primary" data-v-705c27eb>13. Loading</a></li><li data-v-705c27eb><a href="#vue" class="hover:text-primary" data-v-705c27eb>14. Vue Components</a></li><li data-v-705c27eb><a href="#composables" class="hover:text-primary" data-v-705c27eb>15. Composables</a></li><li data-v-705c27eb><a href="#theming" class="hover:text-primary" data-v-705c27eb>16. Theming</a></li></ul></nav>',1)),t("section",E,[s[44]||(s[44]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 1. Installation ",-1)),t("div",P,[s[38]||(s[38]=t("h3",{class:"font-medium"},"Step 1: Setup .npmrc",-1)),s[39]||(s[39]=t("p",{class:"text-sm opacity-80"},[d(" Buat file "),t("code",{class:"code-inline"},".npmrc"),d(" di root project: ")],-1)),t("div",V,[t("button",{class:"copy-btn",onClick:s[0]||(s[0]=o=>n(e.npmrc,"npmrc"))},a(l.value==="npmrc"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.npmrc),1)])]),s[40]||(s[40]=t("p",{class:"text-xs opacity-70"},[d(" GitHub Packages tetap butuh token. Simpan token di environment variable, jangan taruh di file. Untuk private package: scope "),t("code",{class:"code-inline"},"read:packages"),d(" + "),t("code",{class:"code-inline"},"repo"),d(". ")],-1))]),t("div",D,[s[41]||(s[41]=t("h3",{class:"font-medium"},"Step 1b: Set environment variable",-1)),s[42]||(s[42]=t("p",{class:"text-sm opacity-80"},"Pilih salah satu sesuai terminal:",-1)),t("div",G,[t("button",{class:"copy-btn",onClick:s[1]||(s[1]=o=>n(e.tokenPowershell,"tokenPowershell"))},a(l.value==="tokenPowershell"?"Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.tokenPowershell),1)])]),t("div",H,[t("button",{class:"copy-btn",onClick:s[2]||(s[2]=o=>n(e.tokenBash,"tokenBash"))},a(l.value==="tokenBash"?"Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.tokenBash),1)])])]),t("div",j,[s[43]||(s[43]=t("h3",{class:"font-medium"},"Step 2: Install package",-1)),t("div",W,[t("button",{class:"copy-btn",onClick:s[3]||(s[3]=o=>n(e.install,"install"))},a(l.value==="install"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.install),1)])])])]),t("section",R,[s[47]||(s[47]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 2. Import CSS ",-1)),t("div",N,[s[45]||(s[45]=t("h3",{class:"font-medium"},"Import semua komponen (Recommended)",-1)),t("div",J,[t("button",{class:"copy-btn",onClick:s[4]||(s[4]=o=>n(e.importAll,"importAll"))},a(l.value==="importAll"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.importAll),1)])])]),t("div",U,[s[46]||(s[46]=t("h3",{class:"font-medium"},"Import individual (untuk optimize bundle)",-1)),t("div",K,[t("button",{class:"copy-btn",onClick:s[5]||(s[5]=o=>n(e.importIndividual,"importIndividual"))},a(l.value==="importIndividual"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.importIndividual),1)])])])]),t("section",F,[s[54]||(s[54]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 3. Buttons ",-1)),t("div",Y,[s[48]||(s[48]=i('<h3 class="font-medium" data-v-705c27eb>Solid (Default)</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><button class="btn" data-v-705c27eb>Default</button><button class="btn btn-primary" data-v-705c27eb>Primary</button><button class="btn btn-secondary" data-v-705c27eb>Secondary</button><button class="btn btn-accent" data-v-705c27eb>Accent</button><button class="btn btn-info" data-v-705c27eb>Info</button><button class="btn btn-success" data-v-705c27eb>Success</button><button class="btn btn-warning" data-v-705c27eb>Warning</button><button class="btn btn-error" data-v-705c27eb>Error</button></div>',2)),t("div",q,[t("button",{class:"copy-btn",onClick:s[6]||(s[6]=o=>n(e.buttonBasic,"buttonBasic"))},a(l.value==="buttonBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.buttonBasic),1)])])]),t("div",Q,[s[49]||(s[49]=i('<h3 class="font-medium" data-v-705c27eb>Outline</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><button class="btn btn-outline" data-v-705c27eb>Default</button><button class="btn btn-outline btn-outline-primary" data-v-705c27eb>Primary</button><button class="btn btn-outline btn-outline-success" data-v-705c27eb>Success</button><button class="btn btn-outline btn-outline-error" data-v-705c27eb>Error</button></div>',2)),t("div",X,[t("button",{class:"copy-btn",onClick:s[7]||(s[7]=o=>n(e.buttonOutline,"buttonOutline"))},a(l.value==="buttonOutline"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.buttonOutline),1)])])]),t("div",Z,[s[50]||(s[50]=i('<h3 class="font-medium" data-v-705c27eb>Soft</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><button class="btn btn-soft-primary" data-v-705c27eb>Primary</button><button class="btn btn-soft-success" data-v-705c27eb>Success</button><button class="btn btn-soft-warning" data-v-705c27eb>Warning</button><button class="btn btn-soft-error" data-v-705c27eb>Error</button></div>',2)),t("div",_,[t("button",{class:"copy-btn",onClick:s[8]||(s[8]=o=>n(e.buttonSoft,"buttonSoft"))},a(l.value==="buttonSoft"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.buttonSoft),1)])])]),t("div",tt,[s[51]||(s[51]=t("h3",{class:"font-medium"},"Ghost",-1)),s[52]||(s[52]=t("div",{class:"flex flex-wrap gap-2"},[t("button",{class:"btn btn-ghost"},"Ghost Button")],-1)),t("div",st,[t("button",{class:"copy-btn",onClick:s[9]||(s[9]=o=>n(e.buttonGhost,"buttonGhost"))},a(l.value==="buttonGhost"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.buttonGhost),1)])])]),t("div",et,[s[53]||(s[53]=i('<h3 class="font-medium" data-v-705c27eb>Sizes</h3><div class="flex flex-wrap items-center gap-2" data-v-705c27eb><button class="btn btn-primary btn-xs" data-v-705c27eb>Extra Small</button><button class="btn btn-primary btn-sm" data-v-705c27eb>Small</button><button class="btn btn-primary" data-v-705c27eb>Medium</button><button class="btn btn-primary btn-lg" data-v-705c27eb>Large</button><button class="btn btn-primary btn-xl" data-v-705c27eb>Extra Large</button></div>',2)),t("div",at,[t("button",{class:"copy-btn",onClick:s[10]||(s[10]=o=>n(e.buttonSize,"buttonSize"))},a(l.value==="buttonSize"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.buttonSize),1)])])])]),t("section",ot,[s[59]||(s[59]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 4. Icon Buttons ",-1)),t("p",lt,[s[56]||(s[56]=d(" Button khusus untuk icon dengan variants dan sizes. Lihat dokumentasi lengkap di ",-1)),r(f,{to:"/buttons",class:"text-primary underline"},{default:g(()=>[...s[55]||(s[55]=[d("Buttons",-1)])]),_:1}),s[57]||(s[57]=d(". ",-1))]),t("div",nt,[s[58]||(s[58]=i('<h3 class="font-medium" data-v-705c27eb>Variants</h3><div class="flex flex-wrap items-center gap-2" data-v-705c27eb><button class="icon-btn icon-btn-solid-primary icon-btn-sm" data-v-705c27eb><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-705c27eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-705c27eb></path></svg></button><button class="icon-btn icon-btn-soft-success icon-btn-sm" data-v-705c27eb><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-705c27eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-705c27eb></path></svg></button><button class="icon-btn icon-btn-ghost-error icon-btn-sm" data-v-705c27eb><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-705c27eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-705c27eb></path></svg></button></div>',2)),t("div",it,[t("button",{class:"copy-btn",onClick:s[11]||(s[11]=o=>n(e.iconButtonBasic,"iconButtonBasic"))},a(l.value==="iconButtonBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.iconButtonBasic),1)])])]),s[60]||(s[60]=i('<div class="text-sm" data-v-705c27eb><p class="font-medium mb-2" data-v-705c27eb>Available Classes:</p><ul class="list-disc ml-5 space-y-1 opacity-80" data-v-705c27eb><li data-v-705c27eb><strong data-v-705c27eb>Variants:</strong> <code class="code-inline" data-v-705c27eb>icon-btn-solid-{color}</code>, <code class="code-inline" data-v-705c27eb>icon-btn-soft-{color}</code>, <code class="code-inline" data-v-705c27eb>icon-btn-ghost-{color}</code></li><li data-v-705c27eb><strong data-v-705c27eb>Colors:</strong> primary, secondary, accent, info, success, warning, error</li><li data-v-705c27eb><strong data-v-705c27eb>Sizes:</strong> <code class="code-inline" data-v-705c27eb>icon-btn-xs</code>, <code class="code-inline" data-v-705c27eb>icon-btn-sm</code>, <code class="code-inline" data-v-705c27eb>icon-btn-md</code>, <code class="code-inline" data-v-705c27eb>icon-btn-lg</code></li></ul></div>',1))]),t("section",dt,[s[63]||(s[63]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 5. Inputs ",-1)),t("div",ct,[s[61]||(s[61]=i('<h3 class="font-medium" data-v-705c27eb>Basic &amp; Colors</h3><div class="grid gap-2 max-w-md" data-v-705c27eb><input class="input" placeholder="Default input" data-v-705c27eb><input class="input input-primary" placeholder="Primary focus" data-v-705c27eb><input class="input input-error" placeholder="Error state" data-v-705c27eb><input class="input input-success" placeholder="Success state" data-v-705c27eb></div>',2)),t("div",rt,[t("button",{class:"copy-btn",onClick:s[12]||(s[12]=o=>n(e.inputBasic,"inputBasic"))},a(l.value==="inputBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.inputBasic),1)])])]),t("div",bt,[s[62]||(s[62]=i('<h3 class="font-medium" data-v-705c27eb>Sizes</h3><div class="grid gap-2 max-w-md" data-v-705c27eb><input class="input input-xs" placeholder="Extra small" data-v-705c27eb><input class="input input-sm" placeholder="Small" data-v-705c27eb><input class="input" placeholder="Medium (default)" data-v-705c27eb><input class="input input-lg" placeholder="Large" data-v-705c27eb></div>',2)),t("div",pt,[t("button",{class:"copy-btn",onClick:s[13]||(s[13]=o=>n(e.inputSize,"inputSize"))},a(l.value==="inputSize"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.inputSize),1)])])])]),t("section",ut,[s[67]||(s[67]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 5. Badges ",-1)),t("div",vt,[s[64]||(s[64]=i('<h3 class="font-medium" data-v-705c27eb>Solid</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><span class="badge" data-v-705c27eb>Default</span><span class="badge badge-primary" data-v-705c27eb>Primary</span><span class="badge badge-secondary" data-v-705c27eb>Secondary</span><span class="badge badge-accent" data-v-705c27eb>Accent</span><span class="badge badge-info" data-v-705c27eb>Info</span><span class="badge badge-success" data-v-705c27eb>Success</span><span class="badge badge-warning" data-v-705c27eb>Warning</span><span class="badge badge-error" data-v-705c27eb>Error</span></div>',2)),t("div",mt,[t("button",{class:"copy-btn",onClick:s[14]||(s[14]=o=>n(e.badgeBasic,"badgeBasic"))},a(l.value==="badgeBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.badgeBasic),1)])])]),t("div",gt,[s[65]||(s[65]=i('<h3 class="font-medium" data-v-705c27eb>Outline</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><span class="badge badge-outline" data-v-705c27eb>Default</span><span class="badge badge-outline-primary" data-v-705c27eb>Primary</span><span class="badge badge-outline-success" data-v-705c27eb>Success</span><span class="badge badge-outline-error" data-v-705c27eb>Error</span></div>',2)),t("div",yt,[t("button",{class:"copy-btn",onClick:s[15]||(s[15]=o=>n(e.badgeOutline,"badgeOutline"))},a(l.value==="badgeOutline"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.badgeOutline),1)])])]),t("div",ft,[s[66]||(s[66]=i('<h3 class="font-medium" data-v-705c27eb>Soft</h3><div class="flex flex-wrap gap-2" data-v-705c27eb><span class="badge badge-soft-primary" data-v-705c27eb>Primary</span><span class="badge badge-soft-success" data-v-705c27eb>Success</span><span class="badge badge-soft-warning" data-v-705c27eb>Warning</span><span class="badge badge-soft-error" data-v-705c27eb>Error</span></div>',2)),t("div",kt,[t("button",{class:"copy-btn",onClick:s[16]||(s[16]=o=>n(e.badgeSoft,"badgeSoft"))},a(l.value==="badgeSoft"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.badgeSoft),1)])])])]),t("section",xt,[s[69]||(s[69]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 6. Alerts ",-1)),t("div",ht,[s[68]||(s[68]=i('<div class="space-y-2" data-v-705c27eb><div class="alert alert-info" data-v-705c27eb>Info alert message</div><div class="alert alert-success" data-v-705c27eb>Success alert message</div><div class="alert alert-warning" data-v-705c27eb>Warning alert message</div><div class="alert alert-error" data-v-705c27eb>Error alert message</div></div>',1)),t("div",Ct,[t("button",{class:"copy-btn",onClick:s[17]||(s[17]=o=>n(e.alertBasic,"alertBasic"))},a(l.value==="alertBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.alertBasic),1)])])])]),t("section",Bt,[s[71]||(s[71]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 7. Cards ",-1)),t("div",wt,[s[70]||(s[70]=t("div",{class:"card p-4 max-w-sm"},[t("h3",{class:"font-semibold mb-2"},"Card Title"),t("p",{class:"text-sm opacity-80"},"Card content goes here.")],-1)),t("div",St,[t("button",{class:"copy-btn",onClick:s[18]||(s[18]=o=>n(e.cardBasic,"cardBasic"))},a(l.value==="cardBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.cardBasic),1)])])])]),t("section",Tt,[s[76]||(s[76]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 8. Collapse ",-1)),t("div",It,[t("div",Lt,[t("div",{class:k(["collapse",{"is-open":p.value}]),style:{visibility:"visible !important"}},[t("div",{class:"collapse-header",onClick:s[19]||(s[19]=o=>p.value=!p.value),style:b([{display:"flex","align-items":"center","justify-content":"space-between",padding:"0.75rem 1rem",background:"var(--color-base-100)",border:"1px solid var(--color-base-300)","border-radius":"0.5rem",cursor:"pointer"},p.value?"border-radius: 0.5rem 0.5rem 0 0;":""])},[s[73]||(s[73]=t("span",{class:"font-medium"},"Click to toggle",-1)),(y(),m("svg",{class:"w-5 h-5 transition-transform duration-200",style:b({transform:p.value?"rotate(180deg)":"rotate(0deg)"}),viewBox:"0 0 20 20",fill:"currentColor"},[...s[72]||(s[72]=[t("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"},null,-1)])],4))],4),t("div",{style:b([{display:"grid",transition:"grid-template-rows 0.2s ease-out"},{gridTemplateRows:p.value?"1fr":"0fr"}])},[...s[74]||(s[74]=[t("div",{style:{overflow:"hidden"}},[t("div",{style:{padding:"1rem",border:"1px solid var(--color-base-300)","border-top":"none","border-radius":"0 0 0.5rem 0.5rem"}},[t("p",{class:"text-sm opacity-80"},"Collapsible content goes here.")])],-1)])],4)],2)]),t("div",$t,[t("button",{class:"copy-btn",onClick:s[20]||(s[20]=o=>n(e.collapseBasic,"collapseBasic"))},a(l.value==="collapseBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.collapseBasic),1)])]),s[75]||(s[75]=t("p",{class:"text-sm opacity-70"},[t("strong",null,"Tip:"),d(" Lihat dokumentasi lengkap di halaman "),t("a",{href:"/collapse",class:"text-primary hover:underline"},"Collapse"),d(". ")],-1))])]),t("section",zt,[s[84]||(s[84]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 9. Accordion ",-1)),t("div",Ot,[t("div",Mt,[t("div",At,[t("div",{class:k(["px-4 py-3 font-medium cursor-pointer flex items-center",c.value===0?"bg-primary text-primary-content":"hover:bg-base-200"]),onClick:s[21]||(s[21]=o=>c.value=c.value===0?-1:0)},[s[78]||(s[78]=t("span",{class:"flex-1"},"Accordion Item 1",-1)),(y(),m("svg",{class:"w-4 h-4 transition-transform duration-200",style:b({transform:c.value===0?"rotate(180deg)":"rotate(0deg)"}),viewBox:"0 0 20 20",fill:"currentColor"},[...s[77]||(s[77]=[t("path",{d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"},null,-1)])],4))],2),t("div",{style:b([{display:"grid",transition:"grid-template-rows 0.2s ease-out"},{gridTemplateRows:c.value===0?"1fr":"0fr"}])},[...s[79]||(s[79]=[t("div",{style:{overflow:"hidden"}},[t("div",{class:"px-4 py-3 text-sm border-t border-base-200"},"Content for item 1")],-1)])],4)]),t("div",Et,[t("div",{class:k(["px-4 py-3 font-medium cursor-pointer flex items-center",c.value===1?"bg-primary text-primary-content":"hover:bg-base-200"]),onClick:s[22]||(s[22]=o=>c.value=c.value===1?-1:1)},[s[81]||(s[81]=t("span",{class:"flex-1"},"Accordion Item 2",-1)),(y(),m("svg",{class:"w-4 h-4 transition-transform duration-200",style:b({transform:c.value===1?"rotate(180deg)":"rotate(0deg)"}),viewBox:"0 0 20 20",fill:"currentColor"},[...s[80]||(s[80]=[t("path",{d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"},null,-1)])],4))],2),t("div",{style:b([{display:"grid",transition:"grid-template-rows 0.2s ease-out"},{gridTemplateRows:c.value===1?"1fr":"0fr"}])},[...s[82]||(s[82]=[t("div",{style:{overflow:"hidden"}},[t("div",{class:"px-4 py-3 text-sm border-t border-base-200"},"Content for item 2")],-1)])],4)])]),t("div",Pt,[t("button",{class:"copy-btn",onClick:s[23]||(s[23]=o=>n(e.accordionBasic,"accordionBasic"))},a(l.value==="accordionBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.accordionBasic),1)])]),s[83]||(s[83]=t("p",{class:"text-sm opacity-70"},[t("strong",null,"Tip:"),d(" Lihat dokumentasi lengkap di halaman "),t("a",{href:"/accordion",class:"text-primary hover:underline"},"Accordion"),d(". ")],-1))])]),t("section",Vt,[s[86]||(s[86]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 10. Switch / Checkbox / Radio ",-1)),t("div",Dt,[s[85]||(s[85]=i('<div class="flex flex-wrap items-center gap-8" data-v-705c27eb><label class="flex items-center gap-2 cursor-pointer" data-v-705c27eb><input type="checkbox" class="switch" checked data-v-705c27eb><span class="text-sm" data-v-705c27eb>Switch</span></label><label class="flex items-center gap-2 cursor-pointer" data-v-705c27eb><input type="checkbox" class="checkbox" checked data-v-705c27eb><span class="text-sm" data-v-705c27eb>Checkbox</span></label><div class="flex items-center gap-4" data-v-705c27eb><label class="flex items-center gap-2 cursor-pointer" data-v-705c27eb><input type="radio" name="demoRadio" class="radio" checked data-v-705c27eb><span class="text-sm" data-v-705c27eb>Option A</span></label><label class="flex items-center gap-2 cursor-pointer" data-v-705c27eb><input type="radio" name="demoRadio" class="radio" data-v-705c27eb><span class="text-sm" data-v-705c27eb>Option B</span></label></div></div>',1)),t("div",Gt,[t("button",{class:"copy-btn",onClick:s[24]||(s[24]=o=>n(e.switchBasic,"switchBasic"))},a(l.value==="switchBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.switchBasic),1)])])])]),t("section",Ht,[s[87]||(s[87]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 11. Select ",-1)),t("div",jt,[t("div",Wt,[r(B,{modelValue:x.value,"onUpdate:modelValue":s[25]||(s[25]=o=>x.value=o),options:S,variant:"outline"},null,8,["modelValue"]),r(B,{modelValue:h.value,"onUpdate:modelValue":s[26]||(s[26]=o=>h.value=o),options:T,color:"primary",variant:"outline"},null,8,["modelValue"])]),t("div",Rt,[t("button",{class:"copy-btn",onClick:s[27]||(s[27]=o=>n(e.selectBasic,"selectBasic"))},a(l.value==="selectBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.selectBasic),1)])])])]),t("section",Nt,[s[89]||(s[89]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 12. Tables (ALS Table) ",-1)),t("div",Jt,[s[88]||(s[88]=i('<div data-als data-density="cozy" data-v-705c27eb><div class="als-viewport" data-v-705c27eb><table data-v-705c27eb><thead data-v-705c27eb><tr data-v-705c27eb><th data-v-705c27eb>Name</th><th data-v-705c27eb>Email</th><th data-v-705c27eb>Status</th></tr></thead><tbody data-v-705c27eb><tr data-v-705c27eb><td data-v-705c27eb>John Doe</td><td data-v-705c27eb>john@example.com</td><td data-v-705c27eb><span class="badge badge-soft-success badge-sm" data-v-705c27eb>Active</span></td></tr><tr data-v-705c27eb><td data-v-705c27eb>Jane Smith</td><td data-v-705c27eb>jane@example.com</td><td data-v-705c27eb><span class="badge badge-soft-warning badge-sm" data-v-705c27eb>Pending</span></td></tr></tbody></table></div></div>',1)),t("div",Ut,[t("button",{class:"copy-btn",onClick:s[28]||(s[28]=o=>n(e.tableBasic,"tableBasic"))},a(l.value==="tableBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.tableBasic),1)])])])]),t("section",Kt,[s[94]||(s[94]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 13. Modal (Vue Component) ",-1)),t("p",Ft,[s[91]||(s[91]=d(" Lihat dokumentasi lengkap di halaman ",-1)),r(f,{to:"/modal",class:"text-primary underline hover:no-underline"},{default:g(()=>[...s[90]||(s[90]=[d("Modal Component",-1)])]),_:1}),s[92]||(s[92]=d(". ",-1))]),t("div",Yt,[t("button",{class:"btn btn-primary",onClick:s[29]||(s[29]=o=>v.value=!0)}," Open Modal Demo "),t("div",qt,[t("button",{class:"copy-btn",onClick:s[30]||(s[30]=o=>n(e.modalVue,"modalVue"))},a(l.value==="modalVue"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.modalVue),1)])])]),r(z,{open:v.value,title:"Confirm Action",size:"sm",onClose:s[31]||(s[31]=o=>v.value=!1),onConfirm:s[32]||(s[32]=o=>v.value=!1)},{default:g(()=>[...s[93]||(s[93]=[t("p",null,"Are you sure you want to proceed with this action?",-1)])]),_:1},8,["open"])]),t("section",Qt,[s[98]||(s[98]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 15. Loading ",-1)),t("p",Xt,[s[96]||(s[96]=d(" Loading animation dengan dots yang morph ke logo Mitreka. Lihat dokumentasi lengkap di ",-1)),r(f,{to:"/loading",class:"text-primary underline"},{default:g(()=>[...s[95]||(s[95]=[d("Loading",-1)])]),_:1}),s[97]||(s[97]=d(". ",-1))]),t("div",Zt,[t("div",_t,[t("button",{class:"copy-btn",onClick:s[33]||(s[33]=o=>n(e.loadingBasic,"loadingBasic"))},a(l.value==="loadingBasic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.loadingBasic),1)])])]),s[99]||(s[99]=i(`<div class="text-sm" data-v-705c27eb><p class="font-medium mb-2" data-v-705c27eb>Props:</p><ul class="list-disc ml-5 space-y-1 opacity-80" data-v-705c27eb><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>size</code> - Width logo dalam px (default: 80, base reference: 60px)</li><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>text</code> - Text dengan animated dots di ujung</li></ul></div><div class="text-sm" data-v-705c27eb><p class="font-medium mb-2" data-v-705c27eb>LoadingOverlay (Global):</p><p class="opacity-80" data-v-705c27eb>Sudah terintegrasi di App.vue. Gunakan store untuk trigger:</p><div class="code-block mt-2" data-v-705c27eb><pre data-v-705c27eb><code data-v-705c27eb>const loading = useLoadingStore();
loading.start(&#39;Menyimpan data&#39;);  // show dengan custom message
loading.stop();                   // hide</code></pre></div></div>`,2))]),t("section",ts,[s[100]||(s[100]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 16. Vue Components (Optional) ",-1)),s[101]||(s[101]=t("p",{class:"text-sm opacity-80"}," Selain CSS classes, tersedia juga Vue components dengan props yang lebih mudah digunakan. ",-1)),t("div",ss,[t("button",{class:"copy-btn",onClick:s[34]||(s[34]=o=>n(e.vueComponents,"vueComponents"))},a(l.value==="vueComponents"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.vueComponents),1)])]),s[102]||(s[102]=i('<div class="text-sm" data-v-705c27eb><p class="font-medium mb-2" data-v-705c27eb>Available Vue Components:</p><ul class="list-disc ml-5 space-y-1 opacity-80" data-v-705c27eb><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>Button</code> - props: color, size, variant, loading, disabled</li><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>Badge</code> - props: color, size, variant</li><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>Card</code> - slots: default, title, footer</li><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>Modal</code> - props: open, title, maxWidth; events: close, confirm</li></ul></div>',1))]),t("section",es,[s[105]||(s[105]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 17. Composables ",-1)),t("div",as,[s[103]||(s[103]=t("h3",{class:"font-medium"},"useTheme",-1)),s[104]||(s[104]=t("p",{class:"text-sm opacity-80"},"Composable untuk manage dark/light mode.",-1)),t("div",os,[t("button",{class:"copy-btn",onClick:s[35]||(s[35]=o=>n(e.composables,"composables"))},a(l.value==="composables"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.composables),1)])])])]),t("section",ls,[s[108]||(s[108]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," 18. Theming ",-1)),t("div",ns,[s[106]||(s[106]=t("h3",{class:"font-medium"},"Via HTML attribute",-1)),t("div",is,[t("button",{class:"copy-btn",onClick:s[36]||(s[36]=o=>n(e.themeHtml,"themeHtml"))},a(l.value==="themeHtml"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.themeHtml),1)])])]),t("div",ds,[s[107]||(s[107]=t("h3",{class:"font-medium"},"Via JavaScript",-1)),t("div",cs,[t("button",{class:"copy-btn",onClick:s[37]||(s[37]=o=>n(e.themeJs,"themeJs"))},a(l.value==="themeJs"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.themeJs),1)])])]),s[109]||(s[109]=i('<div class="p-4 bg-base-200 rounded-lg" data-v-705c27eb><p class="text-sm font-medium mb-2" data-v-705c27eb>Available Themes:</p><ul class="text-sm list-disc ml-5 space-y-1 opacity-80" data-v-705c27eb><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>mitrekalight</code> - Light theme (default)</li><li data-v-705c27eb><code class="code-inline" data-v-705c27eb>mitrekadark</code> - Dark theme</li></ul></div>',1))]),s[111]||(s[111]=t("footer",{class:"text-center text-sm opacity-60 pt-8"},[t("p",null,"@keiryusaki/mitreka-ui v1.0.0"),t("p",null,[t("a",{href:"https://github.com/Keiryusaki/mitreka-ui",target:"_blank",class:"hover:text-primary"},"GitHub Repository")])],-1)),r(O,{items:w,title:"Dev Guide"})])}}}),gs=$(rs,[["__scopeId","data-v-705c27eb"]]);export{gs as default};
