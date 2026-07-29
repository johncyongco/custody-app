import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Wind, Heart } from "lucide-react";
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
  { icon: BookOpen, label: "Life Verse", color: "text-holy-periwinkle", href: "/life-verses" },
  { icon: Wind, label: "Breathing Prayer", color: "text-morning-blue", href: "/map" },
  { icon: Heart, label: "Quick Trace", color: "text-holy-periwinkle", href: "/custody" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { settings, verses } = useUIStore();
  const [currentVerse] = useState(() =>
    verses.length > 0 ? Math.floor(Math.random() * verses.length) : 0
  );
  const todayFruit = dailyFruits[new Date().getDay()];

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
                onClick={() => navigate(action.href)}
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
    </div>
  );
}
