import React from 'react';
import './Home.css';
import getapp from '../assets/img/getapp.webp';
import g2 from '../assets/img/g2.webp';
import software from '../assets/img/software-advice.webp';
import zdnet from '../assets/img/zdnet.webp';
import cnet from '../assets/img/cnet.webp';
import sourceforge from '../assets/img/sourceforge.webp';
import software34 from '../assets/img/software-suggest.webp';
import img2 from '../assets/img/homepg.png';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="content">
          <h1>Grow Your Business</h1>
          <p>
            WEBMAILEXTRACTOR has many useful online tools that help digital marketers to get more leads and grow businesses.
            Over 25,000+ companies, both big and small, are growing their business with SoftTechLab.
          </p>
          <div className="buttons">
            <a href='/login'>
            <button className="get-started-btn">Get started - It's free</button></a>
            <a href='#contact'><button className="contact-btn">Get in touch with us</button></a>
          </div>
        </div>
        <div className="image-container">
          <img src={img2} alt="Business Meeting" />
        </div>
      </section>

      {/* Partner Logos Section with Carousel */}
      <section className="partners-section">
        <div className="carousel">
          <div className="carousel-track">
            <img src={g2} alt="G2" />
            <img src={getapp} alt="GetApp" />
            <img src={software} alt="Software Advice" />
            <img src={zdnet} alt="ZDNet" />
            <img src={cnet} alt="CNET" />
            <img src={sourceforge} alt="SourceForge" />
            <img src={software34} alt="Software Suggest" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
