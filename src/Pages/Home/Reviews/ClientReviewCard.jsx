import React from "react";

const ClientReviewCard = React.memo(({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 mx-2 flex flex-col justify-between h-[420px] w-11/12 transition-all duration-500 hover:-translate-y-2"
      data-aos="flip-left"
      data-aos-duration="800"
    >
      {/* Content Section */}
      <div className="flex-1">
        {/* Quote Icon */}
        <div 
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Rating Stars */}
        <div 
          className="flex items-center gap-1 mb-4"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          {renderStars(review.rating)}
        </div>

        {/* Review Text */}
        <p 
          className="text-gray-700 text-base leading-relaxed line-clamp-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          "{review.text}"
        </p>
      </div>

      {/* Customer Info */}
      <div 
        className="pt-4 border-t border-gray-100 mt-4"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="flex items-center gap-4">
          <div 
            className="relative"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <img
              src={review.img}
              alt={review.name}
              className="w-14 h-14 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div 
            className="flex-1"
            data-aos="fade-left"
            data-aos-delay="700"
          >
            <div className="font-semibold text-gray-900">{review.name}</div>
            <div className="text-gray-500 text-sm">{review.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ClientReviewCard;