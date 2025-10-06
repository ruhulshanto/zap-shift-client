
import trackingImg from '../../../assets/benefits/LiveTracking.jpg';
import safeImg from '../../../assets/benefits/safeClientService.jpg';
import supportImg from '../../../assets/benefits/callCenterSupport.jpg';
import urbanDeliveryImg from '../../../assets/benefits/urbanDelivery.jpg';
import fastImg from '../../../assets/benefits/fastDellivery.jpg';
import FeaturesCard from './FeaturesCard';

const featureData = [
    {
        title: 'Live Parcel Tracking',
        description: 'Track your parcels in real-time from pickup to delivery with our advanced GPS tracking system.',
        img: trackingImg,
    },
    {
        title: '100% Safe Delivery',
        description: 'We ensure the complete safety of your packages with secured packaging and reliable transport.',
        img: safeImg,
    },
    {
        title: '24/7 Call Center Support',
        description: 'Our dedicated support team is available around the clock to assist you with any queries.',
        img: supportImg,
    },
    {
        title: 'Nationwide Fast Delivery',
        description: 'Reach any destination in Bangladesh within 24–72 hours through our extensive network.',
        img: urbanDeliveryImg,
    },
    {
        title: 'Express Urban Delivery',
        description: 'Same-day delivery within Dhaka with our express urban fleet and route optimization.',
        img: fastImg,
    },
];

const Features = () => {
    return (
        <div className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore the key features that make our logistics service reliable, fast, and customer-friendly.
                </p>
            </div>

            <div className="space-y-10 max-w-6xl mx-auto">
                {
                    featureData.map((feature, index) => (
                        <FeaturesCard
                            key={index}
                            feature={feature}
                            dataAos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                        ></FeaturesCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Features;
