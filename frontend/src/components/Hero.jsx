import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";
import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroImg3 from "../assets/hero3.jpg";
import heroImg4 from "../assets/hero4.jpg";

const sections = [
  {
    title: "Professional Training",
    desc: "Get practical training from industry experts, gain practical skills, and quick-track your career with confidence. Grow under industry experts, learn practical skills, and supercharge your career path to success",
    images: [heroImg1, heroImg2, heroImg3, heroImg4],
  },
  {
    title: "Creative Workshops",
    desc: "Enhance creativity through innovative workshops and real-world projects to hone your skills and enhance innovation. Unleash creativity with practical workshops and real-world projects that inspire innovation.",
    images: [heroImg2, heroImg3, heroImg4, heroImg1],
  },
  {
    title: "Talent Exposure",
    desc: "Highlight your talent and achieve valuable exposure through top industry connections and opportunities. Be noticed, and connect with top industry stars.",
    images: [heroImg3, heroImg4, heroImg1, heroImg2],
  },
  {
    title: "Career Growth",
    desc: "Discover new career horizons and quick-track professional growth through the right skills and mentoring. Level up your career, explore opportunities, and grow professionally with confidence.",
    images: [heroImg4, heroImg1, heroImg2, heroImg3],
  },
];

// ---- Typewriter Hook ----
function useTypewriter(words, speed = 120, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (index === words.length) setIndex(0);

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (forward ? 1 : -1));

      if (forward && subIndex === words[index].length) {
        setForward(false);
        setTimeout(() => {}, pause);
      } else if (!forward && subIndex === 0) {
        setForward(true);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, forward ? speed : speed / 2);

    return () => clearTimeout(timeout);
  }, [subIndex, index, forward, words, speed, pause]);

  return words[index].substring(0, subIndex);
}

export default function Hero() {
  const typedText = useTypewriter([
    "Build Your Dream 🚀",
    "Showcase Your Talent 🎬",
    "Grow Your Career 🌟",
    "Join Creative Workshops 🎨",
  ]);

  // State for current images of each section
  const [currentImages, setCurrentImages] = useState(
    sections.map(() => 0) // start with first image for each section
  );

  // Auto-flip images every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) =>
        prev.map(
          (imgIndex, idx) => (imgIndex + 1) % sections[idx].images.length
        )
      );
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 px-6 md:px-20 space-y-20 overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 60, -60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-48 h-48 bg-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 50, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Heading with Typewriter */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-semibold leading-tight text-center mb-12"
      >
        <span className="text-red-600">{typedText}</span>
        <span className="animate-pulse">|</span>
      </motion.h2>

      {/* Sections as Glowing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((sec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={800}
            >
              <div className="relative group rounded-2xl overflow-hidden shadow-xl p-6 bg-black/50 border border-red-500/20">
                {/* 🔴 Solid Red Glow instead of gradient */}
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-30 group-hover:opacity-70 transition duration-700 -z-10"></div>

                {/* Image */}
                <img
                  src={sec.images[currentImages[index]]}
                  alt={sec.title}
                  className="w-full h-56 object-cover rounded-xl mb-6 transition-all duration-700"
                />

                {/* Text */}
                <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-3">
                  {sec.title}
                </h3>
                <p className="text-gray-300 text-lg">{sec.desc}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
