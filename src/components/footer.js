import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-overlay3"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="footer-header">About </div>
            <div className="footer-content">
              <p>Compnay is managed by individual dedicated developers in India. The aim of developing the tools is to grow our customers business. We believe that Our Customer Success is Our Success!</p>
              <p><i>-- Ashis Kumar (Founder)</i></p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-header">Products</div>
            <div className="footer-content">
              <ul>
                <li><a href="/web-email-finder">Web Email Finder</a></li>
                <li><a target="_blank" href="https://www.nextweblab.com/">Website Builder</a></li>
                <li><a href="/bulkmailer">Bulk Mailer</a></li>
                <li><a href="/real-email-verifier">Real Email Verifier</a></li>
                <li><a href="/smtp-email-server">SMTP Service</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-header">Quick Links</div>
            <div className="footer-content">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">My Account</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-header">We Accept</div>
            <div className="footer-content bg-white">
              <div style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                <div style={{ boxSizing: 'border-box', display: 'block', maxWidth: '100%' }}>
                  <img style={{ maxWidth: '100%', display: 'block', margin: 0, border: 'none', padding: 0 }} alt="" aria-hidden="true" role="presentation" src="" />
                </div>
                <noscript>
                  <img style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} alt="We Accept" srcSet="/_next/image?url=%2Fimages%2Fweb%2Fpayment-methods.png&amp;w=384&amp;q=75 1x, /_next/image?url=%2Fimages%2Fweb%2Fpayment-methods.png&amp;w=750&amp;q=75 2x" src="/images/web/payment-methods.png" decoding="async" className="img-fluid" />
                </noscript>
                <img style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} alt="We Accept" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" decoding="async" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="footer-contact">
              For any query WhatsApp/call at <a href="tel:+91-9777735384">+91-8883483858</a>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="text">
                Copyright © 2020 <a href="/"></a>. All Right Reserved
              </div>
            </div>
            <div className="col-md-6">
              <div className="text" style={{ textAlign: 'right' }}>
                Made with <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="red" style={{ color: 'red' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.574 20.672l-28.246 43.463c-36.452-29.484-87.944-38.624-127.96-30.428-54.457 11.15-100.166 60.347-97.895 131.46 2.394 74.955 54.71 129.71 104.89 174.823 25.09 22.554 50.84 43.086 69.928 61.535 37.685 34.062 55.942 92.366 55.942 92.366s24.534-59.502 55.942-89.572c19.692-18.7 45.676-39.61 71.324-62.93 51.298-46.644 104.404-104.034 102.094-177.618 0-122.308-121.2-121.013-167.883-78.495 19.323-10.226 40.12-12.397 58.798-8.214 34.297 7.683 62.693 35.935 64.332 88.108 1.562 49.92-39.09 98.088-88.11 142.654-24.508 22.28-49.752 42.445-71.324 62.93-11.456 10.884-16.74 20.514-25.174 31.795-8.437-11.983-13.663-22.066-25.173-33.192C174.715 306.4 86.784 238.475 83.27 163.77c-.72-62.22 72.103-78.604 111.246-51.04l-45.924 25.258c67.393 11.144 124.746 37.36 185.597 75.588L278.573 20.672z"></path></svg> trustingBrains.
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
