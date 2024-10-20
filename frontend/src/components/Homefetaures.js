import React from 'react';
import './Home34.css';
import webpj from '../assets/img/web-email-finder-icon.webp';
import webpj2 from '../assets/img/real-email-verifier.webp';
import bulk from '../assets/img/bulk-mailer.webp';

const Home34 = () => {
  const tools = [
    {
      id: 1,
      title: "Web Email Finder",
      description: "Extract email addresses and phone numbers from any websites! Build your own mailing list.",
      buttonLabel: "Visit now",
      link: "/email/finder",
      icon: webpj,
    },
    {
      id: 2,
      title: "Real Email Verifier",
      description: "No More Email Bounce & Email/IP Blacklist! Check and Verify Real Email Addresses That Exist.",
      buttonLabel: "Download now",
      link: "/login",
      icon: webpj2,
    },
    {
      id: 3,
      title: "Bulk Mailer",
      description: "Manage mailing lists & Send unlimited massive emails/newsletters using any SMTP.",
      buttonLabel: "Download now",
      link: "/login",
      icon: bulk,
    },
  ];

  return (
  
    <div className="home-section">
      <div className="home-header">
        <h2 className="home-title">A Faster Way to Capture Leads</h2>
        <p className="home-description">
          We have designed three effective features that allow our clients to get the fastest result in their campaigns.
          Though some of these tools have been there in the industry for some time now, our latest updated tools supersede
          conventional digital marketing tools. Each of these tools is designed to be two times faster than others,
          helping to capture leads more efficiently.
        </p>
      </div>

      <div className="featured-tools-section">
        <h3 className="tools-title">Our Featured Tools</h3>
        <div className="tools-grid">
          {tools.map((tool) => (
            <div className="tool-card" key={tool.id}>
              <img src={tool.icon} alt={tool.title} className="tool-icon" />
              <h4 className="tool-title">{tool.title}</h4>
              <p className="tool-description">{tool.description}</p>
              <a href={tool.link} className="tool-button">
                {tool.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Home34;
