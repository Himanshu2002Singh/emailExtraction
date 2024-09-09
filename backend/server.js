const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { parse } = require('json2csv');

const app = express();
const port = 5000;

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'Nidhimanshu@91',
  database: 'myapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Utility function to generate JWT tokens
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, 'defaultsecret', { expiresIn: '1h' });
};

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'defaultsecret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route: User Signup
app.post('/signup', async (req, res) => {
  const { fullName, email, password, country, state, city, whatsapp, phoneNumber, companyName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultRole = 'user';
  const credits = 100;

  db.query('INSERT INTO users (fullName, email, password, country, state, city, whatsapp, phoneNumber, companyName, role, credits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [fullName, email, hashedPassword, country, state, city, whatsapp, phoneNumber, companyName, defaultRole, credits], 
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send({ message: 'Email already exists' });
        }
        return res.status(500).send({ message: 'Database error' });
      }
      res.status(201).send({ message: 'User registered successfully' });
    });
});

// Route: User Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send({ message: 'Database error' });
    if (results.length === 0) return res.status(401).send({ message: 'Invalid credentials' });

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.send({ token, role: user.role, credits: user.credits, id: user.id });
  });
});

// Route: Get User Details
app.get('/users/details', (req, res) => {
  const sql = 'SELECT id, fullName, email, credits, country, state, city, whatsapp, phoneNumber, companyName FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch user details' });
    }

    res.json(results);
  });
});

// Route: Get User Credit Details
app.get('/users-credit', (req, res) => {
  const sql = 'SELECT id, fullName, email, credits, expirationDate, input_max, phoneNumber FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }

    res.json(results);
  });
});

// Route: Update User Credit or Expiration Date
app.put('/user-credit/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { input_max, expirationDate } = req.body;

  const updateFields = [];
  const queryParams = [];

  if (input_max !== undefined) {
    updateFields.push('input_max = ?');
    queryParams.push(input_max);
  }

  if (expirationDate !== undefined) {
    updateFields.push('expirationDate = ?');
    queryParams.push(expirationDate);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  queryParams.push(id);
  const sqlQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

  db.query(sqlQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user data' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Route: Update User Profile
app.get('/users-profile/:id',  (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT id, fullName, email, phoneNumber, profilePhoto FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ error: 'Failed to fetch profile data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(results[0]);
  });
});

// Utility functions for extraction
const extractEmailsFromHtml = (html) => {
  const emails = [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let match;
  while ((match = emailRegex.exec(html)) !== null) {
    emails.push(match[0]);
  }
  return emails;
};

const extractPhoneNumbersFromHtml = (html) => {
  const phoneNumbers = [];
  const phoneRegex = /(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  let match;
  while ((match = phoneRegex.exec(html)) !== null) {
    phoneNumbers.push(match[0]);
  }
  return phoneNumbers;
};

const extractSocialProfilesFromHtml = (html) => {
  const profiles = [];
  const socialMediaLinks = ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com'];
  socialMediaLinks.forEach((site) => {
    const regex = new RegExp(`https?://(?:www\\.)?${site}/[a-zA-Z0-9_]+`, 'g');
    let match;
    while ((match = regex.exec(html)) !== null) {
      profiles.push(match[0]);
    }
  });
  return profiles;
};

const extractCategoriesFromHtml = (html) => {
  const categories = [];
  const categoryRegex = /category:\s*(\w+)/gi;
  let match;
  while ((match = categoryRegex.exec(html)) !== null) {
    categories.push(match[1]);
  }
  return categories;
};

// Extraction endpoint
app.post('/api/extract/:id', async (req, res) => {
  const { urls, extractEmails, extractProfiles, extractPhoneNumbers, extractCategories } = req.body;

  try {
    const emailResults = [];
    const profileResults = [];
    const phoneResults = [];
    const categoryResults = [];

    for (const url of urls) {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const html = $.html();

      if (extractEmails) {
        emailResults.push(...extractEmailsFromHtml(html));
      }
      if (extractProfiles) {
        profileResults.push(...extractSocialProfilesFromHtml(html));
      }
      if (extractPhoneNumbers) {
        phoneResults.push(...extractPhoneNumbersFromHtml(html));
      }
      if (extractCategories) {
        categoryResults.push(...extractCategoriesFromHtml(html));
      }
    }

    const userId = req.params.id;

    // Check user credits and package
    db.query('SELECT credits, package, expirationDate FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user credits:', err);
        return res.status(500).json({ error: 'Failed to fetch user credits' });
      }
      
      const { credits, package: userPackage, expirationDate } = results[0];
      const totalCreditsRequired = urls.length; // Adjust as necessary based on actual credit usage logic
      
      const currentDate = new Date();
      const isPackageExpired = expirationDate && new Date(expirationDate) < currentDate;
      
      if (userPackage <= 0 || isPackageExpired) {
        return res.status(400).json({ error: 'Your package has expired or is invalid.' });
      }
      if (credits < totalCreditsRequired) {
        return res.status(400).json({ error: 'Insufficient credits' });
      }

      // Deduct credits
      db.query('UPDATE users SET credits = credits - ? WHERE id = ?', [totalCreditsRequired, userId], (err) => {
        if (err) {
          console.error('Error updating credits:', err);
          return res.status(500).json({ error: 'Failed to update credits' });
        }

        // Log activity
        urls.forEach((url) => {
          db.query('INSERT INTO activity_logs (user_id, activity, timestamp) VALUES (?, ?, ?)', [userId, `Data extracted from ${url}`, new Date()], (err) => {
            if (err) console.error('Error logging activity:', err);
          });
        });

        res.json({
          emails: emailResults,
          profiles: profileResults,
          phones: phoneResults,
          categories: categoryResults
        });
      });
    });
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: 'Error extracting data' });
  }
});

// File Download Endpoint
app.get('/api/download', (req, res) => {
  // Your data array should be prepared based on the actual implementation and requirements
  const data = req.query.data ? JSON.parse(req.query.data) : []; // Expecting data to be passed as a query parameter

  const csv = parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment('data.csv');
  res.send(csv);
});

// Get user details
app.get('/api/user/details/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT credits, package, expirationDate, input_max, premium_user FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Failed to fetch user details' });
    }
    res.json(results[0]);
  });
});

// Log user activity
app.post('/api/user/activity/:id', (req, res) => {
  const { urls, emailCount, phoneCount, profileCount, categoryCount } = req.body;
  const userId = req.params.id; // Assuming user ID is extracted from token

  urls.forEach((url) => {
    db.query('INSERT INTO activity_logs (user_id, activity, timestamp) VALUES (?, ?, ?)', [userId, `Extracted data from ${url} (Emails: ${emailCount}, Phones: ${phoneCount}, Profiles: ${profileCount}, Categories: ${categoryCount})`, new Date()], (err) => {
      if (err) console.error('Error logging activity:', err);
    });
  });

  res.status(200).json({ message: 'Activity logged' });
});


// Endpoint to get all users
app.get('/api/users_activity2', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Endpoint to get activity logs for a specific user
app.get('/api/activity_log/:id', (req, res) => {
  const { id  } = req.params;
  const query = 'SELECT * FROM activity_logs WHERE user_id  = ?';
  db.query(query, [id ], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      console.log(id);
      console.log(results);
      res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});