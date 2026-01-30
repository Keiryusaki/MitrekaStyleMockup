import{d as m,r as f,c as u,j as c,a as t,b as v,y as a,O as x,e as d,x as p,t as y,f as g,o as k,z as h}from"./index-CTK3vSMT.js";import{_ as w}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const C={class:"space-y-8"},_={class:"card p-6 space-y-4"},B={class:"code-block"},j={class:"card p-6 space-y-4"},I={class:"p-4 bg-base-200 rounded-lg"},U={class:"code-block"},R={class:"card p-6 space-y-4"},L={class:"code-block"},H={class:"card p-6 space-y-4"},M={class:"p-4 bg-base-200 rounded-lg"},$={class:"text-sm mb-4"},E={class:"flex items-center gap-2"},D={class:"flex items-center gap-2"},O={class:"code-block"},T={class:"card p-6 space-y-4"},z={class:"p-4 bg-base-200 rounded-lg"},S={class:"text-sm mb-4"},V={class:"flex items-center gap-2"},A={class:"code-block"},N=m({__name:"Breadcrumbs",setup(P){const l=f(null),i=async(r,s)=>{await navigator.clipboard.writeText(r),l.value=s,setTimeout(()=>l.value=null,2e3)},e={import:'import Breadcrumbs from "@/components/nav/Breadcrumbs.vue";',basic:`<template>
  <Breadcrumbs />
</template>`,component:`<template>
  <nav class="text-xs sm:text-sm mb-2 overflow-x-auto">
    <ol class="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
      <li><router-link to="/" class="text-primary">Home</router-link></li>
      <li v-for="(m, i) in tail" :key="i" class="flex items-center gap-1 sm:gap-2">
        <span>/</span>
        <span v-if="i < tail.length - 1">
          <router-link :to="m.path" class="text-primary">{{ m.title }}</router-link>
        </span>
        <span v-else class="opacity-70">{{ m.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tail = computed(() => {
  const segs = route.path.split("/").filter(Boolean);
  const acc: { title: string; path: string }[] = [];
  let cur = "";
  segs.forEach((s) => {
    cur += \`/\${s}\`;
    acc.push({ 
      title: s.charAt(0).toUpperCase() + s.slice(1), 
      path: cur 
    });
  });
  return acc;
});
<\/script>`,customBreadcrumb:`<template>
  <nav class="text-sm mb-4">
    <ol class="flex items-center gap-2">
      <li>
        <router-link to="/" class="text-primary hover:underline">
          Home
        </router-link>
      </li>
      <li class="flex items-center gap-2">
        <span class="opacity-50">/</span>
        <router-link to="/users" class="text-primary hover:underline">
          Users
        </router-link>
      </li>
      <li class="flex items-center gap-2">
        <span class="opacity-50">/</span>
        <span class="opacity-70">Edit User</span>
      </li>
    </ol>
  </nav>
</template>`,withIcons:`<nav class="text-sm mb-4">
  <ol class="flex items-center gap-2">
    <li>
      <router-link to="/" class="text-primary hover:underline flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </router-link>
    </li>
    <li class="flex items-center gap-2">
      <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="opacity-70">Current Page</span>
    </li>
  </ol>
</nav>`},b=async()=>{try{const r=(await g(async()=>{const{default:n}=await import("./Breadcrumbs-Bn8YQZvO.js");return{default:n}},[])).default,s=new Blob([r],{type:"text/plain"}),o=document.createElement("a");o.href=URL.createObjectURL(s),o.download="Breadcrumbs.vue",o.click(),URL.revokeObjectURL(o.href)}catch(r){console.error("Gagal download file:",r)}};return(r,s)=>{const o=y("router-link");return k(),u("div",C,[c(w,{category:"Components",title:"Breadcrumbs",description:"Komponen navigasi untuk menunjukkan lokasi halaman dalam hierarki situs."}),t("section",{class:"card p-4"},[t("div",{class:"flex items-center justify-between"},[s[5]||(s[5]=t("div",null,[t("h2",{class:"font-semibold"},"Download Component"),t("p",{class:"text-sm opacity-70"},"Copy file ke project Anda")],-1)),t("button",{class:"btn btn-accent btn-sm",onClick:b}," Download Breadcrumbs.vue ")])]),t("section",_,[s[6]||(s[6]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Import",-1)),t("div",B,[t("button",{class:"copy-btn",onClick:s[0]||(s[0]=n=>i(e.import,"import"))},a(l.value==="import"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.import),1)])])]),t("section",j,[s[8]||(s[8]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Live Demo",-1)),s[9]||(s[9]=t("p",{class:"text-sm opacity-80"}," Breadcrumbs otomatis membaca path dari router dan menampilkan navigasi. ",-1)),t("div",I,[s[7]||(s[7]=t("p",{class:"text-xs opacity-60 mb-2"},"Current path: /breadcrumbs",-1)),c(x)]),t("div",U,[t("button",{class:"copy-btn",onClick:s[1]||(s[1]=n=>i(e.basic,"basic"))},a(l.value==="basic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.basic),1)])])]),t("section",R,[s[10]||(s[10]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Component Source",-1)),s[11]||(s[11]=t("p",{class:"text-sm opacity-80"},[d(" Komponen ini secara otomatis mengambil path dari "),t("code",{class:"code-inline"},"useRoute()"),d(" dan memecahnya menjadi breadcrumb items. ")],-1)),t("div",L,[t("button",{class:"copy-btn",onClick:s[2]||(s[2]=n=>i(e.component,"component"))},a(l.value==="component"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.component),1)])])]),t("section",H,[s[16]||(s[16]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Custom Breadcrumb",-1)),s[17]||(s[17]=t("p",{class:"text-sm opacity-80"}," Jika perlu kontrol lebih, buat breadcrumb manual dengan struktur HTML yang sama. ",-1)),t("div",M,[t("nav",$,[t("ol",E,[t("li",null,[c(o,{to:"/",class:"text-primary hover:underline"},{default:p(()=>[...s[12]||(s[12]=[d(" Home ",-1)])]),_:1})]),t("li",D,[s[14]||(s[14]=t("span",{class:"opacity-50"},"/",-1)),c(o,{to:"/users",class:"text-primary hover:underline"},{default:p(()=>[...s[13]||(s[13]=[d(" Users ",-1)])]),_:1})]),s[15]||(s[15]=t("li",{class:"flex items-center gap-2"},[t("span",{class:"opacity-50"},"/"),t("span",{class:"opacity-70"},"Edit User")],-1))])])]),t("div",O,[t("button",{class:"copy-btn",onClick:s[3]||(s[3]=n=>i(e.customBreadcrumb,"customBreadcrumb"))},a(l.value==="customBreadcrumb"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.customBreadcrumb),1)])])]),t("section",T,[s[20]||(s[20]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"With Icons",-1)),s[21]||(s[21]=t("p",{class:"text-sm opacity-80"}," Tambahkan icon untuk memperjelas navigasi. ",-1)),t("div",z,[t("nav",S,[t("ol",V,[t("li",null,[c(o,{to:"/",class:"text-primary hover:underline flex items-center gap-1"},{default:p(()=>[...s[18]||(s[18]=[t("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"})],-1),d(" Home ",-1)])]),_:1})]),s[19]||(s[19]=t("li",{class:"flex items-center gap-2"},[t("svg",{class:"w-4 h-4 opacity-50",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})]),t("span",{class:"opacity-70"},"Breadcrumbs")],-1))])])]),t("div",A,[t("button",{class:"copy-btn",onClick:s[4]||(s[4]=n=>i(e.withIcons,"withIcons"))},a(l.value==="withIcons"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,a(e.withIcons),1)])])]),s[22]||(s[22]=v('<section class="card p-6 space-y-4" data-v-86bff5fb><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-86bff5fb>Features</h2><ul class="list-disc ml-5 space-y-2 text-sm" data-v-86bff5fb><li data-v-86bff5fb><strong data-v-86bff5fb>Auto-generate:</strong> Otomatis membuat breadcrumb dari URL path</li><li data-v-86bff5fb><strong data-v-86bff5fb>Responsive:</strong> Ukuran teks menyesuaikan (text-xs di mobile, text-sm di desktop)</li><li data-v-86bff5fb><strong data-v-86bff5fb>Scrollable:</strong> Horizontal scroll jika breadcrumb terlalu panjang</li><li data-v-86bff5fb><strong data-v-86bff5fb>Last item disabled:</strong> Item terakhir tidak clickable (current page)</li><li data-v-86bff5fb><strong data-v-86bff5fb>Capitalize:</strong> Otomatis capitalize huruf pertama setiap segment</li></ul></section><section class="card p-6 space-y-4" data-v-86bff5fb><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-86bff5fb>Styling Classes</h2><div class="overflow-x-auto" data-v-86bff5fb><table class="min-w-full text-sm" data-v-86bff5fb><thead class="bg-base-200" data-v-86bff5fb><tr data-v-86bff5fb><th class="px-4 py-2 text-left" data-v-86bff5fb>Class</th><th class="px-4 py-2 text-left" data-v-86bff5fb>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-86bff5fb><tr data-v-86bff5fb><td class="px-4 py-2" data-v-86bff5fb><code class="code-inline" data-v-86bff5fb>text-primary</code></td><td class="px-4 py-2" data-v-86bff5fb>Warna link breadcrumb</td></tr><tr data-v-86bff5fb><td class="px-4 py-2" data-v-86bff5fb><code class="code-inline" data-v-86bff5fb>opacity-70</code></td><td class="px-4 py-2" data-v-86bff5fb>Item terakhir (current page) lebih redup</td></tr><tr data-v-86bff5fb><td class="px-4 py-2" data-v-86bff5fb><code class="code-inline" data-v-86bff5fb>overflow-x-auto</code></td><td class="px-4 py-2" data-v-86bff5fb>Horizontal scroll pada mobile</td></tr><tr data-v-86bff5fb><td class="px-4 py-2" data-v-86bff5fb><code class="code-inline" data-v-86bff5fb>whitespace-nowrap</code></td><td class="px-4 py-2" data-v-86bff5fb>Mencegah wrapping</td></tr></tbody></table></div></section>',2))])}}}),W=h(N,[["__scopeId","data-v-86bff5fb"]]);export{W as default};
