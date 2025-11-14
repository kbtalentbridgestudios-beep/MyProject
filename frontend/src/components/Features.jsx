import { Lightbulb, Globe, Star, BookOpen, Briefcase, Users } from "lucide-react";

export default function Features() {
  const missionCards = [
    {
      icon: BookOpen,
      title: "Immersive Education",
      desc: "We deliver bespoke, high-caliber training blending performance techniques with real industry insights—equipping artists with confidence, versatility, and professionalism.",
    },
    {
      icon: Briefcase,
      title: "Hands-On Experience",
      desc: "Through shows, shoots, campaigns, and real assignments, we ensure that every talent learns by doing—growing in collaborative and professional environments.",
    },
    {
      icon: Users,
      title: "Mentorship",
      desc: "Industry experts, producers, and casting professionals guide talent with personalized mentorship, career pathways, and authentic opportunities for growth.",
    },
  ];

  const visionCards = [
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "We aim to set new benchmarks in entertainment development by embracing innovation, creativity, and strategic partnerships that scale our influence globally.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "We envision nurturing talent that transitions seamlessly into global entertainment industries, carrying excellence and inclusivity across every stage and screen.",
    },
    {
      icon: Star,
      title: "Excellence",
      desc: "Our vision celebrates diversity, elevates underrepresented voices, and shapes inclusive narratives while upholding world-class creative professionalism.",
    },
  ];

  const renderCard = (card) => (
    <div className="group relative bg-black border border-red-600 rounded-2xl p-8 min-h-[280px] flex flex-col items-start overflow-hidden">
      {/* Inner Glow */}
      <div className="absolute inset-0 bg-red-500/30 blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500 pointer-events-none z-0"></div>

      {/* Card content */}
      <div className="relative z-10">
        <card.icon className="w-12 h-12 text-red-600 semi-bold mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
        <p className="text-gray-400">{card.desc}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-red-600 mb-10 text-center">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Our mission is to discover, cultivate, and elevate emerging creative talent, empowering individuals to thrive in film, television, modeling, advertising, and live performances.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {missionCards.map((card, index) => (
              <div key={index}>{renderCard(card)}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-red-600 mb-10 text-center">
            Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Our vision is to be the leading global incubator of emerging creative talent, transforming untapped potential into industry-ready professionals who inspire and excel.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {visionCards.map((card, index) => (
              <div key={index}>{renderCard(card)}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
