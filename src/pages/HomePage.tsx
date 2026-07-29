import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Flame, BookHeart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "@/stores/ui-store";

const dailyFruits = [
  { name: "Love", description: "The willing, selfless love that seeks the good of another before self." },
  { name: "Joy", description: "A deep, abiding gladness rooted not in circumstance but in the Spirit's presence." },
  { name: "Peace", description: "The stillness that passes understanding. Wholeness in the midst of chaos." },
  { name: "Patience", description: "The long faithfulness that bears with others as God bears with us." },
  { name: "Kindness", description: "The gentle strength that meets others with warmth and generosity." },
  { name: "Goodness", description: "Integrity in action. A life that radiates the character of God." },
  { name: "Faithfulness", description: "Steadfast loyalty. Remaining true to God and to one another." },
  { name: "Gentleness", description: "The strength that yields. Power under control. A gentle answer turns away wrath." },
  { name: "Self-Control", description: "The mastery of the spirit over the flesh. Freedom through discipline." },
];

const quickActions = [
  { icon: Flame, label: "Pentecost Mode", color: "text-orange-500" },
  { icon: BookHeart, label: "Magnify", color: "text-rose-500", href: "/magnify" },
  { icon: Heart, label: "Quick Custody", color: "text-holy-periwinkle", href: "/custody" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { settings, verses } = useUIStore();
  const [currentVerse] = useState(() =>
    verses.length > 0 ? Math.floor(Math.random() * verses.length) : 0
  );
  const todayFruit = dailyFruits[new Date().getDay()];

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

  const handleQuickAction = (action: typeof quickActions[number]) => {
    if (action.label === "Pentecost Mode") {
      setPentecostActive(true);
    } else if (action.href) {
      navigate(action.href);
    }
  };

  return (
    <div className="min-h-screen pb-28 relative">
      <img src="/home-bg.png" alt="" className="absolute top-0 left-0 w-full pointer-events-none -z-10" />
      <div className="px-6 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-24 h-24 mb-6 relative glow-dove">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="dove-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="url(#dove-glow)" />
            </svg>
            <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full p-4">
              <path d="M20 8 C12 8 6 14 6 22 C6 30 12 36 20 36 C28 36 34 30 34 22 C34 14 28 8 20 8Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <path d="M20 36 L14 28 L26 28 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {settings.name && (
            <p className="text-body text-text-secondary mb-2">
              {settings.name}
            </p>
          )}

          <h1 className="text-hero text-text mb-4 leading-[1.05]">
            You are the Temple
            <br />
            of the Holy Spirit.
          </h1>

          <p className="text-body text-text-secondary max-w-sm leading-relaxed">
            Consecrate, guard, and trace every faculty of your being.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card mb-5 mt-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-sky-mist flex items-center justify-center">
              <BookOpen size={14} className="text-holy-periwinkle" />
            </div>
            <span className="label-trace">Life Verse</span>
          </div>
          {verses.length > 0 ? (
            <>
              <p className="text-body-large text-text leading-relaxed italic mb-3">
                "{verses[currentVerse].text}"
              </p>
              <p className="text-caption text-text-secondary">
                — {verses[currentVerse].reference}
              </p>
            </>
          ) : (
            <button
              onClick={() => navigate("/life-verses")}
              className="w-full flex items-center justify-between py-2 group"
            >
              <span className="text-body text-text-muted">
                You have not added a Life Verse, add one
              </span>
              <ArrowRight
                size={18}
                className="text-text-muted group-hover:translate-x-1 transition-transform"
                strokeWidth={1.5}
              />
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.33 }}
          className="glass-card mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-sky-mist flex items-center justify-center">
              <Heart size={14} className="text-holy-periwinkle" />
            </div>
            <span className="label-trace">Today's Fruit</span>
          </div>
          <h3 className="text-h3 text-text mb-2">{todayFruit.name}</h3>
          <p className="text-body text-text-secondary leading-relaxed">
            {todayFruit.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                onClick={() => handleQuickAction(action)}
                className="glass-card-sm flex flex-col items-center gap-2 py-5 hover:bg-white/50 transition-all duration-300"
              >
                <Icon size={20} className={action.color} />
                <span className="text-small text-text-secondary font-medium text-center">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </div>



        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => navigate("/map")}
          className="btn-primary w-full"
        >
          Begin Consecration
          <ArrowRight size={18} strokeWidth={2.5} />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-caption text-text-muted mt-6 mb-8"
        >
          Your body is sacred ground.
        </motion.p>
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
      </AnimatePresence>
    </div>
  );
}
