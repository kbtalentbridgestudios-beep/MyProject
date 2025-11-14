import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Courses from "../components/Courses";
import Gallery from "./Gallery";
import ContactUs from "../components/ContactUs";
import bgVideo from "../assets/no7.mp4";
import Preloader from "../components/Preloader";
import HomepageJobs from "../components/HomePageJobs";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* Preloader */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Navbar */}
          <Navbar showLogo={true} />

          {/* Hero Section */}
          <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/50" />

            {/* Marquee inside Hero at top */}
            <div className="absolute top-0 w-full flex justify-center z-20 overflow-hidden px-4 sm:px-8">
              <style>{`
                @keyframes smoothMarquee {
                  0% { transform: translateX(110%); opacity: 0; }
                  5% { opacity: 1; }
                  95% { opacity: 1; }
                  100% { transform: translateX(-110%); opacity: 0; }
                }
              `}</style>
              <p className="text-sm sm:text-base lg:text-lg text-orange-600 inline-block whitespace-nowrap will-change-transform animate-[smoothMarquee_15s_linear_infinite]">
                Connecting Talent with Opportunities – Join us today! 
              </p>
            </div>

            {/* Hero Text */}
            <div className="relative z-10 px-4 sm:px-8 pb-12 md:pb-20 lg:pb-32 pt-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-red-600">
                Welcome to
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-orange-700 pt-4 sm:pt-6 md:pt-8">
                KBTS
              </h1>
            </div>
          </section>

          {/* Other Sections */}
         <HomepageJobs/>
          <Hero />
          <Courses />
          <Gallery compact />
          <Features />
          <ContactUs />
        </>
      )}
    </div>
  );
}
