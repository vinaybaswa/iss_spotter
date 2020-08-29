// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const { fetchCoordsByIP } = require('./iss')
const ipString = '72.138.221.207'

fetchCoordsByIP(ipString, (error, ipCoords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IPCoords:' , ipCoords);
});