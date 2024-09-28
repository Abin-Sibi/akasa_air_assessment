import React from 'react';
import './Home.css';
// import heroImage from '../../../public/images/burg.png'; 
import heroImage from '../../assets/model-eating.png'; // Replace with actual image path
import Category from '../Category/Category';
import PopularDishes from '../Category/PopularDishes';
import RecentOrders from '../Category/RecentOrders';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div className="home">
            {/* <Header/> */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Be The Fastest In Delivering Your <span>Food</span></h1>
                    <p>Our job is to filling your tummy with delicious food and with fast and free delivery</p>
                    <div className="hero-buttons">
                        <button className="get-started-btn">Get Started</button>
                        <button className="watch-video-btn">Watch Video</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Eating Food" />
                    
                </div>
            </section>

            <Category/>

            <PopularDishes/>

            <RecentOrders/>

            <section className="services">
                <h2>WHAT WE SERVE</h2>
                <h3>Your Favorite Food Delivery Partner</h3>
                <div className="service-cards">
                    <div className="service-card">
                        <i className="icon">📱</i>
                        <h4>Easy To Order</h4>
                        <p>You only need a few steps in ordering food</p>
                    </div>
                    <div className="service-card">
                        <i className="icon">🚴</i>
                        <h4>Fastest Delivery</h4>
                        <p>Delivery that is always on time even faster</p>
                    </div>
                    <div className="service-card">
                        <i className="icon">🍲</i>
                        <h4>Best Quality</h4>
                        <p>Not only fast for us, quality is also number one</p>
                    </div>
                </div>
            </section>
            {/* <Footer/> */}
        </div>
    );
};

export default Home;
