import React from 'react';
import './Packages.css';

// Importing images
import collectEmailIdsIcon from '../assets/img/extract-email.png';
import deepSearchIcon from '../assets/img/deep-algorithm.png';
import multiThreadedIcon from '../assets/img/data-protection.png';
import userFriendlyIcon from '../assets/img/user-friendly.png';
import advancedFilteringIcon from '../assets/img/advanced-filter.png';
import affordableIcon from '../assets/img/affordable-price.png';

const packages = [
  {
    title: "STANDARD",
    price: "$0",
    details: ["Validity: Onetime", "100 Email Extraction Credits", "Max 50 inputs at once"],
    buttonText: "Register Now!",
    buttonClass: "register-btn"
  },
  {
    title: "STARTER",
    price: "$20",
    priceINR: "₹1500 INR",
    details: ["Validity: 1 Week", "Unlimited Email Extraction", "Max 100 inputs at once"],
    buttonText: "Buy Now",
    buttonClass: "buy-btn"
  },
  {
    title: "PROFESSIONAL",
    price: "$50",
    priceINR: "₹4,000 INR",
    details: ["Validity: 1 Month", "Unlimited Email Extraction", "Max 100 inputs at once"],
    buttonText: "Buy Now",
    buttonClass: "buy-btn"
  },
  {
    title: "PREMIUM",
    price: "$200",
    priceINR: "₹16,000 INR",
    details: ["Validity: 1 Year", "Unlimited Email Extraction", "Max 200 inputs at once"],
    buttonText: "Buy Now",
    buttonClass: "buy-btn"
  }
];

const featuresLeft = [
  {
    icon: collectEmailIdsIcon,
    title: 'Collect Email Ids and Phone Numbers',
    description: 'Crawl websites, scrape email addresses and phone numbers, and create filtered mailing lists for your campaigns.'
  },
  {
    icon: deepSearchIcon,
    title: 'Deep Email Search Algorithms',
    description: 'Our tool uses complex algorithms to find and filter real emails, providing a duplicate-free list.'
  },
  {
    icon: multiThreadedIcon,
    title: 'Multi-Threaded Connections',
    description: 'Our multi-threaded technology speeds up the email extraction process, allowing you to extract hundreds of emails quickly.'
  }
];

const featuresRight = [
  {
    icon: userFriendlyIcon,
    title: 'User Friendly Interface',
    description: 'No special installation required. The platform is designed for ease of use, even for beginners.'
  },
  {
    icon: advancedFilteringIcon,
    title: 'Advanced Filtering Features',
    description: 'Choose from 4 different scraping modes. No duplicate or invalid emails!'
  },
  {
    icon: affordableIcon,
    title: 'Affordable for Freelancers and Companies',
    description: 'We offer affordable plans with free trials so everyone can benefit from our email finder tool.'
  }
];

const Packages = () => {
  return (
    <div className="container54">
      <h2 className="section-title">Pick a deal that’s right for you</h2>
      <p className="section-description">We offer different web email finder packages for businesses and freelancers. Choose the best one for your needs.</p>

      <div className="packages">
        {packages.map((pkg, index) => (
          <div key={index} className="package">
            <h3 className="package-title">{pkg.title}</h3>
            <p className="package-price">{pkg.price}{pkg.priceINR && <><br />{pkg.priceINR}</>}</p>
            <ul className="package-details">
              {pkg.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
            <button className={`${pkg.buttonClass} full-width-btn`}>{pkg.buttonText}</button>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <p style={{color:"green"}}> <a style={{color:"orange"}} href='//'>Contact us</a> for a <span style={{color:'darkgreen', fontWeight:"900"}}>dedicated Email Finder Server</span>, with unlimited input limits and 10X data extraction speed.
        <span style={{color:'darkgreen', fontWeight:"900"}}> Extra price: ₹1500 INR / $20 per month </span></p>
      </div>

      <h2 className="features-title">Email Finder Features</h2>
      <div className="features">
        {featuresLeft.concat(featuresRight).map((feature, index) => (
          <div key={index} className="feature">
            <img src={feature.icon} alt={feature.title} className="feature-icon" />
            <div className="feature-text">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
