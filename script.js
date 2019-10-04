/* global axios */
/* global $*/

// define frequently used constants
const API_URL = 'https://api.foursquare.com/v2';
const CLIENT_ID = 'MBW5E3D455SVF2HV2BPEB2TJG21XCZTA3WDAZ4U5I4PMPLCZ';
const CLIENT_SECRET = "ETY2MWRODHNEDLP3MGGWKFX0AM1TLAA0XHZ5HW0S1YNTL2AA";



//test Foursquare API
function testGetFourSquare() {
  axios.get(API_URL + "/venues/explore", {
    params: {
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET,
      "v": '20192609', // v for is the version
      "limit": 50, // limit is how many results returned
      "ll": '1.2933,103.7831', // latitude/longtitude
      "query": '', // what we are searching for
      "categoryId": '4d4b7105d754a06374d81259, 4bf58dd8d48988d16e941735, 4bf58dd8d48988d120951735, 4bf58dd8d48988d16d941735, 4bf58dd8d48988d128941735'
    }
  }).then(function (response) {
    console.log(response.data.response.groups[0].items);
  })
}

function getFastFood() {
  axios.get(API_URL + "/venues/search", {
    params: {
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET,
      "v": '20192609', // v for is the version
      "limit": 50, // limit is how many results returned
      "center": [103.8198,1.3521], // longtitude/latitude
      "query":'fast food' // what we are searching for

    }
  }).then(function (response) {
    console.log(response.data.response.groups[0].items);
  })
}

/* global variables */
let map;
let all_markers = [];