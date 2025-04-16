/* eslint-disable react/prop-types */
import { categoryApi } from "./categoryApi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Category = ({ styleGrid }) => {
  const category = localStorage.getItem("category");
  const navigate = useNavigate();

  const handleSelectedCat = (cat) => {
    localStorage.setItem("category", JSON.stringify(cat?.name));
    navigate(`/?category=${cat.name}`);
  };

  return (
    <div className={`relative w-full ${styleGrid}`}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          500: { slidesPerView: 5 },
          768: { slidesPerView: 8 },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {categoryApi.map((cat, i) => (
          <SwiperSlide key={i}>
            <div
              onClick={() => handleSelectedCat(cat)}
              className={`flex flex-col-reverse items-center gap-1 cursor-pointer relative pb-4 transition duration-200 ease-in ${
                category === cat.name
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <p className="text-xs font-medium">{cat?.name}</p>
              <cat.svg size={28} />
              <div
                className={`w-9 absolute bg-[#222222] h-[2px] bottom-0 ${
                  category === cat.name ? "block" : "hidden"
                }`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full border-neutral-400 border bg-white flex items-center max-h-[32px] hover:shadow-lg">
        <MdKeyboardArrowLeft size={18} />
      </button>
      <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full border-neutral-400 border bg-white flex items-center max-h-[32px] hover:shadow-lg">
        <MdKeyboardArrowRight size={18} />
      </button>
    </div>
  );
};

export default Category;
