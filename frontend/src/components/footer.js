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
              <p><i> Founder</i></p>
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
              For any query WhatsApp/call at <a href="tel:+91-9777735384">+91-12345678</a>
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
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
