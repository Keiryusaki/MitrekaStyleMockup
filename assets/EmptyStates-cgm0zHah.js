import{_ as d}from"./PageHeader.vue_vue_type_script_setup_true_lang-CzeWLLsV.js";import{d as m,r as b,c as a,j as u,b as n,a as s,F as p,A as x,C as h,y as r,o as i,q as g}from"./index-DiwQE97j.js";const v={class:"space-y-8"},k={class:"card p-6"},y={class:"tabs tabs-boxed mb-6 inline-flex"},f=["onClick"],w={class:"border border-base-300 rounded-lg mb-4 bg-base-200/30"},M={key:0,class:"flex flex-col items-center justify-center py-12 text-center"},C={key:1,class:"flex flex-col items-center justify-center py-12 text-center"},B={key:2,class:"flex flex-col items-center justify-center py-12 text-center"},j={key:3,class:"flex flex-col items-center justify-center py-12 text-center"},A={key:4,class:"flex flex-col items-center justify-center py-12 text-center"},_={key:5,class:"flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto"},T={class:"rounded-box border border-base-300 p-3"},S={class:"mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"},E=m({__name:"EmptyStates",setup(N){const o={basic:`<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Tidak ada data</h3>
  <p class="text-sm opacity-60 mb-4">Belum ada item yang tersedia saat ini.</p>
  <button class="btn btn-primary btn-sm">Tambah Item</button>
</div>`,search:`<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
    <path d="M8 11h6"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Tidak ditemukan</h3>
  <p class="text-sm opacity-60 mb-4">Pencarian "keyword" tidak menemukan hasil.</p>
  <button class="btn btn-secondary btn-sm">Reset Pencarian</button>
</div>`,noAccess:`<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-warning/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Akses Terbatas</h3>
  <p class="text-sm opacity-60 mb-4">Anda tidak memiliki izin untuk melihat konten ini.</p>
  <button class="btn btn-warning btn-sm">Minta Akses</button>
</div>`,error:`<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-error/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6M9 9l6 6"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Gagal Memuat</h3>
  <p class="text-sm opacity-60 mb-4">Terjadi kesalahan saat mengambil data.</p>
  <div class="flex gap-2">
    <button class="btn btn-error btn-sm">Coba Lagi</button>
    <button class="btn btn-secondary btn-sm">Kembali</button>
  </div>
</div>`,success:`<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-success/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Selesai!</h3>
  <p class="text-sm opacity-60 mb-4">Semua tugas telah diselesaikan.</p>
  <button class="btn btn-success btn-sm">Lihat Riwayat</button>
</div>`,firstTime:`<div class="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
  <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
    <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  </div>
  <h3 class="font-semibold text-xl mb-2">Selamat Datang!</h3>
  <p class="text-sm opacity-60 mb-6">
    Ini adalah pertama kalinya Anda menggunakan fitur ini. 
    Mari mulai dengan membuat item pertama Anda.
  </p>
  <button class="btn btn-primary">Mulai Sekarang</button>
</div>`},e=b("basic"),c=[{id:"basic",label:"Basic"},{id:"search",label:"No Results"},{id:"noAccess",label:"No Access"},{id:"error",label:"Error"},{id:"success",label:"Complete"},{id:"firstTime",label:"First Time"}];return(V,t)=>(i(),a("div",v,[u(d,{title:"Empty States",description:"Pattern untuk menampilkan state kosong, error, atau kondisi khusus lainnya.",category:"Patterns"}),t[8]||(t[8]=n('<div class="card p-6"><h2 class="text-lg font-semibold mb-4">Guidelines</h2><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-medium text-success mb-2">✓ Do</h3><ul class="text-sm space-y-1 opacity-80"><li>• Gunakan ilustrasi atau ikon yang relevan</li><li>• Berikan pesan yang jelas dan actionable</li><li>• Sediakan tombol aksi yang sesuai konteks</li><li>• Gunakan warna yang sesuai dengan kondisi</li></ul></div><div><h3 class="font-medium text-error mb-2">✗ Don&#39;t</h3><ul class="text-sm space-y-1 opacity-80"><li>• Jangan biarkan area kosong tanpa penjelasan</li><li>• Jangan gunakan pesan teknis/error code</li><li>• Jangan berikan terlalu banyak opsi</li><li>• Jangan menyalahkan user</li></ul></div></div></div>',1)),s("div",k,[t[7]||(t[7]=s("h2",{class:"text-lg font-semibold mb-4"},"Variants",-1)),s("div",y,[(i(),a(p,null,x(c,l=>s("button",{key:l.id,class:g(["tab",{"tab-active":e.value===l.id}]),onClick:P=>e.value=l.id},r(l.label),11,f)),64))]),s("div",w,[e.value==="basic"?(i(),a("div",M,[...t[0]||(t[0]=[n('<svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"></path></svg><h3 class="font-semibold text-lg mb-1">Tidak ada data</h3><p class="text-sm opacity-60 mb-4">Belum ada item yang tersedia saat ini.</p><button class="btn btn-success btn-sm">Tambah Item</button>',4)])])):e.value==="search"?(i(),a("div",C,[...t[1]||(t[1]=[n('<svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path><path d="M8 11h6"></path></svg><h3 class="font-semibold text-lg mb-1">Tidak ditemukan</h3><p class="text-sm opacity-60 mb-4">Pencarian &quot;keyword&quot; tidak menemukan hasil.</p><button class="btn btn-secondary btn-sm">Reset Pencarian</button>',4)])])):e.value==="noAccess"?(i(),a("div",B,[...t[2]||(t[2]=[n('<svg class="w-16 h-16 text-warning/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><h3 class="font-semibold text-lg mb-1">Akses Terbatas</h3><p class="text-sm opacity-60 mb-4">Anda tidak memiliki izin untuk melihat konten ini.</p><button class="btn btn-warning btn-sm">Minta Akses</button>',4)])])):e.value==="error"?(i(),a("div",j,[...t[3]||(t[3]=[n('<svg class="w-16 h-16 text-error/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6M9 9l6 6"></path></svg><h3 class="font-semibold text-lg mb-1">Gagal Memuat</h3><p class="text-sm opacity-60 mb-4">Terjadi kesalahan saat mengambil data.</p><div class="flex gap-2"><button class="btn btn-primary btn-sm">Coba Lagi</button><button class="btn btn-secondary btn-sm">Kembali</button></div>',4)])])):e.value==="success"?(i(),a("div",A,[...t[4]||(t[4]=[n('<svg class="w-16 h-16 text-success/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg><h3 class="font-semibold text-lg mb-1">Selesai!</h3><p class="text-sm opacity-60 mb-4">Semua tugas telah diselesaikan.</p><button class="btn btn-info btn-sm">Lihat Riwayat</button>',4)])])):e.value==="firstTime"?(i(),a("div",_,[...t[5]||(t[5]=[n('<div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"><svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg></div><h3 class="font-semibold text-xl mb-2">Selamat Datang!</h3><p class="text-sm opacity-60 mb-6"> Ini adalah pertama kalinya Anda menggunakan fitur ini. Mari mulai dengan membuat item pertama Anda. </p><button class="btn btn-primary">Mulai Sekarang</button>',4)])])):h("",!0)]),s("details",T,[t[6]||(t[6]=s("summary",{class:"cursor-pointer text-sm font-medium"},"Lihat Kode",-1)),s("pre",S,[s("code",null,r(o[e.value]),1)])])]),t[9]||(t[9]=n('<div class="card p-6"><h2 class="text-lg font-semibold mb-4">Kapan Menggunakan</h2><div class="overflow-x-auto"><table class="table min-w-full"><thead class="bg-base-200"><tr><th>Variant</th><th>Gunakan Ketika</th><th>Warna Icon</th></tr></thead><tbody class="divide-y divide-base-200"><tr><td class="font-medium">Basic</td><td>Data kosong, belum ada item</td><td><span class="badge badge-ghost">Neutral</span></td></tr><tr><td class="font-medium">No Results</td><td>Pencarian/filter tidak menemukan hasil</td><td><span class="badge badge-ghost">Neutral</span></td></tr><tr><td class="font-medium">No Access</td><td>User tidak punya permission</td><td><span class="badge badge-warning">Warning</span></td></tr><tr><td class="font-medium">Error</td><td>Gagal load data, network error</td><td><span class="badge badge-error">Error</span></td></tr><tr><td class="font-medium">Complete</td><td>Semua task selesai, inbox kosong</td><td><span class="badge badge-success">Success</span></td></tr><tr><td class="font-medium">First Time</td><td>Onboarding, user baru pertama kali</td><td><span class="badge badge-primary">Primary</span></td></tr></tbody></table></div></div>',1))]))}});export{E as default};
