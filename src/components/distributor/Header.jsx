import distributorImg from "../../assets/distributor-hero.png";
import Logo from "../../assets/logo.png";
import { Users, IndianRupee, Home } from "lucide-react";

function HeaderText() {
  return (
    <div className="text-center lg:text-left max-w-xl px-4 lg:px-0">
      <h2 className="text-[#0066B3] text-xl md:text-2xl font-semibold mb-2 font-archivo">
        Safalta Aapki... Saath Hamara.
      </h2>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-snug mb-4 font-archivo">
        Be a <span className="text-black">Successful</span>
        <br />
        <span className="text-[#D22129]">Mutual Fund Distributor</span>
      </h1>
      <p className="text-sm md:text-base text-black font-inter border-t pt-2 border-black w-fit mx-auto lg:mx-0">
        Work 100% Digitally with Unlimited Income and Growth
      </p>
    </div>
  );
}

function HeaderImage() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center relative z-20" data-aos="fade-left">
      <div className="object-contain h-auto max-w-[400px] w-full -mb-20 lg:-mb-28 bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-500 text-sm">Image Placeholder</p>
        </div>
      </div>
    </div>
  );
}

// Stats Section (AUM, Distributors, Locations)
function StatsRow() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-5xl w-full">
      <div className="flex flex-col items-start">
        <Users className="w-8 h-8 mb-2 text-white" />
        <p className="text-xs font-light text-white">ACTIVE DISTRIBUTORS</p>
        <p className="text-xl font-bold text-white font-archivo">47,875</p>
      </div>
      <div className="flex flex-col items-start">
        <IndianRupee className="w-8 h-8 mb-2 text-white" />
        <p className="text-xs font-light text-white">AUM*</p>
        <p className="text-xl font-bold text-white font-archivo">₹ 2,70,322 Cr</p>
      </div>
      <div className="flex flex-col items-start">
        <Home className="w-8 h-8 mb-2 text-white" />
        <p className="text-xs font-light text-white">LOCATIONS</p>
        <p className="text-xl font-bold text-white font-archivo">230+</p>
      </div>
    </div>
  );
}

// Blue Section with Join Now, Logo, Tagline, Stats
function BlueSection() {
  return (
    <div
      className="bg-[#003366] text-white pt-10 pb-6 px-6 text-left relative z-0 -mt-10 lg:pl-[4.5rem]"
      data-aos="fade-up"
    >
      {/* Top Block: Join Now + Logo + Tagline */}
      <div className="mb-6">
        <p className="text-lg md:text-xl font-inter mb-3">Join Now</p>
        <img src={Logo} alt="Witty Wealth Logo" className="w-32 mb-2" />
        <p className="text-lg md:text-xl font-inter leading-snug">
          ONE OF <span className="text-[#FEC32E] font-bold">INDIA'S LARGEST</span>
          <br />
          MUTUAL FUND DISTRIBUTORS
        </p>
      </div>

      {/* Stats Block: Active Distributors, AUM, Locations */}
      <StatsRow />

      {/* Note Below Stats */}
      <p className="text-xs text-white mt-4 font-inter">
        Data as in 30/06/2025. *Asset managed by various AMCs, Mobilised by NJ
      </p>
    </div>
  );
}

export default function Header() {
  return (
    <section className="w-full font-archivo">
      {/* White Background Section (Top Part) */}
      <div className="relative bg-white z-10">
        <div
          className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col-reverse lg:flex-row items-center justify-between pt-10 lg:pt-20 pb-0"
          data-aos="fade-up"
        >
          <HeaderText />
          <HeaderImage />
        </div>
      </div>

      {/* Blue Section (Lower Part) */}
      <BlueSection />
    </section>
  );
}