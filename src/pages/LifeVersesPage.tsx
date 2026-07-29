import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, BookOpen, Quote } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";

export default function LifeVersesPage() {
  const { verses, addVerse, removeVerse } = useUIStore();
  const [showForm, setShowForm] = useState(false);
  const [reference, setReference] = useState("");
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!reference.trim() || !text.trim()) return;
    addVerse({ reference: reference.trim(), text: text.trim() });
    setReference("");
    setText("");
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
          <h1 className="text-h1 text-text mb-2">Life Verses</h1>
          <p className="text-body text-text-secondary mb-8">
            Scripture that has shaped your journey.
          </p>
        </motion.div>

        {verses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card text-center py-16"
          >
            <Quote size={32} className="mx-auto text-text-muted mb-4" />
            <p className="text-h3 text-text-muted mb-3">No verses yet</p>
            <p className="text-body text-text-secondary mb-8 max-w-xs mx-auto">
              Add the scriptures that speak deepest to your soul.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {verses.map((verse, i) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card group relative"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-mist/50 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={14} className="text-holy-periwinkle" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body text-text leading-relaxed italic mb-2">
                      "{verse.text}"
                    </p>
                    <p className="text-small font-semibold text-holy-periwinkle">
                      — {verse.reference}
                    </p>
                  </div>
                  <button
                    onClick={() => removeVerse(verse.id)}
                    className="p-1 text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all shrink-0"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ))}
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
              className="relative w-full max-w-md glass-card rounded-[36px]"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 text-text">Add Life Verse</h2>
                <button onClick={() => setShowForm(false)} className="p-1 text-text-muted hover:text-text-secondary">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="label-trace block mb-2">Reference</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. John 3:16"
                    className="input-trace"
                  />
                </div>

                <div>
                  <label className="label-trace block mb-2">Verse Text</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="For God so loved the world..."
                    className="input-trace resize-none"
                    rows={3}
                  />
                </div>

                <button onClick={handleAdd} className="btn-primary w-full" disabled={!reference.trim() || !text.trim()}>
                  Save Verse
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
