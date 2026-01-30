import{d as L,J as C,r as v,i as d,K as T,c as y,a as e,j as p,k as V,e as $,m as H,l as P,F as j,A as M,y as i,b as U,f as z,t as B,o as f,q as F,z as G}from"./index-CTK3vSMT.js";/* empty css                     */const J={class:"space-y-8"},O={class:"als-toolbar"},K={class:"als-inline"},Q=["data-density","data-striped"],W={class:"als-viewport"},X={"data-col":"checkbox"},Y=["checked",".indeterminate"],Z={"data-col":"checkbox"},tt=["checked","onChange"],et={"data-col":"index"},lt={"data-col":"actions",class:"flex items-center justify-end gap-2"},at=["onClick"],ot=["onClick"],nt={class:"als-footer"},st={class:"als-footer__left"},dt={class:"als-footer__center"},it={class:"als-footer__right als-pagination"},ct=["disabled"],ut=["disabled"],gt=["disabled"],rt=["disabled"],bt={class:"card p-6 mt-10"},vt={class:"mt-3 rounded-xl border border-base-300 p-4"},pt={class:"card p-6 mt-10"},mt={open:""},ht={class:"mt-3 p-4 rounded bg-base-200 border border-base-300 space-y-2"},qt={class:"list-disc ml-5 space-y-2"},kt=L({__name:"Table",setup(yt){const x=[["A","Alpha"],["BB","Bravo"],["C","Charlie"],["DD","Delta"],["E","Echo"],["FF","Foxtrot"],["G","Golf"],["HH","Hotel"],["I","India"],["J","Juliett"],["K","Kilo"],["L","Lima"],["M","Mike"],["N","November"],["O","Oscar"],["P","Papa"],["Q","Quebec"],["R","Romeo"],["S","Sierra"],["T","Tango"],["U","Uniform"],["V","Victor"],["W","Whiskey"],["X","X-ray"],["Y","Yankee"],["Z","Zulu"]],b=C(Array.from({length:100},(a,t)=>{const c=t%x.length,[l,s]=x[c];return{id:t+1,no:t+1,code:l,name:s,description:`${s} description #${t+1}`}})),m=v(!0),h=v("cozy"),o=v(1),u=v(10),g=d(()=>Math.max(1,Math.ceil(b.length/u.value))),q=d(()=>(o.value-1)*u.value),w=d(()=>q.value+u.value),S=d(()=>b.slice(q.value,w.value));T(()=>{o.value>g.value&&(o.value=g.value),o.value<1&&(o.value=1)});const n=C(new Set),I=a=>{n.has(a)?n.delete(a):n.add(a)},r=d(()=>S.value.map(a=>a.id)),k=d(()=>r.value.length>0&&r.value.every(a=>n.has(a))),E=d(()=>r.value.some(a=>n.has(a))),A=()=>{k.value?r.value.forEach(a=>n.delete(a)):r.value.forEach(a=>n.add(a))},D=()=>n.clear(),R=a=>console.log("Edit",a),N=a=>console.log("Delete",a),_=async a=>{try{let t="";a==="ag-like-skin.css"&&(t=(await z(async()=>{const{default:s}=await import("./ag-like-skin-DH5d3ZFU.js");return{default:s}},[])).default);const c=new Blob([t],{type:"text/plain"}),l=document.createElement("a");l.href=URL.createObjectURL(c),l.download=a,l.click(),URL.revokeObjectURL(l.href)}catch(t){console.error("Gagal download file:",t)}};return(a,t)=>{const c=B("Icon");return f(),y("div",J,[e("div",null,[e("div",O,[e("label",K,[V(e("input",{type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=l=>m.value=l)},null,512),[[H,m.value]]),t[9]||(t[9]=$(" Striped ",-1))]),t[10]||(t[10]=e("span",null,"Density",-1)),p(P,{modelValue:h.value,"onUpdate:modelValue":t[1]||(t[1]=l=>h.value=l),options:[{value:"compact",label:"Compact"},{value:"cozy",label:"Cozy"},{value:"comfortable",label:"Comfortable"}],size:"sm",variant:"outline"},null,8,["modelValue"]),t[11]||(t[11]=e("div",{class:"als-toolbar__spacer"},null,-1)),e("button",{class:"als-btn",onClick:D},"Clear Selection")]),e("div",{class:"als-card als-h-560","data-als":"","data-density":h.value,"data-striped":m.value?null:"false"},[e("div",W,[e("table",null,[e("thead",null,[e("tr",null,[e("th",X,[e("input",{type:"checkbox",checked:k.value,".indeterminate":E.value&&!k.value,onChange:A},null,40,Y)]),t[12]||(t[12]=e("th",{"data-col":"index"},"No",-1)),t[13]||(t[13]=e("th",null,"Code",-1)),t[14]||(t[14]=e("th",null,"Name",-1)),t[15]||(t[15]=e("th",null,"Description",-1)),t[16]||(t[16]=e("th",{"data-col":"actions"},"Actions",-1))])]),e("tbody",null,[(f(!0),y(j,null,M(S.value,l=>(f(),y("tr",{key:l.id,class:F({"is-selected":n.has(l.id)})},[e("td",Z,[e("input",{type:"checkbox",checked:n.has(l.id),onChange:s=>I(l.id)},null,40,tt)]),e("td",et,i(l.no),1),e("td",null,i(l.code),1),e("td",null,i(l.name),1),e("td",null,i(l.description),1),e("td",lt,[e("button",{type:"button",class:"icon-btn icon-btn-solid-warning icon-btn-sm",title:"Edit",onClick:s=>R(l)},[p(c,{name:"pencil"})],8,at),e("button",{type:"button",class:"icon-btn icon-btn-solid-error icon-btn-sm",title:"Hapus",onClick:s=>N(l)},[p(c,{name:"trash"})],8,ot)])],2))),128))])])]),e("div",nt,[e("div",st,[t[17]||(t[17]=e("span",null,"Page Size:",-1)),p(P,{modelValue:u.value,"onUpdate:modelValue":t[2]||(t[2]=l=>u.value=l),options:[{value:10,label:"10"},{value:25,label:"25"},{value:50,label:"50"},{value:100,label:"100"}],size:"sm",variant:"outline"},null,8,["modelValue"])]),e("div",dt,[e("span",null,i(q.value+1)+" to "+i(Math.min(w.value,b.length))+" of "+i(b.length),1)]),e("div",it,[e("button",{class:"als-btn",disabled:o.value===1,onClick:t[3]||(t[3]=l=>o.value=1)}," « First ",8,ct),e("button",{class:"als-btn",disabled:o.value===1,onClick:t[4]||(t[4]=l=>o.value--)}," ‹ Prev ",8,ut),e("button",{class:"als-btn",disabled:o.value===g.value,onClick:t[5]||(t[5]=l=>o.value++)}," Next › ",8,gt),e("button",{class:"als-btn",disabled:o.value===g.value,onClick:t[6]||(t[6]=l=>o.value=g.value)}," Last » ",8,rt)])])],8,Q)]),e("details",bt,[t[18]||(t[18]=e("summary",{class:"cursor-pointer text-sm font-medium"}," CSS nya disini ",-1)),e("div",vt,[e("a",{class:"btn btn-accent btn-xs",href:"javascript:;",rel:"noopener",onClick:t[7]||(t[7]=l=>_("ag-like-skin.css"))},"ag-like-skin.css")])]),e("section",pt,[t[21]||(t[21]=e("h3",{class:"font-semibold"},"Developer Guide",-1)),e("details",mt,[t[20]||(t[20]=e("summary",{class:"font-medium"}," Install · ALS Table (HTML templates) ",-1)),e("div",ht,[t[19]||(t[19]=e("div",{class:"text-sm font-medium"},"Download",-1)),e("ul",qt,[e("li",null,[e("a",{class:"btn btn-accent btn-xs",href:"javascript:;",rel:"noopener",onClick:t[8]||(t[8]=l=>_("ag-like-skin.css"))},"ag-like-skin.css")])])])]),t[22]||(t[22]=U(`<ol class="list-decimal ml-6 space-y-6 marker:font-medium marker:opacity-70" data-v-82598b18><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Struktur folder</h4><pre class="code" data-v-82598b18><code data-v-82598b18>src/
├─ components/
│  └─ tables/
│     └─ AlsTable.vue        // opsional: wrapper komponen
└─ styles/
└─ als-table.css          // style untuk .als-viewport, .is-selected, dll
</code></pre></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Struktur HTML dasar</h4><pre class="code" data-v-82598b18><code data-v-82598b18>&lt;!-- wrapper wajib untuk scroll/responsive --&gt;
&lt;div class=&quot;als-viewport&quot;&gt;
&lt;table class=&quot;als-table&quot;&gt;
&lt;thead&gt;
  &lt;tr&gt;
    &lt;th data-col=&quot;index&quot;&gt;No&lt;/th&gt;
    &lt;th&gt;Code&lt;/th&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Description&lt;/th&gt;
  &lt;/tr&gt;
&lt;/thead&gt;

&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td data-col=&quot;index&quot;&gt;1&lt;/td&gt;
    &lt;td&gt;PRD-001&lt;/td&gt;
    &lt;td&gt;Product A&lt;/td&gt;
    &lt;td&gt;Short description…&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre><p class="text-xs opacity-70 mt-2" data-v-82598b18> Gunakan atribut <code data-v-82598b18>data-col</code> untuk kolom spesial: <code data-v-82598b18>checkbox</code>, <code data-v-82598b18>index</code>, <code data-v-82598b18>actions</code>. </p></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Template: Selection + Actions</h4><pre class="code" data-v-82598b18><code data-v-82598b18>&lt;div class=&quot;als-viewport&quot;&gt;
&lt;table class=&quot;als-table&quot;&gt;
&lt;thead&gt;
  &lt;tr&gt;
    &lt;th data-col=&quot;checkbox&quot;&gt;
      &lt;!-- checkbox select-all halaman --&gt;
      &lt;input type=&quot;checkbox&quot; aria-label=&quot;Select all on this page&quot; /&gt;
    &lt;/th&gt;
    &lt;th data-col=&quot;index&quot;&gt;No&lt;/th&gt;
    &lt;th&gt;Code&lt;/th&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Description&lt;/th&gt;
    &lt;th data-col=&quot;actions&quot;&gt;Actions&lt;/th&gt;
  &lt;/tr&gt;
&lt;/thead&gt;

&lt;tbody&gt;
  &lt;tr class=&quot;is-selected&quot;&gt;
    &lt;td data-col=&quot;checkbox&quot;&gt;
      &lt;input type=&quot;checkbox&quot; aria-label=&quot;Select row&quot; checked /&gt;
    &lt;/td&gt;
    &lt;td data-col=&quot;index&quot;&gt;1&lt;/td&gt;
    &lt;td&gt;PRD-001&lt;/td&gt;
    &lt;td&gt;Product A&lt;/td&gt;
    &lt;td&gt;Short description…&lt;/td&gt;
    &lt;td data-col=&quot;actions&quot; class=&quot;flex items-center justify-end gap-2&quot;&gt;
      &lt;button type=&quot;button&quot; class=&quot;icon-btn icon-btn-solid-warning icon-btn-sm&quot; title=&quot;Edit&quot;&gt;
        &lt;Icon name=&quot;pencil&quot; /&gt;
      &lt;/button&gt;
      &lt;button type=&quot;button&quot; class=&quot;icon-btn icon-btn-solid-error icon-btn-sm&quot; title=&quot;Hapus&quot;&gt;
        &lt;Icon name=&quot;trash&quot; /&gt;
      &lt;/button&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Template: Empty &amp; Loading state</h4><pre class="code" data-v-82598b18><code data-v-82598b18>&lt;!-- Empty --&gt;
&lt;div class=&quot;als-viewport&quot;&gt;
&lt;table class=&quot;als-table&quot;&gt;
&lt;thead&gt;…&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr class=&quot;is-empty&quot;&gt;
    &lt;td colspan=&quot;5&quot; class=&quot;text-center py-6&quot;&gt;Tidak ada data&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;

&lt;!-- Loading (gunakan skeleton/placeholder) --&gt;
&lt;div class=&quot;als-viewport&quot;&gt;
&lt;table class=&quot;als-table is-loading&quot;&gt;
&lt;thead&gt;…&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td data-col=&quot;index&quot;&gt;—&lt;/td&gt;
    &lt;td&gt;&lt;div class=&quot;skeleton h-4 w-24&quot;&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td&gt;&lt;div class=&quot;skeleton h-4 w-32&quot;&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td&gt;&lt;div class=&quot;skeleton h-4 w-64&quot;&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td data-col=&quot;actions&quot;&gt; &lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Vue binding (contoh minimal)</h4><pre class="code" data-v-82598b18><code data-v-82598b18>&lt;script setup lang=&quot;ts&quot;&gt;
const pagedRows = ref([
{ id: 1, no: 1, code: &#39;PRD-001&#39;, name: &#39;Product A&#39;, description: &#39;...&#39; },
// ...
])
const selectedIds = ref(new Set&lt;number&gt;())

const isAllPageSelected = computed(() =&gt;
pagedRows.value.length &gt; 0 &amp;&amp; pagedRows.value.every(r =&gt; selectedIds.value.has(r.id))
)
const isSomePageSelected = computed(() =&gt;
pagedRows.value.some(r =&gt; selectedIds.value.has(r.id)) &amp;&amp; !isAllPageSelected.value
)

function toggleSelectAllPage(e: Event) {
const checked = (e.target as HTMLInputElement).checked
pagedRows.value.forEach(r =&gt; checked ? selectedIds.value.add(r.id) : selectedIds.value.delete(r.id))
}
function toggleRow(id: number, e?: Event) {
const checked = e ? (e.target as HTMLInputElement).checked : !selectedIds.value.has(id)
checked ? selectedIds.value.add(id) : selectedIds.value.delete(id)
}
function onEdit(row: any) { /* open modal */ }
function onDelete(row: any) { /* confirm + call API */ }
&lt;/script&gt;

&lt;template&gt;
&lt;div class=&quot;als-viewport&quot;&gt;
&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th data-col=&quot;checkbox&quot;&gt;
        &lt;input
          type=&quot;checkbox&quot;
          :checked=&quot;isAllPageSelected&quot;
          :indeterminate.prop=&quot;isSomePageSelected &amp;&amp; !isAllPageSelected&quot;
          @change=&quot;toggleSelectAllPage&quot;
          aria-label=&quot;Select all on this page&quot;
        /&gt;
      &lt;/th&gt;
      &lt;th data-col=&quot;index&quot;&gt;No&lt;/th&gt;
      &lt;th&gt;Code&lt;/th&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Description&lt;/th&gt;
      &lt;th data-col=&quot;actions&quot;&gt;Actions&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;

  &lt;tbody&gt;
    &lt;tr
      v-for=&quot;row in pagedRows&quot;
      :key=&quot;row.id&quot;
      :class=&quot;{ &#39;is-selected&#39;: selectedIds.has(row.id) }&quot;
    &gt;
      &lt;td data-col=&quot;checkbox&quot;&gt;
        &lt;input
          type=&quot;checkbox&quot;
          :checked=&quot;selectedIds.has(row.id)&quot;
          @change=&quot;(e) =&gt; toggleRow(row.id, e)&quot;
          aria-label=&quot;Select row&quot;
        /&gt;
      &lt;/td&gt;
      &lt;td data-col=&quot;index&quot;&gt;{{ row.no }}&lt;/td&gt;
      &lt;td&gt;{{ row.code }}&lt;/td&gt;
      &lt;td&gt;{{ row.name }}&lt;/td&gt;
      &lt;td&gt;{{ row.description }}&lt;/td&gt;
      &lt;td data-col=&quot;actions&quot; class=&quot;flex items-center justify-end gap-2&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;icon-btn icon-btn-solid-warning icon-btn-sm&quot; title=&quot;Edit&quot; @click=&quot;onEdit(row)&quot;&gt;
          &lt;Icon name=&quot;pencil&quot; /&gt;
        &lt;/button&gt;
        &lt;button type=&quot;button&quot; class=&quot;icon-btn icon-btn-solid-error icon-btn-sm&quot; title=&quot;Hapus&quot; @click=&quot;onDelete(row)&quot;&gt;
          &lt;Icon name=&quot;trash&quot; /&gt;
        &lt;/button&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;
&lt;/template&gt;</code></pre></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Props/Events ringkas (cheatsheet)</h4><ul class="list-disc ml-5 text-sm space-y-1" data-v-82598b18><li data-v-82598b18><b data-v-82598b18>Input (data)</b>: <code data-v-82598b18>pagedRows: Array&lt;{ id, no, code, name, description }&gt;</code>, <code data-v-82598b18>selectedIds: Set&lt;ID&gt;</code></li><li data-v-82598b18><b data-v-82598b18>State</b>: <code data-v-82598b18>isAllPageSelected</code>, <code data-v-82598b18>isSomePageSelected</code></li><li data-v-82598b18><b data-v-82598b18>Events</b>: <code data-v-82598b18>@change</code> di header-checkbox → toggle semua di halaman; <code data-v-82598b18>@change</code> di row-checkbox → toggle per id; tombol <code data-v-82598b18>Edit</code>/<code data-v-82598b18>Hapus</code> memanggil handler parent </li><li data-v-82598b18><b data-v-82598b18>CSS hooks</b>: <code data-v-82598b18>.als-viewport</code>, <code data-v-82598b18>[data-col=&quot;checkbox|index|actions&quot;]</code>, <code data-v-82598b18>.is-selected</code>, <code data-v-82598b18>.is-empty</code>, <code data-v-82598b18>.is-loading</code></li></ul></li><li data-v-82598b18><h4 class="font-semibold mb-2" data-v-82598b18>Do &amp; Don’t singkat</h4><ul class="list-disc ml-5 text-sm space-y-1" data-v-82598b18><li data-v-82598b18> ✅ Selalu bungkus tabel dengan <code data-v-82598b18>.als-viewport</code> untuk scroll. </li><li data-v-82598b18> ✅ Pakai <code data-v-82598b18>data-col</code> untuk kolom spesial (checkbox/index/actions). </li><li data-v-82598b18> ✅ Gunakan <code data-v-82598b18>:indeterminate.prop</code> untuk state “sebagian terpilih”. </li><li data-v-82598b18> ❌ Jangan pakai <code data-v-82598b18>colspan</code> yang salah saat empty (samakan dengan jumlah kolom). </li><li data-v-82598b18>❌ Jangan ubah nama kelas hook tanpa update CSS bersama.</li></ul></li></ol>`,1))])])}}}),wt=G(kt,[["__scopeId","data-v-82598b18"]]);export{wt as default};
