import{_ as c}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";import{d as m,r as b,c as s,j as u,b as n,a,F as p,A as x,C as h,y as d,o as i,q as f}from"./index-CTK3vSMT.js";const v={class:"space-y-8"},k={class:"card p-6"},g={class:"tabs tabs-boxed mb-6 inline-flex"},y=["onClick"],w={class:"border border-base-300 rounded-lg mb-4 bg-base-200/30"},j={key:0,class:"min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-8"},A={key:1,class:"min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-8"},C={key:2,class:"min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-8"},M={key:3,class:"min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-8"},S={key:4,class:"min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-8"},_={class:"rounded-box border border-base-300 p-3"},B={class:"mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"},z=m({__name:"ErrorPages",setup(L){const r={404:`<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <h1 class="text-8xl font-bold text-primary/20">404</h1>
  <h2 class="text-2xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
  <p class="text-sm opacity-60 mb-6 max-w-md">
    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
  </p>
  <div class="flex gap-3">
    <button class="btn btn-primary">Kembali ke Beranda</button>
    <button class="btn btn-secondary">Hubungi Support</button>
  </div>
</div>`,403:`<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <div class="w-24 h-24 rounded-full bg-warning/10 flex items-center justify-center mb-4">
    <svg class="w-12 h-12 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
  <h2 class="text-2xl font-semibold mb-2">Akses Ditolak</h2>
  <p class="text-sm opacity-60 mb-6 max-w-md">
    Anda tidak memiliki izin untuk mengakses halaman ini. 
    Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
  </p>
  <div class="flex gap-3">
    <button class="btn btn-warning">Minta Akses</button>
    <button class="btn btn-secondary">Kembali</button>
  </div>
</div>`,500:`<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <div class="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mb-4">
    <svg class="w-12 h-12 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  </div>
  <h2 class="text-2xl font-semibold mb-2">Terjadi Kesalahan</h2>
  <p class="text-sm opacity-60 mb-6 max-w-md">
    Maaf, terjadi kesalahan pada server kami. Tim teknis telah diberitahu 
    dan sedang bekerja untuk memperbaikinya.
  </p>
  <div class="flex gap-3">
    <button class="btn btn-primary">Coba Lagi</button>
    <button class="btn btn-secondary">Kembali ke Beranda</button>
  </div>
</div>`,503:`<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <div class="w-24 h-24 rounded-full bg-info/10 flex items-center justify-center mb-4">
    <svg class="w-12 h-12 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  </div>
  <h2 class="text-2xl font-semibold mb-2">Sedang Maintenance</h2>
  <p class="text-sm opacity-60 mb-6 max-w-md">
    Sistem sedang dalam perbaikan untuk meningkatkan layanan kami. 
    Silakan kembali beberapa saat lagi.
  </p>
  <div class="text-sm opacity-60">
    <p>Estimasi selesai: <span class="font-medium text-base-content">30 menit</span></p>
  </div>
</div>`,offline:`<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
  <div class="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center mb-4">
    <svg class="w-12 h-12 text-base-content/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M2 12L7 2L17 2L22 12L17 22L7 22Z"/>
      <path d="m2 2 20 20"/>
    </svg>
  </div>
  <h2 class="text-2xl font-semibold mb-2">Anda Offline</h2>
  <p class="text-sm opacity-60 mb-6 max-w-md">
    Sepertinya Anda tidak terhubung ke internet. 
    Periksa koneksi Anda dan coba lagi.
  </p>
  <button class="btn btn-primary">Coba Lagi</button>
</div>`},e=b("404"),o=[{id:"404",label:"404"},{id:"403",label:"403"},{id:"500",label:"500"},{id:"503",label:"503"},{id:"offline",label:"Offline"}];return(T,t)=>(i(),s("div",v,[u(c,{title:"Error Pages",description:"Pattern untuk halaman error seperti 404, 500, dan kondisi offline.",category:"Patterns"}),t[7]||(t[7]=n('<div class="card p-6"><h2 class="text-lg font-semibold mb-4">Guidelines</h2><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-medium text-success mb-2">✓ Do</h3><ul class="text-sm space-y-1 opacity-80"><li>• Gunakan bahasa yang ramah dan mudah dipahami</li><li>• Berikan solusi atau langkah selanjutnya</li><li>• Sediakan tombol navigasi yang jelas</li><li>• Sesuaikan warna dengan tingkat keparahan</li></ul></div><div><h3 class="font-medium text-error mb-2">✗ Don&#39;t</h3><ul class="text-sm space-y-1 opacity-80"><li>• Jangan tampilkan error code teknis</li><li>• Jangan menyalahkan pengguna</li><li>• Jangan biarkan user tanpa opsi</li><li>• Jangan gunakan jargon teknis</li></ul></div></div></div>',1)),a("div",k,[t[6]||(t[6]=a("h2",{class:"text-lg font-semibold mb-4"},"Variants",-1)),a("div",g,[(i(),s(p,null,x(o,l=>a("button",{key:l.id,class:f(["tab",{"tab-active":e.value===l.id}]),onClick:K=>e.value=l.id},d(l.label),11,y)),64))]),a("div",w,[e.value==="404"?(i(),s("div",j,[...t[0]||(t[0]=[n('<h1 class="text-8xl font-bold text-primary/20">404</h1><h2 class="text-2xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2><p class="text-sm opacity-60 mb-6 max-w-md"> Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. </p><div class="flex gap-3"><button class="btn btn-primary">Kembali ke Beranda</button><button class="btn btn-secondary">Hubungi Support</button></div>',4)])])):e.value==="403"?(i(),s("div",A,[...t[1]||(t[1]=[n('<div class="w-24 h-24 rounded-full bg-warning/10 flex items-center justify-center mb-4"><svg class="w-12 h-12 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div><h2 class="text-2xl font-semibold mb-2">Akses Ditolak</h2><p class="text-sm opacity-60 mb-6 max-w-md"> Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator jika Anda merasa ini adalah kesalahan. </p><div class="flex gap-3"><button class="btn btn-warning">Minta Akses</button><button class="btn btn-secondary">Kembali</button></div>',4)])])):e.value==="500"?(i(),s("div",C,[...t[2]||(t[2]=[n('<div class="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mb-4"><svg class="w-12 h-12 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div><h2 class="text-2xl font-semibold mb-2">Terjadi Kesalahan</h2><p class="text-sm opacity-60 mb-6 max-w-md"> Maaf, terjadi kesalahan pada server kami. Tim teknis telah diberitahu dan sedang bekerja untuk memperbaikinya. </p><div class="flex gap-3"><button class="btn btn-primary">Coba Lagi</button><button class="btn btn-secondary">Kembali ke Beranda</button></div>',4)])])):e.value==="503"?(i(),s("div",M,[...t[3]||(t[3]=[n('<div class="w-24 h-24 rounded-full bg-info/10 flex items-center justify-center mb-4"><svg class="w-12 h-12 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg></div><h2 class="text-2xl font-semibold mb-2">Sedang Maintenance</h2><p class="text-sm opacity-60 mb-6 max-w-md"> Sistem sedang dalam perbaikan untuk meningkatkan layanan kami. Silakan kembali beberapa saat lagi. </p><div class="text-sm opacity-60"><p>Estimasi selesai: <span class="font-medium text-base-content">30 menit</span></p></div>',4)])])):e.value==="offline"?(i(),s("div",S,[...t[4]||(t[4]=[n('<div class="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center mb-4"><svg class="w-12 h-12 text-base-content/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg></div><h2 class="text-2xl font-semibold mb-2">Anda Offline</h2><p class="text-sm opacity-60 mb-6 max-w-md"> Sepertinya Anda tidak terhubung ke internet. Periksa koneksi Anda dan coba lagi. </p><button class="btn btn-primary">Coba Lagi</button>',4)])])):h("",!0)]),a("details",_,[t[5]||(t[5]=a("summary",{class:"cursor-pointer text-sm font-medium"},"Lihat Kode",-1)),a("pre",B,[a("code",null,d(r[e.value]),1)])])]),t[8]||(t[8]=n('<div class="card p-6"><h2 class="text-lg font-semibold mb-4">HTTP Status Reference</h2><div class="overflow-x-auto"><table class="table min-w-full"><thead class="bg-base-200"><tr><th>Code</th><th>Nama</th><th>Deskripsi</th><th>Tone</th></tr></thead><tbody class="divide-y divide-base-200"><tr><td><span class="badge badge-primary">404</span></td><td class="font-medium">Not Found</td><td>Halaman/resource tidak ditemukan</td><td>Netral, helpful</td></tr><tr><td><span class="badge badge-warning">403</span></td><td class="font-medium">Forbidden</td><td>Tidak punya akses/permission</td><td>Tegas tapi sopan</td></tr><tr><td><span class="badge badge-error">500</span></td><td class="font-medium">Server Error</td><td>Kesalahan internal server</td><td>Apologetic, reassuring</td></tr><tr><td><span class="badge badge-info">503</span></td><td class="font-medium">Service Unavailable</td><td>Server sedang maintenance</td><td>Informatif, berikan ETA</td></tr><tr><td><span class="badge badge-ghost">Offline</span></td><td class="font-medium">No Connection</td><td>User tidak terhubung internet</td><td>Helpful, guide to fix</td></tr></tbody></table></div></div>',1))]))}});export{z as default};
