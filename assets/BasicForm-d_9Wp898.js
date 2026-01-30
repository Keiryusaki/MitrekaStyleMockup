import{d as y,r as v,c as w,j as d,a as l,G as m,k as p,v as b,l as u,y as i,b as r,e as k,o as h}from"./index-DiwQE97j.js";import{_ as C}from"./PageHeader.vue_vue_type_script_setup_true_lang-CzeWLLsV.js";import{F as S}from"./FloatingTOC-DYld3H6n.js";const E={class:"space-y-8"},B={id:"vertical",class:"card p-6 space-y-4 scroll-mt-20"},V={class:"p-6 bg-base-200 rounded-box"},N={class:"relative"},F={class:"overflow-x-auto rounded-box bg-base-200 p-4 text-xs"},M={id:"horizontal",class:"card p-6 space-y-4 scroll-mt-20"},P={class:"p-6 bg-base-200 rounded-box"},A={class:"grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start"},D={class:"max-w-md"},z={class:"relative"},I={class:"overflow-x-auto rounded-box bg-base-200 p-4 text-xs"},U={id:"inline",class:"card p-6 space-y-4 scroll-mt-20"},T={class:"p-6 bg-base-200 rounded-box"},$={class:"relative"},j={class:"overflow-x-auto rounded-box bg-base-200 p-4 text-xs"},L={id:"sections",class:"card p-6 space-y-4 scroll-mt-20"},O={class:"p-6 bg-base-200 rounded-box"},H={class:"relative"},J={class:"overflow-x-auto rounded-box bg-base-200 p-4 text-xs"},R={id:"validation",class:"card p-6 space-y-4 scroll-mt-20"},W={class:"relative"},G={class:"overflow-x-auto rounded-box bg-base-200 p-4 text-xs"},q={id:"disabled",class:"card p-6 space-y-4 scroll-mt-20"},K={class:"p-6 bg-base-200 rounded-box"},_=y({__name:"BasicForm",setup(Q){const x=[{id:"vertical",label:"Vertical Form"},{id:"horizontal",label:"Horizontal Form"},{id:"inline",label:"Inline Form"},{id:"sections",label:"Form Sections"},{id:"validation",label:"Validation States"},{id:"disabled",label:"Disabled State"}],o=v(null),n=async(c,t)=>{await navigator.clipboard.writeText(c),o.value=t,setTimeout(()=>o.value=null,2e3)},s=v({name:"",email:"",role:null,department:null,bio:"",notifications:!0}),g=[{value:"admin",label:"Admin"},{value:"editor",label:"Editor"},{value:"viewer",label:"Viewer"}],f=[{value:"engineering",label:"Engineering"},{value:"design",label:"Design"},{value:"marketing",label:"Marketing"},{value:"sales",label:"Sales"}],a={vertical:`<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-1">Nama</label>
    <input type="text" class="input w-full" placeholder="Masukkan nama" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input type="email" class="input w-full" placeholder="email@example.com" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Bio</label>
    <textarea class="input w-full" rows="3" placeholder="Ceritakan tentang diri Anda"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Simpan</button>
</form>`,horizontal:`<form class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Nama</label>
    <input type="text" class="input w-full" placeholder="Masukkan nama" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Email</label>
    <input type="email" class="input w-full" placeholder="email@example.com" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Bio</label>
    <textarea class="input w-full" rows="3"></textarea>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4">
    <div></div>
    <button type="submit" class="btn btn-primary w-fit">Simpan</button>
  </div>
</form>`,inline:`<form class="flex flex-wrap items-end gap-3">
  <div>
    <label class="block text-sm font-medium mb-1">Nama</label>
    <input type="text" class="input" placeholder="Nama" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input type="email" class="input" placeholder="Email" />
  </div>
  <button type="submit" class="btn btn-info">Cari</button>
</form>`,sections:`<form class="space-y-6">
  <!-- Section: Personal Info -->
  <fieldset class="space-y-4">
    <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4">
      Informasi Pribadi
    </legend>
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Nama Depan</label>
        <input type="text" class="input w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Nama Belakang</label>
        <input type="text" class="input w-full" />
      </div>
    </div>
  </fieldset>
  
  <!-- Section: Account -->
  <fieldset class="space-y-4">
    <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4">
      Akun
    </legend>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input type="email" class="input w-full" />
    </div>
  </fieldset>
</form>`,validation:`<!-- Success state -->
<div>
  <label class="block text-sm font-medium mb-1">Email</label>
  <input type="email" class="input input-success w-full" value="valid@email.com" />
  <p class="text-success text-xs mt-1">Email valid!</p>
</div>

<!-- Error state -->
<div>
  <label class="block text-sm font-medium mb-1">Password</label>
  <input type="password" class="input input-error w-full" />
  <p class="text-error text-xs mt-1">Password minimal 8 karakter</p>
</div>

<!-- Warning state -->
<div>
  <label class="block text-sm font-medium mb-1">Username</label>
  <input type="text" class="input input-warning w-full" value="admin" />
  <p class="text-warning text-xs mt-1">Username sudah digunakan</p>
</div>`};return(c,t)=>(h(),w("div",E,[d(C,{category:"Patterns",title:"Basic Form",description:"Layout form yang umum digunakan: vertical, horizontal, inline, dan dengan sections."}),l("section",B,[t[20]||(t[20]=l("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Vertical Form",-1)),t[21]||(t[21]=l("p",{class:"text-sm opacity-70"},"Layout default dengan label di atas input. Paling umum digunakan.",-1)),l("div",V,[l("form",{class:"space-y-4 max-w-md",onSubmit:t[4]||(t[4]=m(()=>{},["prevent"]))},[l("div",null,[t[15]||(t[15]=l("label",{class:"block text-sm font-medium mb-1"},"Nama",-1)),p(l("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.value.name=e),type:"text",class:"input w-full",placeholder:"Masukkan nama"},null,512),[[b,s.value.name]])]),l("div",null,[t[16]||(t[16]=l("label",{class:"block text-sm font-medium mb-1"},"Email",-1)),p(l("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>s.value.email=e),type:"email",class:"input w-full",placeholder:"email@example.com"},null,512),[[b,s.value.email]])]),l("div",null,[t[17]||(t[17]=l("label",{class:"block text-sm font-medium mb-1"},"Role",-1)),d(u,{modelValue:s.value.role,"onUpdate:modelValue":t[2]||(t[2]=e=>s.value.role=e),options:g,placeholder:"Pilih role"},null,8,["modelValue"])]),l("div",null,[t[18]||(t[18]=l("label",{class:"block text-sm font-medium mb-1"},"Bio",-1)),p(l("textarea",{"onUpdate:modelValue":t[3]||(t[3]=e=>s.value.bio=e),class:"input w-full",rows:"3",placeholder:"Ceritakan tentang diri Anda"},null,512),[[b,s.value.bio]])]),t[19]||(t[19]=l("div",{class:"flex gap-2"},[l("button",{type:"submit",class:"btn btn-primary"},"Simpan"),l("button",{type:"button",class:"btn btn-secondary"},"Batal")],-1))],32)]),l("div",N,[l("pre",F,[l("code",null,i(a.vertical),1)]),l("button",{class:"absolute top-2 right-2 btn btn-ghost btn-xs",onClick:t[5]||(t[5]=e=>n(a.vertical,"vertical"))},i(o.value==="vertical"?"Copied!":"Copy"),1)])]),l("section",M,[t[25]||(t[25]=l("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Horizontal Form",-1)),t[26]||(t[26]=l("p",{class:"text-sm opacity-70"},"Label di sebelah kiri input. Cocok untuk form dengan banyak field.",-1)),l("div",P,[l("form",{class:"space-y-4",onSubmit:t[7]||(t[7]=m(()=>{},["prevent"]))},[t[23]||(t[23]=r('<div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start"><label class="text-sm font-medium md:text-right md:pt-2">Nama</label><input type="text" class="input w-full max-w-md" placeholder="Masukkan nama"></div><div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start"><label class="text-sm font-medium md:text-right md:pt-2">Email</label><input type="email" class="input w-full max-w-md" placeholder="email@example.com"></div>',2)),l("div",A,[t[22]||(t[22]=l("label",{class:"text-sm font-medium md:text-right md:pt-2"},"Department",-1)),l("div",D,[d(u,{modelValue:s.value.department,"onUpdate:modelValue":t[6]||(t[6]=e=>s.value.department=e),options:f,placeholder:"Pilih department"},null,8,["modelValue"])])]),t[24]||(t[24]=r('<div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start"><label class="text-sm font-medium md:text-right md:pt-2">Bio</label><textarea class="input w-full max-w-md" rows="3" placeholder="Ceritakan tentang diri Anda"></textarea></div><div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4"><div></div><div class="flex gap-2"><button type="submit" class="btn btn-primary">Simpan</button><button type="button" class="btn btn-secondary">Batal</button></div></div>',2))],32)]),l("div",z,[l("pre",I,[l("code",null,i(a.horizontal),1)]),l("button",{class:"absolute top-2 right-2 btn btn-ghost btn-xs",onClick:t[8]||(t[8]=e=>n(a.horizontal,"horizontal"))},i(o.value==="horizontal"?"Copied!":"Copy"),1)])]),l("section",U,[t[31]||(t[31]=l("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Inline Form",-1)),t[32]||(t[32]=l("p",{class:"text-sm opacity-70"},"Semua field dalam satu baris. Cocok untuk search/filter form.",-1)),l("div",T,[l("form",{class:"flex flex-wrap items-end gap-3",onSubmit:t[9]||(t[9]=m(()=>{},["prevent"]))},[t[28]||(t[28]=l("div",null,[l("label",{class:"block text-sm font-medium mb-1"},"Nama"),l("input",{type:"text",class:"input",placeholder:"Nama"})],-1)),t[29]||(t[29]=l("div",null,[l("label",{class:"block text-sm font-medium mb-1"},"Email"),l("input",{type:"email",class:"input",placeholder:"Email"})],-1)),l("div",null,[t[27]||(t[27]=l("label",{class:"block text-sm font-medium mb-1"},"Status",-1)),d(u,{options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],placeholder:"Semua",size:"md"})]),t[30]||(t[30]=l("button",{type:"submit",class:"btn btn-info"},[l("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[l("circle",{cx:"11",cy:"11",r:"8"}),l("path",{d:"m21 21-4.3-4.3"})]),k(" Cari ")],-1))],32)]),l("div",$,[l("pre",j,[l("code",null,i(a.inline),1)]),l("button",{class:"absolute top-2 right-2 btn btn-ghost btn-xs",onClick:t[10]||(t[10]=e=>n(a.inline,"inline"))},i(o.value==="inline"?"Copied!":"Copy"),1)])]),l("section",L,[t[34]||(t[34]=l("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Form Sections",-1)),t[35]||(t[35]=l("p",{class:"text-sm opacity-70"},"Form yang dikelompokkan dalam sections untuk form yang kompleks.",-1)),l("div",O,[l("form",{class:"space-y-6 max-w-2xl",onSubmit:t[11]||(t[11]=m(()=>{},["prevent"]))},[...t[33]||(t[33]=[r('<fieldset class="space-y-4"><legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full"> Informasi Pribadi </legend><div class="grid md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium mb-1">Nama Depan</label><input type="text" class="input w-full" placeholder="John"></div><div><label class="block text-sm font-medium mb-1">Nama Belakang</label><input type="text" class="input w-full" placeholder="Doe"></div></div><div><label class="block text-sm font-medium mb-1">Alamat</label><textarea class="input w-full" rows="2" placeholder="Alamat lengkap"></textarea></div></fieldset><fieldset class="space-y-4"><legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full"> Informasi Akun </legend><div class="grid md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium mb-1">Email</label><input type="email" class="input w-full" placeholder="email@example.com"></div><div><label class="block text-sm font-medium mb-1">Username</label><input type="text" class="input w-full" placeholder="johndoe"></div></div></fieldset><fieldset class="space-y-4"><legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full"> Preferensi </legend><div class="space-y-3"><label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" class="checkbox checkbox-primary" checked><span class="text-sm">Terima email newsletter</span></label><label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" class="checkbox checkbox-primary"><span class="text-sm">Terima notifikasi SMS</span></label></div></fieldset><div class="flex gap-2 pt-4 border-t border-base-300"><button type="submit" class="btn btn-primary">Simpan Perubahan</button><button type="button" class="btn btn-secondary">Batal</button></div>',4)])],32)]),l("div",H,[l("pre",J,[l("code",null,i(a.sections),1)]),l("button",{class:"absolute top-2 right-2 btn btn-ghost btn-xs",onClick:t[12]||(t[12]=e=>n(a.sections,"sections"))},i(o.value==="sections"?"Copied!":"Copy"),1)])]),l("section",R,[t[36]||(t[36]=r('<h2 class="text-lg font-semibold border-b border-base-300 pb-2">Validation States</h2><p class="text-sm opacity-70">Tampilan input dengan berbagai state validasi.</p><div class="p-6 bg-base-200 rounded-box"><div class="space-y-4 max-w-md"><div><label class="block text-sm font-medium mb-1">Default</label><input type="text" class="input w-full" placeholder="Input normal"></div><div><label class="block text-sm font-medium mb-1">Email (Success)</label><input type="email" class="input input-success w-full" value="valid@email.com"><p class="text-success text-xs mt-1 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"></path></svg> Email valid! </p></div><div><label class="block text-sm font-medium mb-1">Password (Error)</label><input type="password" class="input input-error w-full" value="123"><p class="text-error text-xs mt-1 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg> Password minimal 8 karakter </p></div><div><label class="block text-sm font-medium mb-1">Username (Warning)</label><input type="text" class="input input-warning w-full" value="admin"><p class="text-warning text-xs mt-1 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg> Username sudah digunakan </p></div></div></div>',3)),l("div",W,[l("pre",G,[l("code",null,i(a.validation),1)]),l("button",{class:"absolute top-2 right-2 btn btn-ghost btn-xs",onClick:t[13]||(t[13]=e=>n(a.validation,"validation"))},i(o.value==="validation"?"Copied!":"Copy"),1)])]),l("section",q,[t[38]||(t[38]=l("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Disabled State",-1)),t[39]||(t[39]=l("p",{class:"text-sm opacity-70"},"Form dalam keadaan disabled, misalnya saat loading atau read-only.",-1)),l("div",K,[l("form",{class:"space-y-4 max-w-md opacity-60 pointer-events-none",onSubmit:t[14]||(t[14]=m(()=>{},["prevent"]))},[...t[37]||(t[37]=[r('<div><label class="block text-sm font-medium mb-1">Nama</label><input type="text" class="input w-full" value="John Doe" disabled></div><div><label class="block text-sm font-medium mb-1">Email</label><input type="email" class="input w-full" value="john@example.com" disabled></div><div><label class="block text-sm font-medium mb-1">Role</label><input type="text" class="input w-full" value="Admin" disabled></div><button type="submit" class="btn btn-primary" disabled>Simpan</button>',4)])],32)])]),d(S,{items:x})]))}});export{_ as default};
