// src/Components/FrequentlyAskedQuestions.jsx
// import React, { useState } from 'react';

const FrequentlyAskedQuestions = () => {
  const faqData = [
    {
      question: 'What is Zap-Courier?',
      answer: 'Zap-Courier is a real-time messaging service for fast and easy communication between courier services and customers.',
    },
    {
      question: 'How does Zap-Courier work?',
      answer: 'You can integrate Zap-Courier’s APIs with your application to handle messages, deliveries, and real-time updates.',
    },
    {
      question: 'Is Zap-Courier free?',
      answer: 'Zap-Courier offers both free and paid plans, depending on the volume of messages and features you need.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our support team via email at support@zapcourier.com or through the contact form on our website.',
    },
    {
      question: 'Can I track my deliveries?',
      answer: 'Yes, Zap-Courier provides a real-time tracking feature for deliveries, which can be accessed through our API or web dashboard.',
    },
  ];

  return (
    <div className="py-28 mt-12 bg-gray-100 shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Have questions about our service? Below you'll find the most common questions asked by our customers,
          along with helpful answers. If you don’t find what you’re looking for, feel free to reach out to us!
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-base-100 border border-base-300 shadow-xl"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >         
            <input
              type="checkbox"
              id={`faq-${index}`}
              className="peer hidden"
            />
            <label
              htmlFor={`faq-${index}`}
              className="collapse-title font-semibold text-gray-800 cursor-pointer"
            >
              {item.question}
            </label>

            <div className="collapse-content text-sm text-gray-600 p-4 bg-gray-50">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
