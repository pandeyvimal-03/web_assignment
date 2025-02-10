import * as React from 'react';
import Spinner from '../assets/images/spinner.png'
import Image from 'next/image';

const Loader = () => {
    return (
        <div className='loader-container'>
            {/* <img alt="Loading..." className='loader' src={Spinner} /> */}
            <Image alt="Loading..." className='loader' src={Spinner}/>
        </div>
    );
}

export default Loader;