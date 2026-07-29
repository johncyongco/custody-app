import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { faculties } from "@/data/faculties";
import { useTraceStore } from "@/stores/trace-store";
import type { Faculty } from "@/types";

const hotspotPositions: Partial<Record<Faculty, { top: string; left: string }>> = {
  mind:       { top: "13%", left: "50%" },
  eyes:       { top: "18%", left: "66%" },
  ears:       { top: "24%", left: "72%" },
  nose:       { top: "20%", left: "29%" },
  mouth:      { top: "26%", left: "29%" },
  heart:      { top: "35%", left: "50%" },
  hands:      { top: "50%", left: "75%" },
  feet:       { top: "86%", left: "49%" },
  "whole body": { top: "50%", left: "50%" },
};

export default function HumanMapPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Faculty | null>(null);
  const { entries, addEntry } = useTraceStore();

  const current = faculties.find((f) => f.id === selected);

  const isToday = (dateStr: string) =>
    new Date(dateStr).toDateString() === new Date().toDateString();

  const isConsecrated = (id: Faculty) =>
    entries.some(
      (e) =>
        e.faculty === id &&
        e.movement === "Consecrated to the Holy Spirit" &&
        isToday(e.created_at)
    );

  const handleConsecrate = () => {
    if (!current) return;
    addEntry({
      faculty: current.id,
      movement: "Consecrated to the Holy Spirit",
      reflection: "",
      fruit: "",
      source: "",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      notes: "",
    });
    setSelected(null);
  };

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 text-text mb-2">The Temple</h1>
          <p className="text-body text-text-secondary mb-8">
            Touch a faculty to consecrate it to the Holy Spirit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[300px] mx-auto mb-8"
        >
          <div className="relative rounded-[40px] bg-gradient-to-b from-white/30 via-white/10 to-white/30 border border-white/30 shadow-float overflow-hidden">
            <img
              src="/map-bg.png"
              alt="Human Map"
              className="w-full h-auto pointer-events-none"
            />

            <div className="absolute inset-0">
              {(Object.keys(hotspotPositions) as Faculty[]).map((faculty) => {
                const pos = hotspotPositions[faculty];
                if (!pos) return null;
                const isSelected = selected === faculty;
                const consecrated = isConsecrated(faculty);
                return (
                  <motion.button
                    key={faculty}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelected(isSelected ? null : faculty)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 z-10 ${
                      consecrated
                        ? "bg-emerald-50/90 text-emerald-700 shadow-lg ring-2 ring-emerald-400/50 scale-105 border border-emerald-300/50"
                        : isSelected
                        ? "bg-holy-light/90 text-[#1C2233] shadow-lg ring-2 ring-holy-periwinkle/40 scale-110"
                        : "bg-white/70 text-text-secondary backdrop-blur-sm hover:bg-white/90 hover:scale-105 border border-white/50"
                    }`}
                    style={{ top: pos.top, left: pos.left }}
                  >
                    {faculty === "whole body" ? "Body" : faculty.charAt(0).toUpperCase() + faculty.slice(1)}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md glass-card rounded-[36px] max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-holy-light/40 flex items-center justify-center">
                      <span className="text-h4 font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                        {current.label[0]}
                      </span>
                    </div>
                    <h3 className="text-h3 text-text">{current.label}</h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-1 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  {current.description}
                </p>

                <div className="rounded-2xl bg-sky-mist/30 p-4 border border-white/40 mb-4">
                  <p className="text-small text-text-secondary italic leading-relaxed">
                    {current.scripture}
                  </p>
                </div>

                <div className="rounded-2xl bg-holy-light/20 p-5 border border-holy-periwinkle/20 mb-4">
                  <p className="text-body text-text-secondary leading-relaxed">
                    {current.consecration}
                  </p>
                </div>

                <button
                  onClick={handleConsecrate}
                  disabled={isConsecrated(current.id)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full text-small font-bold tracking-wide uppercase transition-all duration-300 ${
                    isConsecrated(current.id)
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-holy-periwinkle text-white hover:bg-holy-periwinkle/90 active:scale-[0.97]"
                  }`}
                >
                  <CheckCircle size={18} strokeWidth={2} />
                  {isConsecrated(current.id) ? "Consecrated" : "Finish Consecration"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-caption text-text-muted mt-6"
          >
            Tap a faculty to consecrate it
          </motion.p>
        )}
      </div>
    </div>
  );
}
