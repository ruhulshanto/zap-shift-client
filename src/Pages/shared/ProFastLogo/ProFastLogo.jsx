import React from 'react';
import { Link } from 'react-router';
import proFastLogo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <Link to="/">
            <div className='flex justify-center items-center p-2'>
                <img data-aos="fade-up"
                    data-aos-duration="1000"
                    className='mb-4' src={proFastLogo} alt="" />
                <p className='text-3xl font-extrabold -ml-2'>ProFast</p>
            </div>
        </Link>
    );
};

export default ProFastLogo;