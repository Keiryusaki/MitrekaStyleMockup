import React, { useState } from 'react';
import { 
  AlertTriangle,
  Calendar,
  FileText,
  Clock,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Target,
  Smile,
  Zap,
  Briefcase,
  ChevronDown
} from 'lucide-react';

/**
 * Mitreka "Pusat Kendali CEO" v2.3
 * Fokus: Compact Layout, Inline Filters, & Restoration of Banner Progress
 */

const App = () => {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterTahun, setFilterTahun] = useState('Semua');

  // --- DATA REALISTIK ---
  const targetRevenue = { actual: 24.8, target: 35.0, unit: 'M', percent: 70.8 };
  
  const bankData = [
    { id: 1, name: 'Mandiri Operasional Utama', balance: 'Rp 2,45 M', time: '2j lalu', status: 'success' },
    { id: 2, name: 'BCA Gaji & Bonus', balance: 'Rp 890 JT', time: '6j lalu', status: 'warning' },
    { id: 3, name: 'BNI Penampungan Project', balance: 'Rp 1,2 M', time: '41j lalu', status: 'error', isLate: true },
  ];

  const berakhirKontrak = [
    { id: 1, name: 'Marketing Imigrasi', days: 5, docs: 7, progress: 98, color: 'bg-[#00D094]' },
    { id: 2, name: 'Kejagung Statistik Kriminal', days: 15, docs: 10, progress: 80, color: 'bg-[#00A3FF]' },
    { id: 3, name: 'Asabri Mobile App', days: 25, docs: 12, progress: 60, color: 'bg-[#FFA000]' },
  ];

  const berakhirSupport = [
    { id: 1, name: 'Sistem Informasi D3TLH', days: 5 },
    { id: 2, name: 'Marketing Kemenkes', days: 15 },
    { id: 3, name: 'Internal Finance System', days: 25 },
  ];

  const belumBerkontrak = [
    { id: 1, name: 'BIG Integrated MPC', days: 50, cost: '60.000.000' },
    { id: 2, name: 'Marketing Sulut Command Center', days: 35, cost: '120.000.000' },
    { id: 3, name: 'Internal Taskflow RDD', days: 15, cost: '10.000.000' },
  ];

  return (
    <div className="relative min-h-screen w-full font-sans text-slate-900 overflow-hidden bg-[#f4f7fa] p-4 lg:p-10">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[120px]"></div>

      <div className="relative max-w-[1600px] mx-auto space-y-8">
        
        {/* BARIS 1: HERO BANNER (WITH PROGRESS BAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 relative overflow-hidden rounded-[48px] p-8 lg:p-12 bg-gradient-to-br from-[#004A99] to-[#002B59] text-white shadow-2xl">
            <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8 w-full">
                <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                  <Target size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Target Pendapatan Tahunan</span>
                </div>
                <div>
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                    Rp {targetRevenue.actual}<span className="text-2xl font-normal opacity-50">/{targetRevenue.target}{targetRevenue.unit}</span>
                  </h2>
                  <div className="mt-8 space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-blue-100/60 text-sm font-medium italic">Pencapaian saat ini: {targetRevenue.percent}%</p>
                      <span className="text-xs font-black bg-emerald-500 px-3 py-1 rounded-lg shadow-lg shadow-emerald-900/20 uppercase tracking-widest">On Track</span>
                    </div>
                    {/* RESTORED PROGRESS BAR */}
                    <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                        style={{ width: `${targetRevenue.percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 md:flex-col shrink-0">
                <MiniStat label="Margin Laba" value="24,2%" trend="+2,4%" />
                <MiniStat label="Ketahanan Kas" value="8,5 Bln" trend="Sehat" />
              </div>
            </div>
          </section>

          <GlassCard title="Likuiditas Bank" badge="Status" accentColor="bg-[#FFA000]">
             <div className="space-y-3">
                {bankData.map(bank => (
                  <div key={bank.id} className="flex justify-between items-center p-4 bg-white/50 rounded-[24px] border border-white/80 group hover:scale-[1.02] transition-transform shadow-sm">
                     <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">{bank.name}</p>
                        <p className="text-sm font-black text-[#004A99] tracking-tight">{bank.balance}</p>
                     </div>
                     <div className={`w-2.5 h-2.5 rounded-full ${bank.status === 'error' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>

        {/* BARIS 2: MONITORING PROYEK (INLINE FILTERS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <GlassCard title="Kontrak Berakhir" badge="Urgent" accentColor="bg-[#00A3FF]">
            <div className="space-y-6">
              {berakhirKontrak.map(item => (
                <div key={item.id} className="space-y-2 group cursor-pointer">
                  <div className="flex justify-between items-end">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-black text-slate-800 group-hover:text-[#00A3FF] transition-colors truncate">{item.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <FileText size={10}/> {item.docs} Dokumen
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-[#00A3FF] italic ml-2 shrink-0">{item.days} hari</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard title="Support Berakhir" badge="Kritis" accentColor="bg-[#FF4D4D]">
            <div className="space-y-3.5">
              {berakhirSupport.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-rose-50/50 border border-rose-100/50 rounded-[28px] group hover:bg-rose-100/50 transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:scale-150 transition-transform shadow-sm shadow-rose-200"></div>
                    <span className="text-xs font-bold text-slate-700 truncate max-w-[160px]">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-rose-600 italic">{item.days} hari</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* BELUM BERKONTRAK DENGAN INLINE FILTER */}
          <GlassCard 
            title="Belum Berkontrak" 
            badge="Pipa" 
            accentColor="bg-[#00D094]"
            // Header Content for Inline Filters
            headerContent={
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white/60 backdrop-blur-md border border-white/80 rounded-lg pl-2 pr-6 py-1 text-[9px] font-black text-slate-600 uppercase tracking-tighter outline-none focus:ring-1 focus:ring-emerald-400 transition-all cursor-pointer"
                  >
                    <option>Semua</option>
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative group">
                  <select 
                    value={filterTahun}
                    onChange={(e) => setFilterTahun(e.target.value)}
                    className="appearance-none bg-white/60 backdrop-blur-md border border-white/80 rounded-lg pl-2 pr-6 py-1 text-[9px] font-black text-slate-600 uppercase tracking-tighter outline-none focus:ring-1 focus:ring-emerald-400 transition-all cursor-pointer"
                  >
                    <option>Semua</option>
                    <option>2025</option>
                    <option>2026</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            }
          >
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {belumBerkontrak.map(item => (
                <div key={item.id} className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-[32px] relative overflow-hidden group hover:shadow-md transition-all shadow-sm">
                  <div className="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
                    <DollarSign size={60} />
                  </div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <p className="text-xs font-black text-slate-800 truncate max-w-[150px]">{item.name}</p>
                    <span className="text-[10px] font-black text-emerald-600 bg-white/80 border border-emerald-100 px-2 py-0.5 rounded-lg">{item.days}h</span>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estimasi Nilai</p>
                    <p className="text-sm font-black text-emerald-700 italic">Cost {item.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* BARIS 3: STRATEGIC INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassCard title="Utilitas SDM" badge="SDM" accentColor="bg-indigo-500">
             <div className="flex items-center gap-8 py-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90 shadow-sm rounded-full">
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="8" />
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="#6366F1" strokeWidth="8" strokeDasharray="251" strokeDashoffset="37" strokeLinecap="round" />
                   </svg>
                   <span className="absolute text-xl font-black text-indigo-600 tracking-tighter">85%</span>
                </div>
                <div className="space-y-3 flex-1">
                   <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-slate-400">Terpakai</span> <span className="text-slate-800">68 Org</span></div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full shadow-inner"><div className="h-full bg-indigo-500 w-[85%] rounded-full shadow-sm shadow-indigo-200"></div></div>
                   <div className="flex justify-between text-[10px] font-black uppercase pt-1"><span className="text-slate-400">Tersedia</span> <span className="text-slate-800">12 Org</span></div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full shadow-inner"><div className="h-full bg-slate-300 w-[15%] rounded-full"></div></div>
                </div>
             </div>
          </GlassCard>

          <GlassCard title="Usia Piutang" badge="Keuangan" accentColor="bg-rose-500 text-rose-500">
             <div className="space-y-4 pt-1">
                <p className="text-2xl font-black text-slate-800 tracking-tighter italic">Rp 6,42 Miliar</p>
                <div className="flex h-6 rounded-full overflow-hidden border border-white shadow-md">
                  <div className="bg-[#00D094] w-[60%] hover:brightness-110 transition-all" />
                  <div className="bg-[#00A3FF] w-[25%] hover:brightness-110 transition-all" />
                  <div className="bg-[#FF4D4D] w-[15%] hover:brightness-110 transition-all" />
                </div>
                <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                   <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#00D094]"></div> Lancar</span>
                   <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]"></div> 30-60h</span>
                   <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]"></div> &gt;90h</span>
                </div>
             </div>
          </GlassCard>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[48px] p-8 text-white flex items-center gap-6 shadow-2xl shadow-indigo-100 relative overflow-hidden group hover:scale-[1.02] transition-transform">
             <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center relative z-10 shadow-lg border border-white/20">
                <Smile size={32} />
             </div>
             <div className="relative z-10">
                <h4 className="text-xl font-black tracking-tight mb-1">Kepuasan Pelanggan</h4>
                <div className="flex items-center gap-2">
                   <p className="text-4xl font-black italic">4,8</p>
                   <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(i => <Zap key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                </div>
                <p className="text-indigo-100/70 text-[10px] mt-1 font-bold uppercase tracking-widest">Peringkat Layanan Mitreka</p>
             </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f4f7fa; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}} />
    </div>
  );
};

// --- MINI COMPONENTS ---

const MiniStat = ({ label, value, trend }) => (
  <div className="p-4 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 min-w-[150px] shadow-lg">
    <p className="text-[9px] font-bold text-blue-200/60 uppercase tracking-widest mb-1 leading-none">{label}</p>
    <p className="text-2xl font-black leading-none tracking-tighter">{value}</p>
    <div className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1 italic">
       <TrendingUp size={10} /> {trend}
    </div>
  </div>
);

const GlassCard = ({ title, badge, accentColor, children, headerContent }) => (
  <div className="bg-white/40 backdrop-blur-3xl rounded-[48px] border border-white/60 shadow-2xl p-8 flex flex-col relative overflow-hidden group hover:bg-white/60 transition-all duration-500 shadow-slate-200/30">
    <div className={`absolute top-0 left-0 right-0 h-1.5 ${accentColor} opacity-20 blur-[1px]`}></div>
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-1">
        <h3 className="font-black text-slate-900 tracking-tight text-xl uppercase italic leading-none">{title}</h3>
        <div className={`h-1 w-8 ${accentColor} rounded-full`}></div>
      </div>
      <div className="flex items-center gap-3">
        {headerContent}
        <span className={`text-[8px] font-black px-3 py-1.5 rounded-xl bg-white/80 border border-white text-slate-500 shadow-sm uppercase tracking-widest`}>
          {badge}
        </span>
      </div>
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

export default App;