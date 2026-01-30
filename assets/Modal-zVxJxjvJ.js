import{d as D,r as s,c as L,j as d,a as e,b as E,y as a,x as n,k as $,v as F,f as N,o as H,z as I}from"./index-CTK3vSMT.js";import{_ as i}from"./Modal.vue_vue_type_style_index_0_lang-D-TtLH91.js";import{F as T}from"./FloatingTOC-ByoZ4jGa.js";import{_ as h}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const P={class:"space-y-8"},U={id:"import",class:"card p-6 space-y-4"},B={class:"code-block"},O={id:"basic-usage",class:"card p-6 space-y-4"},j={class:"space-y-3"},R={class:"code-block"},V={id:"sizes",class:"card p-6 space-y-4"},K={class:"flex flex-wrap gap-2"},X={class:"code-block"},A={id:"hide-header-footer",class:"card p-6 space-y-4"},J={class:"flex flex-wrap gap-2"},G={class:"grid md:grid-cols-2 gap-4"},Q={class:"code-block"},W={class:"code-block"},Y={id:"custom-footer",class:"card p-6 space-y-4"},Z={class:"code-block"},_={id:"persistent",class:"card p-6 space-y-4"},tt={class:"code-block"},et={id:"modal-form",class:"card p-6 space-y-4"},ot={class:"code-block"},lt={class:"space-y-4"},at=D({__name:"Modal",setup(st){const r=s(null),S=[{id:"import",label:"Import"},{id:"basic-usage",label:"Basic Usage"},{id:"sizes",label:"Sizes"},{id:"hide-header-footer",label:"Hide Header/Footer"},{id:"custom-footer",label:"Custom Footer Slot"},{id:"persistent",label:"Persistent Mode"},{id:"modal-form",label:"Modal with Form"},{id:"props",label:"Props Reference"},{id:"events",label:"Events"},{id:"slots",label:"Slots"}],p=async(f,t)=>{await navigator.clipboard.writeText(f),r.value=t,setTimeout(()=>r.value=null,2e3)},v=s(!1),b=s(!1),c=s(!1),x=s(!1),y=s(!1),k=s(!1),M=s(!1),w=s(!1),u=s(!1),C=s(!1),g=s(!1),m=s({name:"",email:""}),l={import:'import Modal from "@/components/feedback/Modal.vue";',basic:`<script setup>
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
    title="Modal Title"
    @close="showModal = false"
    @confirm="showModal = false"
  >
    <p>Modal content goes here.</p>
  </Modal>
</template>`,sizes:`<!-- Small (448px) -->
<Modal :open="show" size="sm" title="Small Modal">...</Modal>

<!-- Medium (768px) - default -->
<Modal :open="show" size="md" title="Medium Modal">...</Modal>

<!-- Large (1120px) -->
<Modal :open="show" size="lg" title="Large Modal">...</Modal>

<!-- Extra Large (almost fullscreen) -->
<Modal :open="show" size="xl" title="XL Modal">...</Modal>

<!-- Fullscreen (true fullscreen) -->
<Modal :open="show" size="full" title="Full Modal">...</Modal>`,noHeader:`<Modal 
  :open="show" 
  :hide-header="true"
  @close="show = false"
>
  <p>Modal without header. Click outside to close.</p>
</Modal>`,noFooter:`<Modal 
  :open="show" 
  title="No Footer"
  :hide-footer="true"
  @close="show = false"
>
  <p>Modal without footer buttons.</p>
</Modal>`,customFooter:`<Modal 
  :open="show" 
  title="Custom Footer"
  @close="show = false"
>
  <p>Modal with custom footer slot.</p>
  
  <template #footer>
    <button class="btn btn-ghost" @click="show = false">
      Nanti Saja
    </button>
    <button class="btn btn-warning" @click="handleDraft">
      Simpan Draft
    </button>
    <button class="btn btn-primary" @click="handleSubmit">
      Submit
    </button>
  </template>
</Modal>`,persistent:`<Modal 
  :open="show" 
  title="Persistent Modal"
  :persistent="true"
  @close="show = false"
>
  <p>This modal won't close when clicking backdrop.</p>
  <p>User must click a button to close.</p>
</Modal>`,withForm:`<Modal 
  :open="show" 
  title="Form Modal"
  size="lg"
  confirm-text="Submit"
  @close="show = false"
  @confirm="handleSubmit"
>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Nama</label>
      <input v-model="form.name" class="input w-full" placeholder="Masukkan nama" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input v-model="form.email" class="input w-full" type="email" placeholder="email@example.com" />
    </div>
  </div>
</Modal>`},z=async()=>{try{const f=(await N(async()=>{const{default:q}=await import("./Modal-DsunXuSv.js");return{default:q}},[])).default,t=new Blob([f],{type:"text/plain"}),o=document.createElement("a");o.href=URL.createObjectURL(t),o.download="Modal.vue",o.click(),URL.revokeObjectURL(o.href)}catch(f){console.error("Gagal download file:",f)}};return(f,t)=>(H(),L("div",P,[d(h,{category:"Components",title:"Modal",description:"Komponen dialog overlay untuk konfirmasi, form, atau menampilkan konten tambahan."}),e("section",{class:"card p-4"},[e("div",{class:"flex items-center justify-between"},[t[44]||(t[44]=e("div",null,[e("h2",{class:"font-semibold"},"Download Component"),e("p",{class:"text-sm opacity-70"},"Copy file ke project Anda")],-1)),e("button",{class:"btn btn-accent btn-sm",onClick:z}," Download Modal.vue ")])]),e("section",U,[t[45]||(t[45]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Import",-1)),e("div",B,[e("button",{class:"copy-btn",onClick:t[0]||(t[0]=o=>p(l.import,"import"))},a(r.value==="import"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.import),1)])])]),e("section",O,[t[47]||(t[47]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Basic Usage",-1)),e("div",j,[e("button",{class:"btn btn-primary",onClick:t[1]||(t[1]=o=>v.value=!0)}," Open Basic Modal "),e("div",R,[e("button",{class:"copy-btn",onClick:t[2]||(t[2]=o=>p(l.basic,"basic"))},a(r.value==="basic"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.basic),1)])])]),d(i,{open:v.value,title:"Basic Modal",onClose:t[3]||(t[3]=o=>v.value=!1),onConfirm:t[4]||(t[4]=o=>v.value=!1)},{default:n(()=>[...t[46]||(t[46]=[e("p",null,"Ini adalah contoh modal sederhana dengan title, content, dan footer buttons.",-1)])]),_:1},8,["open"])]),e("section",V,[t[53]||(t[53]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Sizes",-1)),e("div",K,[e("button",{class:"btn btn-outline btn-sm",onClick:t[5]||(t[5]=o=>b.value=!0)},"Small (sm)"),e("button",{class:"btn btn-outline btn-sm",onClick:t[6]||(t[6]=o=>c.value=!0)},"Medium (md)"),e("button",{class:"btn btn-outline btn-sm",onClick:t[7]||(t[7]=o=>x.value=!0)},"Large (lg)"),e("button",{class:"btn btn-outline btn-sm",onClick:t[8]||(t[8]=o=>y.value=!0)},"Extra Large (xl)"),e("button",{class:"btn btn-outline btn-sm",onClick:t[9]||(t[9]=o=>k.value=!0)},"Full")]),e("div",X,[e("button",{class:"copy-btn",onClick:t[10]||(t[10]=o=>p(l.sizes,"sizes"))},a(r.value==="sizes"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.sizes),1)])]),d(i,{open:b.value,size:"sm",title:"Small Modal",onClose:t[11]||(t[11]=o=>b.value=!1),onConfirm:t[12]||(t[12]=o=>b.value=!1)},{default:n(()=>[...t[48]||(t[48]=[e("p",null,"Ini modal ukuran small (448px). Cocok untuk konfirmasi singkat.",-1)])]),_:1},8,["open"]),d(i,{open:c.value,size:"md",title:"Medium Modal",onClose:t[13]||(t[13]=o=>c.value=!1),onConfirm:t[14]||(t[14]=o=>c.value=!1)},{default:n(()=>[...t[49]||(t[49]=[e("p",null,"Ini modal ukuran medium/default (768px). Cocok untuk form sederhana.",-1)])]),_:1},8,["open"]),d(i,{open:x.value,size:"lg",title:"Large Modal",onClose:t[15]||(t[15]=o=>x.value=!1),onConfirm:t[16]||(t[16]=o=>x.value=!1)},{default:n(()=>[...t[50]||(t[50]=[e("p",null,"Ini modal ukuran large (1120px). Cocok untuk form kompleks atau tabel.",-1)])]),_:1},8,["open"]),d(i,{open:y.value,size:"xl",title:"Extra Large Modal",onClose:t[17]||(t[17]=o=>y.value=!1),onConfirm:t[18]||(t[18]=o=>y.value=!1)},{default:n(()=>[...t[51]||(t[51]=[e("p",null,"Ini modal ukuran extra large (almost fullscreen). Ada margin kecil di sekelilingnya.",-1)])]),_:1},8,["open"]),d(i,{open:k.value,size:"full",title:"Fullscreen Modal",onClose:t[19]||(t[19]=o=>k.value=!1),onConfirm:t[20]||(t[20]=o=>k.value=!1)},{default:n(()=>[...t[52]||(t[52]=[e("p",null,"Ini modal fullscreen. Mengisi seluruh layar tanpa margin.",-1)])]),_:1},8,["open"])]),e("section",A,[t[56]||(t[56]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Hide Header / Footer",-1)),e("div",J,[e("button",{class:"btn btn-outline btn-sm",onClick:t[21]||(t[21]=o=>M.value=!0)},"No Header"),e("button",{class:"btn btn-outline btn-sm",onClick:t[22]||(t[22]=o=>w.value=!0)},"No Footer")]),e("div",G,[e("div",Q,[e("button",{class:"copy-btn",onClick:t[23]||(t[23]=o=>p(l.noHeader,"noHeader"))},a(r.value==="noHeader"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.noHeader),1)])]),e("div",W,[e("button",{class:"copy-btn",onClick:t[24]||(t[24]=o=>p(l.noFooter,"noFooter"))},a(r.value==="noFooter"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.noFooter),1)])])]),d(i,{open:M.value,"hide-header":!0,onClose:t[25]||(t[25]=o=>M.value=!1),onConfirm:t[26]||(t[26]=o=>M.value=!1)},{default:n(()=>[...t[54]||(t[54]=[e("p",{class:"text-lg font-semibold mb-2"},"Modal tanpa header",-1),e("p",null,"Klik backdrop atau tombol di bawah untuk menutup.",-1)])]),_:1},8,["open"]),d(i,{open:w.value,title:"No Footer","hide-footer":!0,onClose:t[27]||(t[27]=o=>w.value=!1)},{default:n(()=>[...t[55]||(t[55]=[e("p",null,"Modal ini tidak memiliki footer buttons.",-1),e("p",{class:"mt-2 text-sm opacity-70"},"Klik backdrop atau tombol X untuk menutup.",-1)])]),_:1},8,["open"])]),e("section",Y,[t[58]||(t[58]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Custom Footer Slot",-1)),e("button",{class:"btn btn-outline btn-sm",onClick:t[28]||(t[28]=o=>u.value=!0)}," Open Custom Footer Modal "),e("div",Z,[e("button",{class:"copy-btn",onClick:t[29]||(t[29]=o=>p(l.customFooter,"customFooter"))},a(r.value==="customFooter"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.customFooter),1)])]),d(i,{open:u.value,title:"Custom Footer",onClose:t[33]||(t[33]=o=>u.value=!1)},{footer:n(()=>[e("button",{class:"btn btn-ghost",onClick:t[30]||(t[30]=o=>u.value=!1)},"Nanti Saja"),e("button",{class:"btn btn-warning",onClick:t[31]||(t[31]=o=>u.value=!1)},"Simpan Draft"),e("button",{class:"btn btn-primary",onClick:t[32]||(t[32]=o=>u.value=!1)},"Submit")]),default:n(()=>[t[57]||(t[57]=e("p",null,"Modal dengan custom footer menggunakan slot.",-1))]),_:1},8,["open"])]),e("section",_,[t[60]||(t[60]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Persistent Mode",-1)),t[61]||(t[61]=e("p",{class:"text-sm opacity-80"},"Modal tidak akan tertutup saat klik backdrop.",-1)),e("button",{class:"btn btn-outline btn-sm",onClick:t[34]||(t[34]=o=>C.value=!0)}," Open Persistent Modal "),e("div",tt,[e("button",{class:"copy-btn",onClick:t[35]||(t[35]=o=>p(l.persistent,"persistent"))},a(r.value==="persistent"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.persistent),1)])]),d(i,{open:C.value,title:"Persistent Modal",persistent:!0,onClose:t[36]||(t[36]=o=>C.value=!1),onConfirm:t[37]||(t[37]=o=>C.value=!1)},{default:n(()=>[...t[59]||(t[59]=[e("p",null,"Coba klik area gelap di luar modal.",-1),e("p",{class:"mt-2 text-sm opacity-70"},"Modal ini hanya bisa ditutup dengan tombol.",-1)])]),_:1},8,["open"])]),e("section",et,[t[64]||(t[64]=e("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Modal with Form",-1)),e("button",{class:"btn btn-primary",onClick:t[38]||(t[38]=o=>g.value=!0)}," Open Form Modal "),e("div",ot,[e("button",{class:"copy-btn",onClick:t[39]||(t[39]=o=>p(l.withForm,"withForm"))},a(r.value==="withForm"?"✓ Copied!":"Copy"),1),e("pre",null,[e("code",null,a(l.withForm),1)])]),d(i,{open:g.value,title:"Form Example",size:"lg","confirm-text":"Submit",onClose:t[42]||(t[42]=o=>{g.value=!1,m.value={name:"",email:""}}),onConfirm:t[43]||(t[43]=o=>g.value=!1)},{default:n(()=>[e("div",lt,[e("div",null,[t[62]||(t[62]=e("label",{class:"block text-sm font-medium mb-1"},"Nama",-1)),$(e("input",{"onUpdate:modelValue":t[40]||(t[40]=o=>m.value.name=o),class:"input w-full",placeholder:"Masukkan nama"},null,512),[[F,m.value.name]])]),e("div",null,[t[63]||(t[63]=e("label",{class:"block text-sm font-medium mb-1"},"Email",-1)),$(e("input",{"onUpdate:modelValue":t[41]||(t[41]=o=>m.value.email=o),class:"input w-full",type:"email",placeholder:"email@example.com"},null,512),[[F,m.value.email]])])])]),_:1},8,["open"])]),t[65]||(t[65]=E('<section id="props" class="card p-6 space-y-4" data-v-5694485f><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-5694485f>Props Reference</h2><div class="overflow-x-auto" data-v-5694485f><table class="min-w-full text-sm" data-v-5694485f><thead class="bg-base-200" data-v-5694485f><tr data-v-5694485f><th class="px-4 py-2 text-left" data-v-5694485f>Prop</th><th class="px-4 py-2 text-left" data-v-5694485f>Type</th><th class="px-4 py-2 text-left" data-v-5694485f>Default</th><th class="px-4 py-2 text-left" data-v-5694485f>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-5694485f><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>open</code></td><td class="px-4 py-2" data-v-5694485f>boolean</td><td class="px-4 py-2" data-v-5694485f>-</td><td class="px-4 py-2" data-v-5694485f>Mengontrol visibility modal (required)</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>title</code></td><td class="px-4 py-2" data-v-5694485f>string</td><td class="px-4 py-2" data-v-5694485f>&quot;Modal&quot;</td><td class="px-4 py-2" data-v-5694485f>Judul modal di header</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>size</code></td><td class="px-4 py-2" data-v-5694485f>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;full&quot;</td><td class="px-4 py-2" data-v-5694485f>&quot;md&quot;</td><td class="px-4 py-2" data-v-5694485f>Ukuran modal (sm=448px, md=768px, lg=1120px, xl=almost full, full=fullscreen)</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>hideHeader</code></td><td class="px-4 py-2" data-v-5694485f>boolean</td><td class="px-4 py-2" data-v-5694485f>false</td><td class="px-4 py-2" data-v-5694485f>Sembunyikan header</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>hideFooter</code></td><td class="px-4 py-2" data-v-5694485f>boolean</td><td class="px-4 py-2" data-v-5694485f>false</td><td class="px-4 py-2" data-v-5694485f>Sembunyikan footer</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>confirmText</code></td><td class="px-4 py-2" data-v-5694485f>string</td><td class="px-4 py-2" data-v-5694485f>&quot;Simpan&quot;</td><td class="px-4 py-2" data-v-5694485f>Teks tombol confirm</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>cancelText</code></td><td class="px-4 py-2" data-v-5694485f>string</td><td class="px-4 py-2" data-v-5694485f>&quot;Batal&quot;</td><td class="px-4 py-2" data-v-5694485f>Teks tombol cancel</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>persistent</code></td><td class="px-4 py-2" data-v-5694485f>boolean</td><td class="px-4 py-2" data-v-5694485f>false</td><td class="px-4 py-2" data-v-5694485f>Jika true, klik backdrop tidak menutup modal</td></tr></tbody></table></div></section><section id="events" class="card p-6 space-y-4" data-v-5694485f><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-5694485f>Events</h2><div class="overflow-x-auto" data-v-5694485f><table class="min-w-full text-sm" data-v-5694485f><thead class="bg-base-200" data-v-5694485f><tr data-v-5694485f><th class="px-4 py-2 text-left" data-v-5694485f>Event</th><th class="px-4 py-2 text-left" data-v-5694485f>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-5694485f><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>@close</code></td><td class="px-4 py-2" data-v-5694485f>Dipanggil saat modal ditutup (backdrop click, tombol X, atau cancel)</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>@confirm</code></td><td class="px-4 py-2" data-v-5694485f>Dipanggil saat tombol confirm diklik</td></tr></tbody></table></div></section><section id="slots" class="card p-6 space-y-4" data-v-5694485f><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-5694485f>Slots</h2><div class="overflow-x-auto" data-v-5694485f><table class="min-w-full text-sm" data-v-5694485f><thead class="bg-base-200" data-v-5694485f><tr data-v-5694485f><th class="px-4 py-2 text-left" data-v-5694485f>Slot</th><th class="px-4 py-2 text-left" data-v-5694485f>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-5694485f><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>default</code></td><td class="px-4 py-2" data-v-5694485f>Konten utama modal (body)</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>#header</code></td><td class="px-4 py-2" data-v-5694485f>Custom header (mengganti title)</td></tr><tr data-v-5694485f><td class="px-4 py-2" data-v-5694485f><code class="code-inline" data-v-5694485f>#footer</code></td><td class="px-4 py-2" data-v-5694485f>Custom footer (mengganti tombol default)</td></tr></tbody></table></div></section>',3)),d(T,{items:S,title:"Modal"})]))}}),pt=I(at,[["__scopeId","data-v-5694485f"]]);export{pt as default};
