/* global axios */
/* global $*/

// define frequently used constants
const API_URL = 'https://api.foursquare.com/v2';
const CLIENT_ID = 'MBW5E3D455SVF2HV2BPEB2TJG21XCZTA3WDAZ4U5I4PMPLCZ';
const CLIENT_SECRET = "ETY2MWRODHNEDLP3MGGWKFX0AM1TLAA0XHZ5HW0S1YNTL2AA";

function getFastFood() {
  axios.get(API_URL + "/venues/search", {
    params: {
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET,
      "v": '20192609', // v for is the version
      "limit": 50, // limit is how many results returned
      "center": [103.8198,1.3521] , // longtitude/latitude
      "query":'fast food' // what we are searching for

    }
  }).then(function (response) {
    console.log(response.data.response.groups[0].items);
  })
}