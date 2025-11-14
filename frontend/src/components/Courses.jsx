import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import actingImg from "../assets/hero2.jpg";
import singingImg from "../assets/hero1.jpg";
import musicImg from "../assets/vision3.jpg";
import dancingImg from "../assets/vision1.jpg";
import makeupImg from "../assets/vision2.jpg";

export default function Courses() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const courses = [
    {
      title: "🎭 Acting",
      desc: "Master the art of expression, stage presence, and character building with professional acting techniques.",
      img: actingImg,
      rating: "4.8",
      students: "12K",
      hours: "40",
    },
    {
      title: "🎤 Singing",
      desc: "Enhance your vocal range, control, and performance skills through guided vocal training.",
      img: singingImg,
      rating: "4.7",
      students: "9K",
      hours: "35",
    },
    {
      title: "🎶 Music",
      desc: "Learn instruments, composition, and fundamentals of music production to create your own sound.",
      img: musicImg,
      rating: "4.6",
      students: "15K",
      hours: "50",
    },
    {
      title: "💃 Dancing",
      desc: "Develop rhythm, grace, and confidence across diverse dance forms with expert-led sessions.",
      img: dancingImg,
      rating: "4.9",
      students: "18K",
      hours: "45",
    },
    {
      title: "💄 Makeup",
      desc: "Discover professional makeup artistry techniques for stage, screen, and creative styling.",
      img: makeupImg,
      rating: "4.5",
      students: "7K",
      hours: "25",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const [expanded, setExpanded] = useState(null);

  const CourseCard = ({ course, index }) => {
    const isExpanded = expanded === index;
    const textToShow = isExpanded
      ? course.desc
      : course.desc.slice(0, 80) + (course.desc.length > 80 ? "..." : "");

    return (
      <div
        key={index}
        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-red-500 hover:shadow-2xl transition duration-300 mb-6 flex flex-col"
      >
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-red-400">
            {course.title}
          </h3>

          <p className="mt-2 text-gray-300 flex-grow">{textToShow}</p>

          {course.desc.length > 80 && (
            <button
              onClick={() => setExpanded(isExpanded ? null : index)}
              className="text-red-400 mt-2 text-sm hover:underline self-start"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}

          <div className="flex items-center mt-4 text-sm text-gray-400 space-x-4">
            <span>⭐ {course.rating}</span>
            <span>{course.students} students</span>
            <span>{course.hours} hrs</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 px-6 bg-black text-white my-20">
      <h2 className="text-4xl font-semibold mb-12 text-red-600 text-center">
        📚 Courses We Offer
      </h2>

      <div className="max-w-7xl mx-auto">
        {isMobile ? (
          // ✅ Mobile: Cards stacked one below another
          <div className="flex flex-col">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} index={index} />
            ))}
          </div>
        ) : (
          // ✅ Desktop: Slider mode
          <Slider {...settings}>
            {courses.map((course, index) => (
              <div key={index} className="px-3">
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}