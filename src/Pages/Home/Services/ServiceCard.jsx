
const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;

  return (
    <div data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1000"
      className="
        flex flex-col items-center text-center
        bg-white rounded-lg p-16
        shadow-md transition-all duration-300
        hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02]
        cursor-pointer
      "
    >
      <div className="text-orange-500 text-5xl mb-4">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
