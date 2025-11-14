import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Branding */}
        <div>
          <h2 className="text-4xl font-semibold text-red-600 mb-4">
            KBTS
          </h2>
          <p className="text-white font-normal leading-relaxed">
            A premier entertainment talent accelerator bridging raw talent 
            to professional opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-base font-normal">
            <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-red-400 transition">About Us</a></li>
            <li><a href="/login" className="hover:text-red-400 transition">Login</a></li>
            <li><a href="/register" className="hover:text-red-400 transition">Register</a></li>
          </ul>
        </div>

        {/* support */}
         <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-base font-normal">
            <li><a href="/" className="hover:text-red-400 transition">FAQ</a></li>
            <li><a href="/about" className="hover:text-red-400 transition">Help Center</a></li>
            <li><a href="/login" className="hover:text-red-400 transition">Privacy Policy</a></li>
            <li><a href="/register" className="hover:text-red-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:text-left lg:text-right">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Contact Us
          </h3>
          <p className="font-normal ">
            <span>Reg.-:</span>A321, Master Mind 4, Royal Palms, Nagri Nirwara, Goregaon (East), Mumbai 400065
          </p>
           <p className="font-normal ">
           <span>Branch-:</span> Plot No. 72A, Block-B, Gali No. 4, New Jankipuri, Uttam Nagar , New Delhi-110059
          </p>
          <p className="font-normal mt-3">
            Email:{" "}
            <a href="mailto:xyz@gmail.com" className="hover:text-red-400">
              xyz@gmail.com
            </a>
          </p>
          <p className="font-normal mt-2">
            Mobile:{" "}
            <a href="tel:9205300231" className="hover:text-red-400">
              9205300231
            </a>
            ,{" "}
            <a href="tel:9205200273" className="hover:text-red-400">
              9205200273
            </a>
          </p>
          <p className="font-normal mt-2">
            Web:{" "}
            <a href="/" className="hover:text-red-400">
           kbtalentbridgestudios.com
            </a>
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center space-x-6 pb-6">
        <a href="https://www.facebook.com/people/Kb-Talentbtidgestudios/pfbid02MbdXUEJc5qLBtQ9V4APjZSv9QWABzibYWjkwUcsXpyYk1u5Y1BCk2292sAz2UmY7l/?rdid=OnDNyyedQCaCE771&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C71BSAJcL%2F" className="hover:text-red-400 transition" aria-label="Facebook"><FaFacebookF size={22} /></a>
        <a href="https://www.instagram.com/kbtalentbridgestudios?igsh=eWxqc3cwcDF0eWt0" className="hover:text-red-400 transition" aria-label="Instagram"><FaInstagram size={22} /></a>
        <a href="#" className="hover:text-red-400 transition" aria-label="Twitter"><FaTwitter size={22} /></a>
        <a href="https://www.youtube.com/@kbtalentbridgestudios" className="hover:text-red-400 transition" aria-label="Youtube"><FaYoutube size={22} /></a>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm font-normal">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-600 font-semibold">KB TalentBridge Studio</span>. All rights reserved.
      </div>
    </footer>
  );
}
