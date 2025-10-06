import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import customerReview from "../../../assets/customersImg/customersReview.svg";
import ClientReviewCard from "./ClientReviewCard";

// Online image links (optimized)
const reviews = [
    {
        img: "https://i.ibb.co.com/VYSmTKRQ/customer1.webp",
        name: "Rasel Ahamed",
        role: "CTO",
        text: "This product helped me sit straighter during long work hours and reduced back pain noticeably. Highly recommended!",
        rating: 5
    },
    {
        img: "https://i.ibb.co.com/q3hrNLFT/customer2.webp",
        name: "Nasir Uddin",
        role: "CEO",
        text: "Great design and comfort — it's been a game changer for my posture.",
        rating: 5
    },
    {
        img: "https://i.ibb.co.com/ks5S5Y53/customer4.webp",
        name: "Sharmin Akter",
        role: "UX Designer",
        text: "Lightweight, comfortable and effective — I feel more relaxed while working at my desk.",
        rating: 4
    },
    {
        img: "https://i.ibb.co.com/HTQ7fngY/customer5.webp",
        name: "Tanvir Hasan",
        role: "Software Engineer",
        text: "I can already feel the difference after a week of consistent use.",
        rating: 5
    },
    {
        img: "https://i.ibb.co.com/wkkWLcQ/customer6.webp",
        name: "Sadia Rahman",
        role: "Marketing Manager",
        text: "Simple, effective and comfortable. Best purchase I made this year.",
        rating: 5
    },
    {
        img: "https://i.ibb.co.com/395B0JDj/customer7.webp",
        name: "Imran Hossain",
        role: "Full-Stack Developer",
        text: "I used to slouch a lot — now my posture is much better.",
        rating: 4
    },
    {
        img: "https://i.ibb.co.com/k6c6fcmY/customer8.webp",
        name: "Ruhul Shanto",
        role: "Product Manager",
        text: "Sleek design, easy to adjust and doesn't interfere with daily activities.",
        rating: 5
    },
    {
        img: "https://i.ibb.co.com/q373dGjf/customer9.webp",
        name: "Fahima Borsha",
        role: "Data Analyst",
        text: "Aligns my back without discomfort. Great product and quality build.",
        rating: 4
    },
    {
        img: "https://i.ibb.co.com/JF3GPTJH/customer10.webp",
        name: "Ruhul Amin",
        role: "HR Specialist",
        text: "My confidence in meetings improved because I naturally sit straighter now.",
        rating: 5
    },
];

const ClientReview = () => {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-28 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
                {/* Header Section */}
                <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Trusted by 10,000+ Customers
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        What Our <span className="text-green-600">Customers</span> Are Saying
                    </h1>

                    <div className="flex justify-center mb-8">
                        <img
                            src={customerReview}
                            alt="Customer Reviews"
                            className="w-24 h-24"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of satisfied customers who have transformed their posture and improved their daily comfort with our products.
                    </p>
                </div>

                {/* Swiper Section */}
                <div className="relative">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        grabCursor={true}
                        centeredSlides={false}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        speed={800}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            el: ".custom-pagination",
                            type: "bullets",
                            bulletClass: "w-2 h-2 rounded-full bg-gray-300 cursor-pointer transition-all duration-300",
                            bulletActiveClass: "w-6 bg-green-600",
                            renderBullet: function (index, className) {
                                return `<span class="${className}"></span>`;
                            }
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="!pb-4"
                    >
                        {reviews.map((review, idx) => (
                            <SwiperSlide key={idx}>
                                <ClientReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Centered Pagination */}
                    <div className="flex justify-center w-full mt-8">
                        <div className="custom-pagination flex items-center gap-3 justify-center"></div>
                    </div>
                </div>

                {/* Stats Section */}
                <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200"
                    data-aos="fade-up"
                    data-aos-delay="500"
                    data-aos-duration="800">

                    <div
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="800"          >
                        <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>

                    <div
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="1000">
                        <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>

                    <div
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="1200"
                    >
                        <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                        <div className="text-gray-600">Recommend Us</div>
                    </div>
                    <div
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay="1400">
                        <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                        <div className="text-gray-600">Support</div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ClientReview;