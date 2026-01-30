import{d as D,r as g,i as C,c as l,j as m,a as t,e as h,y as s,k as j,U,F as _,A as I,u as T,C as P,b as L,f as M,o as i,q as $,z as R}from"./index-CTK3vSMT.js";import{_ as y}from"./Pagination.vue_vue_type_script_setup_true_lang-Chr3Q7Ui.js";import{_ as V}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const A={class:"space-y-8"},B={class:"card p-6 space-y-4"},F={class:"flex flex-col items-center gap-4"},O={class:"text-sm opacity-70"},z={class:"code-inline"},G={class:"code-block"},q={class:"card p-6 space-y-4"},K={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},W={class:"p-4 bg-base-200 rounded-box text-center"},H={class:"p-4 bg-base-200 rounded-box text-center"},J={class:"p-4 bg-base-200 rounded-box text-center"},Q={class:"card p-6 space-y-4"},X={class:"space-y-4"},Y={class:"flex items-center gap-2"},Z={class:"overflow-x-auto"},tt={class:"table table-sm w-full"},et={class:"flex items-center justify-between"},at={class:"text-sm opacity-60"},st={class:"code-block"},nt={class:"card p-6 space-y-4"},ot={class:"flex justify-center"},lt={class:"flex items-center gap-2"},it=["disabled"],dt={key:1,class:"px-1 opacity-50"},ct=["onClick"],rt={key:2,class:"px-1 opacity-50"},pt=["disabled"],ut={class:"text-center text-sm opacity-60"},bt={class:"code-block"},vt={class:"card p-6 space-y-4"},gt={class:"code-block mt-4"},p=10,mt=D({__name:"Pagination",setup(yt){const u=g(null),x=async(n,e)=>{await navigator.clipboard.writeText(n),u.value=e,setTimeout(()=>u.value=null,2e3)},k=g(1),w=g(10),f=Array.from({length:50},(n,e)=>({id:e+1,name:`Item ${e+1}`,status:e%3===0?"Active":e%3===1?"Pending":"Inactive"})),c=g(5),b=g(1),S=C(()=>{const n=(b.value-1)*c.value;return f.slice(n,n+c.value)}),N=C(()=>Math.ceil(f.length/c.value)),d={basic:`<template>
  <Pagination 
    :page="currentPage" 
    :pages="totalPages" 
    @change="currentPage = $event" 
  />
</template>

<script setup>
import { ref } from "vue";
import Pagination from "@/components/misc/Pagination.vue";

const currentPage = ref(1);
const totalPages = ref(10);
<\/script>`,withTable:`<template>
  <div class="space-y-4">
    <!-- Table -->
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Pagination -->
    <div class="flex justify-end">
      <Pagination 
        :page="currentPage" 
        :pages="totalPages" 
        @change="currentPage = $event" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const allItems = [...]; // your data
const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allItems.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => 
  Math.ceil(allItems.length / itemsPerPage)
);
<\/script>`,props:`interface Props {
  page: number;   // Current page (1-based)
  pages: number;  // Total number of pages
}

// Events
@change(newPage: number) // Emitted when page changes`,customStyle:`<!-- Custom styled pagination -->
<div class="flex items-center gap-2">
  <button 
    class="btn btn-primary btn-sm"
    :disabled="page <= 1"
    @click="page--"
  >
    Previous
  </button>
  
  <div class="flex gap-1">
    <button 
      v-for="p in visiblePages" 
      :key="p"
      class="btn btn-sm"
      :class="p === page ? 'btn-primary' : 'btn-ghost'"
      @click="page = p"
    >
      {{ p }}
    </button>
  </div>
  
  <button 
    class="btn btn-primary btn-sm"
    :disabled="page >= pages"
    @click="page++"
  >
    Next
  </button>
</div>`},E=async()=>{try{const n=(await M(async()=>{const{default:v}=await import("./Pagination-gQQq-aVg.js");return{default:v}},[])).default,e=new Blob([n],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(e),a.download="Pagination.vue",a.click(),URL.revokeObjectURL(a.href)}catch(n){console.error("Gagal download file:",n)}},o=g(1),r=C(()=>{const n=[],e=Math.max(1,o.value-2),a=Math.min(p,o.value+2);for(let v=e;v<=a;v++)n.push(v);return n});return(n,e)=>(i(),l("div",A,[m(V,{category:"Components",title:"Pagination",description:"Komponen navigasi halaman untuk data yang dipaginasi."}),t("section",{class:"card p-4"},[t("div",{class:"flex items-center justify-between"},[e[12]||(e[12]=t("div",null,[t("h2",{class:"font-semibold"},"Download Component"),t("p",{class:"text-sm opacity-70"},"Copy file ke project Anda")],-1)),t("button",{class:"btn btn-accent btn-sm",onClick:E}," Download Pagination.vue ")])]),t("section",B,[e[14]||(e[14]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Basic Usage",-1)),t("div",F,[m(y,{page:k.value,pages:w.value,onChange:e[0]||(e[0]=a=>k.value=a)},null,8,["page","pages"]),t("p",O,[e[13]||(e[13]=h(" Current: ",-1)),t("code",z,s(k.value),1),h(" / "+s(w.value),1)])]),t("div",G,[t("button",{class:"copy-btn",onClick:e[1]||(e[1]=a=>x(d.basic,"basic"))},s(u.value==="basic"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,s(d.basic),1)])])]),t("section",q,[e[18]||(e[18]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"States",-1)),e[19]||(e[19]=t("p",{class:"text-sm opacity-80"}," Pagination otomatis disable tombol Prev/Next sesuai posisi halaman. ",-1)),t("div",K,[t("div",W,[e[15]||(e[15]=t("p",{class:"text-xs opacity-60 mb-2"},"First Page (Prev disabled)",-1)),m(y,{page:1,pages:10,onChange:()=>{}})]),t("div",H,[e[16]||(e[16]=t("p",{class:"text-xs opacity-60 mb-2"},"Middle Page",-1)),m(y,{page:5,pages:10,onChange:()=>{}})]),t("div",J,[e[17]||(e[17]=t("p",{class:"text-xs opacity-60 mb-2"},"Last Page (Next disabled)",-1)),m(y,{page:10,pages:10,onChange:()=>{}})])])]),t("section",Q,[e[23]||(e[23]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"With Table",-1)),e[24]||(e[24]=t("p",{class:"text-sm opacity-80"}," Contoh penggunaan dengan tabel data. ",-1)),t("div",X,[t("div",Y,[e[21]||(e[21]=t("span",{class:"text-sm"},"Items per page:",-1)),j(t("select",{"onUpdate:modelValue":e[2]||(e[2]=a=>c.value=a),class:"select select-sm select-bordered w-20",onChange:e[3]||(e[3]=a=>b.value=1)},[...e[20]||(e[20]=[t("option",{value:5},"5",-1),t("option",{value:10},"10",-1),t("option",{value:20},"20",-1)])],544),[[U,c.value]])]),t("div",Z,[t("table",tt,[e[22]||(e[22]=t("thead",{class:"bg-base-200"},[t("tr",null,[t("th",{class:"w-16"},"ID"),t("th",null,"Name"),t("th",{class:"w-24"},"Status")])],-1)),t("tbody",null,[(i(!0),l(_,null,I(S.value,a=>(i(),l("tr",{key:a.id,class:"hover:bg-base-200/50"},[t("td",null,s(a.id),1),t("td",null,s(a.name),1),t("td",null,[t("span",{class:$(["badge badge-sm",{"badge-success":a.status==="Active","badge-warning":a.status==="Pending","badge-ghost":a.status==="Inactive"}])},s(a.status),3)])]))),128))])])]),t("div",et,[t("span",at," Showing "+s((b.value-1)*c.value+1)+" - "+s(Math.min(b.value*c.value,T(f).length))+" of "+s(T(f).length),1),m(y,{page:b.value,pages:N.value,onChange:e[4]||(e[4]=a=>b.value=a)},null,8,["page","pages"])])]),t("div",st,[t("button",{class:"copy-btn",onClick:e[5]||(e[5]=a=>x(d.withTable,"withTable"))},s(u.value==="withTable"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,s(d.withTable),1)])])]),t("section",nt,[e[25]||(e[25]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Custom Pagination Style",-1)),e[26]||(e[26]=t("p",{class:"text-sm opacity-80"}," Contoh pagination dengan tombol nomor halaman. ",-1)),t("div",ot,[t("div",lt,[t("button",{class:"btn btn-primary btn-sm",disabled:o.value<=1,onClick:e[6]||(e[6]=a=>o.value--)}," Prev ",8,it),r.value[0]>1?(i(),l("button",{key:0,class:"btn btn-ghost btn-sm",onClick:e[7]||(e[7]=a=>o.value=1)}," 1 ")):P("",!0),r.value[0]>2?(i(),l("span",dt,"...")):P("",!0),(i(!0),l(_,null,I(r.value,a=>(i(),l("button",{key:a,class:$(["btn btn-sm",a===o.value?"btn-primary":"btn-ghost"]),onClick:v=>o.value=a},s(a),11,ct))),128)),r.value[r.value.length-1]<p-1?(i(),l("span",rt,"...")):P("",!0),r.value[r.value.length-1]<p?(i(),l("button",{key:3,class:"btn btn-ghost btn-sm",onClick:e[8]||(e[8]=a=>o.value=p)},s(p))):P("",!0),t("button",{class:"btn btn-primary btn-sm",disabled:o.value>=p,onClick:e[9]||(e[9]=a=>o.value++)}," Next ",8,pt)])]),t("p",ut,"Page "+s(o.value)+" of "+s(p),1),t("div",bt,[t("button",{class:"copy-btn",onClick:e[10]||(e[10]=a=>x(d.customStyle,"customStyle"))},s(u.value==="customStyle"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,s(d.customStyle),1)])])]),t("section",vt,[e[27]||(e[27]=L('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-58a66002>Props &amp; Events</h2><div class="overflow-x-auto" data-v-58a66002><table class="min-w-full text-sm" data-v-58a66002><thead class="bg-base-200" data-v-58a66002><tr data-v-58a66002><th class="px-4 py-2 text-left" data-v-58a66002>Prop</th><th class="px-4 py-2 text-left" data-v-58a66002>Type</th><th class="px-4 py-2 text-left" data-v-58a66002>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-58a66002><tr data-v-58a66002><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>page</code></td><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>number</code></td><td class="px-4 py-2" data-v-58a66002>Current page number (1-based)</td></tr><tr data-v-58a66002><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>pages</code></td><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>number</code></td><td class="px-4 py-2" data-v-58a66002>Total number of pages</td></tr></tbody></table></div><h3 class="font-medium mt-4" data-v-58a66002>Events</h3><div class="overflow-x-auto" data-v-58a66002><table class="min-w-full text-sm" data-v-58a66002><thead class="bg-base-200" data-v-58a66002><tr data-v-58a66002><th class="px-4 py-2 text-left" data-v-58a66002>Event</th><th class="px-4 py-2 text-left" data-v-58a66002>Payload</th><th class="px-4 py-2 text-left" data-v-58a66002>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-58a66002><tr data-v-58a66002><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>@change</code></td><td class="px-4 py-2" data-v-58a66002><code class="code-inline" data-v-58a66002>number</code></td><td class="px-4 py-2" data-v-58a66002>Emitted when page changes with new page number</td></tr></tbody></table></div>',4)),t("div",gt,[t("button",{class:"copy-btn",onClick:e[11]||(e[11]=a=>x(d.props,"props"))},s(u.value==="props"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,s(d.props),1)])])]),e[28]||(e[28]=t("section",{class:"card p-6 space-y-4"},[t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Tips"),t("ul",{class:"list-disc list-inside space-y-2 text-sm opacity-80"},[t("li",null,"Pagination menggunakan 1-based index (halaman pertama = 1)"),t("li",null,'Responsive: menampilkan "<" / ">" di mobile, "Prev" / "Next" di desktop'),t("li",null,"Tombol otomatis disabled saat di halaman pertama/terakhir"),t("li",null,[h("Gunakan "),t("code",{class:"code-inline"},"computed"),h(" untuk menghitung total pages dari data")]),t("li",null,"Reset ke halaman 1 saat items per page berubah")])],-1))]))}}),Pt=R(mt,[["__scopeId","data-v-58a66002"]]);export{Pt as default};
