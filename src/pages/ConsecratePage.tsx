import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, BookHeart, Flame, ChevronRight, Church, ArrowLeft, Feather } from "lucide-react";
import { holySymbols } from "@/data/holy-symbols";
import type { HolySymbol } from "@/types";
export default function ConsecratePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<HolySymbol | null>(null);
  const [tab, setTab] = useState<"meaning" | "scripture" | "prayer" | "reflection" | "consecration">("meaning");
  const [timer, setTimer] = useState(1200);
  const [isRunning, setIsRunning] = useState(false);
  const [pentecostActive, setPentecostActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(1200);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = ((1200 - timer) / 1200) * 100;

  const current = holySymbols.find((s) => s.id === selected);

  return (
    <div className="min-h-screen pb-28">
      <div className="px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text transition-colors mb-6"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-sky-mist flex items-center justify-center">
              <Flame size={14} className="text-holy-periwinkle" />
            </div>
            <div>
              <span className="label-trace block">Symbols of the Spirit</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3">
            {holySymbols.map((symbol, i) => (
              <motion.button
                key={symbol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => {
                  setSelected(symbol.id);
                  setTab("meaning");
                }}
                className="flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <img src={symbol.icon} alt={symbol.title} className="w-full aspect-square object-contain max-w-[120px]" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => setPentecostActive(true)}
          className="glass-card mb-8 w-full text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame size={14} className="text-orange-500" />
              </div>
              <div>
                <span className="label-trace block">Pentecost Mode</span>
                <span className="text-[10px] font-semibold text-orange-500 tracking-wide uppercase">Wait in silence</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-muted group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={1.5} />
          </div>

          <p className="text-body text-text-secondary leading-relaxed">
            Pray, and wait in silence for the Holy Spirit. The Holy Spirit is waiting for you too.
          </p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => navigate("/magnify")}
          className="glass-card mb-8 w-full text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                <BookHeart size={14} className="text-rose-500" />
              </div>
              <div>
                <span className="label-trace block">Magnify</span>
                <span className="text-[10px] font-semibold text-rose-500 tracking-wide uppercase">Book of Praises</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-muted group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={1.5} />
          </div>

          <p className="text-body text-text-secondary leading-relaxed mb-4">
            Praise God in every tongue. Discover prayers, hymns, and doxologies from languages around the world.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Latin", "Greek", "Hebrew", "Arabic", "Japanese", "Swahili", "Tagalog", "Korean"].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 rounded-full bg-white/50 text-[11px] font-semibold text-text-secondary"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={() => navigate("/novena")}
          className="glass-card mb-8 w-full text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Church size={14} className="text-yellow-600" />
              </div>
              <div>
                <span className="label-trace block">Novena to the Holy Spirit</span>
                <span className="text-[10px] font-semibold text-yellow-600 tracking-wide uppercase">Ascension to Pentecost</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-muted group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={1.5} />
          </div>

          <p className="text-body text-text-secondary leading-relaxed">
            The oldest of all novenas. Pray the nine days before Pentecost for the seven gifts of the Holy Spirit.
          </p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          onClick={() => navigate("/chaplet")}
          className="glass-card mb-8 w-full text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                <Feather size={14} className="text-violet-600" />
              </div>
              <div>
                <span className="label-trace block">Chaplet of the Holy Spirit</span>
                <span className="text-[10px] font-semibold text-violet-600 tracking-wide uppercase">St. Elena Guerra</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-muted group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={1.5} />
          </div>

          <p className="text-body text-text-secondary leading-relaxed">
            Pray the seven invocations to the Holy Spirit composed by Bl. Elena Guerra for a New Pentecost.
          </p>
        </motion.button>
      </div>

      <AnimatePresence>
        {pentecostActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-text/85 backdrop-blur-md" onClick={() => setPentecostActive(false)} />

            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            >
              <source src="/pentecost-mode-fire.mov" type="video/quicktime" />
            </video>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center gap-8"
            >
              <button
                onClick={() => { setPentecostActive(false); setIsRunning(false); resetTimer(); }}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="flex flex-col items-center gap-2">
                <Flame size={32} className="text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]" />
                <h2 className="text-h2 text-white font-bold">Pentecost Mode</h2>
                <p className="text-body text-white/60 text-center max-w-xs">
                  Pray, and wait in silence for the Holy Spirit. The Holy Spirit is waiting for you too.
                </p>
              </div>

              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  <motion.circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke="rgba(251,146,60,0.9)" strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={97.4}
                    strokeDashoffset={97.4 - (progress / 100) * 97.4}
                    initial={false}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-h1 text-white font-bold tabular-nums drop-shadow-lg">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                  <span className="text-caption text-white/50 mt-0.5">of silence</span>
                </div>
              </div>

              {!isRunning && timer === 1200 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setIsRunning(true)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold tracking-wide uppercase text-[13px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/30"
                >
                  Start and Pray
                </motion.button>
              )}

              {timer === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-body text-white/70 italic leading-relaxed">
                    "The Holy Spirit is the silence of God. In waiting, you are not alone — He waits with you."
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-text/10 backdrop-blur-[2px]" onClick={() => setSelected(null)} />
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full max-w-md glass-card rounded-[36px] max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src={current.icon} alt={current.title} className="w-16 h-16 object-contain" />
                  <div>
                    <h2 className="text-h2 text-text">{current.title}</h2>
                    <p className="text-caption text-text-secondary">Holy Spirit Symbol</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 text-text-muted hover:text-text-secondary transition-colors rounded-full hover:bg-white/50"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex gap-1.5 mb-6 flex-wrap">
                {(["meaning", "scripture", "prayer", "reflection", "consecration"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-all duration-300 ${
                      tab === t
                        ? "bg-holy-periwinkle text-white"
                        : "bg-white/50 text-text-secondary hover:bg-white/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-2xl bg-white/40 p-5 border border-white/40">
                    <p className="text-body text-text-secondary leading-relaxed">
                      {tab === "meaning" && current.meaning}
                      {tab === "scripture" && current.scripture}
                      {tab === "prayer" && current.prayer}
                      {tab === "reflection" && current.reflection}
                      {tab === "consecration" && current.consecration}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
