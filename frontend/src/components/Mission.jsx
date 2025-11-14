// src/components/Mission.jsx
import React from "react";
import { motion } from "framer-motion";
import eduImg from "../assets/vision1.jpg";
import projectImg from "../assets/vision2.jpg";
import mentorImg from "../assets/vision3.jpg";

export default function Mission() {
  return (
    <section className="bg-black text-white py-20 px-6 lg:px-20">
      {/* Title */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-red-500 mb-4"
        >
          Our Mission
        </motion.h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Our mission is to discover, cultivate, and elevate emerging creative
          talent, empowering individuals to thrive in film, television,
          modeling, advertising, and live performances.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Card 1 - Immersive Education */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
        >
          <img src={eduImg} alt="Immersive Education" className="h-56 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3">
              Immersive Education
            </h3>
            <p className="text-gray-300">
              We provide bespoke, high-caliber training that blends performance
              techniques with industry insights—fostering versatility,
              confidence, and professionalism.
            </p>
          </div>
        </motion.div>

        {/* Card 2 - Hands-On Project Experience */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
        >
          <img src={projectImg} alt="Hands-On Projects" className="h-56 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3">
              Hands-On Project Experience
            </h3>
            <p className="text-gray-300">
              Through curated opportunities including shows, shoots, and
              campaigns, we ensure artists not only learn but actively perform
              and grow in dynamic environments.
            </p>
          </div>
        </motion.div>

        {/* Card 3 - Strategic Partnerships */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
        >
          <img src={mentorImg} alt="Mentorship" className="h-56 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-3">
              Strategic Partnerships & Mentorship
            </h3>
            <p className="text-gray-300">
              We collaborate with industry influencers, producers, and brands—
              offering mentorship, network access, and tailored career pathways
              to bridge training and opportunity.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Closing Statement */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <p className="text-lg text-gray-300 leading-relaxed">
          At our core, we champion <span className="text-red-400 font-semibold">inclusive excellence</span>, prioritizing diversity and
          representation in all our programs. By investing in creative potential
          and authentic experiences, our mission propels aspirants into
          industry-ready professionals—ready to shine across screens, stages,
          and campaigns with confidence and distinction.
        </p>
      </div>
    </section>
  );
}
