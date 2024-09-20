import React from 'react';
import './Packages.css';

// Importing images
import collectEmailIdsIcon from '../assets/img/extract-email.png';
import deepSearchIcon from '../assets/img/deep-algorithm.png';
import multiThreadedIcon from '../assets/img/data-protection.png';
import userFriendlyIcon from '../assets/img/user-friendly.png';
import advancedFilteringIcon from '../assets/img/advanced-filter.png';
import affordableIcon from '../assets/img/affordable-price.png';
import centerImage from '../assets/img/web-traffic.png';

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
    description: 'With this online tool, your email marketing campaigns are made a lot easier. You can now crawl any website, text files, scrap email addresses and phone numbers, and generate massive, filtered mailing lists for your email marketing purposes.'
  },
  {
    icon: deepSearchIcon,
    title: 'Deep Email Search Algorithms',
    description: 'Our Web Email Finder tool integrates complex email search algorithms that decode any type of email format, filter them, and show you the real emails, presenting you with a duplicate-free email list.'
  },
  {
    icon: multiThreadedIcon,
    title: 'Multi-Threaded Connections',
    description: 'Using our tool is not only convenient but faster in execution. We have implemented multithreaded connections to execute several extraction processes at a time, allowing you to extract hundreds of emails within a minute.'
  }
];

const featuresRight = [
  {
    icon: userFriendlyIcon,
    title: 'User Friendly Interface',
    description: 'We hate complications! Our platform is designed to be as user-friendly as possible. The Web Email Finder tool doesn’t require any special installation. It’s simple enough for even users with minimal computer knowledge.'
  },
  {
    icon: advancedFilteringIcon,
    title: 'Advanced Filtering Features',
    description: 'We have included 4 email scraping modes in our software. Use any mode according to your needs. No duplicate emails! No invalid emails!'
  },
  {
    icon: affordableIcon,
    title: 'Affordable for Freelancers and Companies',
    description: 'We designed our platform with everyone in mind! We provide a free trial so anyone can try our effective online email finder software. We’ve ensured the price is affordable for every user who needs it.'
  }
];

const Packages = () => {
  return (
    <div className="container">
      <h2 className="section-title">Pick a deal that’s right for you</h2>
      <p className="section-description">We offer different web email finder packages for any type of businesses or freelancers. Choose the best one that suits your needs.</p>

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
            <button className={pkg.buttonClass}>{pkg.buttonText}</button>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <p style={{color:"green"}}> <a  style={{color:"orange"}} href='//'>Contact us</a> for a <span  style={{color:'darkgreen', fontWeight:"900"}}> dedicated Email Finder Server</span>, with unlimited input limits and 10X data extraction speed.
        <span style={{color:'darkgreen', fontWeight:"900"}}> Extra price: ₹1500 INR / $20 per month </span></p>
      </div>

      <h2 className="features-title">Email Finder Features</h2>
      <div className="features">
        <div className="features-left">
          {featuresLeft.map((feature, index) => (
            <div key={index} className="feature">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <div className="feature-text">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      

        <div className="features-right">
          {featuresRight.map((feature, index) => (
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
    </div>
  );
};

export default Packages;
