import { motion } from "framer-motion";
import { Play, BookOpen, Users, Briefcase, Lightbulb, Globe, Star } from "lucide-react"; 
import banner from "../assets/banner.png"; // Replace with your own background image

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function AboutUs() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-tight text-red-500"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-300"
          >
            At <span className="text-red-400 font-semibold">KB TalentBridge Studio</span>, 
            we are dedicated to discovering, nurturing, and launching rising stars across film, 
            television, modeling, and advertising. 
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium shadow-lg transition"
          >
            <Play className="mr-2 w-5 h-5" /> Watch Intro
          </motion.button>
        </div>
      </div>

      {/* Quote Section */}
      <section className="bg-red-600 py-16 px-6 text-center">
        <blockquote className="text-xl md:text-2xl italic text-white max-w-4xl mx-auto">
          “At KB TalentBridge Studio, we don’t just train talent—we ignite journeys.”
        </blockquote>
        <p className="mt-6 text-white font-semibold">— KB TalentBridge Studio</p>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-10 text-center">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Our mission is to discover, cultivate, and elevate emerging creative talent, empowering individuals 
            to thrive in film, television, modeling, advertising, and live performances.
          </p>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <BookOpen className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Immersive Education</h3>
              <p className="text-gray-400">
                We deliver bespoke, high-caliber training blending performance techniques with real 
                industry insights—equipping artists with confidence, versatility, and professionalism.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <Briefcase className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Hands-On Experience</h3>
              <p className="text-gray-400">
                Through shows, shoots, campaigns, and real assignments, we ensure that every talent 
                learns by doing—growing in collaborative and professional environments.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <Users className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Mentorship</h3>
              <p className="text-gray-400">
                Industry experts, producers, and casting professionals guide talent with personalized 
                mentorship, career pathways, and authentic opportunities for growth.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-10 text-center">
            Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Our vision is to be the leading global incubator of emerging creative talent, transforming 
            untapped potential into industry-ready professionals who inspire and excel.
          </p>

          {/* Vision Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <Lightbulb className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-gray-400">
                We aim to set new benchmarks in entertainment development by embracing innovation, 
                creativity, and strategic partnerships that scale our influence globally.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <Globe className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Global Reach</h3>
              <p className="text-gray-400">
                We envision nurturing talent that transitions seamlessly into global entertainment industries, 
                carrying excellence and inclusivity across every stage and screen.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-black border border-red-600 rounded-2xl p-8 shadow-xl min-h-[280px]">
              <Star className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Excellence</h3>
              <p className="text-gray-400">
                Our vision celebrates diversity, elevates underrepresented voices, and shapes inclusive 
                narratives while upholding world-class creative professionalism.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
