/* global axios */
/* global $*/
/* global mapboxgl */
/* global response */

// define frequently used constants
const API_URL = 'https://api.foursquare.com/v2';
const CLIENT_ID = 'MBW5E3D455SVF2HV2BPEB2TJG21XCZTA3WDAZ4U5I4PMPLCZ';
const CLIENT_SECRET = "ETY2MWRODHNEDLP3MGGWKFX0AM1TLAA0XHZ5HW0S1YNTL2AA";

// Regions in LONG/LAT
let regions = {
  central: [103.82, 1.3735],
  north: [103.82, 1.41803],
  south: [103.82, 1.29587],
  east: [103.94, 1.35735],
  west: [103.7, 1.35735],
}

//Establishment Type
let types = {
  fastfood: 'fast food',
  foodcourt: 'foodcourt',
  hawker: 'hawkercentre',
  restaurant: 'restaurant',
  cafe: 'cafe',
  pubBar: 'pub bar'
}

//Cuisines
let cuisines = {
  // 'Chinese' : 'chinese',
  // 'Malay' : 'malay',
  // 'Indian' : 'indian',
  // 'Indonesian' : 'indonesian',
  // 'Japanese' : 'japanese',
  // 'Korean' : 'korean',
  // 'Thai' : 'thai',
  // 'European' : 'european',
  // 'French' : 'french',
  // 'German' : 'german',
  // 'Italian' : 'italian'
"	Japanese	":"	Japanese	",
"	Chinese	":"	Chinese	",
"	Asian Fusion	":"	Asian Fusion	",
"	Singaporean	":"	Singaporean	",
"	Indian	":"	Indian	",
"	Thai	":"	Thai	",
"	Korean	":"	Korean	",
"	Cantonese	":"	Cantonese	",
"	Indonesian	":"	Indonesian	",
"	Vietnamese	":"	Vietnamese	",
"	Szechuan	":"	Szechuan	",
"	Malaysian	":"	Malaysian	",
"	Taiwanese	":"	Taiwanese	",
"	Shanghainese	":"	Shanghainese	",
"	Italian	":"	Italian	",
"	American	":"	American	",
"	French	":"	French	",
"	European	":"	European	",
"	Middle Eastern	":"	Middle Eastern	",
"	Mediterranean	":"	Mediterranean	",
"	Mexican	":"	Mexican	",
"	Spanish	":"	Spanish	",
"	Turkish	":"	Turkish	",
"	German	":"	German	",
"	Lebanese	":"	Lebanese	",
"	Wine	":"	Wine	",
"	Beer	":"	Beer	",
"	Cocktail	":"	Cocktail	",
"	Coffee	":"	Coffee	",
"	Tea	":"	Tea	",
"	Juice	":"	Juice	",
"	Seafood	":"	Seafood	",
"	Sushi	":"	Sushi	",
"	Breakfast	":"	Breakfast	",
"	Brunch	":"	Brunch	",
"	Ramen	":"	Ramen	",
"	Dessert	":"	Dessert	",
"	Salad	":"	Salad	",
"	Dim Sum	":"	Dim Sum	",
"	Pizza	":"	Pizza	",
"	Burgers	":"	Burgers	",
"	Sandwiches	":"	Sandwiches	",
"	Dessert	":"	Dessert	",
"	Ice Cream	":"	Ice Cream	",
"	Frozen Yogurt	":"	Frozen Yogurt	",
"	Soup	":"	Soup	",
"	Buffet	":"	Buffet	",
"	Steakhouse	":"	Steakhouse	",
"	Barbeque	":"	Barbeque	",
"	Noodles	":"	Noodles	",
"	Bubble Tea	":"	Bubble Tea	",
"	Tapas/Small Plates	":"	Tapas/Small Plates	",
"	Hot Pot	":"	Hot Pot	",
"	Izakaya	":"	Izakaya	",
"	Chicken	":"	Chicken	",
"	Fish & Chips	":"	Fish & Chips	",
"	Kebab	":"	Kebab	",
"	Patisserie	":"	Patisserie	",
"	Cake	":"	Cake	",
"	Chicken Wings	":"	Chicken Wings	",
"	Creperies	":"	Creperies	",
"	Vegan	":"	Vegan	",
"	Vegetarian	":"	Vegetarian	",
"	Halal	":"	Halal	"
}



// define object terms
let region_code = $('#userOptionRegion').val();
let type_code = $('#userOptionType').val();
let cuisine_code = $('#userInputCuisine').val();

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

/* global variables */
let map;
let all_markers = [];

//set maxBounds for Map
let bounds = [
  [103.599921, 1.212660], // Southwest coordinates
  [104.044757, 1.489435]  // Northeast coordinates
];

//AUTOCOMPLETE UI
$(function () {
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function (ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    }
  });
  var data = [
{label:"Japanese",category:"Asian"},
{label:"Chinese",category:"Asian"},
{label:"Asian Fusion",category:"Asian"},
{label:"Singaporean",category:"Asian"},
{label:"Indian",category:"Asian"},
{label:"Thai",category:"Asian"},
{label:"Korean",category:"Asian"},
{label:"Cantonese",category:"Asian"},
{label:"Indonesian",category:"Asian"},
{label:"Vietnamese",category:"Asian"},
{label:"Szechuan",category:"Asian"},
{label:"Malaysian",category:"Asian"},
{label:"Taiwanese",category:"Asian"},
{label:"Shanghainese",category:"Asian"},
{label:"Italian",category:"International"},
{label:"American",category:"International"},
{label:"French",category:"International"},
{label:"European",category:"International"},
{label:"Middle Eastern",category:"International"},
{label:"Mediterranean",category:"International"},
{label:"Mexican",category:"International"},
{label:"Spanish",category:"International"},
{label:"Turkish",category:"International"},
{label:"German",category:"International"},
{label:"Lebanese",category:"International"},
{label:"Wine",category:"Beverages"},
{label:"Beer",category:"Beverages"},
{label:"Cocktail",category:"Beverages"},
{label:"Coffee",category:"Beverages"},
{label:"Tea",category:"Beverages"},
{label:"Juice",category:"Beverages"},
{label:"Seafood",category:"Food"},
{label:"Sushi",category:"Food"},
{label:"Breakfast",category:"Food"},
{label:"Brunch",category:"Food"},
{label:"Ramen",category:"Food"},
{label:"Dessert",category:"Food"},
{label:"Salad",category:"Food"},
{label:"Dim Sum",category:"Food"},
{label:"Pizza",category:"Food"},
{label:"Burgers",category:"Food"},
{label:"Sandwiches",category:"Food"},
{label:"Dessert",category:"Food"},
{label:"Ice Cream",category:"Food"},
{label:"Frozen Yogurt",category:"Food"},
{label:"Soup",category:"Food"},
{label:"Buffet",category:"Food"},
{label:"Steakhouse",category:"Food"},
{label:"Barbeque",category:"Food"},
{label:"Noodles",category:"Food"},
{label:"Bubble Tea",category:"Food"},
{label:"Tapas/Small Plates",category:"Food"},
{label:"Hot Pot",category:"Food"},
{label:"Izakaya",category:"Food"},
{label:"Chicken",category:"Food"},
{label:"Fish & Chips",category:"Food"},
{label:"Kebab",category:"Food"},
{label:"Patisserie",category:"Food"},
{label:"Cake",category:"Food"},
{label:"Chicken Wings",category:"Food"},
{label:"Creperies",category:"Food"},
{label:"Vegan",category:"Dietary Options"},
{label:"Vegetarian",category:"Dietary Options"},
{label:"Halal",category:"Dietary Options"}

  ];

  $("#userInputCuisine").catcomplete({
    delay: 0,
    source: data,
    onSelect: function () {
      alert("selected");
    }
  });
});


//Setup MapBox
function setupMap() {
  mapboxgl.accessToken = "pk.eyJ1IjoibHluZXR0ZS1seWYiLCJhIjoiY2sweXBkbWZkMGh6ZzNpbnh1MzQxYm5vNCJ9.2zfcWhUlNr-7xPhOcjUTYQ";

  map = new mapboxgl.Map({
    container: 'map', // which html element it should be
    style: 'mapbox://styles/mapbox/streets-v11', // how it should look like
    center: [103.8300, 1.3554], // where should be the map be centered at
    zoom: 2, // how zoomed we are
    maxBounds: bounds
  });
}


//To test Mapbox Settings
function getFastFood() {
  axios.get(API_URL + "/venues/search", {
    params: {
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET,
      "v": '20192609', // v for is the version
      "limit": 50, // limit is how many results returned
      "center": regions[region_code], // latitude/longtitude
      "query": types[type_code], // what we are searching for
      "categoryId": '4d4b7105d754a06374d81259, 4bf58dd8d48988d16e941735' //1.food | 2.fast food, 3.foodcourt, 4.cafe 5.cafeteria

    }
  }).then(function (response) {
    console.log(response.data.response.groups[0].items);
  })
}
// ------------

$(function () {
  //show map
  setupMap();

  //To trigger Region change via Region Select HTML
  $('#userOptionRegion').change(function () {
    let region_code = $(this).val();
    console.log(regions[region_code]);

    map.flyTo({
      center: regions[region_code],
      zoom: 12
    });
  });


  //To trigger Type change via Type Select HTML
  $('#userOptionType').change(function () {
    let type_code = $(this).val();
    let center = map.getCenter();
    console.log(center);
    console.log(types[type_code])

    axios.get(API_URL + "/venues/explore", {
      params: {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "v": '20192609', // v for is the version
        "limit": 50, // limit is how many results returned
        "ll": center.lat + "," + center.lng, // latitude/longtitude
        "query": types[type_code] // what we are searching for  
        // "categoryId": '4d4b7105d754a06374d81259' //category: food
      }
      //THEN PRINT MARKERS
    }).then(function (response) {
      $("#results").empty();


      for (let each_marker of all_markers) {
        each_marker.remove();
      }

      all_markers = [];

      let results = response.data.response.groups[0].items;
      for (let each_result of results) {
        let marker = new mapboxgl.Marker();
        marker.setLngLat([each_result.venue.location.lng, each_result.venue.location.lat]);
        marker.addTo(map); // <-- map is a global variable holding the mapboxgl Map object

        let popup = new mapboxgl.Popup({
          offset: 25
        });

        popup.setHTML(each_result.venue.name);

        marker.setPopup(popup);

        all_markers.push(marker);

      }
    })
  })


  // To trigger Cuisine change via Cuisine Searhbox HTML
  $('#userInputCuisine').change(function () {
    let center = map.getCenter();
    let cuisine_code = $('#userInputCuisine').val();
    let type_code = $('#userOptionType').val();
    console.log(cuisines[cuisine_code]);

    axios.get(API_URL + "/venues/explore", {
      params: {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "v": '20192609', // v for is the version
        "limit": 50, // limit is how many results returned
        "ll": center.lat + "," + center.lng, // latitude/longtitude
        "query": cuisines[cuisine_code] + ',' + types[type_code] // what we are searching for  
      }

      //****THROW THESE INTO A FUNCTION LATER (DECLARE FUNCTION)**
    }).then(function (response) {
      $("#results").empty();


      for (let each_marker of all_markers) {
        each_marker.remove();
      }

      all_markers = [];

      let results = response.data.response.groups[0].items;
        for (let each_result of results) {
          let marker = new mapboxgl.Marker();
          marker.setLngLat([each_result.venue.location.lng, each_result.venue.location.lat]);
          marker.addTo(map); // <-- map is a global variable holding the mapboxgl Map object

          let popup = new mapboxgl.Popup({
            offset: 25
          });

          popup.setHTML(each_result.venue.name);

          marker.setPopup(popup);

          all_markers.push(marker);

      }
    })
  })

});






//DECLARE PRINTMARKERS FUNCTION
function printMarkers() {
      $("#results").empty();


      for (let each_marker of all_markers) {
        each_marker.remove();
      }

  all_markers = [];

  let results = response.data.response.groups[0].items;
      for (let each_result of results) {
        let marker = new mapboxgl.Marker();
        marker.setLngLat([each_result.venue.location.lng, each_result.venue.location.lat]);
        marker.addTo(map); // <-- map is a global variable holding the mapboxgl Map object

        let popup = new mapboxgl.Popup({
          offset: 25
        });

        popup.setHTML(each_result.venue.name);

        marker.setPopup(popup);

        all_markers.push(marker);

      }
}