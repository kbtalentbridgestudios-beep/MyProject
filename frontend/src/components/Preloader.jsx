import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "../assets/logo.png"; // Example image

export default function Preloader({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // Hide preloader after 2.5 sec
      if (onFinish) onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.img
            src={heroImg}
            alt="Intro"
            className="w-full/2 h-full/2 object-cover rounded-xl"
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
