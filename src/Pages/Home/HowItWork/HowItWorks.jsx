import React from 'react';
import {
    FaBoxOpen,
    FaTruckLoading,
    FaShippingFast,
    FaSmile,
} from 'react-icons/fa';
import HowItWorkCard from './HowItWorkCard';


const stepsData = [
    {
        title: 'Step 1: Package Pickup',
        description:
            'We collect your parcels from your location through our pickup agents quickly and securely.',
        icon: FaBoxOpen,
    },
    {
        title: 'Step 2: Warehouse Processing',
        description:
            'Packages are sorted and processed at our logistics hub using a smart fulfillment system.',
        icon: FaTruckLoading,
    },
    {
        title: 'Step 3: Fast Delivery',
        description:
            'We deliver the package via our wide logistics network across the country in 24–72 hours.',
        icon: FaShippingFast,
    },
    {
        title: 'Step 4: Customer Satisfaction',
        description:
            'We ensure smooth, secure handover and a positive experience for your customers.',
        icon: FaSmile,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 my-28 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">How It Works</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover how our delivery system works efficiently from pickup to customer doorstep.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {stepsData.map((step, index) => (
                    <HowItWorkCard
                        key={index}
                        step={step}                       
                    ></HowItWorkCard>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
