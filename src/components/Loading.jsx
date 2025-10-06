// src/components/shared/Loading.jsx
import { motion as Motion } from "framer-motion";
import { FaTruck, FaBoxOpen } from "react-icons/fa";

const Loading = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        {/* Truck animation */}
        <div className="relative w-32 h-20 mb-8">
            <Motion.div
                initial={{ x: -100 }}
                animate={{ x: [0, 80, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 text-green-600 text-5xl"
            >
                <FaTruck />
            </Motion.div>

            <Motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute left-0 bottom-0 w-full h-2 bg-green-300 rounded-full"
            />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-3 text-gray-600 text-lg font-medium">
            <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            >
                <FaBoxOpen className="text-green-500 text-2xl" />
            </Motion.div>
            <span>Loading your deliveries...</span>
        </div>

        <p className="text-sm text-gray-400 mt-2">
            Please wait while we fetch your parcels
        </p>
    </div>
);

export default Loading;
