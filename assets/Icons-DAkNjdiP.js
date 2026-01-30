import{d as V,r as u,i as m,s as y,c as d,j as n,a as e,b as q,e as p,u as B,k as w,v as k,l as L,y as I,q as H,F as N,A as W,t as $,o as b}from"./index-CTK3vSMT.js";import{_ as T}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const j="data:video/mp2t;base64,aW1wb3J0IHsgSWNvbiBhcyBCYXNlSWNvbiB9IGZyb20gIkBrZWlyeXVzYWtpL21pdHJla2EtdWkvdnVlIjsKaW1wb3J0IHsgaWNvblJlZ2lzdHJ5LCB0eXBlIEljb25OYW1lIH0gZnJvbSAiQGtlaXJ5dXNha2kvbWl0cmVrYS11aSI7CgpleHBvcnQgY29uc3QgSWNvbiA9IEJhc2VJY29uOwpleHBvcnQgeyBpY29uUmVnaXN0cnkgfTsKZXhwb3J0IHR5cGUgeyBJY29uTmFtZSB9Owo=",G={class:"space-y-8"},J={class:"card flex-row space-y-4 p-6"},M={class:"rounded-box border border-base-300 p-3"},U={class:"mt-2"},R={class:"p-3 bg-base-300 rounded-lg"},X={class:"text-sm list-disc ml-5 space-y-1"},Y=["href"],z={class:"flex flex-wrap items-center gap-3"},D={class:"flex items-center gap-2 text-sm"},E={class:"flex items-center gap-2 text-sm"},O={class:"text-sm opacity-70"},Z=["innerHTML"],A={class:"mt-2 flex-row items-center text-center gap-2"},Q=["onClick","title"],F={class:"flex items-center justify-center gap-1 transition"},K=["title","onClick"],P=["onClick"],tt={class:"flex flex-wrap items-center gap-4"},et={class:"flex items-center gap-3"},lt=V({__name:"Icons",setup(st){const r=u(""),c=u("md"),l=u("text-error"),g=m(()=>{switch(c.value){case"xs":return"w-4 h-4";case"sm":return"w-5 h-5";case"md":return"w-6 h-6";case"lg":return"w-7 h-7";case"xl":return"w-8 h-8"}}),x=m(()=>Object.keys(y).map(s=>({name:s,svg:y[s]}))),v=m(()=>{const s=r.value.trim().toLowerCase();return s?x.value.filter(t=>t.name.toLowerCase().includes(s)):x.value});function f(s,t){return s?s.replace("<svg",`<svg class="${t}"`):""}async function i(s){try{await navigator.clipboard.writeText(s)}catch{window.prompt("Copy to clipboard:",s)}}function C(s){i(s)}function _(s){i(`<Icon name="${s}" />`)}function S(s){i(f(s,`${g.value} ${l.value}`))}return(s,t)=>{const a=$("Icon");return b(),d("div",G,[n(T,{category:"Components",title:"Icons",description:"Copy icon as HTML tag or SVG."}),e("section",J,[e("details",M,[t[8]||(t[8]=e("summary",{class:"cursor-pointer text-sm font-medium"}," Install · Icon.ts ",-1)),e("div",U,[e("div",R,[t[5]||(t[5]=e("p",{class:"text-sm font-medium mb-2"},"Download",-1)),e("ul",X,[e("li",null,[e("a",{class:"btn btn-accent btn-xs",href:B(j),rel:"noopener",download:"Icon.ts"},"Icon.ts",8,Y),t[3]||(t[3]=p(" → simpan ke ",-1)),t[4]||(t[4]=e("code",null,"src/composables/Icon.ts",-1))])]),t[6]||(t[6]=e("p",{class:"text-xs opacity-70 mt-2"}," Catatan: di produk, tautkan ke file di repositori project kalian. ",-1))]),t[7]||(t[7]=q(`<ol class="list-decimal ml-6 space-y-6 marker:font-medium marker:opacity-70"><li><h4 class="font-semibold mb-2">Letakkan file</h4><pre class="code"><code>src/
└─ composables/
   └─ Icon.ts</code></pre></li><li><h4 class="font-semibold mb-2"> Pakai sebagai komponen &lt;Icon/&gt; </h4><pre class="code"><code>&lt;script setup lang=&#39;ts&#39;&gt;
import { Icon } from &#39;@/composables/Icon&#39;
&lt;\\/script&gt;

&lt;template&gt;
  &lt;button class=&quot;btn&quot;&gt;
    &lt;Icon name=&quot;home&quot; class=&quot;w-5 h-5 mr-2 text-slate-700&quot; /&gt;
    Dashboard
  &lt;/button&gt;
&lt;/template&gt;</code></pre></li><li><h4 class="font-semibold mb-2">Daftar icon yang tersedia</h4><pre class="code"><code>import { iconRegistry } from &#39;@/composables/Icon&#39;
const names = Object.keys(iconRegistry) // [&#39;home&#39;,&#39;dashboard&#39;,...]</code></pre></li><li><h4 class="font-semibold mb-2">Inline SVG (opsional)</h4><pre class="code"><code>&lt;script setup lang=&#39;ts&#39;&gt;
import { iconRegistry } from &#39;@/composables/Icon&#39;
const svg = iconRegistry[&#39;home&#39;]?.replace(&#39;&lt;svg&#39;, &quot;&lt;svg class=&#39;w-6 h-6 text-primary&#39;&quot;)
&lt;\\/script&gt;

&lt;template&gt;
  &lt;span v-html=&quot;svg&quot; /&gt;
&lt;/template&gt;</code></pre></li></ol><h3 class="font-medium">Tips</h3><ul class="list-disc ml-6 text-sm space-y-1"><li> Warna mengikuti <code>currentColor</code> → cukup ganti util (mis. <code>text-primary</code>). </li><li> Ukuran pakai kelas di prop <code>class</code> (mis. <code>w-6 h-6</code>). </li><li> Untuk loop: <code>v-for=&quot;n in Object.keys(iconRegistry)&quot;</code>. </li></ul>`,3))])]),e("header",z,[t[11]||(t[11]=e("h1",{class:"text-xl font-semibold"},"Icon Gallery",-1)),w(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>r.value=o),type:"text",placeholder:"Search icon…",class:"input w-64 max-w-full"},null,512),[[k,r.value]]),e("label",D,[t[9]||(t[9]=p(" Size ",-1)),n(L,{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=o=>c.value=o),options:[{value:"xs",label:"XS (16)"},{value:"sm",label:"SM (20)"},{value:"md",label:"MD (24)"},{value:"lg",label:"LG (28)"},{value:"xl",label:"XL (32)"}],size:"sm",variant:"outline"},null,8,["modelValue"])]),e("label",E,[t[10]||(t[10]=p(" Color class ",-1)),w(e("input",{"onUpdate:modelValue":t[2]||(t[2]=o=>l.value=o),type:"text",class:"input w-44",placeholder:"text-slate-700"},null,512),[[k,l.value]])]),e("span",O,I(v.value.length)+" icon ",1)]),e("div",{class:H(["grid gap-4",{"grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8":!0}])},[(b(!0),d(N,null,W(v.value,o=>(b(),d("div",{key:o.name,class:"group rounded-lg border border-slate-200/60 dark:border-slate-700/60 p-3 hover:border-slate-400/80 dark:hover:border-slate-500/80 transition"},[e("div",{class:"mx-auto flex h-12 w-full items-center justify-center",innerHTML:f(o.svg,g.value+" "+l.value)},null,8,Z),e("div",A,[e("button",{class:"truncate text-xs hover:underline mb-2",onClick:h=>C(o.name),title:`Click to copy: ${o.name}`},I(o.name),9,Q),e("div",F,[e("button",{class:"btn btn-soft-primary btn-xs p-[3%]",title:`Copy usage: <Icon name='${o.name}' />`,onClick:h=>_(o.name)}," <Icon> ",8,K),e("button",{class:"btn btn-primary btn-xs p-[3%]",title:"Copy SVG",onClick:h=>S(o.svg)}," <svg> ",8,P)])])]))),128))]),t[12]||(t[12]=e("details",{class:"rounded-box border border-base-300 p-3"},[e("summary",{class:"cursor-pointer text-sm font-medium"}," Markup contoh (Icon di Button) "),e("pre",{class:"mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"},[e("code",null,`<!-- Icon only -->
  <button class="btn btn-ghost">
    <Icon name="home" class="w-5 h-5" />
  </button>

  <!-- Icon + text (kiri) -->
  <button class="btn btn-primary inline-flex items-center gap-2">
    <Icon name="users" class="w-5 h-5" />
    Users
  </button>

  <!-- Icon + text (kanan) -->
  <button class="btn btn-outline inline-flex items-center gap-2">
    Settings
    <Icon name="settings" class="w-5 h-5" />
  </button>

  <!-- Varian warna -->
  <button class="btn btn-warning inline-flex items-center gap-2">
    <Icon name="edit" class="w-5 h-5" />
    Edit
  </button>

  <button class="btn btn-error inline-flex items-center gap-2">
    <Icon name="delete" class="w-5 h-5" />
    Delete
  </button>`)])],-1)),e("div",tt,[e("div",et,[n(a,{name:"home",class:"w-4 h-4 text-slate-600"}),n(a,{name:"home",class:"w-5 h-5 text-slate-700"}),n(a,{name:"home",class:"w-6 h-6 text-slate-800"}),n(a,{name:"home",class:"w-8 h-8 text-primary"})])]),t[13]||(t[13]=q(`<details class="rounded-box border border-base-300 p-3"><summary class="cursor-pointer text-sm font-medium"> Markup contoh (Ukuran &amp; Warna) </summary><pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>&lt;Icon name=&quot;home&quot; class=&quot;w-4 h-4 text-slate-600&quot; /&gt;
  &lt;Icon name=&quot;home&quot; class=&quot;w-5 h-5 text-slate-700&quot; /&gt;
  &lt;Icon name=&quot;home&quot; class=&quot;w-6 h-6 text-slate-800&quot; /&gt;
  &lt;Icon name=&quot;home&quot; class=&quot;w-8 h-8 text-primary&quot; /&gt;</code></pre></details><details class="rounded-box border border-base-300 p-3"><summary class="cursor-pointer text-sm font-medium"> Markup contoh (Imperatif / AG Grid) </summary><pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>// gunakan iconRegistry untuk sisipkan SVG ke innerHTML
  import { iconRegistry } from &quot;@/composables/Icon&quot;;

  const toSvg = (name, cls = &quot;w-5 h-5 text-white&quot;) =&gt;
    iconRegistry[name]?.replace(&quot;&lt;svg&quot;, \`&lt;svg class=&quot;\${cls}&quot;\` ) ?? &quot;&quot;;

  const mkBtn = (cls, title, action /* &quot;edit&quot; | &quot;delete&quot; */) =&gt; {
    const b = document.createElement(&quot;button&quot;);
    b.type = &quot;button&quot;;
    b.className = \`btn \${cls} btn-sm inline-flex items-center justify-center\`;
    b.title = title;
    b.innerHTML = action === &quot;edit&quot; ? toSvg(&quot;edit&quot;) : toSvg(&quot;delete&quot;);
    b.addEventListener(&quot;click&quot;, (e) =&gt; e.stopPropagation());
    return b;
  };</code></pre></details>`,2))])])}}});export{lt as default};
