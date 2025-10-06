import React from 'react';
import {
    FaTruck,
    FaGlobe,
    FaWarehouse,
    FaMoneyBillWave,
    FaHandshake,
    FaUndoAlt,
} from 'react-icons/fa';
import ServiceCard from './ServiceCard';


const servicesData = [
    {
        title: 'Express & Standard Delivery',
        description:
            'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
        icon: FaTruck,
    },
    {
        title: 'Nationwide Delivery',
        description:
            'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
        icon: FaGlobe,
    },
    {
        title: 'Fulfillment Solution',
        description:
            'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
        icon: FaWarehouse,
    },
    {
        title: 'Cash on Home Delivery',
        description:
            '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
        icon: FaMoneyBillWave,
    },
    {
        title: 'Corporate Service / Contract In Logistics',
        description:
            'Customized corporate services which includes warehouse and inventory management support.',
        icon: FaHandshake,
    },
    {
        title: 'Parcel Return',
        description:
            'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
        icon: FaUndoAlt,
    },
];

const Services = () => {
    return (
        <section className="py-28 px-4 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center m-20">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Services</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We offer a wide range of delivery and logistics solutions across Bangladesh tailored to meet your business needs.
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {servicesData.map((service, index) => (
                    <ServiceCard
                        key={index}
                        service={service}
                    ></ServiceCard>
                    
                ))}
            </div>
        </section>
    );
};

export default Services;
