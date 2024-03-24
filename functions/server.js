const http = require('http');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
let referralData = {};

const corsMiddleware = cors();

// Read initial data from data.json
fs.readFile('data.json', (err, data) => {
  if (err) {
    console.error('Error reading data:', err);
  } else {
    try {
      referralData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
    }

    // Create server after reading data
    createServerAndStart();
  }
});

// Create server function
function createServerAndStart() {
  const server = http.createServer((req, res) => {
    corsMiddleware(req, res, () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');

      // Handle GET request for user's referral data
      if (req.url.startsWith('/.netlify/functions/referralData') && req.method === 'GET') {
        const useAccountAddress = req.headers['useaccountadress']; // Retrieve account address from headers
        if (useAccountAddress) {
          // Fetch or create referral data for the user
          const userData = referralData[useAccountAddress] || createNewReferralData(useAccountAddress);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(userData));
        } else {
          // If account address is not provided, return an error
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Account address not provided' }));
        }
      } 
      // Handle PUT request to update referral data
      else if (req.url === '/.netlify/functions/updateReferralData' && req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const newData = JSON.parse(body);
            const referralLink = newData.referral_link;
            const referralCount = newData.referral_count;
            const rewards = newData.rewards;

            // Check if referral link exists
            if (referralLink && referralData[referralLink]) {
              const referralDataToUpdate = referralData[referralLink];
              referralDataToUpdate.rewards += rewards;
              referralDataToUpdate.referral_count = referralCount;
              referralData[referralLink] = referralDataToUpdate;

              // Write updated data to data.json
              fs.writeFile('data.json', JSON.stringify(referralData, null, 2), (err) => {
                if (err) {
                  console.error('Error writing data:', err);
                  res.writeHead(500);
                  res.end(JSON.stringify({ error: 'Error updating referral data' }));
                } else {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Referral data updated successfully' }));
                }
              });
            } else {
              // Referral link not found
              res.writeHead(404);
              res.end(JSON.stringify({ error: 'Referral link not found' }));
            }
          } catch (error) {
            console.error('Error updating referral data:', error);
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
          }
        });
      } else {
        // Invalid route
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
      }
    });
  });

  // Start server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Function to create new referral data
function createNewReferralData(referralLink) {
  const newReferralData = {
    referral_link: referralLink,
    referral_count: 0, // Initialize referral count to 0
    rewards: 0 // Initialize rewards to 0
  };
  referralData[referralLink] = newReferralData;
  return newReferralData;
}
