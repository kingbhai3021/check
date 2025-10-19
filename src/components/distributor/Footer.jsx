export default function Footer() {
  return (
    <footer className="bg-white text-center text-[#1c1c1c] py-10 font-inter text-sm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold">
          Witty Wealth
        </h2>

        <p className="mt-2 text-base">
          AMFI registered Mutual Fund Distributor (ARN: 0155)
        </p>

        <p className="mt-4 font-semibold text-base">
          Registered & Corporate Office:
        </p>

        <p className="mt-1 leading-relaxed">
          Block No. 901 & 902, 6Th Floor, 'B' Tower, Udhna Udyog Nagar Sangh Commercial Complex,<br />
          Central Road No. 10, Udhna, Surat - 394210, Gujarat.
        </p>

        <hr className="my-6 border-gray-300 w-full" />

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
          <a href="#" className="hover:underline">Contact Us</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Disclaimer</a>
          <span>|</span>
          <a href="#" className="hover:underline">Refund Policy</a>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Copyright © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
