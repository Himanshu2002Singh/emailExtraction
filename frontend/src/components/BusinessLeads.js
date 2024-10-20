import React from 'react';
import './BusinessLeads.css';

const BusinessLeads = () => {
  return (
    <section className="business-leads-section" id='contact'>
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-lg-7 col-md-12">
            <h1>Generate more business leads</h1>
            <p>
              Welcome to SoftTechLab, your go-to source for powerful and intuitive software solutions that can help you grow your business and increase your return on investment (ROI). Our suite of software products is designed to cater to the needs of businesses of all sizes, from small freelancers to large enterprises.
            </p>
            <p>
              At SoftTechLab, we believe in providing high-quality software solutions that are easy to use, yet robust enough to meet the demands of today's businesses. We understand that every business is unique, and that's why we've developed a range of software products that can be tailored to your specific needs. Our software solutions are perfect for lead generation, sales tracking, project management, and more.
            </p>
            <p>
              Best of all, you can try our software products for free, with no credit card required. We want you to be completely satisfied with our products, which is why we offer a free trial so you can test them out for yourself. We're confident that once you try our software, you'll see the value that it can bring to your business.
            </p>
            <p>
              Our software products are designed to be user-friendly, with intuitive interfaces that are easy to navigate. Whether you're a seasoned pro or just starting out, you'll find our software products to be the perfect tool to help you manage your business efficiently and effectively. Don't hesitate, <a href="/signup">sign up for our free trial today</a> and start taking your business to the next level.
            </p>
          </div>
          {/* Form Section */}
          <div className="col-lg-5 col-md-12">
            <div className="contact-form">
              <h4>Any query, please fill the form.</h4>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Your Name" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Enter Email Address" />
                </div>
                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Enter your phonenumber" />
                </div>

                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Enter your whatsapp number" />
                </div>
                <div className="form-group">
                  <textarea className="form-control" rows="4" placeholder="Enter your query.."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessLeads;
