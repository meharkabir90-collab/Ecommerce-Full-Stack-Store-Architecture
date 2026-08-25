import { NavLink, useNavigate } from "react-router-dom";

import soccerThumbnail from "../assets/soccerthumbnail.webp";
import soccerThumbnail2 from "../assets/soccerthumbnail2.webp";
import baseballThumbnail from "../assets/Baseball-Thumnail.webp";
import basketballThumbnail from "../assets/Basketball-Thumnail.webp";
import netballThumbnail from "../assets/Netball-Thumbnail.webp";
import cricketThumbnail from "../assets/Cricket-Thumbnail.webp";
import tennisThumbnail from "../assets/Tennis-Thumbnail.webp";
import gymThumbnail from "../assets/Gym-Thumbnail.webp";

function Football() {
  const navigate = useNavigate();

  const categories = [
    {
      image: soccerThumbnail,
      title: "Football Wear",
    },
    {
      image: netballThumbnail,
      title: "Netball",
    },
    {
      image: baseballThumbnail,
      title: "Baseball"
    },
    {
      image: basketballThumbnail,
      title: "Basketball",
    },
    {
      image: cricketThumbnail,
      title: "Cricket",
    },
    {
      image: soccerThumbnail2,
      title: "Football Kits",
    },
     {
      image: tennisThumbnail,
      title: "Tennis Training",
    },
    {
      image: gymThumbnail,
      title: "Gym Training",
    },
  ];

  return (
    <section
      className="flex flex-col mt-20 px-6 py-6 gap-12"
      style={{ fontFamily: "Poppins" }}
    >
      {/* Breadcrumb */}
      <div className="flex flex-row justify-between bg-gray-100 px-5 py-4">
        <span className="text-gray-800">
          <NavLink
            to="/"
            className="cursor-pointer text-gray-400 hover:text-gray-700"
          >
            Home
          </NavLink>

          <span className="ml-2 mr-4 text-md text-gray-400">
            &gt;
          </span>

          Football
        </span>

        <button
          onClick={() => navigate(-1)}
          className="text-gray-800 hover:text-gray-500 cursor-pointer"
        >
          Return to Previous Page
        </button>
      </div>

      {/* Heading */}
      <section className="flex items-center justify-center gap-4 text-3xl font-bold">
        <hr className="w-96 border-t-2 border-gray-200" />

        <h1>FOOTBALL</h1>

        <hr className="w-96 border-t-2 border-gray-200" />
      </section>

      {/* Category Cards */}
      <section className="flex flex-col">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-x-10
            gap-y-16
            max-w-[1250px]
            w-full
            mx-auto
          "
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="
                group
                relative
                w-full
                max-w-[270px]
                h-[270px]
                mx-auto
                cursor-pointer
                overflow-hidden
              "
            >
              <img
                src={category.image}
                alt={category.title}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-black/50
                  text-white
                  py-3
                  text-center
                  font-semibold
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
              >
                {category.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Football;