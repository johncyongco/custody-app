import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Music, X, ChevronRight, Languages, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { praiseLanguages } from "@/data/book-of-praise";
import type { LanguagePrayer } from "@/data/book-of-praise";

const hymns = [
  { title: "Veni Creator Spiritus", language: "Latin", tradition: "Gregorian Chant", description: "Come, Creator Spirit — the quintessential hymn to the Holy Spirit, sung at Pentecost and ordinations." },
  { title: "Veni Sancte Spiritus", language: "Latin", tradition: "Gregorian Sequence", description: "The Golden Sequence — the Pentecost sequence hymn, attributed to Stephen Langton or Innocent III." },
  { title: "Te Deum", language: "Latin", tradition: "Western Chant", description: "We praise You, God — an ancient hymn of praise attributed to Saints Ambrose and Augustine." },
  { title: "Exsultet", language: "Latin", tradition: "Easter Proclamation", description: "The Easter proclamation sung at the Easter Vigil, declaring Christ's victory over death." },
  { title: "Agios O Theos", language: "Greek", tradition: "Eastern Orthodox", description: "Holy God, Holy Mighty, Holy Immortal — the Trisagion hymn of the Eastern tradition." },
  { title: "Cherubic Hymn", language: "Greek", tradition: "Byzantine", description: "The hymn of the Cherubim, sung during the Great Entrance in the Divine Liturgy." },
];

type Tab = "prayers" | "hymns" | "languages";

export default function BookOfPraisePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("prayers");
  const [selected, setSelected] = useState<LanguagePrayer | null>(null);
  const [prayerType, setPrayerType] = useState<"ourFather" | "hailMary" | "gloryBe">("ourFather");
  const [romanized, setRomanized] = useState(false);

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
        >
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-h1 text-text">Magnify</h1>
          </div>
          <p className="text-body text-text-secondary mb-6">
            <span className="font-semibold text-holy-periwinkle">Book of Praises</span> — Praise God in every tongue
          </p>
        </motion.div>

        <div className="flex gap-1.5 mb-6">
          {([
            { id: "prayers" as Tab, icon: BookOpen, label: "Prayers" },
            { id: "hymns" as Tab, icon: Music, label: "Hymns" },
            { id: "languages" as Tab, icon: Languages, label: "Languages" },
          ]).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                tab === id
                  ? "bg-holy-periwinkle text-white shadow-lg shadow-holy-periwinkle/20"
                  : "bg-white/50 text-text-secondary hover:bg-white/80"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
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
            {tab === "prayers" && (
              <div className="space-y-4 mb-6">
                <p className="text-body text-text-secondary leading-relaxed">
                  Pray the sacred prayers of the Church in the languages of Pentecost. Each language reveals a new facet of God's glory.
                </p>
                {praiseLanguages.map((lang, i) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    onClick={() => {
                      setSelected(lang);
                      setPrayerType("ourFather");
                      setRomanized(false);
                    }}
                    className="glass-card w-full text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-h3 text-text">{lang.name}</span>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {tab === "hymns" && (
              <div className="space-y-4 mb-6">
                <p className="text-body text-text-secondary leading-relaxed">
                  Sacred hymns and chants from the Church's rich musical tradition.
                </p>
                {hymns.map((hymn, i) => (
                  <motion.div
                    key={hymn.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-mist/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Music size={14} className="text-holy-periwinkle" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h3 text-text">{hymn.title}</h3>
                        <p className="text-small font-semibold text-holy-periwinkle mb-1">
                          {hymn.language} · {hymn.tradition}
                        </p>
                        <p className="text-body text-text-secondary">
                          {hymn.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "languages" && (
              <div className="space-y-4 mb-6">
                <p className="text-body text-text-secondary leading-relaxed">
                  Explore the languages of Christian worship, from ancient tongues to the farthest corners of the earth.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { lang: "Latin", family: "Italic", script: "Latin", speakers: "Church" },
                    { lang: "Koine Greek", family: "Hellenic", script: "Greek", speakers: "Early Church" },
                    { lang: "Hebrew", family: "Semitic", script: "Hebrew", speakers: "Old Testament" },
                    { lang: "Aramaic", family: "Semitic", script: "Aramaic", speakers: "Christ's Tongue" },
                    { lang: "Syriac", family: "Semitic", script: "Syriac", speakers: "Eastern Liturgy" },
                    { lang: "Coptic", family: "Afro-Asiatic", script: "Coptic", speakers: "Egyptian Rite" },
                    { lang: "Ge'ez", family: "Afro-Asiatic", script: "Ge'ez", speakers: "Ethiopian Rite" },
                    { lang: "Church Slavonic", family: "Slavic", script: "Cyrillic", speakers: "Eastern Orthodox" },
                  ].map((l, i) => (
                    <motion.div
                      key={l.lang}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="glass-card"
                    >
                      <h3 className="text-h3 text-text mb-0.5">{l.lang}</h3>
                      <p className="text-caption text-text-secondary">{l.family} · {l.script}</p>
                      <span className="text-[10px] font-semibold text-holy-periwinkle mt-1 block">{l.speakers}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-text/10 backdrop-blur-[2px]" onClick={() => setSelected(null)} />
            <motion.div
              key={selected.code}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full max-w-md glass-card rounded-[36px] max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selected.flag}</span>
                  <h2 className="text-h2 text-text">{selected.name}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 text-text-muted hover:text-text-secondary transition-colors rounded-full hover:bg-white/50"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex gap-1.5 mb-6">
                {([
                  { id: "ourFather" as const, label: "Our Father" },
                  { id: "hailMary" as const, label: "Hail Mary" },
                  { id: "gloryBe" as const, label: "Glory Be" },
                ]).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPrayerType(p.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                      prayerType === p.id
                        ? "bg-holy-periwinkle text-white"
                        : "bg-white/50 text-text-secondary hover:bg-white/80"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {selected.transliteration && (
                <button
                  onClick={() => setRomanized(!romanized)}
                  className={`mb-4 px-4 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                    romanized
                      ? "bg-holy-periwinkle text-white"
                      : "bg-white/50 text-text-secondary hover:bg-white/80"
                  }`}
                >
                  {romanized ? "Original Script" : "Romanized"}
                </button>
              )}

              <div className="rounded-2xl bg-white/40 p-5 border border-white/40">
                <p className="text-body text-text-secondary leading-relaxed text-center" style={{ fontStyle: "normal" }}>
                  {romanized && selected.transliteration ? selected.transliteration[prayerType] : selected[prayerType]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
