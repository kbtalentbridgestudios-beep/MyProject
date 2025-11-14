import { motion } from "framer-motion";
import img1 from "../assets/vision1.jpg";
import img2 from "../assets/vision2.jpg";
import img3 from "../assets/vision3.jpg";
import img4 from "../assets/vision4.jpg";

export default function Vision() {
  const cards = [
    {
      img: img1,
      title: "Business Planner",
      desc: "Strategically planning pathways to convert creative passion into sustainable careers across entertainment domains.",
    },
    {
      img: img2,
      title: "Editable Templates",
      desc: "Providing adaptable frameworks and tools that empower talent to shape their projects with precision and creativity.",
    },
    {
      img: img3,
      title: "People Managing People",
      desc: "Fostering a collaborative culture where mentors guide emerging talent with insight, empathy, and expertise.",
    },
    {
      img: img4,
      title: "Cleverism",
      desc: "Leveraging innovative methods and technology to enhance creative impact while keeping the human spirit central.",
    },
  ];

  const visionPoints = [
    "Be the leading global incubator of emerging creative talent across film, TV, modeling, advertising, and live productions.",
    "Cultivate an ecosystem where passion converges with precision—turning untapped potential into industry-ready professionals.",
    "Build a reputation for excellence by setting new benchmarks in entertainment development.",
    "Ensure seamless career transitions through rigorous training, immersive education, and authentic hands-on opportunities.",
  ];

  const closingPoints = [
    "Scale influence through innovative programming, strategic partnerships, and a commitment to diversity & inclusion.",
    "Leverage cutting-edge tools and methodologies to amplify creative impact while keeping the human spirit at the core.",
    "Be recognized not just for the artists we train—but for shaping inclusive narratives and elevating underrepresented voices.",
    "Stand as the transformative pathway where tomorrow’s stars take shape—ready to lead, inspire, and excel in entertainment.",
  ];

  return (
    <section className="text-white bg-black py-20 px-6">
      {/* 🔻 Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-center text-red-500 mb-12"
      >
        Vision
      </motion.h1>

      {/* 🔻 Vision Points */}
      <div className="max-w-5xl mx-auto mb-16">
        <ul className="space-y-4 text-lg md:text-xl text-gray-300 list-disc list-inside">
          {visionPoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* 🔻 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-red-500 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-300 text-base">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔻 Closing Points */}
      <div className="max-w-5xl mx-auto">
        <ul className="space-y-4 text-lg md:text-xl text-gray-300 list-disc list-inside">
          {closingPoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
