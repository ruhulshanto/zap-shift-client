import React from 'react';

const HowItWorkCard = ({ step }) => {
  const { icon: Icon, title, description } = step;

  return (
    <div  data-aos="fade-up"
     data-aos-duration="2000"
     className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
      <div className="text-orange-500 text-5xl mb-4 flex justify-center">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default HowItWorkCard;
