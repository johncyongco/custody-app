import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const invocations = [
  {
    gift: "Wisdom",
    prayer: "detach us from earthly things and infuse in us a love and taste of heavenly things.",
  },
  {
    gift: "Understanding",
    prayer: "enlighten our minds with the light of your eternal truth and the riches of holy thoughts.",
  },
  {
    gift: "Counsel",
    prayer: "make us docile to your inspirations and guide us in the way of salvation.",
  },
  {
    gift: "Fortitude",
    prayer: "give us strength, constancy and victory in the battle against our spiritual enemies.",
  },
  {
    gift: "Knowledge",
    prayer: "be the Master of our souls and help us to put into practice Your teachings.",
  },
  {
    gift: "Piety",
    prayer: "come to live in our heart to possess and sanctify all of our affections.",
  },
  {
    gift: "Fear of the Lord",
    prayer: "reign over our will and make us always disposed to suffer every evil rather than to sin.",
  },
];

const marianInvocations = [
  "O most pure Virgin Mary, by your Immaculate Conception you were made a chosen tabernacle of Divinity by the Holy Spirit. Pray for us.",
  "O most pure Virgin Mary, by the Mystery of the Incarnation you became true Mother of God by the Holy Spirit. Pray for us.",
  "O most pure Virgin Mary, persevering in prayer with the Apostles in the Upper Room, you were abundantly inflamed by the Holy Spirit. Pray for us.",
];

export default function ChapletPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<"intro" | "praying" | "marian" | "conclusion">("intro");

  const invocation = invocations[current];

  const handleNext = () => {
    if (step === "intro") {
      setStep("praying");
    } else if (step === "praying") {
      if (current < invocations.length - 1) {
        setCurrent(current + 1);
      } else {
        setStep("marian");
        setCurrent(0);
      }
    } else if (step === "marian") {
      if (current < marianInvocations.length - 1) {
        setCurrent(current + 1);
      } else {
        setStep("conclusion");
      }
    }
  };

  const handleBack = () => {
    if (step === "praying" && current > 0) {
      setCurrent(current - 1);
    } else if (step === "praying" && current === 0) {
      setStep("intro");
    } else if (step === "marian" && current > 0) {
      setCurrent(current - 1);
    } else if (step === "marian" && current === 0) {
      setStep("praying");
      setCurrent(invocations.length - 1);
    } else if (step === "conclusion") {
      setStep("marian");
      setCurrent(marianInvocations.length - 1);
    }
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

        {step === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-h1 text-text mb-2">Chaplet of the Holy Spirit</h1>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Composed by St. Elena Guerra in 1896, at the exhortation of Pope Leo XIII,
              to ask the Holy Spirit for the grace of a New Pentecost.
            </p>

            <div className="glass-card mb-6">
              <span className="label-trace mb-3 block">How to Pray</span>
              <ol className="space-y-3">
                <li className="flex items-start gap-2 text-body text-text-secondary">
                  <span className="text-holy-periwinkle font-bold shrink-0">1.</span>
                  <span>Pray the preparatory prayers: <em>O God, come to my assistance</em>, <em>O Lord, make haste to help me</em>, and the <em>Glory Be</em>.</span>
                </li>
                <li className="flex items-start gap-2 text-body text-text-secondary">
                  <span className="text-holy-periwinkle font-bold shrink-0">2.</span>
                  <span>Recite each of the 7 invocations to the Holy Spirit, followed by the prayer: <em>"Father, in the Name of Jesus, send forth your Spirit and renew the world."</em></span>
                </li>
                <li className="flex items-start gap-2 text-body text-text-secondary">
                  <span className="text-holy-periwinkle font-bold shrink-0">3.</span>
                  <span>After each invocation, pray: <em>"O Mary, who by the work of the Holy Spirit, conceived the Savior, pray for us."</em></span>
                </li>
                <li className="flex items-start gap-2 text-body text-text-secondary">
                  <span className="text-holy-periwinkle font-bold shrink-0">4.</span>
                  <span>Conclude with the 3 Marian invocations and the closing prayer.</span>
                </li>
              </ol>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary w-full"
            >
              Begin Chaplet
            </button>
          </motion.div>
        )}

        {step === "praying" && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-caption font-semibold text-violet-500 uppercase tracking-wide">
                Invocation {current + 1} of {invocations.length}
              </span>
              <span className="text-caption text-text-muted">
                {current + 1}/{invocations.length}
              </span>
            </div>

            <div className="w-full bg-white/30 rounded-full h-1.5 mb-6">
              <div
                className="bg-gradient-to-r from-violet-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / invocations.length) * 100}%` }}
              />
            </div>

            <div className="glass-card mb-4">
              <span className="label-trace mb-2 block">Come, O Spirit of {invocation.gift}</span>
              <p className="text-body text-text-secondary leading-relaxed mb-4">
                {invocation.prayer}
              </p>
              <div className="rounded-2xl bg-white/40 p-4 border border-white/40 mb-3">
                <p className="text-body text-text-secondary italic leading-relaxed text-center">
                  "Father, in the Name of Jesus, send forth your Spirit and renew the world."
                </p>
              </div>
              <div className="rounded-2xl bg-white/40 p-4 border border-white/40">
                <p className="text-body text-text-secondary italic leading-relaxed text-center">
                  "O Mary, who by the work of the Holy Spirit, conceived the Savior, pray for us."
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                disabled={current === 0 && step === "praying"}
                className="flex-1 py-3 rounded-full bg-white/50 text-text-secondary font-bold text-[13px] tracking-wide uppercase hover:bg-white/80 transition-all disabled:opacity-30"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-[13px] tracking-wide uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-500/30"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === "marian" && (
          <motion.div
            key={`marian-${current}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-caption font-semibold text-sky-500 uppercase tracking-wide">
                Marian Invocation {current + 1} of {marianInvocations.length}
              </span>
              <span className="text-caption text-text-muted">
                {current + 1}/{marianInvocations.length}
              </span>
            </div>

            <div className="glass-card mb-4">
              <div className="rounded-2xl bg-white/40 p-5 border border-white/40">
                <p className="text-body text-text-secondary italic leading-relaxed text-center">
                  "{marianInvocations[current]}"
                </p>
              </div>
              <div className="mt-4 rounded-2xl bg-white/40 p-4 border border-white/40">
                <p className="text-body text-text-secondary italic leading-relaxed text-center">
                  May the Divine Paraclete come soon to renew the face of the earth.
                </p>
              </div>
              <p className="text-body text-text-secondary text-center mt-4 italic">
                Hail Mary, full of grace…
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 rounded-full bg-white/50 text-text-secondary font-bold text-[13px] tracking-wide uppercase hover:bg-white/80 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-[13px] tracking-wide uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-sky-500/30"
              >
                {current < marianInvocations.length - 1 ? "Next" : "Conclude"}
              </button>
            </div>
          </motion.div>
        )}

        {step === "conclusion" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 mx-auto shadow-lg shadow-violet-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-h2 text-text text-center mb-6">Chaplet Complete</h2>

            <div className="glass-card mb-6">
              <span className="label-trace mb-3 block">Concluding Prayer</span>
              <p className="text-body text-text-secondary italic leading-relaxed">
                Send Your Spirit, Lord, and transform us interiorly with Your gifts. Create in us a new heart that we may please You and be conformed to Your will. Through Christ our Lord. Amen.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="btn-primary w-full"
            >
              Done
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
