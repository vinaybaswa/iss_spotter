const request = require('request');

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
      const msg = `Status Code ${response.statusCode} when fetching IPCoords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    ipCoords = {};
    ipCoords.latitude = JSON.parse(body).data.latitude;
    ipCoords.longitude = JSON.parse(body).data.longitude;
    callback(null, ipCoords);
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching FlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    const ipString = '72.138.221.207';
    fetchCoordsByIP(ipString, (error, ipCoords) => {
      if (error) {
        return callback(error, null);
      }
      
      const coords = { latitude: '43.63190', longitude: '-79.37160' };
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };