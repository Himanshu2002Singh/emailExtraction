import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import './EmailFinder.css';
import Package from './content'

Modal.setAppElement('#root');

const EmailFinder = ({ id }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [urls, setUrls] = useState('');
  const [emails, setEmails] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [extractEmails, setExtractEmails] = useState(false);
  const [extractProfiles, setExtractProfiles] = useState(false);
  const [extractPhoneNumbers, setExtractPhoneNumbers] = useState(false);
  const [extractCategories, setExtractCategories] = useState(false);
  const [emailPriorities, setEmailPriorities] = useState([
    '@domain', 'info@', 'sales@', 'support@', 'contact@', 'admin@',
    'hello@', 'editor@', 'marketing@', 'feedback@', 'hr@', 'team@',
    'customerservice@', 'office@', 'mail@', 'enquiries@', '@gmail',
    '@yahoo', '@hotmail'
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [remainingDomains, setRemainingDomains] = useState(0);
  const [creditExpired, setCreditExpired] = useState(false);
  const [credits, setCredits] = useState(0);
  const [premium, setPremium] = useState(false);
  const [userPackage, setUserPackage] = useState(0);
  const [maxInput, setMaxInput] = useState(100); // Default to 100 domains
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`https://webmailextract.com/api/user/details/${id}`);
          const { package: userPackage, credits, expirationDate, input_max: maxInput, premium_user: premium } = response.data;

          setUserPackage(userPackage);
          setMaxInput(maxInput);
          setCredits(credits);
          setPremium(premium);

          const currentDate = new Date();
          if (expirationDate && new Date(expirationDate) < currentDate) {
            setCreditExpired(true);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    setUrls(e.target.value);
  };

  const handleExtract = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (premium === "yes") {
      if (userPackage <= 0 || creditExpired) {
        alert('Your package has expired or is invalid.');
        return;
      }
    } else {
      if (credits <= 0) {
        alert('You do not have enough credits to perform extraction.');
        return;
      }
    }

    await performExtraction(token);
  };

  const performExtraction = async (token) => {
    const domainList = urls.split('\n').slice(0, maxInput);
    try {
      const response = await axios.post(`https://webmailextract.com/api/extract/${id}`, {
        urls: domainList,
        extractEmails,
        extractProfiles,
        extractPhoneNumbers,
        extractCategories
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEmails(response.data.emails || []);
      setProfiles(response.data.profiles || []);
      setPhoneNumbers(response.data.phoneNumbers || []);
      setCategories(response.data.categories || []);
      setModalIsOpen(true);
      setRemainingDomains(prev => prev - domainList.length);

      await axios.post(`https://webmailextract.com/api/user/activity/${id}`, {
        urls: domainList,
        emailCount: response.data.emails.length,
        phoneCount: response.data.phoneNumbers.length,
        profileCount: response.data.profiles.length,
        categoryCount: response.data.categories.length,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error extracting data:', error);
    }
  };

  const handleDownload = () => {
    const csvContent = [
      'Emails, Social Profiles, Phone Numbers, Categories',
      ...emails.map((email, i) => `${email}, ${profiles[i] || ''}, ${phoneNumbers[i] || ''}, ${categories[i] || ''}`).join('\n')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'extracted_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setUrls('');
    setEmails([]);
    setProfiles([]);
    setPhoneNumbers([]);
    setCategories([]);
    setModalIsOpen(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newEmailPriorities = Array.from(emailPriorities);
    const [movedItem] = newEmailPriorities.splice(result.source.index, 1);
    newEmailPriorities.splice(result.destination.index, 0, movedItem);

    setEmailPriorities(newEmailPriorities);
  };

  const toggleExtractOption = (option) => {
    switch (option) {
      case 'emails':
        setExtractEmails(!extractEmails);
        break;
      case 'profiles':
        setExtractProfiles(!extractProfiles);
        break;
      case 'phoneNumbers':
        setExtractPhoneNumbers(!extractPhoneNumbers);
        break;
      case 'categories':
        setExtractCategories(!extractCategories);
        break;
      default:
        break;
    }
  };

  return (
    <div>
    <div className='email-finder'>
      <h1>Web Email Finder</h1>
      <p>Extract email addresses, social profiles, phone numbers, and categories from any website!</p>
      <div className="input-container">
        <div className="tab-header">
          <button className={activeTab === 'text' ? 'active' : ''} onClick={() => handleTabChange('text')}>
            Text Input
          </button>
          <button className={activeTab === 'excel' ? 'active' : ''} onClick={() => handleTabChange('excel')}>
            Excel Input
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'text' && (
            <div className="text-input-container">
              <textarea
                placeholder={`Enter up to ${maxInput} domains/URLs per line below and press Extract:`}
                value={urls}
                onChange={handleInputChange}
              ></textarea>
              <div className="max-input-info">
                <span>Max Input: {maxInput}</span>
                <span>|| </span>
                <span>Remaining Domains: {remainingDomains}</span>
              </div>
            </div>
          )}
          {activeTab === 'excel' && (
            <input type="file" accept=".xlsx, .xls, .csv" style={{ padding: '10px', fontSize: '16px', width: '100%' }} />
          )}
        </div>
        <div className="email-priorities">
          <h2>Email Priorities</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="emailPriorities">
              {(provided) => (
                <ul className="priority-list" {...provided.droppableProps} ref={provided.innerRef}>
                  {emailPriorities.map((priority, index) => (
                    <Draggable key={priority} draggableId={priority} index={index}>
                      {(provided, snapshot) => (
                        <li
                          className={`priority-item ${snapshot.isDragging ? 'dragging' : ''}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {priority}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="options-container">
       <div>
       
      <input type="checkbox" checked={extractEmails} onChange={() => toggleExtractOption('emails')} />
      Extract Emails
     
       </div>
  <div>
    
      <input type="checkbox" checked={extractProfiles} onChange={() => toggleExtractOption('profiles')} />
      Extract Social Profiles
    
  </div>
  <div>
   
      <input type="checkbox" checked={extractPhoneNumbers} onChange={() => toggleExtractOption('phoneNumbers')} />
      Extract Phone Numbers
    
  </div>
  <div>
  
      <input type="checkbox" checked={extractCategories} onChange={() => toggleExtractOption('categories')} />
      Extract Categories
   
  </div>
        </div>

        <div className="button-container">
          <button className="extract-button" onClick={handleExtract}>Extract</button>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal-content" overlayClassName="modal-overlay" >
      
       <div style={{backgroundColor:'whitesmoke', textAlign:'center'}}>
        <h2>Extraction Results</h2>
        <div className="results-container">
          <h3>Emails</h3>
          <ul className="results-list">{emails.map((email, index) => <li key={index}>{email}</li>)}</ul>
          <h3>Social Profiles</h3>
          <ul className="results-list">{profiles.map((profile, index) => <li key={index}>{profile}</li>)}</ul>
          <h3>Phone Numbers</h3>
          <ul className="results-list">{phoneNumbers.map((phone, index) => <li key={index}>{phone}</li>)}</ul>
          <h3>Categories</h3>
          <ul className="results-list">{categories.map((category, index) => <li key={index}>{category}</li>)}</ul>
        </div>
        <div className="modal-buttons">
          <button className="download-button" onClick={handleDownload}>Download Results</button>
          <button className="close-button" onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
        </div>
      </Modal>
    </div>
    <Package/>
    </div>
  );
};

export default EmailFinder;
