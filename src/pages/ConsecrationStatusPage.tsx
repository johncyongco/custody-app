import { motion } from "framer-motion";
import { CheckCircle, Flame, Scroll, Shield, Crown, Star, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTraceStore, computeDailyFaithfulness } from "@/stores/trace-store";
import { faculties } from "@/data/faculties";

const achievements = [
  {
    id: "first",
    icon: Star,
    title: "First Fruits",
    description: "Offer your first consecration to the Lord.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      entries.some((e) => e.movement === "Consecrated to the Holy Spirit"),
    color: "text-amber-500",
    bg: "bg-amber-50/60",
  },
  {
    id: "all-faculties",
    icon: Heart,
    title: "Living Temple",
    description: "Consecrate every faculty of your being.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) => {
      const consecratedLabels = new Set(
        entries
          .filter((e) => e.movement === "Consecrated to the Holy Spirit")
          .map((e) => faculties.find((f) => f.id === e.faculty)?.label)
          .filter(Boolean)
      );
      const allLabels = faculties.map((f) => f.label);
      return allLabels.every((label) => consecratedLabels.has(label));
    },
    color: "text-rose-500",
    bg: "bg-rose-50/60",
  },
  {
    id: "streak-3",
    icon: Flame,
    title: "Threefold Cord",
    description: "Consecrate for three days without breaking.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      computeDailyFaithfulness(entries).longest >= 3,
    color: "text-orange-500",
    bg: "bg-orange-50/60",
  },
  {
    id: "streak-7",
    icon: Scroll,
    title: "Sabbath Rest",
    description: "A full week of daily consecration.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      computeDailyFaithfulness(entries).longest >= 7,
    color: "text-blue-500",
    bg: "bg-blue-50/60",
  },
  {
    id: "streak-30",
    icon: Crown,
    title: "Crown of Life",
    description: "Thirty days of steadfast faithfulness.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      computeDailyFaithfulness(entries).longest >= 30,
    color: "text-purple-500",
    bg: "bg-purple-50/60",
  },
  {
    id: "custody-10",
    icon: Shield,
    title: "Vigilant Watcher",
    description: "Record ten acts of custody.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      entries.filter((e) => e.movement !== "Consecrated to the Holy Spirit").length >= 10,
    color: "text-emerald-500",
    bg: "bg-emerald-50/60",
  },
  {
    id: "custody-50",
    icon: Shield,
    title: "Faithful Steward",
    description: "Record fifty acts of custody.",
    check: (entries: ReturnType<typeof useTraceStore.getState>["entries"]) =>
      entries.filter((e) => e.movement !== "Consecrated to the Holy Spirit").length >= 50,
    color: "text-teal-500",
    bg: "bg-teal-50/60",
  },
];

export default function ConsecrationStatusPage() {
  const navigate = useNavigate();
  const { entries } = useTraceStore();

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
          <h1 className="text-h1 text-text mb-2">Consecration Status</h1>
          <p className="text-body text-text-secondary mb-8">
            The milestones of your spiritual journey.
          </p>
        </motion.div>

        <div className="space-y-4">
          {achievements.map((ach, i) => {
            const Icon = ach.icon;
            const unlocked = ach.check(entries);
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card-sm flex items-center gap-4 p-4 transition-all duration-300 ${
                  unlocked ? "" : "opacity-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${ach.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={unlocked ? ach.color : "text-text-muted"} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-h4 font-bold ${unlocked ? "text-text" : "text-text-muted"}`}>
                    {ach.title}
                  </h3>
                  <p className="text-small text-text-secondary">{ach.description}</p>
                </div>
                {unlocked && (
                  <CheckCircle size={20} className="text-emerald-500 shrink-0" strokeWidth={2} />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-caption text-text-muted mt-8 mb-6"
        >
          "Be faithful unto death, and I will give you the crown of life." — Revelation 2:10
        </motion.p>
      </div>
    </div>
  );
}
