const request = require('request');
let ip;

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    ip = JSON.parse(body).ip;
    callback(null, ip);
    
  });
};

const fetchCoordsByIP = function(ipString, callback) {
  request('https://ipvigilante.com/json/' + ipString, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    ipCoords = {};
    ipCoords.latitude = JSON.parse(body).data.latitude;
    ipCoords.longitude = JSON.parse(body).data.longitude;
    callback(null, ipCoords);
    
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };