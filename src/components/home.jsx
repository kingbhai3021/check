import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav.jsx';
import HeroSlider from './HeroSlider.jsx';
import Box2 from './box2.jsx';
import Bg2 from '../assets/bg2.png';
import ProductBasket from './ProductBasket.jsx'; // 🧺 Product Basket Section
import Footer from './Footer.jsx'; // 🦶 Footer
import TestimonialSlider from './TestimonialSlider.jsx';
import Box from './box.jsx'; // 📦 Box Component

function Home() {
    return (
        <div className='pt-[80px]'>
            {/* 🔹 Navigation Bar */}
            <Nav />

            {/* 🔹 Hero Image/Text Slider */}
            <HeroSlider />

            <Box/>

            {/* 🔹 Second Section with Background */}
           <div className="w-full py-20 bg-center bg-no-repeat bg-cover bg-[#E4F8EA]" style={{ backgroundImage: `url(${Bg2})` }}>

                <Box2 />
            </div>

            {/* 🔹 Product Basket Section */}
            <ProductBasket />

            {/* 🔹 Testimonial Slider */}
            <TestimonialSlider />

            {/* 🔹 Footer */}
            <Footer />

            
        </div>
    );
}

export default Home;
