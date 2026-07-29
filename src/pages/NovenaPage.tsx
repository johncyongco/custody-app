import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const days = [
  {
    day: 1,
    title: "Day One",
    subtitle: "Friday of the Sixth Week of Easter",
    verse: "Holy Spirit! Lord of light! From Thy clear celestial height, Thy pure beaming radiance give!",
    gift: "The Holy Ghost",
    reflection: "Only one thing is important — eternal salvation. Only one thing, therefore, is to be feared — sin. Sin is the result of ignorance, weakness, and indifference. The Holy Ghost is the Spirit of Light, of Strength, and of Love. With His sevenfold gifts, He enlightens the mind, strengthens the will, and inflames the heart with love of God. To ensure our salvation, we ought to invoke the Divine Spirit daily, for 'The Spirit helpeth our infirmity. We know not what we should pray for as we ought. But the Spirit Himself asketh for us.'",
    prayer: "Almighty and eternal God, Who hast vouchsafed to regenerate us by water and the Holy Ghost, and hast given us forgiveness of all sins, vouchsafe to send forth from heaven upon us Thy sevenfold Spirit; the Spirit of Wisdom and Understanding, the Spirit of Counsel and Fortitude, the Spirit of Knowledge and Piety, and fill us with the Spirit of Holy Fear. Amen.",
  },
  {
    day: 2,
    title: "Day Two",
    subtitle: "Saturday of the Sixth Week of Easter",
    verse: "Come Thou, Father of the poor! Come, treasure which endure! Come Thou, Light of all that live!",
    gift: "The Gift of Holy Fear",
    reflection: "The gift of Fear fills us with a sovereign respect for God and makes us dread nothing so much as to offend Him by sin. It is a fear that arises, not from the thought of hell but from sentiments of reverence and filial submission to our heavenly Father. It is the fear that is the beginning of wisdom, detaching us from worldly pleasures that could in any way separate us from God.",
    prayer: "Come, O blessed Spirit of Holy Fear, penetrate my inmost heart, that I may set Thee, my Lord and God, before my face forever; help me to shun all things that can offend Thee, and make me worthy to appear before the pure eyes of Thy Divine Majesty in heaven where Thou livest and reignest in the unity of the Blessed Trinity, God, world without end. Amen.",
  },
  {
    day: 3,
    title: "Day Three",
    subtitle: "Sunday of the Seventh Week of Easter",
    verse: "Thou, of all consolers, best, Visiting the troubled breast, Dost refreshing peace bestow.",
    gift: "The Gift of Piety",
    reflection: "The gift of Piety begets in our hearts a filial affection for God as our most loving Father. It inspires us to love and respect for His sake, persons and things consecrated to Him, as well as those who are vested with His authority. He who is filled with the gift of Piety finds the practice of his religion not a burdensome duty but a delightful service. Where there is love, there is no labor.",
    prayer: "Come, O Blessed Spirit of Piety, possess my heart. Enkindle therein such a love for God that I may find satisfaction only in His service and, for His sake, lovingly submit to all legitimate authority. Amen.",
  },
  {
    day: 4,
    title: "Day Four",
    subtitle: "Monday of the Seventh Week of Easter",
    verse: "Thou in toil art comfort sweet; Pleasant coolness in the heat; Solace in the midst of woe.",
    gift: "The Gift of Fortitude",
    reflection: "By the gift of Fortitude, the soul is strengthened against natural fear and supported to the end in the performance of duty. Fortitude imparts to the will an impulse and energy which move it to undertake without hesitancy the most arduous tasks, to face dangers, to trample under foot human respect, and to endure without complaint the slow martyrdom of even lifelong tribulation.",
    prayer: "Come, O Blessed Spirit of Fortitude, uphold my soul in time of trouble and adversity, sustain my efforts after holiness, strengthen my weakness, give me courage against all the assaults of my enemies, that I may never be overcome and separated from Thee, my God and greatest good. Amen.",
  },
  {
    day: 5,
    title: "Day Five",
    subtitle: "Tuesday of the Seventh Week of Easter",
    verse: "Light immortal! Light Divine! Visit Thou these hearts of Thine, And our inmost being fill!",
    gift: "The Gift of Knowledge",
    reflection: "The gift of Knowledge enables the soul to evaluate created things at their true worth — in their relation to God. Knowledge unmasks the pretense of creatures, reveals their emptiness, and points out their only true purpose as instruments in the service of God. It shows us the loving care of God even in adversity and directs us to glorify Him in every circumstance of life.",
    prayer: "Come, O Blessed Spirit of Knowledge, and grant that I may perceive the will of the Father; show me the nothingness of earthly things, that I may realize their vanity and use them only for Thy glory and my own salvation, looking ever beyond them to Thee and Thy eternal rewards. Amen.",
  },
  {
    day: 6,
    title: "Day Six",
    subtitle: "Wednesday of the Seventh Week of Easter",
    verse: "If Thou take Thy grace away, Nothing pure in man will stay, All his good is turned to ill.",
    gift: "The Gift of Understanding",
    reflection: "Understanding, as a gift of the Holy Ghost, helps us to grasp the meaning of the truths of our holy religion. By faith we know them, but by Understanding we learn to appreciate and relish them. It enables us to penetrate the inner meaning of revealed truths, and through them to be quickened to newness of life. Our faith ceases to be sterile and inactive but inspires a mode of life that bears eloquent testimony to the faith that is in us.",
    prayer: "Come, O Spirit of Understanding, and enlighten our minds, that we may know and believe all the mysteries of salvation; and may merit at last to see the eternal light in Thy Light; and in the light of glory, to have a clear vision of Thee and the Father and the Son. Amen.",
  },
  {
    day: 7,
    title: "Day Seven",
    subtitle: "Thursday of the Seventh Week of Easter",
    verse: "Heal our wounds — our strength renew; On our dryness pour Thy dew! Wash the stains of guilt away!",
    gift: "The Gift of Counsel",
    reflection: "The gift of Counsel endows the soul with supernatural prudence, enabling it to judge promptly and rightly what must be done, especially in difficult circumstances. Counsel applies the principles furnished by Knowledge and Understanding to the innumerable concrete cases that confront us in the course of our daily duty. Counsel is supernatural common sense, a priceless treasure in the quest of salvation.",
    prayer: "Come, O Spirit of Counsel, help and guide me in all my ways, that I may always do Thy holy will. Incline my heart to that which is good; turn it away from all that is evil, and direct me by the straight path of Thy commandments to that goal of eternal life for which I long. Amen.",
  },
  {
    day: 8,
    title: "Day Eight",
    subtitle: "Friday of the Seventh Week of Easter",
    verse: "Bend the stubborn heart and will; Melt the frozen, warm the chill; Guide the steps that go astray!",
    gift: "The Gift of Wisdom",
    reflection: "Embodying all the other gifts, as charity embraces all the other virtues, Wisdom is the most perfect of the gifts. Of Wisdom it is written, 'all good things come to me with her, and innumerable riches, through her hands.' It is the gift of Wisdom that strengthens our faith, fortifies hope, perfects charity, and promotes the practice of virtue in the highest degree.",
    prayer: "Come, O Spirit of Wisdom, and reveal to my soul the mysteries of heavenly things, their exceeding greatness, power, and beauty. Teach me to love them above and beyond all the passing joys and satisfactions of earth. Help me to attain them and possess them forever. Amen.",
  },
  {
    day: 9,
    title: "Day Nine",
    subtitle: "Saturday of the Seventh Week of Easter",
    verse: "Give them comfort when they die; Give them life with Thee on high; Give them joys which never end. Amen.",
    gift: "The Fruits of the Holy Ghost",
    reflection: "The gifts of the Holy Ghost perfect the supernatural virtues by enabling us to practice them with greater docility to divine inspiration. As we grow in the knowledge and love of God under the direction of the Holy Ghost, our service becomes more sincere and generous, the practice of virtue, more perfect. Such acts of virtue leave the heart filled with joy and consolation and are known as Fruits of the Holy Ghost.",
    prayer: "Come, O Divine Spirit, fill my heart with Thy heavenly fruits: charity, joy, peace, patience, long-suffering, kindness, goodness, faith, mildness, modesty, self-control and chastity, that I may never weary in the service of God, but by continued faithful submission to Thy inspiration, may merit to be united eternally with Thee in the love of the Father and the Son. Amen.",
  },
];

const prayersToRecite = [
  "Act of Consecration & Prayer for the Seven Gifts",
  "Our Father (once)",
  "Hail Mary (once)",
  "Glory Be (7 times)",
];

export default function NovenaPage() {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(0);
  const [showConsecration, setShowConsecration] = useState(false);
  const [showSevenGifts, setShowSevenGifts] = useState(false);

  const day = days[currentDay];

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
          className="text-center mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
            <Flame size={20} className="text-white" />
          </div>
          <h1 className="text-h1 text-text mb-2">Novena to the Holy Spirit</h1>
          <p className="text-body text-text-secondary max-w-sm mx-auto leading-relaxed">
            The oldest of all novenas — prayed from Ascension to Pentecost.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card mb-6"
        >
          <button
            onClick={() => setShowConsecration(!showConsecration)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="label-trace">Act of Consecration to the Holy Ghost</span>
              <ChevronRight
                size={16}
                className={`text-text-muted transition-transform duration-300 ${showConsecration ? "rotate-90" : ""}`}
                strokeWidth={1.5}
              />
            </div>
          </button>
          <AnimatePresence>
            {showConsecration && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/30">
                  <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">
                    On my knees before the great multitude of heavenly witnesses, I offer myself, soul and body, to Thee, O Eternal Spirit of God. I adore the brightness of Thy purity, the unerring keenness of Thy justice, and the might of Thy love.

                    Thou art the Strength and Light of my soul. In Thee I live and move and am. I desire never to grieve Thee by unfaithfulness to grace, and I pray with all my heart to be kept from the smallest sin against Thee.

                    Mercifully guard my every thought, and grant that I may always watch for Thy light, and listen to Thy voice, and follow Thy gracious inspirations. I cling to Thee and give myself to Thee, and ask Thee, by Thy compassion, to watch over me in my weakness.

                    Holding the pierced feet of Jesus, and looking at His five Wounds, and trusting in His Precious Blood, and adoring His opened side and stricken Heart, I implore Thee, Adorable Spirit, Helper of my infirmity, so to keep me in Thy grace that I may never sin against Thee.

                    Give me grace, O Holy Ghost, Spirit of the Father and of the Son, to say to Thee always and everywhere, "Speak, Lord, for Thy servant heareth."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card mb-6"
        >
          <button
            onClick={() => setShowSevenGifts(!showSevenGifts)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="label-trace">Prayer for the Seven Gifts</span>
              <ChevronRight
                size={16}
                className={`text-text-muted transition-transform duration-300 ${showSevenGifts ? "rotate-90" : ""}`}
                strokeWidth={1.5}
              />
            </div>
          </button>
          <AnimatePresence>
            {showSevenGifts && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/30">
                  <p className="text-body text-text-secondary leading-relaxed">
                    O Lord Jesus Christ, Who, before ascending into heaven, did promise to send the Holy Ghost to finish Thy work in the souls of Thine Apostles and Disciples, deign to grant the same Holy Spirit to me, that He may perfect in my soul the work of Thy grace and Thy love.

                    Grant me the Spirit of Wisdom, that I may despise the perishable things of this world and aspire only after the things that are eternal; the Spirit of Understanding, to enlighten my mind with the light of Your divine truth; the Spirit of Counsel, that I may choose the surest way of pleasing God and gaining heaven; the Spirit of Fortitude, that I may bear my cross with Thee and that I may overcome with courage all the obstacles that oppose my salvation; the Spirit of Knowledge, that I may know God and know myself and grow perfect in the science of the Saints; the Spirit of Piety, that I may find the service of God sweet and amiable; the Spirit of Fear of the Lord, that I may be filled with a loving reverence towards God, and may dread in any way to displease Him.

                    Mark me, dear Lord, with the sign of Thy true disciples, and animate me in all things with Thy Spirit. Amen.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
            disabled={currentDay === 0}
            className="p-2 rounded-full bg-white/50 text-text-secondary hover:bg-white/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <span className="text-h3 text-text font-bold">{day.title}</span>
          <button
            onClick={() => setCurrentDay(Math.min(8, currentDay + 1))}
            disabled={currentDay === 8}
            className="p-2 rounded-full bg-white/50 text-text-secondary hover:bg-white/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-8"
          >
            <div className="glass-card">
              <span className="text-caption font-semibold text-orange-500 uppercase tracking-wide mb-2 block">
                {day.gift}
              </span>
              <p className="text-body text-text-secondary italic leading-relaxed mb-4">
                "{day.verse}"
              </p>
              <p className="text-body text-text-secondary leading-relaxed">
                {day.reflection}
              </p>
            </div>

            <div className="glass-card">
              <span className="label-trace mb-3 block">Prayer</span>
              <p className="text-body text-text-secondary leading-relaxed">
                {day.prayer}
              </p>
            </div>

            <div className="glass-card bg-white/30">
              <span className="label-trace mb-3 block">Recite</span>
              <ul className="space-y-2">
                {prayersToRecite.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-body text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-holy-periwinkle shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 justify-center mb-8">
          {days.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentDay(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentDay ? "bg-holy-periwinkle scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
