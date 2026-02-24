import React, { useState, useEffect, useMemo } from 'react';
import { 
  Camera, 
  MapPin, 
  Clock, 
  History, 
  Plus, 
  CheckCircle2, 
  Bell, 
  Menu,
  User,
  LogOut,
  Timer,
  ChevronDown,
  ChevronUp,
  Map as MapIcon,
  AlertCircle,
  RefreshCw,
  Navigation,
  X
} from 'lucide-react';

const App = () => {
  const [status, setStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);
  const [duration, setDuration] = useState('00:00:00');
  const [expandedId, setExpandedId] = useState(null);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  
  // State Lokasi
  const [isInArea, setIsInArea] = useState(true); 
  const [note, setNote] = useState('');

  // Mock data riwayat
  const [attendanceData, setAttendanceData] = useState([
    { 
      id: 1, 
      date: '12 Jun 2025', 
      day: 'Kamis',
      firstIn: '08:05', 
      lastOut: '17:15', 
      totalWork: '08j 10m',
      sessions: [
        { in: '08:05', out: '12:01', note: '' },
        { in: '13:02', out: '17:15', note: 'Meeting client di Senayan' }
      ]
    }
  ]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (status === 'in' && clockInTime) {
        const diff = now - clockInTime;
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        setDuration(`${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [status, clockInTime]);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  }, [currentTime]);

  const handleRefreshLocation = () => {
    setIsRefreshing(true);
    // Simulasi fetch GPS 1.5 detik
    setTimeout(() => {
      setIsRefreshing(false);
      // Randomly change area for testing purpose during refresh
      // setIsInArea(prev => !prev); 
    }, 1500);
  };

  const initiateAction = (type) => {
    setPendingAction(type);
    if (!isInArea) {
      setShowNoteModal(true);
    } else {
      setShowFaceModal(true);
      setTimeout(() => {
        processAttendance(type);
      }, 2500);
    }
  };

  const handleSubmitNote = () => {
    if (note.trim() === '') return;
    setShowNoteModal(false);
    setShowFaceModal(true);
    setTimeout(() => {
      processAttendance(pendingAction);
    }, 2500);
  };

  const processAttendance = (type) => {
    setShowFaceModal(false);
    if (type === 'in') {
      setStatus('in');
      setClockInTime(new Date());
    } else {
      setStatus('out');
      setDuration('00:00:00');
    }
    setNote('');
    setPendingAction(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* HEADER */}
      <header className="bg-[#004b8d] text-white p-6 pb-20 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Menu size={20} />
            </div>
            <span className="font-bold tracking-tight text-lg uppercase">MITREKA</span>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => setIsInArea(!isInArea)}
               className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all shadow-sm ${isInArea ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-amber-500 border-amber-400 text-white'}`}
             >
                Simulasi: {isInArea ? 'DALAM' : 'LUAR'}
             </button>
            <div className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Bell size={20} />
              <span className="absolute top-2 right-2 bg-rose-500 w-2 h-2 rounded-full border border-[#004b8d]"></span>
            </div>
          </div>
        </div>
        
        <div className="space-y-1 relative z-10">
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, Eka Dian</h1>
          <p className="text-white/70 text-sm">Absen tepat waktu, pulang tenang!</p>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="px-6 -mt-12 flex-1 pb-24 relative z-20">
        
        {/* TIME CARD (Glassmorphism) */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-xl mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${isInArea ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
              <MapPin size={12} />
              <span>{isInArea ? 'Office Sudirman' : 'Di Luar Area'}</span>
            </div>
            <button 
              onClick={() => setShowMapModal(true)}
              className="text-[10px] font-bold text-[#004b8d] underline decoration-[#004b8d]/30"
            >
              Lihat Map
            </button>
          </div>
          
          <h2 className="text-5xl font-black text-[#004b8d] tracking-tighter mb-1">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <span className="text-2xl font-medium opacity-30 ml-1">:{currentTime.toLocaleTimeString([], { second: '2-digit' })}</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs mb-0">
             {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>

          {status === 'in' && (
            <div className="w-full pt-4 mt-4 border-t border-slate-200/50 flex justify-between items-center px-2 animate-in fade-in slide-in-from-top-2">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-slate-400">Durasi Kerja</span>
                  <span className="text-xl font-black text-[#004b8d]">{duration}</span>
               </div>
               <Timer size={24} className="text-[#004b8d]/20 animate-pulse" />
            </div>
          )}
        </div>

        {/* ACTION BUTTON */}
        <div className="flex flex-col items-center mb-8">
          <button 
            onClick={() => initiateAction(status === 'in' ? 'out' : 'in')}
            disabled={status === 'out'}
            className={`
              relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl active:scale-90
              ${status === 'idle' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : ''}
              ${status === 'in' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : ''}
              ${status === 'out' ? 'bg-slate-200 shadow-none cursor-not-allowed' : ''}
            `}
          >
            {status !== 'out' && (
              <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${status === 'idle' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            )}
            
            {status === 'idle' && (
              <>
                <div className="bg-white/20 p-4 rounded-full mb-2">
                  <Clock size={40} className="text-white" />
                </div>
                <span className="text-white font-black text-lg tracking-widest uppercase">Clock In</span>
              </>
            )}

            {status === 'in' && (
              <>
                <div className="bg-white/20 p-4 rounded-full mb-2">
                  <LogOut size={40} className="text-white" />
                </div>
                <span className="text-white font-black text-lg tracking-widest uppercase">Clock Out</span>
              </>
            )}

            {status === 'out' && (
              <>
                <CheckCircle2 size={40} className="text-slate-400 mb-2" />
                <span className="text-slate-400 font-black text-lg tracking-widest uppercase">Selesai</span>
              </>
            )}
          </button>

          {status === 'out' && (
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 flex items-center gap-2 text-[#004b8d] font-bold bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Plus size={20} />
              <span>Sesi Baru</span>
            </button>
          )}
        </div>

        {/* RIWAYAT LOG */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-slate-800 text-lg tracking-tight">Riwayat Absen</h3>
            <button className="text-xs text-[#004b8d] font-bold uppercase tracking-wider">Lihat Semua</button>
          </div>
          
          <div className="space-y-3">
            {attendanceData.map((item) => (
              <div key={item.id} className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 flex items-center justify-between cursor-pointer active:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-[#004b8d] font-bold">
                       <span className="text-[10px] leading-none opacity-50 uppercase">{item.day}</span>
                       <span className="text-lg leading-tight">{item.date.split(' ')[0]}</span>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-slate-700">{item.firstIn}</span>
                          <span className="text-slate-300 text-xs font-light">—</span>
                          <span className="text-sm font-bold text-slate-700">{item.lastOut}</span>
                       </div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {item.sessions.length} Sesi • {item.totalWork}
                       </p>
                    </div>
                  </div>
                  <div className="text-slate-300">
                    {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedId === item.id && (
                  <div className="bg-slate-50 px-5 py-4 border-t border-slate-50 space-y-4 animate-in fade-in slide-in-from-top-2">
                    {item.sessions.map((s, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 pb-3 border-b border-slate-200/50 last:border-0 last:pb-0">
                         <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-400 text-[10px] uppercase tracking-tighter">Sesi {idx + 1}</span>
                            <div className="flex gap-4">
                                <span className="text-emerald-600 font-black text-xs tracking-tight uppercase">In {s.in}</span>
                                <span className="text-rose-500 font-black text-xs tracking-tight uppercase">Out {s.out}</span>
                            </div>
                         </div>
                         {s.note && (
                            <div className="flex gap-1.5 items-start bg-amber-50 p-2 rounded-xl border border-amber-100/50">
                               <AlertCircle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
                               <p className="text-[10px] font-medium text-amber-700 italic">"{s.note}"</p>
                            </div>
                         )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MAP MODAL (Full View Location) */}
      {showMapModal && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white animate-in slide-in-from-bottom duration-500">
          <div className="bg-[#004b8d] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <MapIcon size={20} />
               <h3 className="font-bold text-lg">Lokasi Presensi</h3>
            </div>
            <button 
              onClick={() => setShowMapModal(false)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 relative bg-slate-100 flex items-center justify-center overflow-hidden">
             {/* SIMULATED MAP SVG */}
             <svg width="100%" height="100%" viewBox="0 0 400 600" className="absolute inset-0">
                <rect width="400" height="600" fill="#e2e8f0" />
                <path d="M0 100 L400 100 M0 250 L400 250 M0 400 L400 400 M0 550 L400 550" stroke="#cbd5e1" strokeWidth="20" fill="none" />
                <path d="M100 0 L100 600 M250 0 L250 600" stroke="#cbd5e1" strokeWidth="20" fill="none" />
                
                {/* Office Radius */}
                <circle cx="250" cy="250" r="80" fill="#004b8d" fillOpacity="0.1" stroke="#004b8d" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Office Marker */}
                <circle cx="250" cy="250" r="12" fill="#004b8d" />
                <text x="250" y="275" textAnchor="middle" fill="#004b8d" fontSize="10" fontWeight="bold">MITREKA HQ</text>
                
                {/* User Marker */}
                <g className={isRefreshing ? 'opacity-30' : 'opacity-100 transition-all duration-1000'} transform={`translate(${isInArea ? 230 : 120}, ${isInArea ? 230 : 450})`}>
                  <circle r="20" fill="#004b8d" fillOpacity="0.2">
                    <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="6" fill="#004b8d" stroke="white" strokeWidth="2" />
                  <text x="0" y="15" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="black">LOKASI ANDA</text>
                </g>
             </svg>

             {/* MAP OVERLAY INFO */}
             <div className="absolute bottom-10 left-6 right-6 space-y-4">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white">
                   <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2 rounded-xl ${isInArea ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                         <Navigation size={20} className={isRefreshing ? 'animate-spin' : ''} />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-black text-slate-800 text-sm">Status GPS</h4>
                         <p className="text-xs text-slate-400 font-medium">
                            {isRefreshing ? 'Mengambil koordinat baru...' : (isInArea ? 'Akurasi Tinggi - Di dalam area' : 'Akurasi Tinggi - Di luar area')}
                         </p>
                      </div>
                   </div>
                   
                   <button 
                     onClick={handleRefreshLocation}
                     disabled={isRefreshing}
                     className="w-full bg-[#004b8d] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#004b8d]/20 active:scale-95 transition-all disabled:opacity-70"
                   >
                     <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                     {isRefreshing ? 'REFRESHING GPS...' : 'REFRESH LOKASI'}
                   </button>
                </div>
                
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-10">
                   Pastikan GPS Device Anda Aktif & Browser Mendapat Izin Lokasi
                </p>
             </div>
          </div>
        </div>
      )}

      {/* NOTE MODAL (Outside Area Reason) */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="bg-white w-full max-w-xs rounded-[40px] overflow-hidden relative z-10 flex flex-col p-8 animate-in zoom-in duration-300 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <MapIcon size={20} />
               </div>
               <div>
                  <h3 className="text-lg font-black text-slate-800 leading-none tracking-tight">Luar Area</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Wajib Isi Alasan</p>
               </div>
            </div>
            
            <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
               Sistem mendeteksi Anda di luar radius kantor. Masukkan catatan untuk verifikasi:
            </p>
            
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: WFH / Meeting luar kantor"
              className="w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-[#004b8d]/20 focus:outline-none transition-all mb-6"
            />
            
            <div className="flex gap-3">
               <button 
                 onClick={() => setShowNoteModal(false)}
                 className="flex-1 py-3 text-xs font-bold text-slate-400 hover:text-slate-600"
               >
                 Batal
               </button>
               <button 
                 onClick={handleSubmitNote}
                 disabled={note.trim() === ''}
                 className="flex-2 bg-[#004b8d] text-white py-3 px-6 rounded-2xl text-xs font-black shadow-lg shadow-[#004b8d]/20 disabled:opacity-50"
               >
                 Lanjut Scan
               </button>
            </div>
          </div>
        </div>
      )}

      {/* FACE SCAN MODAL */}
      {showFaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
          <div className="bg-white w-full max-w-xs rounded-[40px] overflow-hidden relative z-10 flex flex-col items-center p-10 animate-in zoom-in duration-300 shadow-2xl">
            <div className="w-48 h-48 rounded-full border-2 border-slate-100 flex items-center justify-center mb-8 relative overflow-hidden bg-slate-50 shadow-inner text-[#004b8d]">
               <Camera size={64} className="opacity-10" />
               <div className="absolute inset-4 border-2 border-dashed border-[#004b8d]/20 rounded-full animate-spin-slow"></div>
               <div className="absolute top-0 left-0 w-full h-1 bg-[#004b8d] animate-scan shadow-[0_0_20px_#004b8d]"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tight text-center">
               Verifikasi {pendingAction === 'in' ? 'Masuk' : 'Keluar'}
            </h3>
            <p className="text-slate-400 text-[10px] text-center leading-relaxed font-black uppercase tracking-widest px-2">
               Biometrik Autentikasi...
            </p>
          </div>
        </div>
      )}

      {/* NAV BAR */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button className="text-[#004b8d] flex flex-col items-center gap-1.5 transition-all">
          <div className="p-1 bg-[#004b8d]/5 rounded-lg">
             <Clock size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Absen</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1.5 p-1">
          <History size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Log</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1.5 p-1">
          <User size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profil</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1.5 p-1">
          <Menu size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Menu</span>
        </button>
      </nav>

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};

export default App;