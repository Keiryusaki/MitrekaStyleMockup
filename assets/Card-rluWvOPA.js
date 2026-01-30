import{z as g,c as p,o as v,C as y,L as m,d as C,r as w,j as b,a,b as i,y as e,x as u,e as r,f as k}from"./index-CTK3vSMT.js";import{F as S}from"./FloatingTOC-ByoZ4jGa.js";import{_ as j}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const T={},F={class:"card p-4 md:p-6"},A={key:0,class:"mb-3"};function B(n,o){return v(),p("section",F,[n.$slots.title?(v(),p("header",A,[m(n.$slots,"title")])):y("",!0),m(n.$slots,"default")])}const V=g(T,[["render",B]]),D={class:"space-y-8"},I={id:"basic-card",class:"card p-6 space-y-4"},H={class:"code-block"},L={id:"card-header",class:"card p-6 space-y-4"},$={class:"code-block"},U={id:"card-footer",class:"card p-6 space-y-4"},z={class:"code-block"},R={id:"full-card",class:"card p-6 space-y-4"},W={class:"code-block"},_={id:"vue-component",class:"card p-6 space-y-4"},E={class:"max-w-sm"},N={class:"code-block"},P={class:"code-block"},M={id:"padding-options",class:"card p-6 space-y-4"},J={class:"code-block"},K={id:"interactive-cards",class:"card p-6 space-y-4"},O={class:"code-block"},G={id:"card-grid",class:"card p-6 space-y-4"},q={class:"code-block"},Y={id:"cover-image",class:"card p-6 space-y-4"},Q={class:"code-block"},X={id:"horizontal-card",class:"card p-6 space-y-4"},Z={class:"code-block"},aa={id:"featured-card",class:"card p-6 space-y-4"},ta={class:"code-block"},sa={id:"compact-news",class:"card p-6 space-y-4"},ea={class:"code-block"},da={id:"avatar-variants",class:"card p-6 space-y-4"},oa={class:"code-block"},la={id:"collapsible-card",class:"card p-6 space-y-4"},ia={class:"code-block"},ca={class:"code-block"},ra=C({__name:"Card",setup(n){const o=w(null),f=[{id:"basic-card",label:"Basic Card (CSS Class)"},{id:"card-header",label:"Card with Header"},{id:"card-footer",label:"Card with Footer"},{id:"full-card",label:"Full Card"},{id:"vue-component",label:"Vue Component"},{id:"padding-options",label:"Padding Options"},{id:"interactive-cards",label:"Interactive Cards"},{id:"card-grid",label:"Card Grid Layout"},{id:"cover-image",label:"Card with Cover Image"},{id:"horizontal-card",label:"Horizontal Card"},{id:"featured-card",label:"Featured Article Card"},{id:"compact-news",label:"Compact News Card"},{id:"avatar-variants",label:"Avatar Variants"},{id:"card-use-cases",label:"Card Use Cases"},{id:"styling-reference",label:"Styling Reference"},{id:"collapsible-card",label:"Collapsible Card"},{id:"vue-slots",label:"Vue Component Slots"}],l=async(c,t)=>{await navigator.clipboard.writeText(c),o.value=t,setTimeout(()=>o.value=null,2e3)},s={cssBasic:`<!-- Basic card dengan CSS class -->
<div class="card p-4">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p class="text-sm opacity-80">Card content goes here.</p>
</div>`,cardCoverImage:`<!-- Card dengan cover image -->
<div class="card overflow-hidden">
  <img 
    src="/images/sample.jpg" 
    alt="Cover" 
    class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <span class="badge badge-primary badge-sm mb-2">Technology</span>
    <h3 class="font-semibold mb-2">Article Title Goes Here</h3>
    <p class="text-sm opacity-70 line-clamp-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300">
      <!-- Avatar dengan foto -->
      <img src="/avatar.jpg" alt="Author" class="w-8 h-8 rounded-full object-cover" />
      
      <!-- Atau avatar dengan initials -->
      <!-- <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">JD</div> -->
      
      <div class="text-xs">
        <p class="font-medium">John Doe</p>
        <p class="opacity-60">Dec 24, 2024</p>
      </div>
    </div>
  </div>
</div>`,avatarVariants:`<!-- Avatar dengan foto -->
<img 
  src="https://i.pravatar.cc/32?img=12" 
  alt="User" 
  class="w-8 h-8 rounded-full object-cover"
/>

<!-- Avatar dengan initials (fallback) -->
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
  JD
</div>

<!-- Avatar dengan warna berbeda -->
<div class="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold">AS</div>
<div class="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xs font-bold">BW</div>
<div class="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center text-error text-xs font-bold">MK</div>

<!-- Avatar sizes -->
<img src="..." class="w-6 h-6 rounded-full" />   <!-- Small -->
<img src="..." class="w-8 h-8 rounded-full" />   <!-- Default -->
<img src="..." class="w-10 h-10 rounded-full" /> <!-- Medium -->
<img src="..." class="w-12 h-12 rounded-full" /> <!-- Large -->`,cardHorizontal:`<!-- Card horizontal dengan image di kiri -->
<div class="card flex flex-col sm:flex-row overflow-hidden">
  <img 
    src="/images/sample.jpg" 
    alt="Thumbnail" 
    class="w-full sm:w-40 h-32 sm:h-auto object-cover"
  />
  <div class="p-4 flex-1">
    <span class="badge badge-soft-info badge-sm mb-2">News</span>
    <h4 class="font-semibold mb-1">Horizontal Card Title</h4>
    <p class="text-sm opacity-70 line-clamp-2">
      Short description for the horizontal card layout.
    </p>
    <p class="text-xs opacity-50 mt-2">2 hours ago</p>
  </div>
</div>`,cardFeatured:`<!-- Featured article card (large) -->
<div class="card overflow-hidden">
  <div class="relative">
    <img 
      src="/images/featured.jpg" 
      alt="Featured" 
      class="w-full h-64 object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
      <span class="badge badge-primary badge-sm mb-2">Featured</span>
      <h2 class="text-xl font-bold mb-2">Featured Article Title</h2>
      <p class="text-sm opacity-90 line-clamp-2">
        Featured article description goes here with more details.
      </p>
    </div>
  </div>
</div>`,cardCompact:`<!-- Compact news card -->
<div class="card p-3 flex gap-3">
  <img 
    src="/images/thumb.jpg" 
    alt="Thumbnail" 
    class="w-20 h-20 rounded-lg object-cover shrink-0"
  />
  <div class="flex-1 min-w-0">
    <h4 class="font-medium text-sm line-clamp-2 mb-1">
      Compact Card Title Here
    </h4>
    <p class="text-xs opacity-60">3 min read</p>
  </div>
</div>`,cssWithHeader:`<div class="card">
  <div class="p-4 border-b border-base-300">
    <h3 class="font-semibold">Card Header</h3>
  </div>
  <div class="p-4">
    <p>Card body content</p>
  </div>
</div>`,cssWithFooter:`<div class="card">
  <div class="p-4">
    <h3 class="font-semibold mb-2">Card Title</h3>
    <p class="text-sm opacity-80">Card body content</p>
  </div>
  <div class="p-4 border-t border-base-300 flex justify-end gap-2">
    <button class="btn btn-secondary btn-sm">Cancel</button>
    <button class="btn btn-primary btn-sm">Save</button>
  </div>
</div>`,cssFull:`<div class="card">
  <!-- Header -->
  <div class="p-4 border-b border-base-300 flex items-center justify-between">
    <h3 class="font-semibold">Card Title</h3>
    <button class="btn btn-ghost btn-sm">Action</button>
  </div>
  
  <!-- Body -->
  <div class="p-4">
    <p>Card body content goes here.</p>
  </div>
  
  <!-- Footer -->
  <div class="p-4 border-t border-base-300 flex justify-end gap-2">
    <button class="btn btn-secondary btn-sm">Cancel</button>
    <button class="btn btn-primary btn-sm">Save</button>
  </div>
</div>`,componentImport:'import Card from "@/components/data/Card.vue";',componentBasic:`<Card>
  <template #title>
    <h3 class="font-semibold">Card Title</h3>
  </template>
  <p>Card content goes here.</p>
</Card>`,padding:`<!-- No padding -->
<div class="card">Content</div>

<!-- Small padding -->
<div class="card p-2">Content</div>

<!-- Medium padding (recommended) -->
<div class="card p-4">Content</div>

<!-- Large padding -->
<div class="card p-6">Content</div>

<!-- Responsive padding -->
<div class="card p-4 md:p-6">Content</div>`,interactive:`/* Shadow + Lift */
.card-hover-shadow {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-hover-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.15);
}

/* Ring effect */
.card-hover-ring {
  border: 2px solid var(--color-base-300);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card-hover-ring:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

/* Soft background state */
.card-hover-soft-primary {
  transition: background-color 0.2s, border-color 0.2s;
}
.card-hover-soft-primary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 12%, var(--color-base-100));
  border-color: var(--color-primary);
}

/* Scale dengan Tailwind */
<div class="card p-4 hover:scale-[1.02] transition-transform">
  Scale card
</div>`,grid:`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card p-4">Card 1</div>
  <div class="card p-4">Card 2</div>
  <div class="card p-4">Card 3</div>
</div>`,collapsibleCss:`<!-- Collapsible Card dengan CSS -->
<div class="card card-collapsible p-4">
  <div class="card-header card-header-collapsible" onclick="this.nextElementSibling.classList.toggle('is-open'); this.querySelector('.card-collapse-icon').classList.toggle('is-open')">
    <div class="card-title">
      <h3 class="font-semibold">Collapsible Card</h3>
    </div>
    <svg class="card-collapse-icon is-open" viewBox="0 0 20 20" fill="currentColor" style="width:1.25rem;height:1.25rem">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="card-body-wrapper is-open">
    <div class="card-body-inner">
      <p class="text-sm opacity-80">
        Content yang bisa di-collapse. Klik header untuk toggle.
      </p>
    </div>
  </div>
</div>`,collapsibleVue:`<!-- Vue Component -->
import { Card } from "@keiryusaki/mitreka-ui/vue";

<Card collapsible :default-open="true">
  <template #title>
    <h3 class="font-semibold">Collapsible Card</h3>
  </template>
  <p>Content yang bisa di-collapse...</p>
</Card>

<!-- With v-model -->
<Card collapsible v-model="isOpen">
  <template #title>Card Title</template>
  Content...
</Card>`},h=async()=>{try{const c=(await k(async()=>{const{default:x}=await import("./Card-CYwc7Lza.js");return{default:x}},[])).default,t=new Blob([c],{type:"text/plain"}),d=document.createElement("a");d.href=URL.createObjectURL(t),d.download="Card.vue",d.click(),URL.revokeObjectURL(d.href)}catch(c){console.error("Gagal download file:",c)}};return(c,t)=>(v(),p("div",D,[b(j,{category:"Components",title:"Card",description:"Komponen container untuk mengelompokkan konten dengan visual yang konsisten."}),a("section",{class:"card p-4"},[a("div",{class:"flex items-center justify-between"},[t[16]||(t[16]=a("div",null,[a("h2",{class:"font-semibold"},"Download Component"),a("p",{class:"text-sm opacity-70"},"Copy file ke project Anda")],-1)),a("button",{class:"btn btn-accent btn-sm",onClick:h}," Download Card.vue ")])]),a("section",I,[t[17]||(t[17]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Basic Card (CSS Class) </h2><p class="text-sm opacity-80" data-v-66a929b4> Cara paling simple - gunakan class <code class="code-inline" data-v-66a929b4>.card</code> langsung. </p><div class="max-w-sm" data-v-66a929b4><div class="card p-4" data-v-66a929b4><h3 class="font-semibold mb-2" data-v-66a929b4>Card Title</h3><p class="text-sm opacity-80" data-v-66a929b4>Card content goes here. This is a basic card example.</p></div></div>',3)),a("div",H,[a("button",{class:"copy-btn",onClick:t[0]||(t[0]=d=>l(s.cssBasic,"cssBasic"))},e(o.value==="cssBasic"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cssBasic),1)])])]),a("section",L,[t[18]||(t[18]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Card with Header </h2><div class="max-w-sm" data-v-66a929b4><div class="card" data-v-66a929b4><div class="p-4 border-b border-base-300" data-v-66a929b4><h3 class="font-semibold" data-v-66a929b4>Card Header</h3></div><div class="p-4" data-v-66a929b4><p class="text-sm opacity-80" data-v-66a929b4>Card body content goes here.</p></div></div></div>',2)),a("div",$,[a("button",{class:"copy-btn",onClick:t[1]||(t[1]=d=>l(s.cssWithHeader,"cssWithHeader"))},e(o.value==="cssWithHeader"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cssWithHeader),1)])])]),a("section",U,[t[19]||(t[19]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Card with Footer </h2><div class="max-w-sm" data-v-66a929b4><div class="card" data-v-66a929b4><div class="p-4" data-v-66a929b4><h3 class="font-semibold mb-2" data-v-66a929b4>Card Title</h3><p class="text-sm opacity-80" data-v-66a929b4>Card body content with action buttons below.</p></div><div class="p-4 border-t border-base-300 flex justify-end gap-2" data-v-66a929b4><button class="btn btn-ghost btn-sm" data-v-66a929b4>Cancel</button><button class="btn btn-primary btn-sm" data-v-66a929b4>Save</button></div></div></div>',2)),a("div",z,[a("button",{class:"copy-btn",onClick:t[2]||(t[2]=d=>l(s.cssWithFooter,"cssWithFooter"))},e(o.value==="cssWithFooter"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cssWithFooter),1)])])]),a("section",R,[t[20]||(t[20]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Full Card (Header + Body + Footer) </h2><div class="max-w-md" data-v-66a929b4><div class="card" data-v-66a929b4><div class="p-4 border-b border-base-300 flex items-center justify-between" data-v-66a929b4><h3 class="font-semibold" data-v-66a929b4>Settings</h3><button class="btn btn-warning btn-sm" data-v-66a929b4>Edit</button></div><div class="p-4" data-v-66a929b4><p class="text-sm opacity-80" data-v-66a929b4>Configure your application settings here. Changes will be saved automatically.</p></div><div class="p-4 border-t border-base-300 flex justify-end gap-2" data-v-66a929b4><button class="btn btn-secondary btn-sm" data-v-66a929b4>Reset</button><button class="btn btn-primary btn-sm" data-v-66a929b4>Save Changes</button></div></div></div>',2)),a("div",W,[a("button",{class:"copy-btn",onClick:t[3]||(t[3]=d=>l(s.cssFull,"cssFull"))},e(o.value==="cssFull"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cssFull),1)])])]),a("section",_,[t[23]||(t[23]=a("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," Vue Component ",-1)),t[24]||(t[24]=a("p",{class:"text-sm opacity-80"}," Alternatif menggunakan Vue component dengan slot. ",-1)),a("div",E,[b(V,null,{title:u(()=>[...t[21]||(t[21]=[a("h3",{class:"font-semibold"},"Card via Component",-1)])]),default:u(()=>[t[22]||(t[22]=a("p",{class:"text-sm opacity-80"},"Content using Card.vue component with slots.",-1))]),_:1})]),a("div",N,[a("button",{class:"copy-btn",onClick:t[4]||(t[4]=d=>l(s.componentImport,"componentImport"))},e(o.value==="componentImport"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.componentImport),1)])]),a("div",P,[a("button",{class:"copy-btn",onClick:t[5]||(t[5]=d=>l(s.componentBasic,"componentBasic"))},e(o.value==="componentBasic"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.componentBasic),1)])])]),a("section",M,[t[25]||(t[25]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Padding Options </h2><div class="flex flex-wrap gap-4" data-v-66a929b4><div class="card p-2" data-v-66a929b4><span class="text-xs" data-v-66a929b4>p-2</span></div><div class="card p-4" data-v-66a929b4><span class="text-sm" data-v-66a929b4>p-4</span></div><div class="card p-6" data-v-66a929b4><span class="text-base" data-v-66a929b4>p-6</span></div></div>',2)),a("div",J,[a("button",{class:"copy-btn",onClick:t[6]||(t[6]=d=>l(s.padding,"padding"))},e(o.value==="padding"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.padding),1)])])]),a("section",K,[t[26]||(t[26]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Interactive Cards </h2><p class="text-sm opacity-80" data-v-66a929b4> Tambahkan hover effect untuk card yang clickable. </p><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-66a929b4><div class="card-interactive-shadow p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Shadow + Lift</h4><p class="text-sm opacity-70" data-v-66a929b4>Hover untuk lihat effect</p></div><div class="card-interactive-ring p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Hover Ring</h4><p class="text-sm opacity-70" data-v-66a929b4>Hover untuk lihat effect</p></div><div class="card p-4 hover:scale-[1.02] transition-transform cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Scale</h4><p class="text-sm opacity-70" data-v-66a929b4>Hover untuk lihat effect</p></div><div class="card-interactive-soft-primary p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Soft Primary</h4><p class="text-sm opacity-70" data-v-66a929b4>Hover untuk lihat effect</p></div></div><h3 class="font-medium mt-6 mb-2" data-v-66a929b4>Soft Background States</h3><div class="grid grid-cols-2 md:grid-cols-5 gap-4" data-v-66a929b4><div class="card-interactive-soft-primary p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Primary</h4><p class="text-xs opacity-70" data-v-66a929b4>Soft primary bg</p></div><div class="card-interactive-soft-success p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Success</h4><p class="text-xs opacity-70" data-v-66a929b4>Soft success bg</p></div><div class="card-interactive-soft-warning p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Warning</h4><p class="text-xs opacity-70" data-v-66a929b4>Soft warning bg</p></div><div class="card-interactive-soft-error p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Error</h4><p class="text-xs opacity-70" data-v-66a929b4>Soft error bg</p></div><div class="card-interactive-soft-info p-4 cursor-pointer" data-v-66a929b4><h4 class="font-semibold mb-1" data-v-66a929b4>Info</h4><p class="text-xs opacity-70" data-v-66a929b4>Soft info bg</p></div></div>',5)),a("div",O,[a("button",{class:"copy-btn",onClick:t[7]||(t[7]=d=>l(s.interactive,"interactive"))},e(o.value==="interactive"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.interactive),1)])])]),a("section",G,[t[27]||(t[27]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Card Grid Layout </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-66a929b4><div class="card p-4" data-v-66a929b4><h4 class="font-semibold mb-2" data-v-66a929b4>Card 1</h4><p class="text-sm opacity-70" data-v-66a929b4>First card in grid</p></div><div class="card p-4" data-v-66a929b4><h4 class="font-semibold mb-2" data-v-66a929b4>Card 2</h4><p class="text-sm opacity-70" data-v-66a929b4>Second card in grid</p></div><div class="card p-4" data-v-66a929b4><h4 class="font-semibold mb-2" data-v-66a929b4>Card 3</h4><p class="text-sm opacity-70" data-v-66a929b4>Third card in grid</p></div></div>',2)),a("div",q,[a("button",{class:"copy-btn",onClick:t[8]||(t[8]=d=>l(s.grid,"grid"))},e(o.value==="grid"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.grid),1)])])]),a("section",Y,[t[28]||(t[28]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Card with Cover Image (Article/News) </h2><p class="text-sm opacity-80" data-v-66a929b4> Card dengan gambar cover di bagian atas - cocok untuk artikel, berita, atau blog post. </p><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-66a929b4><div class="card overflow-hidden" data-v-66a929b4><img src="https://picsum.photos/seed/article1/400/300" alt="Cover" class="w-full h-48 object-cover" data-v-66a929b4><div class="p-4" data-v-66a929b4><span class="badge badge-primary badge-sm mb-2" data-v-66a929b4>Technology</span><h3 class="font-semibold mb-2" data-v-66a929b4>Getting Started with Vue 3 Composition API</h3><p class="text-sm opacity-70 line-clamp-2" data-v-66a929b4> Learn how to build modern web applications using Vue 3 and the Composition API. </p><div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300" data-v-66a929b4><img src="https://i.pravatar.cc/32?img=12" alt="John Doe" class="w-8 h-8 rounded-full object-cover" data-v-66a929b4><div class="text-xs" data-v-66a929b4><p class="font-medium" data-v-66a929b4>John Doe</p><p class="opacity-60" data-v-66a929b4>Dec 24, 2024</p></div></div></div></div><div class="card overflow-hidden" data-v-66a929b4><img src="https://picsum.photos/seed/article2/400/300" alt="Cover" class="w-full h-48 object-cover" data-v-66a929b4><div class="p-4" data-v-66a929b4><span class="badge badge-soft-success badge-sm mb-2" data-v-66a929b4>Design</span><h3 class="font-semibold mb-2" data-v-66a929b4>UI Design Principles for Modern Apps</h3><p class="text-sm opacity-70 line-clamp-2" data-v-66a929b4> Essential design principles every developer should know when building user interfaces. </p><div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300" data-v-66a929b4><img src="https://i.pravatar.cc/32?img=5" alt="Alice Smith" class="w-8 h-8 rounded-full object-cover" data-v-66a929b4><div class="text-xs" data-v-66a929b4><p class="font-medium" data-v-66a929b4>Alice Smith</p><p class="opacity-60" data-v-66a929b4>Dec 22, 2024</p></div></div></div></div><div class="card overflow-hidden" data-v-66a929b4><img src="https://picsum.photos/seed/article3/400/300" alt="Cover" class="w-full h-48 object-cover" data-v-66a929b4><div class="p-4" data-v-66a929b4><span class="badge badge-soft-warning badge-sm mb-2" data-v-66a929b4>Tutorial</span><h3 class="font-semibold mb-2" data-v-66a929b4>Building Responsive Layouts with Tailwind</h3><p class="text-sm opacity-70 line-clamp-2" data-v-66a929b4> Step-by-step guide to create beautiful responsive layouts using Tailwind CSS. </p><div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300" data-v-66a929b4><div class="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xs font-bold" data-v-66a929b4>BW</div><div class="text-xs" data-v-66a929b4><p class="font-medium" data-v-66a929b4>Bob Wilson</p><p class="opacity-60" data-v-66a929b4>Dec 20, 2024</p></div></div></div></div></div>',3)),a("div",Q,[a("button",{class:"copy-btn",onClick:t[9]||(t[9]=d=>l(s.cardCoverImage,"cardCoverImage"))},e(o.value==="cardCoverImage"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cardCoverImage),1)])])]),a("section",X,[t[29]||(t[29]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Horizontal Card (Side Image) </h2><p class="text-sm opacity-80" data-v-66a929b4> Card dengan gambar di samping - cocok untuk list berita atau artikel terkait. </p><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-66a929b4><div class="card flex flex-col sm:flex-row overflow-hidden" data-v-66a929b4><img src="https://picsum.photos/seed/horiz1/300/200" alt="Thumbnail" class="w-full sm:w-40 h-32 sm:h-auto object-cover" data-v-66a929b4><div class="p-4 flex-1" data-v-66a929b4><span class="badge badge-soft-info badge-sm mb-2" data-v-66a929b4>News</span><h4 class="font-semibold mb-1" data-v-66a929b4>Breaking: New Framework Released</h4><p class="text-sm opacity-70 line-clamp-2" data-v-66a929b4> The latest JavaScript framework promises faster performance. </p><p class="text-xs opacity-50 mt-2" data-v-66a929b4>2 hours ago</p></div></div><div class="card flex flex-col sm:flex-row overflow-hidden" data-v-66a929b4><img src="https://picsum.photos/seed/horiz2/300/200" alt="Thumbnail" class="w-full sm:w-40 h-32 sm:h-auto object-cover" data-v-66a929b4><div class="p-4 flex-1" data-v-66a929b4><span class="badge badge-soft-error badge-sm mb-2" data-v-66a929b4>Update</span><h4 class="font-semibold mb-1" data-v-66a929b4>Security Patch Available Now</h4><p class="text-sm opacity-70 line-clamp-2" data-v-66a929b4> Critical security update for all users. Update immediately. </p><p class="text-xs opacity-50 mt-2" data-v-66a929b4>5 hours ago</p></div></div></div>',3)),a("div",Z,[a("button",{class:"copy-btn",onClick:t[10]||(t[10]=d=>l(s.cardHorizontal,"cardHorizontal"))},e(o.value==="cardHorizontal"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cardHorizontal),1)])])]),a("section",aa,[t[30]||(t[30]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Featured Article Card </h2><p class="text-sm opacity-80" data-v-66a929b4> Card besar dengan overlay gradient - cocok untuk featured/highlight article. </p><div class="max-w-2xl" data-v-66a929b4><div class="card overflow-hidden" data-v-66a929b4><div class="relative" data-v-66a929b4><img src="https://picsum.photos/seed/featured/800/400" alt="Featured" class="w-full h-64 object-cover" data-v-66a929b4><div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" data-v-66a929b4></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white" data-v-66a929b4><span class="badge badge-primary badge-sm mb-2" data-v-66a929b4>Featured</span><h2 class="text-xl font-bold mb-2" data-v-66a929b4>The Future of Web Development in 2025</h2><p class="text-sm opacity-90 line-clamp-2" data-v-66a929b4> Explore the upcoming trends and technologies that will shape the web development landscape in the coming year. </p><div class="flex items-center gap-2 mt-3" data-v-66a929b4><div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold" data-v-66a929b4>ED</div><div class="text-xs" data-v-66a929b4><p class="font-medium" data-v-66a929b4>Editorial Team</p><p class="opacity-70" data-v-66a929b4>Dec 24, 2024 · 8 min read</p></div></div></div></div></div></div>',3)),a("div",ta,[a("button",{class:"copy-btn",onClick:t[11]||(t[11]=d=>l(s.cardFeatured,"cardFeatured"))},e(o.value==="cardFeatured"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cardFeatured),1)])])]),a("section",sa,[t[31]||(t[31]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Compact News Card </h2><p class="text-sm opacity-80" data-v-66a929b4> Card compact dengan thumbnail kecil - cocok untuk sidebar atau list berita singkat. </p><div class="max-w-md space-y-3" data-v-66a929b4><div class="card p-3 flex gap-3" data-v-66a929b4><img src="https://picsum.photos/seed/compact1/100/100" alt="Thumbnail" class="w-20 h-20 rounded-lg object-cover shrink-0" data-v-66a929b4><div class="flex-1 min-w-0" data-v-66a929b4><h4 class="font-medium text-sm line-clamp-2 mb-1" data-v-66a929b4> New Update: Performance Improvements Across the Platform </h4><p class="text-xs opacity-60" data-v-66a929b4>3 min read · Today</p></div></div><div class="card p-3 flex gap-3" data-v-66a929b4><img src="https://picsum.photos/seed/compact2/100/100" alt="Thumbnail" class="w-20 h-20 rounded-lg object-cover shrink-0" data-v-66a929b4><div class="flex-1 min-w-0" data-v-66a929b4><h4 class="font-medium text-sm line-clamp-2 mb-1" data-v-66a929b4> Tips for Better Code Organization in Large Projects </h4><p class="text-xs opacity-60" data-v-66a929b4>5 min read · Yesterday</p></div></div><div class="card p-3 flex gap-3" data-v-66a929b4><img src="https://picsum.photos/seed/compact3/100/100" alt="Thumbnail" class="w-20 h-20 rounded-lg object-cover shrink-0" data-v-66a929b4><div class="flex-1 min-w-0" data-v-66a929b4><h4 class="font-medium text-sm line-clamp-2 mb-1" data-v-66a929b4> Understanding Modern CSS Layout Techniques </h4><p class="text-xs opacity-60" data-v-66a929b4>4 min read · 2 days ago</p></div></div></div>',3)),a("div",ea,[a("button",{class:"copy-btn",onClick:t[12]||(t[12]=d=>l(s.cardCompact,"cardCompact"))},e(o.value==="cardCompact"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.cardCompact),1)])])]),a("section",da,[t[32]||(t[32]=i('<h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Avatar Variants </h2><p class="text-sm opacity-80" data-v-66a929b4> Dua tipe avatar untuk card: foto dan initials (fallback jika tidak ada foto). </p><div class="space-y-4" data-v-66a929b4><div data-v-66a929b4><h3 class="font-medium text-sm mb-3" data-v-66a929b4>Photo Avatars</h3><div class="flex items-end gap-4" data-v-66a929b4><div class="text-center" data-v-66a929b4><img src="https://i.pravatar.cc/24?img=1" alt="User" class="w-6 h-6 rounded-full object-cover mx-auto" data-v-66a929b4><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-6</span></div><div class="text-center" data-v-66a929b4><img src="https://i.pravatar.cc/32?img=5" alt="User" class="w-8 h-8 rounded-full object-cover mx-auto" data-v-66a929b4><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-8</span></div><div class="text-center" data-v-66a929b4><img src="https://i.pravatar.cc/40?img=12" alt="User" class="w-10 h-10 rounded-full object-cover mx-auto" data-v-66a929b4><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-10</span></div><div class="text-center" data-v-66a929b4><img src="https://i.pravatar.cc/48?img=15" alt="User" class="w-12 h-12 rounded-full object-cover mx-auto" data-v-66a929b4><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-12</span></div><div class="text-center" data-v-66a929b4><img src="https://i.pravatar.cc/64?img=20" alt="User" class="w-16 h-16 rounded-full object-cover mx-auto" data-v-66a929b4><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-16</span></div></div></div><div data-v-66a929b4><h3 class="font-medium text-sm mb-3" data-v-66a929b4>Initials Avatars (Fallback)</h3><div class="flex items-end gap-4" data-v-66a929b4><div class="text-center" data-v-66a929b4><div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold mx-auto" data-v-66a929b4>JD</div><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-6</span></div><div class="text-center" data-v-66a929b4><div class="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold mx-auto" data-v-66a929b4>AS</div><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-8</span></div><div class="text-center" data-v-66a929b4><div class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning text-sm font-bold mx-auto" data-v-66a929b4>BW</div><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-10</span></div><div class="text-center" data-v-66a929b4><div class="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center text-error text-sm font-bold mx-auto" data-v-66a929b4>MK</div><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-12</span></div><div class="text-center" data-v-66a929b4><div class="w-16 h-16 rounded-full bg-info/20 flex items-center justify-center text-info text-base font-bold mx-auto" data-v-66a929b4>ED</div><span class="text-xs opacity-60 mt-1 block" data-v-66a929b4>w-16</span></div></div></div><div data-v-66a929b4><h3 class="font-medium text-sm mb-3" data-v-66a929b4>Avatar Color Variants</h3><div class="flex flex-wrap gap-3" data-v-66a929b4><div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold" data-v-66a929b4>PR</div><div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold" data-v-66a929b4>SC</div><div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold" data-v-66a929b4>AC</div><div class="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success text-sm font-bold" data-v-66a929b4>SU</div><div class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning text-sm font-bold" data-v-66a929b4>WA</div><div class="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center text-error text-sm font-bold" data-v-66a929b4>ER</div><div class="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center text-info text-sm font-bold" data-v-66a929b4>IN</div></div></div></div>',3)),a("div",oa,[a("button",{class:"copy-btn",onClick:t[13]||(t[13]=d=>l(s.avatarVariants,"avatarVariants"))},e(o.value==="avatarVariants"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.avatarVariants),1)])])]),t[39]||(t[39]=i('<section id="card-use-cases" class="card p-6 space-y-4" data-v-66a929b4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Card Use Cases </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-66a929b4><div class="card p-4" data-v-66a929b4><div class="flex items-center gap-3 mb-3" data-v-66a929b4><img src="https://i.pravatar.cc/48?img=12" alt="John Doe" class="w-12 h-12 rounded-full object-cover" data-v-66a929b4><div data-v-66a929b4><h4 class="font-semibold" data-v-66a929b4>John Doe</h4><p class="text-sm opacity-60" data-v-66a929b4>Software Engineer</p></div></div><p class="text-sm opacity-80" data-v-66a929b4>Building awesome things with Vue.js and TypeScript.</p></div><div class="card p-4" data-v-66a929b4><div class="flex items-center justify-between mb-2" data-v-66a929b4><span class="text-sm opacity-60" data-v-66a929b4>Total Revenue</span><span class="badge badge-success badge-sm" data-v-66a929b4>+12%</span></div><p class="text-2xl font-bold" data-v-66a929b4>Rp 45.6M</p><p class="text-xs opacity-50 mt-1" data-v-66a929b4>Compared to last month</p></div><div class="card p-4" data-v-66a929b4><h4 class="font-semibold mb-2" data-v-66a929b4>Quick Actions</h4><div class="flex flex-wrap gap-2" data-v-66a929b4><button class="btn btn-soft-primary btn-sm" data-v-66a929b4>New Project</button><button class="btn btn-soft-success btn-sm" data-v-66a929b4>Add User</button><button class="btn btn-soft-info btn-sm" data-v-66a929b4>Reports</button></div></div><div class="card p-4 border-l-4 border-info" data-v-66a929b4><h4 class="font-semibold text-info mb-1" data-v-66a929b4>Information</h4><p class="text-sm opacity-80" data-v-66a929b4>This is an informational card with accent border.</p></div></div></section><section id="styling-reference" class="card p-6 space-y-4" data-v-66a929b4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Styling Reference </h2><div class="overflow-x-auto" data-v-66a929b4><table class="min-w-full text-sm" data-v-66a929b4><thead class="bg-base-200" data-v-66a929b4><tr data-v-66a929b4><th class="px-4 py-2 text-left" data-v-66a929b4>Class</th><th class="px-4 py-2 text-left" data-v-66a929b4>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-66a929b4><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.card</code></td><td class="px-4 py-2" data-v-66a929b4>Base card styling (background, border-radius, shadow)</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.p-4</code></td><td class="px-4 py-2" data-v-66a929b4>Standard padding (16px)</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.border-b</code></td><td class="px-4 py-2" data-v-66a929b4>Bottom border untuk header</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.border-t</code></td><td class="px-4 py-2" data-v-66a929b4>Top border untuk footer</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.border-base-300</code></td><td class="px-4 py-2" data-v-66a929b4>Border color yang sesuai theme</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>.hover:shadow-lg</code></td><td class="px-4 py-2" data-v-66a929b4>Shadow on hover untuk interactive card</td></tr></tbody></table></div></section>',2)),a("section",la,[t[33]||(t[33]=a("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"}," Collapsible Card ",-1)),t[34]||(t[34]=a("p",{class:"text-sm opacity-80"}," Card dengan konten yang bisa di-expand/collapse. Cocok untuk informasi panjang yang tidak perlu ditampilkan sekaligus. ",-1)),t[35]||(t[35]=a("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4"},[a("div",{class:"card card-collapsible p-4"},[a("div",{class:"card-header card-header-collapsible mb-3",onclick:"const wrapper = this.nextElementSibling; const icon = this.querySelector('.card-collapse-icon'); wrapper.classList.toggle('is-open'); icon.classList.toggle('is-open');"},[a("div",{class:"card-title"},[a("h3",{class:"font-semibold"},"Open by Default")]),a("svg",{class:"card-collapse-icon is-open",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})])]),a("div",{class:"card-body-wrapper is-open"},[a("div",{class:"card-body-inner"},[a("p",{class:"text-sm opacity-80"}," Ini adalah konten yang bisa di-collapse. Klik header untuk menutup. "),a("p",{class:"text-sm opacity-80 mt-2"}," Konten tambahan yang panjang bisa disembunyikan untuk menghemat ruang. ")])])]),a("div",{class:"card card-collapsible p-4"},[a("div",{class:"card-header card-header-collapsible mb-3",onclick:"const wrapper = this.nextElementSibling; const icon = this.querySelector('.card-collapse-icon'); wrapper.classList.toggle('is-open'); icon.classList.toggle('is-open');"},[a("div",{class:"card-title"},[a("h3",{class:"font-semibold"},"Closed by Default")]),a("svg",{class:"card-collapse-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"})])]),a("div",{class:"card-body-wrapper"},[a("div",{class:"card-body-inner"},[a("p",{class:"text-sm opacity-80"}," Konten ini awalnya tersembunyi. Klik header untuk membukanya. ")])])])],-1)),a("div",ia,[a("button",{class:"copy-btn",onClick:t[14]||(t[14]=d=>l(s.collapsibleCss,"collapsibleCss"))},e(o.value==="collapsibleCss"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.collapsibleCss),1)])]),t[36]||(t[36]=a("h3",{class:"font-medium mt-6"},"Vue Component",-1)),t[37]||(t[37]=a("p",{class:"text-sm opacity-80"},[r(" Gunakan prop "),a("code",{class:"code-inline"},"collapsible"),r(" dan "),a("code",{class:"code-inline"},"default-open"),r(" pada Card component. ")],-1)),a("div",ca,[a("button",{class:"copy-btn",onClick:t[15]||(t[15]=d=>l(s.collapsibleVue,"collapsibleVue"))},e(o.value==="collapsibleVue"?"✓ Copied!":"Copy"),1),a("pre",null,[a("code",null,e(s.collapsibleVue),1)])]),t[38]||(t[38]=a("div",{class:"mt-4 p-3 bg-info/10 border border-info/30 rounded-lg"},[a("p",{class:"text-sm"},[a("strong",null,"Tip:"),r(" Untuk fitur Collapse yang lebih lengkap atau Accordion (multiple collapse dengan auto-close), lihat halaman "),a("a",{href:"/collapse",class:"text-primary underline"},"Collapse"),r(" dan "),a("a",{href:"/accordion",class:"text-primary underline"},"Accordion"),r(". ")])],-1))]),t[40]||(t[40]=i('<section id="vue-slots" class="card p-6 space-y-4" data-v-66a929b4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-66a929b4> Vue Component Slots </h2><div class="overflow-x-auto" data-v-66a929b4><table class="min-w-full text-sm" data-v-66a929b4><thead class="bg-base-200" data-v-66a929b4><tr data-v-66a929b4><th class="px-4 py-2 text-left" data-v-66a929b4>Slot</th><th class="px-4 py-2 text-left" data-v-66a929b4>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-66a929b4><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>default</code></td><td class="px-4 py-2" data-v-66a929b4>Konten utama card</td></tr><tr data-v-66a929b4><td class="px-4 py-2" data-v-66a929b4><code class="code-inline" data-v-66a929b4>#title</code></td><td class="px-4 py-2" data-v-66a929b4>Header/title card (dengan margin bottom)</td></tr></tbody></table></div></section>',1)),b(S,{items:f,title:"Card Sections"})]))}}),va=g(ra,[["__scopeId","data-v-66a929b4"]]);export{va as default};
