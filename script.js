/* global axios */
/* global $*/
/* global mapboxgl */
/* global venue */

// define frequently used constants
const API_URL = 'https://api.foursquare.com/v2';
const CLIENT_ID = 'MBW5E3D455SVF2HV2BPEB2TJG21XCZTA3WDAZ4U5I4PMPLCZ';
const CLIENT_SECRET = "ETY2MWRODHNEDLP3MGGWKFX0AM1TLAA0XHZ5HW0S1YNTL2AA";

// Regions in LONG/LAT
let locations = {
  'Admiralty': [103.8009982, 1.440585001],
  'Aljunied': [103.882893, 1.316432612],
  'Ang Mo Kio': [103.8495535, 1.369933175],
  'Bakau': [103.9054179, 1.388092704],
  'Bangkit': [103.7726667, 1.380017897],
  'Bartley': [103.8797462, 1.342828338],
  'Bayfront': [103.8590733, 1.281873788],
  'Beauty World': [103.77581, 1.341223176],
  'Bedok': [103.9299587, 1.323979969],
  'Bedok North': [103.9179554, 1.334742117],
  'Bedok Reservoir': [103.9322077, 1.33660783],
  'Bencoolen': [103.8503799, 1.29886427],
  'Bendemeer': [103.8629702, 1.313672233],
  'Bishan': [103.84915, 1.35130868],
  'Boon Keng': [103.861679, 1.319395706],
  'Boon Lay': [103.7060994, 1.338604054],
  'Botanic Gardens': [103.8161362, 1.322423979],
  'Braddell': [103.8467942, 1.340471684],
  'Bras Basah': [103.8506629, 1.296861687],
  'Buangkok': [103.8931042, 1.382877858],
  'Bugis': [103.8568623, 1.299550746],
  'Bukit Batok': [103.74959, 1.349034109],
  'Bukit Brown': [103.8306903, 1.333728882],
  'Bukit Gombak': [103.7519164, 1.358761857],
  'Bukit Panjang': [103.763034, 1.377909898],
  'Buona Vista': [103.7902028, 1.307183467],
  'Caldecott': [103.8395281, 1.337674508],
  'Cashew': [103.764714, 1.369369831],
  'Changi Airport': [103.9883212, 1.357314545],
  'Cheng Lim': [103.8937792, 1.396277631],
  'Chinatown': [103.8434242, 1.284359578],
  'Chinese Garden': [103.7326244, 1.342352821],
  'Choa Chu Kang': [103.7445797, 1.38483636],
  'City Hall': [103.852581, 1.292936243],
  'Clarke Quay': [103.8465519, 1.288386024],
  'Clementi': [103.7653168, 1.314954492],
  'Commonwealth': [103.7983136, 1.302438735],
  'Compassvale': [103.9004726, 1.394493046],
  'Coral Edge': [103.9125574, 1.393909226],
  'Cove': [103.9059403, 1.399281985],
  'Dakota': [103.888648, 1.30838264],
  'Damai': [103.9085809, 1.405234836],
  'Dhoby Ghaut': [103.8461119, 1.298701307],
  'Dover': [103.7786522, 1.311405293],
  'Downtown': [103.8528356, 1.27944619],
  'Esplanade': [103.8554985, 1.293321608],
  'Eunos': [103.9032339, 1.319778952],
  'Expo': [103.9615134, 1.334549778],
  'Fajar': [103.7708268, 1.384520796],
  'Farmway': [103.8892882, 1.397170196],
  'Farrer Park': [103.8541717, 1.31235984],
  'Farrer Road': [103.8075929, 1.317510612],
  'Fernvale': [103.8762959, 1.391885888],
  'Fort Canning': [103.8443255, 1.292478928],
  'Geylang Bahru': [103.8718904, 1.321505838],
  'Gul Circle': [103.6605988, 1.319505215],
  'Harbourfront': [103.821446, 1.26547264],
  'Haw Par Villa': [103.7818234, 1.282542157],
  'Hillview': [103.7674369, 1.362344869],
  'Holland Village': [103.7962016, 1.31183479],
  'Hougang': [103.8923636, 1.371292292],
  'Jalan Besar': [103.8554713, 1.305403642],
  'Jelapang': [103.7645235, 1.386703025],
  'Joo Koon': [103.6784167, 1.327717173],
  'Jurong East': [103.7423112, 1.33315262],
  'Kadaloor': [103.9164619, 1.399584853],
  'Kaki Bukit': [103.9084393, 1.334967302],
  'Kallang': [103.8713766, 1.31148891],
  'Kangkar': [103.9021539, 1.383978902],
  'Keat Hong': [103.7490799, 1.378602766],
  'Kembangan': [103.9129282, 1.321038249],
  'Kent Ridge': [103.7846438, 1.293462633],
  'Khatib': [103.83298, 1.41738337],
  'King Albert Park': [103.7838201, 1.335665121],
  'Kovan': [103.8850503, 1.360179171],
  'Kranji': [103.7621874, 1.425177699],
  'Kupang': [103.881242, 1.398212828],
  'Labrador Park': [103.8029471, 1.272332732],
  'Lakeside': [103.7209802, 1.344259249],
  'Lavender': [103.8628215, 1.30735702],
  'Layar': [103.8800158, 1.392079839],
  'Little India': [103.8524167, 1.303916484],
  'Lorong Chuan': [103.8641434, 1.351612171],
  'Macpherson': [103.8902718, 1.326345372],
  'Marina Bay': [103.8545925, 1.276427355],
  'Marina South Pier': [103.8628525, 1.271336711],
  'Marine Parade': [103.8971, 1.3020],
  'Marsiling': [103.77409, 1.432514421],
  'Marymount': [103.8394214, 1.348707263],
  'Mattar': [103.8832341, 1.326876715],
  'Meridian': [103.9089277, 1.396912053],
  'Mountbatten': [103.8825153, 1.306201905],
  'Newton': [103.8378098, 1.313607102],
  'Nibong': [103.9002935, 1.411870458],
  'Nicoll Highway': [103.8636292, 1.299766835],
  'Novena': [103.8438228, 1.320440791],
  'Oasis': [103.9127036, 1.402286677],
  'One-north': [103.7874693, 1.299759879],
  'Orchard': [103.8322417, 1.303981012],
  'Outram Park': [103.839125, 1.28140498],
  'Pasir Panjang': [103.7913607, 1.276213523],
  'Pasir Ris': [103.9492348, 1.372983774],
  'Paya Lebar': [103.8930446, 1.318112082],
  'Pending': [103.7712881, 1.376142883],
  'Petir': [103.7666882, 1.377750334],
  'Phoenix': [103.7580559, 1.378618844],
  'Pioneer': [103.6973586, 1.337586882],
  'Potong Pasir': [103.869046, 1.331379525],
  'Promenade': [103.860846, 1.292891552],
  'Punggol': [103.9023911, 1.405194701],
  'Punggol Point': [103.9066284, 1.41684852],
  'Queenstown': [103.8058913, 1.294860933],
  'Raffles Place': [103.8514572, 1.284125611],
  'Ranggung': [103.897176, 1.384233561],
  'Redhill': [103.8168209, 1.289562726],
  'Renjong': [103.8905227, 1.386723922],
  'Riviera': [103.9161415, 1.394524496],
  'Rochor': [103.8496427, 1.306800025],
  'Rumbia': [103.9059522, 1.391468497],
  'Sam Kee': [103.9048099, 1.409612685],
  'Samudera': [103.9021353, 1.415901719],
  'Segar': [103.7696171, 1.387772131],
  'Sembawang': [103.8200504, 1.449050821],
  'Sengkang': [103.8954243, 1.391609364],
  'Senja': [103.7623879, 1.382692296],
  'Serangoon': [103.8723572, 1.350595256],
  'Simei': [103.9533387, 1.343202895],
  'Sixth Avenue': [103.7972561, 1.330786387],
  'Somerset': [103.8390737, 1.300260055],
  'Soo Teck': [103.8971904, 1.405088585],
  'South View': [103.7453173, 1.380298287],
  'Stadium': [103.8753395, 1.30284063],
  'Stevens': [103.8260263, 1.320065557],
  'Sumang': [103.8985387, 1.408452426],
  'Tai Seng': [103.88818, 1.335433322],
  'Tampines East': [103.9546005, 1.356191483],
  'Tampines': [103.9451175, 1.353301356],
  'Tampines West': [103.938408, 1.345515305],
  'Tan Kah Kee': [103.8073292, 1.325883209],
  'Tanah Merah': [103.9463161, 1.327187135],
  'Tanjong Pagar': [103.8458611, 1.276521247],
  'Teck Lee': [103.9065554, 1.412770894],
  'Teck Whye': [103.7537352, 1.376684679],
  'Telok Ayer': [103.8482991, 1.282289536],
  'Telok Blangah': [103.8097544, 1.270753211],
  'Ten Mile Junction': [103.760161, 1.380321008],
  'Thanggam': [103.8756226, 1.397318155],
  'Tiong Bahru': [103.827021, 1.286193393],
  'Toa Payoh': [103.8474979, 1.332628987],
  'Tongkang': [103.8858287, 1.389347953],
  'Tuas Crescent': [103.6491245, 1.321026553],
  'Tuas Link': [103.6369324, 1.340463766],
  'Tuas West Road': [103.6396662, 1.329989089],
  'Ubi': [103.8992348, 1.329956826],
  'Upper Changi': [103.9614367, 1.341737484],
  'Woodlands': [103.7864999, 1.436875128],
  'Woodlands South': [103.7938631, 1.427259979],
  'Woodleigh': [103.8708081, 1.339190046],
  'Yew Tee': [103.7474307, 1.397535018],
  'Yio Chu Kang': [103.8449439, 1.381756046],
  'Yishun': [103.8350045, 1.429443081]
}

//Cuisines
let cuisines = {
  'Bakery': 'bakery',
  'Café': 'cafe',
  'Fast food': 'fast food',
  'Hawker Centre': 'hawkercentre',
  'Pub & Bar': 'pub bar',
  'Restaurant': 'restaurant',
  'Food Court': 'foodcourt',
  'Japanese': 'Japanese',
  'Chinese': 'Chinese',
  'Asian Fusion': 'Asian Fusion',
  'Singaporean': 'Singaporean',
  'Indian': 'Indian',
  'Thai': 'Thai',
  'Korean': 'Korean',
  'Cantonese': 'Cantonese',
  'Indonesian': 'Indonesian',
  'Vietnamese': 'Vietnamese',
  'Szechuan': 'Szechuan',
  'Malaysian': 'Malaysian',
  'Taiwanese': 'Taiwanese',
  'Shanghainese': 'Shanghainese',
  'Italian': 'Italian',
  'American': 'American',
  'French': 'French',
  'European': 'European',
  'Middle Eastern': 'Middle Eastern',
  'Mediterranean': 'Mediterranean',
  'Mexican': 'Mexican',
  'Spanish': 'Spanish',
  'Turkish': 'Turkish',
  'German': 'German',
  'Lebanese': 'Lebanese',
  'Wine': 'Wine',
  'Beer': 'Beer',
  'Cocktail': 'Cocktail',
  'Coffee': 'Coffee',
  'Tea': 'Tea',
  'Juice': 'Juice',
  'Seafood': 'Seafood',
  'Sushi': 'Sushi',
  'Breakfast': 'Breakfast',
  'Brunch': 'Brunch',
  'Ramen': 'Ramen',
  'Salad': 'Salad',
  'Dim Sum': 'Dim Sum',
  'Pizza': 'Pizza',
  'Burgers': 'Burgers',
  'Sandwiches': 'Sandwiches',
  'Dessert': 'Dessert',
  'IceCream': 'IceCream',
  'Frozen Yogurt': 'Yogurt',
  'Soup': 'Soup',
  'Buffet': 'Buffet',
  'Steakhouse': 'Steakhouse',
  'Barbeque': 'Barbeque',
  'Noodles': 'Noodles',
  'Bubble Tea': 'Bubble Tea',
  'Tapas/Small Plates': 'Tapas',
  'HotPot': 'HotPot',
  'Izakaya': 'Izakaya',
  'Chicken': 'Chicken',
  'Fish & Chips': 'Fish & Chips',
  'Kebab': 'Kebab',
  'Patisserie': 'Patisserie',
  'Cake': 'Cake',
  'Chicken Wings': 'Chicken Wings',
  'Creperies': 'Creperies',
  'Vegan': 'Vegan',
  'Vegetarian': 'Vegetarian',
  'Halal': 'Halal'
}

// define object terms
let location_code = $('#userInputLocation').val();
let cuisine_code = $('#userInputCuisine').val();
let results;

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
  }).then(function(response) {
    console.log(response.data.response.groups[0].items);
  })
}

/* global variables */
let map;
let all_markers = [];

//set maxBounds for Map
let bounds = [
  [103.599921, 1.212660], // Southwest coordinates
  [104.044757, 1.489435] // Northeast coordinates
];


//AUTOCOMPLETE FOR LOCATION
$(function() {
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function(ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function(index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append("<li class='ui-autocomplete-category'></li>");
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
    { label: "Admiralty"  },
    { label: "Aljunied"  },
    { label: "Ang Mo Kio"  },
    { label: "Bakau"  },
    { label: "Bangkit"  },
    { label: "Bartley"  },
    { label: "Bayfront"  },
    { label: "Beauty World"  },
    { label: "Bedok"  },
    { label: "Bedok North"  },
    { label: "Bedok Reservoir"  },
    { label: "Bencoolen"  },
    { label: "Bendemeer"  },
    { label: "Bishan"  },
    { label: "Boon Keng"  },
    { label: "Boon Lay"  },
    { label: "Botanic Gardens"  },
    { label: "Braddell"  },
    { label: "Bras Basah"  },
    { label: "Buangkok"  },
    { label: "Bugis"  },
    { label: "Bukit Batok"  },
    { label: "Bukit Brown"  },
    { label: "Bukit Gombak"  },
    { label: "Bukit Panjang"  },
    { label: "Buona Vista"  },
    { label: "Caldecott"  },
    { label: "Cashew"  },
    { label: "Changi Airport"  },
    { label: "Cheng Lim"  },
    { label: "Chinatown"  },
    { label: "Chinese Garden"  },
    { label: "Choa Chu Kang"  },
    { label: "City Hall"  },
    { label: "Clarke Quay"  },
    { label: "Clementi"  },
    { label: "Commonwealth"  },
    { label: "Compassvale"  },
    { label: "Coral Edge"  },
    { label: "Cove"  },
    { label: "Dakota"  },
    { label: "Damai"  },
    { label: "Dhoby Ghaut"  },
    { label: "Dover"  },
    { label: "Downtown"  },
    { label: "Esplanade"  },
    { label: "Eunos"  },
    { label: "Expo"  },
    { label: "Fajar"  },
    { label: "Farmway"  },
    { label: "Farrer Park"  },
    { label: "Farrer Road"  },
    { label: "Fernvale"  },
    { label: "Fort Canning"  },
    { label: "Geylang Bahru"  },
    { label: "Gul Circle"  },
    { label: "Harbourfront"  },
    { label: "Haw Par Villa"  },
    { label: "Hillview"  },
    { label: "Holland Village"  },
    { label: "Hougang"  },
    { label: "Jalan Besar"  },
    { label: "Jelapang"  },
    { label: "Joo Koon"  },
    { label: "Jurong East"  },
    { label: "Kadaloor"  },
    { label: "Kaki Bukit"  },
    { label: "Kallang"  },
    { label: "Kangkar"  },
    { label: "Keat Hong"  },
    { label: "Kembangan"  },
    { label: "Kent Ridge"  },
    { label: "Khatib"  },
    { label: "King Albert Park"  },
    { label: "Kovan"  },
    { label: "Kranji"  },
    { label: "Kupang"  },
    { label: "Labrador Park"  },
    { label: "Lakeside"  },
    { label: "Lavender"  },
    { label: "Layar"  },
    { label: "Little India"  },
    { label: "Lorong Chuan"  },
    { label: "Macpherson"  },
    { label: "Marina Bay"  },
    { label: "Marina South Pier"  },
    { label: "Marine Parade"},
    { label: "Marsiling"  },
    { label: "Marymount"  },
    { label: "Mattar"  },
    { label: "Meridian"  },
    { label: "Mountbatten"  },
    { label: "Newton"  },
    { label: "Nibong"  },
    { label: "Nicoll Highway"  },
    { label: "Novena"  },
    { label: "Oasis"  },
    { label: "One-north"  },
    { label: "Orchard"  },
    { label: "Outram Park"  },
    { label: "Pasir Panjang"  },
    { label: "Pasir Ris"  },
    { label: "Paya Lebar"  },
    { label: "Pending "  },
    { label: "Petir"  },
    { label: "Phoenix "  },
    { label: "Pioneer"  },
    { label: "Potong Pasir"  },
    { label: "Promenade"  },
    { label: "Punggol "  },
    { label: "Punggol Point "  },
    { label: "Queenstown"  },
    { label: "Raffles Place"  },
    { label: "Ranggung"  },
    { label: "Redhill"  },
    { label: "Renjong"  },
    { label: "Riviera"  },
    { label: "Rochor"  },
    { label: "Rumbia"  },
    { label: "Sam Kee"  },
    { label: "Samudera"  },
    { label: "Segar"  },
    { label: "Sembawang"  },
    { label: "Sengkang"  },
    { label: "Senja"  },
    { label: "Serangoon"  },
    { label: "Simei"  },
    { label: "Sixth Avenue"  },
    { label: "Somerset"  },
    { label: "Soo Teck"  },
    { label: "South View"  },
    { label: "Stadium"  },
    { label: "Stevens"  },
    { label: "Sumang"  },
    { label: "Tai Seng"  },
    { label: "Tampines East"  },
    { label: "Tampines"  },
    { label: "Tampines West"  },
    { label: "Tan Kah Kee"  },
    { label: "Tanah Merah"  },
    { label: "Tanjong Pagar"  },
    { label: "Teck Lee"  },
    { label: "Teck Whye"  },
    { label: "Telok Ayer"  },
    { label: "Telok Blangah"  },
    { label: "Ten Mile Junction"  },
    { label: "Thanggam"  },
    { label: "Tiong Bahru"  },
    { label: "Toa Payoh"  },
    { label: "Tongkang"  },
    { label: "Tuas Crescent"  },
    { label: "Tuas Link"  },
    { label: "Tuas West Road"  },
    { label: "Ubi"  },
    { label: "Upper Changi"  },
    { label: "Woodlands"  },
    { label: "Woodlands South"  },
    { label: "Woodleigh"  },
    { label: "Yew Tee"  },
    { label: "Yio Chu Kang"  },
    { label: "Yishun"  }
  ];

  $("#userInputLocation").catcomplete({
    delay: 0,
    source: data,
    onSelect: function() {
      alert("selected");
    }
  });
});

//AUTOCOMPLETE FOR CUISINE
$(function() {
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function(ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function(index, item) {
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
    { label: "Bakery", category: "Establishment Type" },
    { label: "Café", category: "Establishment Type" },
    { label: "Fast food", category: "Establishment Type" },
    { label: "Food Court", category: "Establishment Type" },
    { label: "Hawker Centre", category: "Establishment Type" },
    { label: "Pub & Bar", category: "Establishment Type" },
    { label: "Restaurant", category: "Establishment Type" },
    { label: "Japanese", category: "Asian" },
    { label: "Chinese", category: "Asian" },
    { label: "Asian Fusion", category: "Asian" },
    { label: "Singaporean", category: "Asian" },
    { label: "Indian", category: "Asian" },
    { label: "Thai", category: "Asian" },
    { label: "Korean", category: "Asian" },
    { label: "Cantonese", category: "Asian" },
    { label: "Indonesian", category: "Asian" },
    { label: "Vietnamese", category: "Asian" },
    { label: "Szechuan", category: "Asian" },
    { label: "Malaysian", category: "Asian" },
    { label: "Taiwanese", category: "Asian" },
    { label: "Shanghainese", category: "Asian" },
    { label: "Italian", category: "International" },
    { label: "American", category: "International" },
    { label: "French", category: "International" },
    { label: "European", category: "International" },
    { label: "Middle Eastern", category: "International" },
    { label: "Mediterranean", category: "International" },
    { label: "Mexican", category: "International" },
    { label: "Spanish", category: "International" },
    { label: "Turkish", category: "International" },
    { label: "German", category: "International" },
    { label: "Lebanese", category: "International" },
    { label: "Wine", category: "Beverages" },
    { label: "Beer", category: "Beverages" },
    { label: "Cocktail", category: "Beverages" },
    { label: "Coffee", category: "Beverages" },
    { label: "Tea", category: "Beverages" },
    { label: "Juice", category: "Beverages" },
    { label: "Seafood", category: "Food" },
    { label: "Sushi", category: "Food" },
    { label: "Breakfast", category: "Food" },
    { label: "Brunch", category: "Food" },
    { label: "Ramen", category: "Food" },
    { label: "Dessert", category: "Food" },
    { label: "Salad", category: "Food" },
    { label: "Dim Sum", category: "Food" },
    { label: "Pizza", category: "Food" },
    { label: "Burgers", category: "Food" },
    { label: "Sandwiches", category: "Food" },
    { label: "Ice Cream", category: "Food" },
    { label: "Frozen Yogurt", category: "Food" },
    { label: "Soup", category: "Food" },
    { label: "Buffet", category: "Food" },
    { label: "Steakhouse", category: "Food" },
    { label: "Barbeque", category: "Food" },
    { label: "Noodles", category: "Food" },
    { label: "Bubble Tea", category: "Food" },
    { label: "Tapas/Small Plates", category: "Food" },
    { label: "Hot Pot", category: "Food" },
    { label: "Izakaya", category: "Food" },
    { label: "Chicken", category: "Food" },
    { label: "Fish & Chips", category: "Food" },
    { label: "Kebab", category: "Food" },
    { label: "Patisserie", category: "Food" },
    { label: "Cake", category: "Food" },
    { label: "Chicken Wings", category: "Food" },
    { label: "Creperies", category: "Food" },
    { label: "Vegan", category: "Dietary Options" },
    { label: "Vegetarian", category: "Dietary Options" },
    { label: "Halal", category: "Dietary Options" }
  ];

  $("#userInputCuisine").catcomplete({
    delay: 0,
    source: data,
    onSelect: function() {
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

$(function() {
  //show map
  setupMap();

  //To trigger Region change via Region Select HTML
  $('#userInputLocation').change(function() {
    let location_code = $(this).val();
    console.log(locations[location_code]);

    map.flyTo({
      center: locations[location_code],
      zoom: 14
    });
  });
  

  // To trigger Cuisine change via Cuisine Searhbox HTML
  $('#buttonCuisine').click(function() {
    let center = map.getCenter();
    cuisine_code = $('#userInputCuisine').val();
    console.log(cuisines[cuisine_code]);
    
    axios.get(API_URL + "/venues/explore", {
      params: {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "v": '20192609', // v for is the version
        "limit": 20, // limit is how many results returned
        "ll": center.lat + "," + center.lng, // latitude/longtitude
        "radius": 250,
        "query": cuisines[cuisine_code] // what we are searching for 
      }
    }).then(function(response) {
      
      
      $("#results").empty();
      
      for (let each_marker of all_markers) {
        each_marker.remove();
      }

      all_markers = [];

      results = response.data.response.groups[0].items;
      console.log(results);
      let count = 1;

      for (let r of results) {
        
        var el = document.createElement('div');  el.className = 'marker';
        let marker = new mapboxgl.Marker(el);
        
        marker.setLngLat([r.venue.location.lng, r.venue.location.lat]);
        marker.addTo(map); // <-- map is a global variable holding the mapboxgl Map object
 
 let mediaObject = `
<div class="container-fluid col-lg-11 col-sm-10 py-3 my-3 mx-auto" id='mediaObject'>
    <div class="row">
        <div class="col-lg-12 col-sm-8"><h5 class="redirectmarker">${count}. ${r.venue.name} <img class='foodIcons' src='${r.venue.categories[0].icon.prefix}32${r.venue.categories[0].icon.suffix}'/></h5></div>
    </div>
    <div class="row">
        
        <div class="col-lg-10 col-sm-8">
        
        <img src='images/location-icon.png'/> ${r.venue.location.formattedAddress[0]}
        Singapore ${r.venue.location.formattedAddress[1]}
        <br>
        <img src='images/category-icon.png'/> ${r.venue.categories[0].shortName}
        </div>
    </div>
</div>`;

 
        //createPopUp(r)
        $("#results").append(mediaObject);
        
        let popup = new mapboxgl.Popup({
          offset: 10
        });

        //popup content: name, icon, address, postal code
        popup.setHTML("<img style=\"background-color: #D20055;\" src=" + r.venue.categories[0].icon.prefix + "32" + r.venue.categories[0].icon.suffix + ">" +
        "<div style=\"text: align-center;\"><b>" + r.venue.name + "</b></div>"
        );


        marker.setPopup(popup);
        console.log(marker._lngLat);
        all_markers.push(marker);
        count++;
      }
    })
  })

});


$(document).on('click', '.redirectmarker', function() {
  //console.log(all_markers[$(this).text()[0] -1]);
  for(let m of all_markers) 
    if(m.getPopup().isOpen() == true)
      m.togglePopup();
  let marker = all_markers[$(this).text()[0] - 1];
  map.flyTo({
    center: marker._lngLat,
    zoom: 20
  })
  marker.togglePopup();
});

  $('#buttonReset').click(function() {
    $('#userInputLocation').val('');
    $('#userInputCuisine').val('');
    $('#results').empty();
    
  map.flyTo({
    container: 'map', // which html element it should be
    style: 'mapbox://styles/mapbox/streets-v11', // how it should look like
    center: [103.8300, 1.3554], // where should be the map be centered at
    zoom: 2, // how zoomed we are
    maxBounds: bounds
  })
  
        for (let each_marker of all_markers) {
        each_marker.remove();
      }

      all_markers = [];
})