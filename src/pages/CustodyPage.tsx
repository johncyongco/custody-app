import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useTraceStore } from "@/stores/trace-store";
import { faculties } from "@/data/faculties";
import type { Faculty } from "@/types";

const custodyOptions = [
  "Guarded my eyes from impurity",
  "Listened with patience",
  "Spoke with kindness",
  "Kept silence when provoked",
  "Averted my gaze from vanity",
  "Chose wholesome speech",
  "Protected my thoughts from envy",
  "Turned away from gossip",
  "Offered a gentle response",
  "Refused to dwell on resentment",
  "Chose gratitude over complaint",
  "Set boundaries on my time",
  "Fasted from distraction",
  "Practiced custody of the heart",
  "Offered my hands in service",
  "Guided my feet toward prayer",
];

const fruitOptions = [
  "Love", "Joy", "Peace", "Patience", "Kindness",
  "Goodness", "Faithfulness", "Gentleness", "Self-Control",
];

export default function CustodyPage() {
  const { entries, addEntry, removeEntry } = useTraceStore();
  const custodyEntries = entries.filter((e) => e.movement !== "Consecrated to the Holy Spirit");
  const [showForm, setShowForm] = useState(false);
  const [faculty, setFaculty] = useState<Faculty>("heart");
  const [movement, setMovement] = useState("");
  const [reflection, setReflection] = useState("");
  const [fruit, setFruit] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!movement.trim()) return;
    addEntry({
      faculty,
      movement: movement.trim(),
      reflection: reflection.trim(),
      fruit: fruit.trim(),
      source: "",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      notes: notes.trim(),
    });
    setMovement("");
    setReflection("");
    setFruit("");
    setNotes("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="px-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 text-text mb-2">Custody</h1>
          <p className="text-body text-text-secondary mb-8">
            Guard every faculty. Record how you kept watch over the temple today.
          </p>
        </motion.div>

        {custodyEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card text-center py-16"
          >
            <p className="text-h3 text-text-muted mb-3">No custody recorded yet</p>
            <p className="text-body text-text-secondary mb-8 max-w-xs mx-auto">
              Custody is the guard you keep over your senses. Begin by recording how you protected a faculty today.
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="timeline-line" />
            <div className="space-y-5">
              {custodyEntries.map((entry, i) => {
                const facultyInfo = faculties.find((f) => f.id === entry.faculty);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-[26px] top-1 timeline-dot" />
                    <div className="glass-card-sm group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-small font-semibold text-holy-periwinkle uppercase tracking-wide">
                            Custody of the {facultyInfo?.label || entry.faculty}
                          </span>
                          <span className="text-small text-text-muted">·</span>
                          <span className="text-small text-text-muted">{entry.time}</span>
                        </div>
                        <button
                          onClick={() => removeEntry(entry.id)}
                          className="p-1 text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <h3 className="text-h4 text-text mb-2">{entry.movement}</h3>
                      {entry.reflection && (
                        <p className="text-body text-text-secondary leading-relaxed mb-3">
                          {entry.reflection}
                        </p>
                      )}
                      {entry.fruit && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-mist/50 text-small font-medium text-text-secondary">
                          <span>Fruit: {entry.fruit}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-text/20 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-md glass-card rounded-[36px] max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 text-text">Record Custody</h2>
                <button onClick={() => setShowForm(false)} className="p-1 text-text-muted hover:text-text-secondary">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="label-trace block mb-2">Faculty</label>
                  <div className="flex flex-wrap gap-2">
                    {faculties.filter((f) => !["left eye", "left ear", "left hand"].includes(f.id)).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFaculty(f.id)}
                        className={`px-3 py-1.5 rounded-full text-small font-medium transition-all ${
                          faculty === f.id
                            ? "bg-holy-periwinkle text-white"
                            : "bg-white/50 text-text-secondary hover:bg-white/80"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label-trace block mb-2">Act of Custody</label>
                  <input
                    type="text"
                    value={movement}
                    onChange={(e) => setMovement(e.target.value)}
                    placeholder="e.g. Guarded my eyes from impurity"
                    className="input-trace"
                    list="custody-suggestions"
                  />
                  <datalist id="custody-suggestions">
                    {custodyOptions.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="label-trace block mb-2">Reflection</label>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="How did guarding this faculty draw you closer to the Spirit?"
                    className="input-trace resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="label-trace block mb-2">Fruit of the Spirit</label>
                  <div className="flex flex-wrap gap-2">
                    {fruitOptions.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFruit(fruit === f ? "" : f)}
                        className={`px-3 py-1.5 rounded-full text-small font-medium transition-all ${
                          fruit === f
                            ? "bg-holy-light/60 text-[#1C2233]"
                            : "bg-white/50 text-text-secondary hover:bg-white/80"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label-trace block mb-2">Notes (optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a note..."
                    className="input-trace"
                  />
                </div>

                <button onClick={handleSubmit} className="btn-primary w-full" disabled={!movement.trim()}>
                  Record Custody
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showForm && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          onClick={() => setShowForm(true)}
          className="btn-float fixed bottom-24 right-6 z-40"
        >
          <Plus size={28} strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  );
}
