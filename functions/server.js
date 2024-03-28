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
        // If data.json doesn't exist, create it with an empty object
        fs.writeFile('data.json', JSON.stringify({}), (err) => {
            if (err) {
                console.error('Error creating data.json:', err);
            } else {
                console.log('data.json created successfully');
                // Read the created data.json file
                fs.readFile('data.json', (err, newData) => {
                    if (err) {
                        console.error('Error reading newly created data.json:', err);
                    } else {
                        try {
                            referralData = JSON.parse(newData);
                            console.log('Initial referral data loaded:', referralData);
                        } catch (error) {
                            console.error('Error parsing initial data:', error);
                        }
                    }
                });
            }
        });
    } else {
        try {
            referralData = JSON.parse(data);
            console.log('Initial referral data loaded:', referralData);
        } catch (error) {
            console.error('Error parsing data:', error);
        }
    }
});

// Create server after reading data
createServerAndStart();

// Create server function
function createServerAndStart() {
    const server = http.createServer((req, res) => {
        corsMiddleware(req, res, () => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');

            // Log incoming request
            console.log('Incoming request:', req.url, req.method);

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
                    console.log('Request body:', body);
                    try {
                        const newData = JSON.parse(body);
                        console.log('Parsed request data:', newData);
                        const referralLink = newData.referral_link;
                        const referralCount = newData.referral_count;
                        const rewards = newData.rewards;

                        // Check if referral link exists
                        if (referralLink && referralData[referralLink]) {
                            const referralDataToUpdate = referralData[referralLink];
                            referralDataToUpdate.rewards = rewards;
                            referralDataToUpdate.referral_count = referralCount;
                            referralData[referralLink] = referralDataToUpdate;

                            // Write updated data to data.json
                            writeReferralDataToFile();
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Referral data updated successfully' }));
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
      referral_count: 0,
      rewards: 0
  };
  referralData[referralLink] = newReferralData;
  // Write updated data to data.json
  writeReferralDataToFile();
  return newReferralData;
}
// Function to write referralData to data.json
function writeReferralDataToFile() {
    fs.writeFile('data.json', JSON.stringify(referralData, null, 2), (err) => {
        if (err) {
            console.error('Error writing data:', err);
        } else {
            console.log('Referral data written to data.json');
        }
    });
}
