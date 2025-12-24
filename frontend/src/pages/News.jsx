// src/pages/News.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dark, setDark] = useState(true);
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderReadMore = (fullText, limit, id) => {
    if (!fullText) return "";
    const isExpanded = expanded[id];
    const shortText = fullText.slice(0, limit).trim();

    if (fullText.length <= limit) return fullText;

    return (
      <>
        {isExpanded ? fullText : shortText}

        {!isExpanded && (
          <span
            onClick={() => toggleReadMore(id)}
            className="text-orange-400 font-semibold cursor-pointer hover:opacity-80 ml-1"
          >
            ...Read More
          </span>
        )}

        {isExpanded && (
          <span
            onClick={() => toggleReadMore(id)}
            className="text-orange-400 font-semibold cursor-pointer hover:opacity-80 ml-2"
          >
            Read Less ▲
          </span>
        )}
      </>
    );
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl("/news"));

        let final = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.news || [];

        setNews(final);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news");
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (news.length === 0)
    return <p className="text-center mt-10 text-gray-300">No news found.</p>;

  const hero = news[0];
  const latestStories = news.slice(1);

  return (
    <div
      className={`${
        dark ? "bg-[#0f0f0f] text-gray-100" : "bg-gray-100 text-black"
      } min-h-screen transition duration-300`}
    >
      {/* HEADER */}
      <div
        className={`${
          dark ? "bg-black" : "bg-white"
        } py-4 shadow-md border-b border-gray-700`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1
            className={`${
              dark ? "text-white" : "text-black"
            } text-3xl font-bold`}
          >
            <span className="text-orange-500">KBTS</span> News
          </h1>

          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-lg border border-gray-500 hover:border-orange-400 transition"
          >
            {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* HERO */}
        <section
          className={`${
            dark ? "bg-[#181818] border-gray-700" : "bg-white border-gray-300"
          } border p-6 shadow-lg rounded-lg`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded">
                BREAKING
              </span>

              <h2 className="mt-4 text-4xl font-extrabold leading-tight">
                {hero.title}
              </h2>

              <p className="mt-2 text-sm opacity-70">
                {hero.createdAt?.split("T")[0]}
              </p>

              <p className="mt-4 text-sm leading-relaxed">
                {renderReadMore(hero.content, 200, hero._id)}
              </p>
            </div>

            {/* HERO MEDIA FIXED */}
            <div className="w-full lg:w-1/3">
              <div
                className={`${
                  dark ? "bg-black border-gray-700" : "bg-gray-100 border-gray-300"
                } border p-2 rounded`}
              >
                {hero.mediaType === "image" && (
                  <img
                    src={hero.mediaUrl}
                    alt=""
                    className="w-full max-h-[420px] object-contain rounded bg-black"
                  />
                )}

                {hero.mediaType === "video" && (
                  <video
                    src={hero.mediaUrl}
                    controls
                    className="w-full max-h-[420px] object-contain rounded bg-black"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST STORIES */}
        <h3 className="mt-12 mb-6 text-xl font-semibold">Latest Stories</h3>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestStories.map((item) => (
            <article
              key={item._id}
              className={`${
                dark ? "bg-[#181818] border-gray-700" : "bg-white border-gray-300"
              } border p-4 shadow-lg rounded-lg`}
            >
              {/* MEDIA FIXED */}
              <div
                className={`${
                  dark ? "bg-black border-gray-700" : "bg-gray-200 border-gray-300"
                } border p-1 rounded`}
              >
                {item.mediaType === "image" && (
                  <img
                    src={item.mediaUrl}
                    alt=""
                    className="w-full max-h-[260px] object-contain rounded bg-black"
                  />
                )}

                {item.mediaType === "video" && (
                  <video
                    src={item.mediaUrl}
                    controls
                    className="w-full max-h-[260px] object-contain rounded bg-black"
                  />
                )}
              </div>

              <div className="mt-3 flex justify-between items-start">
                <h4 className="text-lg font-bold leading-tight">
                  {item.title}
                </h4>

                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                  NEWS
                </span>
              </div> 

              <p className="text-xs opacity-70 mt-1">
                {item.createdAt?.split("T")[0]}
              </p>
              

              <p className="mt-2 text-sm leading-relaxed">
                {renderReadMore(item.content, 120, item._id)}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
