import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const friends = [
  {
    name: "St. Elena Guerra",
    title: "Apostle of the Holy Spirit",
    lifespan: "1835–1914",
    feast: "April 11",
    description:
      "An Italian mystic and founder of the Oblates of the Holy Spirit. She tirelessly promoted devotion to the Holy Spirit and wrote extensively on the Spirit's role in the life of the Church. Her writings inspired Pope Leo XIII to write his encyclical on the Holy Spirit and to inaugurate the first novena to the Holy Spirit celebrated universally.",
    quote:
      "Remember (the Holy Spirit says to the soul), that I like to entertain myself among friends and in my living temple I long for silence.",
    role: "Patron of those who pray for the outpouring of the Holy Spirit",
  },
];

export default function FriendsOfTheSpiritPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28">
      <div className="px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text transition-colors mb-6"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-small font-medium">Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 text-text mb-2">Friends of the Holy Spirit</h1>
          <p className="text-body text-text-secondary mb-8">
            Saints and spiritual companions who walked intimately with the Spirit.
          </p>
        </motion.div>

        <div className="space-y-5">
          {friends.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-h2 text-text">{f.name}</h2>
                  <p className="text-small font-medium text-holy-periwinkle">{f.title}</p>
                  <p className="text-caption text-text-muted mt-0.5">
                    {f.lifespan} · Feast: {f.feast}
                  </p>
                </div>
                <img
                  src="/st-elena-png.png"
                  alt={f.name}
                  className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-white/60 shadow-sm"
                  style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
                />
              </div>

              <p className="text-body text-text-secondary leading-relaxed mb-5">
                {f.description}
              </p>

              <div className="rounded-2xl bg-holy-light/20 p-5 border border-holy-periwinkle/20 mb-4">
                <Quote size={16} className="text-holy-periwinkle/60 mb-2" />
                <p className="text-body text-text italic leading-relaxed">
                  "{f.quote}"
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-mist/40 text-small font-medium text-text-secondary">
                <span>{f.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-caption text-text-muted mt-8 mb-6"
        >
          "Come, Holy Spirit, fill the hearts of Your faithful."
        </motion.p>
      </div>
    </div>
  );
}
