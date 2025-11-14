import { motion } from "framer-motion";

export default function Trailers() {
  const videos = [
    { id: "tgbNymZ7vqY", title: "Trailer" },
    { id: "ysz5S6PUMU", title: "Song" },
    { id: "ScMzIvxBSi4", title: "Another" },
    { id: "hY7m5jjJ9mM", title: "Extra" },
  ];

  return (
    <section className="py-16 px-6 text-center overflow-hidden">
      <h2 className="text-4xl font-bold mb-8 text-red-400">🎬 Trailers & Songs</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Duplicate videos array for smooth loop */}
          {[...videos, ...videos].map((video, index) => (
            <div key={index} className="min-w-[300px]">
              <iframe
                className="w-full h-60 rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
