import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function MutualFundSlider() {
  const images = [
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB4PSIxODAiIHk9IjEzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMi4yMSAwLTQgMS43OS00IDR6bTAgMmMtMi4yMSAwLTQgMS43OS00IDQgMi4yMSAwIDQtMS43OSA0LTQgMHptNiA4YzAtMy4zMS0yLjY5LTYtNi02cy02IDIuNjktNiA2aDEyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4KPC9zdmc+",
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB4PSIxODAiIHk9IjEzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMi4yMSAwLTQgMS43OS00IDR6bTAgMmMtMi4yMSAwLTQgMS43OS00IDQgMi4yMSAwIDQtMS43OSA0LTQgMHptNiA4YzAtMy4zMS0yLjY5LTYtNi02cy02IDIuNjktNiA2aDEyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4KPC9zdmc+",
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB4PSIxODAiIHk9IjEzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMi4yMSAwLTQgMS43OS00IDR6bTAgMmMtMi4yMSAwLTQgMS43OS00IDQgMi4yMSAwIDQtMS43OSA0LTQgMHptNiA4YzAtMy4zMS0yLjY5LTYtNi02cy02IDIuNjktNiA2aDEyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4KPC9zdmc+",
  ];

  return (
    <section className="w-full bg-white py-20 px-6 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT: Swiper Image with Dotted BG */}
        <div className="relative z-10">
          {/* Dot pattern top-left */}
          <div className="absolute -top-8 -left-6 w-28 h-28 z-0 hidden md:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="#007199" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full object-cover h-[420px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT: Text & Button */}
        <div className="z-10 relative text-[#1c1c1c]">
          <h2 className="text-xl md:text-3xl font-semibold leading-snug">
            Who can start a <br />
            <span className="text-[#0066cc] font-bold">
              Mutual Fund Distribution Business?
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#1c1c1c]">
            Anyone who wants to <br />
            <span className="text-red-600 font-bold">build a successful career</span> <br />
            with <span className="font-bold">unlimited income and growth</span> in the <br />
            <span className="font-bold">growing mutual fund industry,</span> <br />
            Can do mutual fund distribution business.
          </p>

          <div className="mt-8">
            <button className="flex items-center gap-4 bg-[#f9f9f9] px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
              <div className="bg-[#D22129] text-white w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-md">
                ▶
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-lg text-black">Watch</div>
                <div className="text-sm text-gray-600">
                  Business Opportunity Video
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
