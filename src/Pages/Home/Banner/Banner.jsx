import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import bannerImg1 from '../../../assets/banner1.jpg';
import bannerImg2 from '../../../assets/banner2.jpg';
import bannerImg3 from '../../../assets/banner3.jpg';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <div className="w-full mt-12"> {/* Control the overall width of the slider */}
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false}
                interval={3000}
                infinite={true}
                className="h-[500px] sm:h-[600px]"
            >
                <div>
                    <img src={bannerImg1} className="w-full h-full object-cover" />
                </div>
                <div>
                    <img src={bannerImg2} className="w-full h-full object-cover" />
                </div>
                <div>
                    <img src={bannerImg3} className="w-full h-full object-cover" />
                </div>
            </AutoplaySlider>
        </div>
    );
};

export default Banner;
