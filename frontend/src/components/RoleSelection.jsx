// // src/components/RoleSelection.jsx
// import { motion } from "framer-motion";

// export default function RoleSelection({ onChoose, containerVariants, itemVariants }) {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="flex flex-col gap-4"
//     >
//       {/* CANDIDATE BUTTON */}
//       <motion.button
//         variants={itemVariants}
//         whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => onChoose("candidate")}
//         className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//       >
//         Register as Candidate
//       </motion.button>

//       {/* EMPLOYER BUTTON */}
//       <motion.button
//         variants={itemVariants}
//         whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => onChoose("employer")}
//         className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//       >
//         Register as Employer
//       </motion.button>
//     </motion.div>
//   );
// }
