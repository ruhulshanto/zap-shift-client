import React from 'react';

const FeaturesCard = ({ feature, dataAos }) => {
  const { title, description, img } = feature;

  return (
    <div
      data-aos={dataAos}
      data-aos-duration="1000"
      className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

      <div className="md:w-1/2 w-full flex items-center justify-center border-b md:border-b-0 
      md:border-r-3 border-dotted border-gray-300">
        <img
          src={img}
          alt={title}
          className="w-64 h-64 object-contain"
        />
      </div>

      <div className="md:w-1/2 p-6 flex flex-col justify-center text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesCard;
