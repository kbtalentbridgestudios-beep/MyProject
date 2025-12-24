export default function Movies() {
  const sections = [
    {
      title: "FILM PRODUCTION",
      desc: "We actively develop and produce feature films in drama, thriller, romance and action genres.",
      points: [
        "Strong cinematic storytelling",
        "Collaboration with fresh & established talents",
        "High-quality post-production",
        "Pan-India theatrical & OTT release potential",
      ],
      upcomingTitle: "Upcoming Film Projects:",
      upcoming: [
        "Untitled Action Drama – Pre-production",
        "Romantic Musical – Script Finalization",
        "Mystery Thriller – Casting in Progress",
      ],
    },
    {
      title: " WEB SERIES",
      desc: "High-concept web series aimed at national and international OTT platforms.",
      points: [
        "Multi-episode story arcs",
        "Strong character development",
        "Bold, modern storytelling",
        "Premium cinematic execution",
      ],
      upcomingTitle: "Web Series In Development:",
      upcoming: [
        "Tech Noir Crime Series – Writers' Room Active",
        "Family Drama Series – Casting Begins",
        "Comedy Sitcom – Pilot Episode Ready",
      ],
    },
    {
      title: " TV SERIALS",
      desc: "Serials with gripping storylines and vivid characters perfect for mass audience.",
      points: [
        "Daily soap dramas",
        "Reality-based stories",
        "Emotional family arcs",
        "Long-format storytelling",
      ],
      upcomingTitle: "Serials Under Development:",
      upcoming: [
        "Social Drama – Pilot Concept Approved",
        "Mythological Series – Script Development",
        "Romantic Daily Soap – Pre-production Stage",
      ],
    },
    {
      title: " TALK SHOWS",
      desc: "Innovative talk shows that entertain, inspire and deliver fresh perspectives.",
      points: [
        "Celebrity interviews",
        "Youth-focused debates",
        "Industry expert sessions",
        "Motivational & lifestyle conversations",
      ],
      upcomingTitle: "Upcoming Talk Show Projects:",
      upcoming: [
        "Celebrity Conversation Series",
        "Startup & Innovation Talk Show",
        "Youth Roundtable Debate Show",
      ],
    },
     {
      title: " AUDIO ALBUM",
      desc: "We create high-quality, original music albums across multiple genres including pop, romantic, devotional, rap, hip-hop, and indie music.",
      points: [
         "Studio-grade sound production",
         "Collaboration with top singers & emerging artists",
         "Lyric-driven compositions",
         "High-end mixing & mastering",

      ],
      upcomingTitle: "Upcoming AUDIO ALBUM Projects:",
      upcoming: [
                "Untitled Romantic Album – Lyrics Finalizing",
                "Hip-Hop / Rap Album – Beats Under Production",
               "Devotional Album – Recording Scheduled",
               "Indie Pop Album – Vocal Casting in Progress",
      ],
     },
     {
      title: " MUSIC VIDEO",
      desc: "Music Videos designed with cinematic visuals and trending choreography.",
      points: [
       "Storyboard-based video direction",
       "Casting models & dancers",
       "High-quality cinematography",
       "Color grading & post-production",
      ],
      upcomingTitle: "Upcoming Music Video Projects:",
      upcoming: [
        "Romantic Song Video – Location Scouting",
        "Party Track Video – Choreography in Planning",
         "Rap Video – Set Design in Progress",
        
      ],
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white py-16 px-6 md:px-20">
      <h1 className="text-4xl font-semibold mb-12 text-red-600 text-center">
         Upcoming Projects
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sections.map((item, index) => (
          <div
            key={index}
            className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
            <p className="text-gray-300 mb-4">{item.desc}</p>

            <h3 className="text-lg font-medium text-red-400 mb-2">
              Key Highlights:
            </h3>
            <ul className="text-gray-400 space-y-1 mb-4">
              {item.points.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>

            <h3 className="text-lg font-medium text-red-400 mb-2">
              {item.upcomingTitle}
            </h3>
            <ul className="text-gray-300 space-y-1">
              {item.upcoming.map((u, j) => (
                <li key={j}>• {u}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
