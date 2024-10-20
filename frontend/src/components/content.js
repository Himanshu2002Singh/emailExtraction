import React from 'react';
import './EmailFinder.css';

// Importing images
import collectEmailIdsIcon from '../assets/img/extract-email.png';
import deepSearchIcon from '../assets/img/deep-algorithm.png';
import multiThreadedIcon from '../assets/img/data-protection.png';
import userFriendlyIcon from '../assets/img/user-friendly.png';
import advancedFilteringIcon from '../assets/img/advanced-filter.png';
import affordableIcon from '../assets/img/affordable-price.png';
import dataprotection from '../assets/img/data-protection.png';
import deepalgorithmIcon from '../assets/img/web-traffic.png';
import timeismoney from '../assets/img/time-is-money.png';



const Packages = () => {
  return (
    <div>
  <div className="container">
      <div className="row">
        <div className="col-md-12 my-5">
          <p>
            Email finder is a very important online tool in the digital marketing sphere, getting a good Web Email Finder is good, but getting a fast one is even better. SoftTechLab represents speed – we don’t just deliver email finder services like every other company, we provide that opportunity for digital marketers to experience the fastest Web email finder tool, something that can only be found on SoftTechLab.
          </p>
        </div>

        <div className="col-md-12">
          <h3>Pick a deal that’s right for you</h3>
          <p>We offer different web email finder packages for any type of businesses or freelancers. Choose the best among them that suits your need.</p>
          <div className="pricing-container">
            {['STANDARD', 'STARTER', 'PROFESSIONAL', 'PREMIUM'].map((plan, index) => {
              const prices = [0, 20, 50, 200];
              const validity = ['Onetime', '1 Week', '1 Month', '1 Year'];
              const rupeePrice = ['₹0', '₹1500', '₹4,000', '₹16,000'];
              const features = [
                ['100 Email Extraction Credits', 'Max 50 inputs at once'],
                ['Unlimited Email Extraction', 'Max 100 inputs at once'],
                ['Unlimited Email Extraction', 'Max 100 inputs at once'],
                ['Unlimited Email Extraction', 'Max 200 inputs at once']
              ];

              return (
                <div key={index} className="pricing" style={{ background: `linear-gradient(60deg, rgba(235, 241, 255, 0.7) 0%, rgba(244, 241, 250, 0.7) 35%, rgba(252, 239, 246, 0.7) 100%)` }}>
                  <div className="d-flex justify-content-between" style={{ minHeight: '90px' }}>
                    <div className="packageName">{plan}</div>
                    <div className="price">
                      <div className="top">
                        <span>$</span>{prices[index]}
                      </div>
                      {index !== 0 && <div className="bottom">{rupeePrice[index]}</div>}
                    </div>
                  </div>
                  <div className="features">
                    <ul>
                      <li><strong>Validity:</strong> {validity[index]}</li>
                      {features[index].map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                  </div>
                  {index !== 0 && (
                    <div className="buynowBtn">
                      <button type="button" className="btn btn-warning">Buy Now</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="alert alert-success" role="alert">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-warning font-weight-bold"
              href="https://api.whatsapp.com/send/?phone=919777735384&amp;text=dedicated%20email%20finder&amp;type=phone_number&amp;app_absent=0"
            >
              Contact us
            </a> for <b>dedicated Email Finder Server</b>, where you can get <i>1000 input limit</i> and get <i>10X data extraction speed</i>.
            <br />
            <b>Extra price: ₹1500 INR / $20 per month</b>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div>
      <div className="row my-5">
        <div className="col d-flex justify-content-between border-bottom">
          <h3 className="mb-3 font-weight-semi-bold fs-3 fs-lg-5">Email Finder Features</h3>
          <a className="text-danger" href="/register">
            <h5 className="font-weight-semi-bold fs-0 fs-lg-1">Try it for free</h5>
          </a>
        </div>
      </div>
      <div className="row justify-content-around mb-5">
        <div className="col-lg-4 col-md-6">
          <div className="feature-title-box">
            <img className="mb-3" src={collectEmailIdsIcon} alt="" width="40" />
            <h4 className="title mb-0">Collect Email Ids and Phone Numbers</h4>
          </div>
          <p>With this online tool, your email marketing campaigns is made a lot easier. You can now crawl any website, text files, scrap email addresses and phone numbers, and you are still at liberty to generate massive, filtered mailing list for your email marketing purposes.</p>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature-title-box">
            <img className="mb-3" src={deepSearchIcon} alt="" width="40" />
            <h4 className="title mb-0">Deep Email Search Algorithms</h4>
          </div>
          <p>Our Web Email Finder tool is integrated with a complex email search algorithms that decodes any type of email format, filter them and show you the real emails, hence presenting you with a duplicate-free email list.</p>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature-title-box">
            <img className="mb-3" src={multiThreadedIcon} alt="" width="40" />
            <h4 className="title mb-0">Multi-Threaded Connections</h4>
          </div>
          <p>Using our tool is not only convenient but faster in execution. We have implemented multithreaded connections in our tool to execute several extraction processes at a time. So that you can extract 100s of emails within a minute.</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={userFriendlyIcon} alt="" width="40" />
            <h4 className="title mb-0">User Friendly Interface</h4>
          </div>
          <p>We hate complications! Which is why we have designed our platform to be as user friendly as possible. Web Email Finder as an online email marketing tool doesn’t need any form of special installation before usage. We have designed our tool in the simplest way so that it will be very friendly for even users with less knowledge of computer.</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={advancedFilteringIcon} alt="" width="40" />
            <h4 className="title mb-0">Advanced Filtering Features</h4>
          </div>
          <p>We have included 4 email scraping modes in our software. So, you can now use any mode according to your needs. No duplicate emails! No invalid emails!</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={affordableIcon} alt="" width="40" />
            <h4 className="title mb-0">Affordable for Freelancers and Any Companies</h4>
          </div>
          <p>We designed our platform with everybody in mind! We provide free trial so that anyone can afford to have a bite of our most effective online email finder software, that way they will be able to testify to the efficiency. We have designed this tool in such a way that the price can be affordable for every user who really needs.</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={dataprotection} alt="" width="40" />
            <h4 className="title mb-0">Data Protection and Accuracy</h4>
          </div>
          <p>We are trustworthy! We don&#x27;t share your information with any third party outside of our organization. We confirm that 98% data are correct.</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={timeismoney} alt="" width="40" />
            <h4 className="title mb-0">Saves Time and Money</h4>
          </div>
          <p>With the automatic activity, you can save your valuable time and lots of money for marketing. It will help the business to increase performance.</p>
        </div>
        <div className="col-lg-4 col-md-6 mt-5">
          <div className="feature-title-box">
            <img className="mb-3" src={deepalgorithmIcon} alt="" width="40" />
            <h4 className="title mb-0">Drive Traffic &amp; Leads to Websites</h4>
          </div>
          <p>With our special anti-duplicate programming, you are bound to get massive website traffic and generate targeted leads using our email finder tool.</p>
        </div>
      </div>
    

      
      
      </div>
    </div>
    </div>

  );
};

export default Packages;
