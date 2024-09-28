import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Fudo</h3>
          <p>Our job is to fill your tummy with delicious food and with fast and free delivery.</p>
          <div className="social-icons">
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Menu</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Why Fudo?</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Account</a></li>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <p>Question or feedback? We’d love to hear from you</p>
            <div className="email-input">
              <input type="email" placeholder="Email Address" />
              <button><i className="fa fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
