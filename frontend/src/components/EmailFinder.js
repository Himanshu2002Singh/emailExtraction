import React, { useState, useEffect } from 'react';
import '../App.css';  // You can define your styles here or use inline styles
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Packages from './content';
import axios from 'axios'; // Import axios for API requests
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable';  // Import for auto-table support

const EmailFinder = ({id}) => {
    const [domainsEntered, setDomainsEntered] = useState(""); // Changed from 0 to an empty string
    const [activeTab, setActiveTab] = useState('textInput');
    const [extractPhone, setExtractPhone] = useState(true);
    const [extractSocialMedia, setExtractSocialMedia] = useState(true);
    const [extractCategory, setExtractCategory] = useState(true);
    const [maxEmails, setMaxEmails] = useState("1");
    const [file, setFile] = useState(null);
    const [userPackage, setUserPackage] = useState(null);
    const [credits, setCredits] = useState(0);
    const [premium, setPremium] = useState(false);
    const [creditExpired, setCreditExpired] = useState(false);
    const [extractionResults, setExtractionResults] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(false);
    
    const [domainCount, setDomainCount] = useState(0);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };
  

    const handleInputChange = (e) => {
        // Split input by new lines and filter out empty lines
        const domains = e.target.value.split('\n').filter(Boolean);
    
        // Process each domain to ensure it has a URL scheme
        const processedDomains = domains.map(domain => {
            // Check if the domain already starts with http:// or https://
            if (!/^https?:\/\//i.test(domain)) {
                // If not, prepend https://
                return `https://${domain}`;
            }
            // If it already has a scheme, return it as is
            return domain;
        });
    
        // Create a Set to get unique domains and limit to 100 entries
        const uniqueDomains = Array.from(new Set(processedDomains)).slice(0, 100);
    
        // Update state: domainsEntered (input text) and domainCount (count of unique entries)
        setDomainsEntered(uniqueDomains.join('\n'));
        setDomainCount(uniqueDomains.length);
    };

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`https://webmailextract.com/api/user/details/${id}`);
                const { package: userPackage, credits, expirationDate, input_max: maxInput, premium_user: premium } = response.data;

                setUserPackage(userPackage);
                setCredits(credits);
                setPremium(premium);

                const currentDate = new Date();
                if (premium && expirationDate && new Date(expirationDate) < currentDate) {
                    setCreditExpired(true);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };
    fetchUserDetails();
}, [id]);



// CSV Download function
const handleDownloadCSV = () => {
    // Prepare the CSV headers
    const headers = ['Domain', 'Email', 'Phone Number', 'Social Media', 'Category'];
    
    // Prepare rows with emails based on maxEmails selection
    const rows = extractionResults.map(result => {
        // Check maxEmails to determine if we include a single or multiple emails
        const emails = result.emails.length > 0
            ? (maxEmails === "1" ? result.emails.slice(0, 1).join('; ') : result.emails.join('; '))
            : 'N/A';
        
        // Filter and join phone numbers, format social media links
        const phones = result.phones.length > 0
            ? result.phones.filter(phone => /^[0-9]{10,15}$/.test(phone)).join('; ')
            : 'N/A';

        const socialMedia = result.socialMedia.length > 0
            ? result.socialMedia.join('; ')
            : 'N/A';

        const category = result.category || 'N/A';

        return [result.domain, emails, phones, socialMedia, category];
    });

    // Combine headers and rows into CSV format
    let csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link to download the CSV file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'extracted-results.csv');

    // Append link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the link after download
    document.body.removeChild(link);
};


  const performExtraction = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
        alert("You need a valid token or credits expired.");
        setLoading(false);
        return;
    }

    if (premium ==='yes' && creditExpired) {
        alert("You need a valid credits expired.");
        setLoading(false);
        return;
    }

    const domainList = domainsEntered.split('\n').slice(0, 100);

    try {
        const response = await axios.post(`https://webmailextract.com/api/extract/${id}`, {
            urls: domainList,
            extractEmails: maxEmails,
            extractProfiles: extractSocialMedia,
            extractPhoneNumbers: extractPhone,
            extractCategories: extractCategory,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Convert response data to an array for easier mapping
        const resultsArray = Object.entries(response.data).map(([domain, data]) => ({
            domain,
            emails: data.emails || [],
            phones: data.phones || [],
            socialMedia: data.profiles || [],
            category: data.categories ? data.categories[0] || 'N/A' : 'N/A'
        }));

        // Sort emails by priority if emailPriorities array is defined
        resultsArray.forEach(result => {
            result.emails.sort((a, b) => {
                const priorityA = emailPriorities.findIndex(priority => a.includes(priority));
                const priorityB = emailPriorities.findIndex(priority => b.includes(priority));
                if (priorityA !== -1 && priorityB !== -1) {
                    return priorityA - priorityB;
                } else if (priorityA !== -1) {
                    return -1;
                } else if (priorityB !== -1) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });

        setExtractionResults(resultsArray);
        setCredits((prev) => prev - domainList.length);

        // Log activity
        await axios.post(`https://webmailextract.com/api/user/activity/${id}`, {
            urls: domainList,
            emailCount: resultsArray.reduce((acc, data) => acc + (data.emails?.length || 0), 0),
            phoneCount: resultsArray.reduce((acc, data) => acc + (data.phones?.length || 0), 0),
            profileCount: resultsArray.reduce((acc, data) => acc + (data.socialMedia?.length || 0), 0),
            categoryCount: resultsArray.reduce((acc, data) => acc + (data.category ? 1 : 0), 0),
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

    } catch (error) {
        console.error('Error extracting data:', error);
        alert("Failed to extract data. Please try again.");
    } finally {
        setLoading(false);
    }
};


    // Drag and drop functionality for email priority
    const [emailPriorities, setEmailPriorities] = useState([
        '@domain', 'info@', 'sales@', 'support@', 'contact@',
        'admin@', 'hello@', 'editor@', 'marketing@',
        'feedback@', 'hr@', 'team@', 'customerservice@',
        'office@', 'mail@', 'enquiries@', '@gmail',
        '@yahoo'
    ]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedPriorities = Array.from(emailPriorities);
        const [movedItem] = reorderedPriorities.splice(result.source.index, 1);
        reorderedPriorities.splice(result.destination.index, 0, movedItem);

        setEmailPriorities(reorderedPriorities);
    };

    return (
        <>
            <div className="toolPg">
                <div className="container">
                    <div className="toolPgHeader">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="title">Web Email Finder</h1>
                                <div className="desc">Extract email addresses and phone numbers from any websites!</div>
                            </div>
                        </div>
                    </div>
                    <div className="toolpgBody">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <form style={{ background: "#fff", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
                                <div className="react-tabs">
                                    <ul className="react-tabs__tab-list" role="tablist">
                                        <li 
                                            className={`react-tabs__tab ${activeTab === 'textInput' ? 'react-tabs__tab--selected' : ''}`} 
                                            role="tab" 
                                            onClick={() => setActiveTab('textInput')}
                                        >
                                            Text Input
                                        </li>
                                        <li 
                                            className={`react-tabs__tab ${activeTab === 'excelInput' ? 'react-tabs__tab--selected' : ''}`} 
                                            role="tab" 
                                            onClick={() => setActiveTab('excelInput')}
                                        >
                                            Excel Input
                                        </li>
                                    </ul>
                                    <div className={`react-tabs__tab-panel ${activeTab === 'textInput' ? 'react-tabs__tab-panel--selected' : ''}`} role="tabpanel">
            <div className="form-group">
                <label>Enter one domain/URL per line Below And Press Extract Email:</label>
                <textarea
                    rows="4"
                    className="form-control"
                    value={domainsEntered}
                    onChange={handleInputChange}
                ></textarea>
                <div className="d-flex justify-content-end">
                    <small className="text-secondary">
                        {domainCount} / 100 Unique Websites entered
                    </small>
                </div>
            </div>
        </div>
                                    <div className={`react-tabs__tab-panel ${activeTab === 'excelInput' ? 'react-tabs__tab-panel--selected' : ''}`} role="tabpanel">
                                        <div className="form-group">
                                            <label>Upload Excel file (.xlsx) or Drag and Drop:</label>
                                            <input type="file" accept=".xlsx" className="form-control" onChange={handleFileChange} />
                                            <div
                                                className="drag-drop-area"
                                                onDrop={handleFileDrop}
                                                onDragOver={handleDragOver}
                                                style={{
                                                    border: "2px dashed #ddd",
                                                    padding: "20px",
                                                    textAlign: "center",
                                                    marginTop: "10px"
                                                }}
                                            >
                                                Drag & Drop Excel file here
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                    <div className="form-group">
                                        <label>Set/Arrange Email Priority:</label>
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="droppable-priorities">
                                                {(provided) => (
                                                    <div 
                                                        className="drag-sort"
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        <div className="sort-wrapper noselect">
                                                            {emailPriorities.map((item, index) => (
                                                                <Draggable key={item} draggableId={item} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={`inner ${item.includes('@gmail') || item.includes('@yahoo') ? 'free' : ''}`}
                                                                        >
                                                                            {item}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>

                                    {/* Options for email extraction */}
                                    <div className="d-flex flex-wrap" style={{ gap: '15px' }}>
                                        <SwitchComponent
                                            label="Extract Phone Numbers"
                                            checked={extractPhone}
                                            onChange={() => setExtractPhone(!extractPhone)}
                                        />
                                        <SwitchComponent
                                            label="Extract Social Media Profiles"
                                            checked={extractSocialMedia}
                                            onChange={() => setExtractSocialMedia(!extractSocialMedia)}
                                        />
                                        <SwitchComponent
                                            label="Website Category"
                                            checked={extractCategory}
                                            onChange={() => setExtractCategory(!extractCategory)}
                                        />
                                        <div className="form-group">
                                            <label className="d-flex align-items-center">
                                                <select
                                                    style={{ width: '180px' }}
                                                    name="maxEmails"
                                                    id="maxEmails"
                                                    className="custom-select"
                                                    value={maxEmails}
                                                    onChange={(e) => setMaxEmails(e.target.value)}
                                                >
                                                    <option value="1">Single Email ID</option>
                                                    <option value="2">Multiple Email ID</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>

                                    <hr />

                                    <CreditsInfo credits={credits} used={100-credits} remaining={credits} />

                                    <hr />

                                    <div className="d-flex">
                                        <button type="button" className="btn btn-dark"   onClick={performExtraction} disabled={loading}>
                                            {loading ? 'Extracting...' : 'Extract Emails'}
                                        </button>
                                        <button type="button" className="btn btn-warning ml-2">Reset</button>
                                        <a className="btn btn-secondary ml-2" href="/contact">Report Error</a>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
    {extractionResults.length > 0 && (
        <>
            <button type="button" className="btn btn-success ml-2" onClick={handleDownloadCSV}>
                Download CSV
            </button>
            <h2>Extracted Results</h2>

            {/* Responsive table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Domain</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Social Media</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extractionResults.map((result, index) => (
                            <tr key={index}>
                                <td>{result.domain}</td>
                                <td>
                                    {result.emails && result.emails.length > 0
                                        ? (
                                            maxEmails === "1" 
                                            ? <div>{result.emails[0]}</div> // Show only the first email if maxEmails is set to "1"
                                            : result.emails.map((email, idx) => <div key={idx}>{email}</div>) // Show all emails
                                          )
                                        : 'N/A'}
                                </td>
                                <td>
                                    {result.phones && result.phones.length > 0
                                        ? result.phones
                                            .filter(phone => /^[0-9]{10}$/.test(phone)) // Validate phone format
                                            .map((phone, idx) => <div key={idx}>{phone}</div>)
                                        : 'N/A'}
                                </td>
                                <td>
                                    {result.socialMedia && result.socialMedia.length > 0
                                        ? result.socialMedia.map((profile, idx) => (
                                            <div key={idx}>
                                                <a href={profile} target="_blank" rel="noopener noreferrer">{profile}</a>
                                            </div>
                                          ))
                                        : 'N/A'}
                                </td>
                                <td>{result.category ? result.category : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )}
</div>



            <Packages/>
        </>
    );
};

// Switch Component
const SwitchComponent = ({ label, checked, onChange }) => (
    <div className="form-group">
        <label className="d-flex align-items-center">
            <div className="react-switch" style={{ position: 'relative', display: 'inline-block' }}>
                <div
                    className="react-switch-bg"
                    style={{
                        height: '16px',
                        width: '36px',
                        background: checked ? '#dc3545' : '#999999',
                        borderRadius: '15px',
                        cursor: 'pointer'
                    }}
                    onClick={onChange}
                ></div>
                <div
                    className="react-switch-handle"
                    style={{
                        height: '16px',
                        width: '16px',
                        background: '#fff',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '0px',
                        left: '2px',
                        transition: 'transform 0.2s',
                        transform: checked ? 'translateX(20px)' : 'translateX(0px)',
                        cursor: 'pointer'
                    }}
                    onClick={onChange}
                ></div>
            </div>
            <span style={{ marginLeft: '10px' }}>{label}</span>
        </label>
    </div>
);

// Credits Info Component
const CreditsInfo = ({ credits, used, remaining }) => (
    <div className="credits-info">
        <p>CREDITS INFORMATION</p>
        <ul className="text-muted">
            <li>Credits: {credits}</li>
            <li>Used: {used}</li>
            <li>Remaining: {remaining}</li>
        </ul>
    </div>
);

export default EmailFinder;
