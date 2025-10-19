import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/slider.css"; // optional custom styling

const testimonials = [
  {
    quote:
      "Witty Wealth is transforming the financial services landscape with innovation and customer-first thinking. Their team brings deep insight and experience to the table, making wealth management simpler.",
    name: "Aarav Mehta",
    title: "CEO",
    company: "FinEdge Solutions",
    initials: "AM",
    color: "bg-blue-500",
  },
  {
    quote:
      "Their platform is user-friendly and effective. It's a game-changer for modern investors looking to explore new-age financial tools that are both intelligent and intuitive.",
    name: "Sneha Kapoor",
    title: "Founder",
    company: "Wealthly",
    initials: "SK",
    color: "bg-purple-500",
  },
  {
    quote:
      "The professionalism and clarity that Witty Wealth brings to the table is unmatched. Their solutions are fast becoming the go-to choice for young professionals.",
    name: "Rishi Verma",
    title: "Director",
    company: "InvestSmart India",
    initials: "RV",
    color: "bg-green-500",
  },
  {
    quote:
      "Exceptional tools and support. I highly recommend it to anyone in the finance domain looking for reliable guidance and resources in wealth building.",
    name: "Neha Singh",
    title: "Partner",
    company: "ValueVest Advisors",
    initials: "NS",
    color: "bg-orange-500",
  },
  {
    quote:
      "Their commitment to simplifying finances is evident in every feature of the platform. It's designed for scalability and user empowerment.",
    name: "Kunal Shah",
    title: "Co-founder",
    company: "FinRise",
    initials: "KS",
    color: "bg-indigo-500",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: "ease-in-out",
  swipeToSlide: true,
};

const TestimonialSlider = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-green-50 via-blue-50 to-purple-100 font-Inter text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-archivo">
          What Industry Leaders Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 md:p-10 gap-6 transition-transform duration-500 ease-in-out hover:scale-[1.015]">
                <div className={`w-32 h-32 rounded-full ${testimonial.color} flex items-center justify-center border-4 border-gray-200`}>
                  <span className="text-white text-2xl font-bold">{testimonial.initials}</span>
                </div>
                <div className="text-left">
                  <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                  <h4 className="font-bold font-archivo text-xl">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-Inter">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
