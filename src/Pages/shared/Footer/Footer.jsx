import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBox,
    FaTruck,
    FaBuilding,
    FaGlobe,
    FaMoneyBillWave,
    FaHeart,
    FaHome,
    FaPaperPlane,
    FaMapMarkedAlt,
    FaMotorcycle,
    FaTachometerAlt
} from "react-icons/fa";
import { Link } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-gray-200 mt-10 rounded-b-3xl rounded-t-sm">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Logo & Description */}
                <div>
                    <ProFastLogo />
                    <p className="mt-4 text-sm leading-relaxed">
                        ProFast Courier – your trusted partner for quick, safe, and affordable parcel delivery across Bangladesh.
                        We deliver with care and speed, every single time.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FaHome className="text-yellow-400" />
                            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPaperPlane className="text-yellow-400" />
                            <Link to="/sendParcel" className="hover:text-yellow-400 transition">Send a Parcel</Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMapMarkedAlt className="text-yellow-400" />
                            <Link to="/coverage" className="hover:text-yellow-400 transition">Coverage Area</Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMotorcycle className="text-yellow-400" />
                            <Link to="/beARider" className="hover:text-yellow-400 transition">Be a Rider</Link>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaTachometerAlt className="text-yellow-400" />
                            <Link to="/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link>
                        </li>
                    </ul>
                </div>


                {/* Our Services */}
                <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Our Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><FaBox className="text-yellow-400" /> Same-Day Delivery</li>
                        <li className="flex items-center gap-2"><FaTruck className="text-yellow-400" /> Next-Day Parcel Service</li>
                        <li className="flex items-center gap-2"><FaBuilding className="text-yellow-400" /> Corporate Courier Solutions</li>
                        <li className="flex items-center gap-2"><FaGlobe className="text-yellow-400" /> Nationwide Delivery Network</li>
                        <li className="flex items-center gap-2"><FaMoneyBillWave className="text-yellow-400" /> Cash-on-Delivery (COD)</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                            <span>House 15, Road 7, Dhanmondi, Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-yellow-400" />
                            <a href="tel:+880123456789" className="hover:text-yellow-400 transition">+880 1628142448</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-yellow-400" />
                            <div className="flex flex-col">
                                <a
                                    href="mailto:rashanto77@outlook.com"
                                    className="hover:text-yellow-400 transition"
                                >
                                    rashanto77@outlook.com
                                </a>
                                <a
                                    href="mailto:ruhulshanto8082@gmail.com"
                                    className="hover:text-yellow-400 transition"
                                >
                                    ruhulshanto8082@gmail.com
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Social Media */}
            <div className="border-t border-gray-800 py-5 flex flex-col items-center gap-3">
                <div className="flex gap-4">
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
                        <FaTwitter />
                    </a>
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
                        <FaInstagram />
                    </a>
                    <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition transform hover:scale-110">
                        <FaLinkedinIn />
                    </a>
                </div>

                <div className="text-center text-sm mt-4 px-2">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="text-yellow-400 font-semibold">ProFast Courier</span>. All Rights Reserved.
                    </p>
                    <p className="text-xs text-gray-400 flex flex-wrap items-center justify-center gap-1 mt-1">
                        Developed by <FaHeart className="text-red-500 mt-1" />
                        <a
                            href="mailto:rashanto77@outlook.com"
                            className="text-yellow-400 hover:underline transition"
                        >
                            rashanto77@outlook.com
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
