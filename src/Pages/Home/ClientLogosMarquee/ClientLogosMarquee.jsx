
import client1 from '../../../assets/brands/amazon.png'
import client2 from '../../../assets/brands/amazon_vector.png'
import client3 from '../../../assets/brands/casio.png'
import client4 from '../../../assets/brands/moonstar.png'
import client5 from '../../../assets/brands/randstad.png'
import client6 from '../../../assets/brands/start-people 1.png'
import client7 from '../../../assets/brands/start.png'

const logos = [client1, client2, client3, client4, client5, client6, client7];

const ClientLogosMarquee = () => {
    return (
        <section className="my-16 bg-white overflow-hidden">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800">Our Clients</h2>
                <p className="text-gray-500 mt-2">Trusted by leading brands</p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="marquee flex w-max">
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-6"
                            style={{ width: '160px' }}
                        >
                            <img
                                src={logo}
                                alt={`Client ${index + 1}`}
                                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS inside component for marquee effect */}
            <style>{`
        .marquee {
          animation: scroll-marquee 25s linear infinite;
        }

        @keyframes scroll-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </section>
    );
};

export default ClientLogosMarquee;