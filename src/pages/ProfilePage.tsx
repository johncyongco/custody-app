import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Heart, Settings, User, ChevronRight, CheckCircle, Church, ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { useTraceStore, computeDailyFaithfulness } from "@/stores/trace-store";
import { faculties } from "@/data/faculties";

const menuSections = [
  {
    label: "Spiritual Life",
    items: [
      { icon: Heart, label: "Consecration Status", color: "text-holy-periwinkle", href: "/consecration-status" },
      { icon: BookOpen, label: "Favourite Scriptures", color: "text-morning-blue", href: "/life-verses" },
      { icon: Church, label: "Friends of the Holy Spirit", color: "text-holy-periwinkle", href: "/friends-of-the-spirit" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: Settings, label: "Settings", color: "text-text-muted", href: "" },
    ],
  },
  {
    label: "Useful Resources",
    items: [
      { icon: Globe, label: "Interior Castle App", color: "text-holy-periwinkle", href: "https://interior-castle.vercel.app/", external: true },
      { icon: Globe, label: "Agapetoi Self Knowledge App", color: "text-holy-periwinkle", href: "https://agapetoi.vercel.app/", external: true },
    ],
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useUIStore();
  const { entries } = useTraceStore();
  const [nameEdit, setNameEdit] = useState(settings.name);

  const uniqueFaculties = faculties.filter(
    (f, i, arr) => arr.findIndex((x) => x.label === f.label) === i
  );

  const isToday = (dateStr: string) =>
    new Date(dateStr).toDateString() === new Date().toDateString();

  const custodyEntries = entries.filter((e) => e.movement !== "Consecrated to the Holy Spirit");
  const consecrationEntries = entries.filter(
    (e) => e.movement === "Consecrated to the Holy Spirit" && isToday(e.created_at)
  );

  const consecratedCount = uniqueFaculties.filter((f) =>
    consecrationEntries.some((e) => {
      const entryFaculty = faculties.find((x) => x.id === e.faculty);
      return entryFaculty && entryFaculty.label === f.label;
    })
  ).length;

  const totalFaculties = uniqueFaculties.length;
  const progressPct = Math.round((consecratedCount / totalFaculties) * 100);

  const faithfulness = computeDailyFaithfulness(entries);

  const handleNameSave = () => {
    updateSettings({ name: nameEdit.trim() });
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-mist to-white flex items-center justify-center mb-4 shadow-card border border-white/50">
            <User size={32} className="text-holy-periwinkle" />
          </div>
          <input
            type="text"
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
            onBlur={handleNameSave}
            placeholder="Your Name"
            className="text-h2 text-text text-center bg-transparent border-none outline-none w-full max-w-xs placeholder:text-text-muted"
          />
          <p className="text-body text-text-secondary mt-1">
            {custodyEntries.length} custody act{custodyEntries.length !== 1 ? "s" : ""} recorded
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card mb-6"
        >
          <span className="label-trace block mb-3">Daily Consecration Progress</span>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-3 rounded-full bg-white/60 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-holy-periwinkle to-morning-blue"
              />
            </div>
            <span className="text-small font-bold text-text-secondary whitespace-nowrap">
              {consecratedCount}/{totalFaculties}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueFaculties.map((f) => {
              const done = consecrationEntries.some((e) => {
                const ef = faculties.find((x) => x.id === e.faculty);
                return ef && ef.label === f.label;
              });
              return (
                <div
                  key={f.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                    done
                      ? "bg-holy-periwinkle text-white"
                      : "bg-white/40 text-text-secondary"
                  }`}
                >
                  {done && <CheckCircle size={10} strokeWidth={2.5} />}
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>

          {(
            <div className="flex items-center justify-center pt-3 mt-3 border-t border-white/30">
              <div className="text-center">
                <p className="text-h2 text-holy-periwinkle font-bold">{faithfulness.current}</p>
                <p className="text-caption text-text-secondary">Faithful Days</p>
              </div>
            </div>
          )}
        </motion.div>

        {menuSections.map((section, si) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + si * 0.1 }}
            className="mb-6"
          >
            <span className="label-trace block mb-3 px-1">{section.label}</span>
            <div className="glass-card-sm !p-2 space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if ((item as any).external) {
                        window.open(item.href, "_blank");
                      } else if (item.href) {
                        navigate(item.href);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-white/50 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-mist/50 flex items-center justify-center">
                      <Icon size={16} className={item.color} />
                    </div>
                    <span className="text-body text-text flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    {(item as any).external ? (
                      <ArrowRight size={16} className="text-text-muted group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight size={16} className="text-text-muted group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-sky-mist flex items-center justify-center">
              <Heart size={14} className="text-holy-periwinkle" />
            </div>
            <span className="label-trace">About Custody</span>
          </div>
          <p className="text-body text-text-secondary leading-relaxed">
            Custody is a spiritual formation app for consecrating every faculty of your being to the Holy Spirit. Rooted in the Catholic tradition of custody of the senses and the seven gifts of the Holy Spirit, it guides you in guarding your heart, mind, and body as a living temple of God.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
