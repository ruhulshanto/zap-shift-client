import satisfactionImg from '../../../assets/Satisfaction.webp'

const BeMerchant = () => {
    return (
        <div
            data-aos="zoom-in-up"
            data-aos-duration="2000"
            className="relative my-20 mx-1 rounded-2xl h-screen bg-cover bg-center flex items-center justify-start px-10" style={{ backgroundImage: `url(${satisfactionImg})` }}
        >
            <div className="absolute rounded-2xl inset-0 bg-black opacity-25"></div> {/* Overlay for text readability */}

            <div className="text-left z-10">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-[850px]">
                    Merchant and Customer Satisfaction <br /> Our First Priority
                </h1>

                {/* Description Text */}
                <p className="text-lg text-white mb-8 max-w-[700px]">
                    We are committed to providing the best delivery solutions that guarantee satisfaction for both merchants and customers. Our services are designed to simplify logistics, ensuring safe, timely, and hassle-free delivery every time.
                </p>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button className="bg-[#CAEB66] py-2 px-8 rounded-full text-lg font-semibold hover:bg-[#afe60a] transition duration-300">
                        Become a Merchant
                    </button>
                    <button className="bg-transparent border-2 border-white text-white py-2 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition duration-300">
                        Earn with Profast Courier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
