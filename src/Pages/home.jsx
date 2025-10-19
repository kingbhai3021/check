import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Home/nav.jsx';
import HeroSlider from '../components/Home/HeroSlider.jsx';
import Box2 from '../components/Home/box2.jsx';
import PartnerBrands from '../components/Home/PartnerBrands.jsx'; // 🏢 Partner Brands Section
import ProductBasket from '../components/Home/ProductBasket.jsx'; // 🧺 Product Basket Section
import Footer from '../components/Home/Footer.jsx'; // 🦶 Footer
import TestimonialSlider from '../components/Home/TestimonialSlider.jsx';

function Home() {
    return (
        <div className='pt-[80px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden'>
            {/* 🔹 Navigation Bar */}
            <Nav />

            {/* 🔹 Hero Image/Text Slider */}
            <HeroSlider />


            {/* 🔹 Section without background image */}
            <div className="w-full py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
                <Box2 />
            </div>

            {/* 🔹 Brands Who Trust Us Section */}
            <PartnerBrands />

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
