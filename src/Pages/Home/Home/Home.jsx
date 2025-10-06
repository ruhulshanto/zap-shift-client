import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import HowItWorks from '../HowItWork/HowItWorks';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Features from '../Features/Features';
import BeMerchant from '../BeMerchant/BeMerchant';
import ClientReview from '../Reviews/ClientReview';
import FrequentlyAskedQuestions from '../FrequentAskQuestion/FrequentlyAskedQuestions';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Features></Features>
            <BeMerchant></BeMerchant>
            <ClientReview></ClientReview>
            <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
        </div>
    );
};

export default Home;