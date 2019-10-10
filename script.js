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
  'Central': [103.82, 1.3735],
  'North': [103.82, 1.41803],
  'South': [103.82, 1.29587],
  'East': [103.94, 1.35735],
  'West': [103.7, 1.35735],
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

// //Establishment Type
// let types = {
//   fastfood: 'fast food',
//   foodcourt: 'foodcourt',
//   hawker: 'hawkercentre',
//   restaurant: 'restaurant',
//   cafe: 'cafe',
//   pubBar: 'pub bar'
// }

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
    { label: "Central", category: "Region" },
    { label: "North", category: "Region" },
    { label: "South", category: "Region" },
    { label: "East", category: "Region" },
    { label: "West", category: "Region" },
    { label: "Admiralty", category: "Nearest MRT" },
    { label: "Aljunied", category: "Nearest MRT" },
    { label: "Ang Mo Kio", category: "Nearest MRT" },
    { label: "Bakau", category: "Nearest MRT" },
    { label: "Bangkit", category: "Nearest MRT" },
    { label: "Bartley", category: "Nearest MRT" },
    { label: "Bayfront", category: "Nearest MRT" },
    { label: "Beauty World", category: "Nearest MRT" },
    { label: "Bedok", category: "Nearest MRT" },
    { label: "Bedok North", category: "Nearest MRT" },
    { label: "Bedok Reservoir", category: "Nearest MRT" },
    { label: "Bencoolen", category: "Nearest MRT" },
    { label: "Bendemeer", category: "Nearest MRT" },
    { label: "Bishan", category: "Nearest MRT" },
    { label: "Boon Keng", category: "Nearest MRT" },
    { label: "Boon Lay", category: "Nearest MRT" },
    { label: "Botanic Gardens", category: "Nearest MRT" },
    { label: "Braddell", category: "Nearest MRT" },
    { label: "Bras Basah", category: "Nearest MRT" },
    { label: "Buangkok", category: "Nearest MRT" },
    { label: "Bugis", category: "Nearest MRT" },
    { label: "Bukit Batok", category: "Nearest MRT" },
    { label: "Bukit Brown", category: "Nearest MRT" },
    { label: "Bukit Gombak", category: "Nearest MRT" },
    { label: "Bukit Panjang", category: "Nearest MRT" },
    { label: "Buona Vista", category: "Nearest MRT" },
    { label: "Caldecott", category: "Nearest MRT" },
    { label: "Cashew", category: "Nearest MRT" },
    { label: "Changi Airport", category: "Nearest MRT" },
    { label: "Cheng Lim", category: "Nearest MRT" },
    { label: "Chinatown", category: "Nearest MRT" },
    { label: "Chinese Garden", category: "Nearest MRT" },
    { label: "Choa Chu Kang", category: "Nearest MRT" },
    { label: "City Hall", category: "Nearest MRT" },
    { label: "Clarke Quay", category: "Nearest MRT" },
    { label: "Clementi", category: "Nearest MRT" },
    { label: "Commonwealth", category: "Nearest MRT" },
    { label: "Compassvale", category: "Nearest MRT" },
    { label: "Coral Edge", category: "Nearest MRT" },
    { label: "Cove", category: "Nearest MRT" },
    { label: "Dakota", category: "Nearest MRT" },
    { label: "Damai", category: "Nearest MRT" },
    { label: "Dhoby Ghaut", category: "Nearest MRT" },
    { label: "Dover", category: "Nearest MRT" },
    { label: "Downtown", category: "Nearest MRT" },
    { label: "Esplanade", category: "Nearest MRT" },
    { label: "Eunos", category: "Nearest MRT" },
    { label: "Expo", category: "Nearest MRT" },
    { label: "Fajar", category: "Nearest MRT" },
    { label: "Farmway", category: "Nearest MRT" },
    { label: "Farrer Park", category: "Nearest MRT" },
    { label: "Farrer Road", category: "Nearest MRT" },
    { label: "Fernvale", category: "Nearest MRT" },
    { label: "Fort Canning", category: "Nearest MRT" },
    { label: "Geylang Bahru", category: "Nearest MRT" },
    { label: "Gul Circle", category: "Nearest MRT" },
    { label: "Harbourfront", category: "Nearest MRT" },
    { label: "Haw Par Villa", category: "Nearest MRT" },
    { label: "Hillview", category: "Nearest MRT" },
    { label: "Holland Village", category: "Nearest MRT" },
    { label: "Hougang", category: "Nearest MRT" },
    { label: "Jalan Besar", category: "Nearest MRT" },
    { label: "Jelapang", category: "Nearest MRT" },
    { label: "Joo Koon", category: "Nearest MRT" },
    { label: "Jurong East", category: "Nearest MRT" },
    { label: "Kadaloor", category: "Nearest MRT" },
    { label: "Kaki Bukit", category: "Nearest MRT" },
    { label: "Kallang", category: "Nearest MRT" },
    { label: "Kangkar", category: "Nearest MRT" },
    { label: "Keat Hong", category: "Nearest MRT" },
    { label: "Kembangan", category: "Nearest MRT" },
    { label: "Kent Ridge", category: "Nearest MRT" },
    { label: "Khatib", category: "Nearest MRT" },
    { label: "King Albert Park", category: "Nearest MRT" },
    { label: "Kovan", category: "Nearest MRT" },
    { label: "Kranji", category: "Nearest MRT" },
    { label: "Kupang", category: "Nearest MRT" },
    { label: "Labrador Park", category: "Nearest MRT" },
    { label: "Lakeside", category: "Nearest MRT" },
    { label: "Lavender", category: "Nearest MRT" },
    { label: "Layar", category: "Nearest MRT" },
    { label: "Little India", category: "Nearest MRT" },
    { label: "Lorong Chuan", category: "Nearest MRT" },
    { label: "Macpherson", category: "Nearest MRT" },
    { label: "Marina Bay", category: "Nearest MRT" },
    { label: "Marina South Pier", category: "Nearest MRT" },
    { label: "Marsiling", category: "Nearest MRT" },
    { label: "Marymount", category: "Nearest MRT" },
    { label: "Mattar", category: "Nearest MRT" },
    { label: "Meridian", category: "Nearest MRT" },
    { label: "Mountbatten", category: "Nearest MRT" },
    { label: "Newton", category: "Nearest MRT" },
    { label: "Nibong", category: "Nearest MRT" },
    { label: "Nicoll Highway", category: "Nearest MRT" },
    { label: "Novena", category: "Nearest MRT" },
    { label: "Oasis", category: "Nearest MRT" },
    { label: "One-north", category: "Nearest MRT" },
    { label: "Orchard", category: "Nearest MRT" },
    { label: "Outram Park", category: "Nearest MRT" },
    { label: "Pasir Panjang", category: "Nearest MRT" },
    { label: "Pasir Ris", category: "Nearest MRT" },
    { label: "Paya Lebar", category: "Nearest MRT" },
    { label: "Pending ", category: "Nearest MRT" },
    { label: "Petir", category: "Nearest MRT" },
    { label: "Phoenix ", category: "Nearest MRT" },
    { label: "Pioneer", category: "Nearest MRT" },
    { label: "Potong Pasir", category: "Nearest MRT" },
    { label: "Promenade", category: "Nearest MRT" },
    { label: "Punggol ", category: "Nearest MRT" },
    { label: "Punggol Point ", category: "Nearest MRT" },
    { label: "Queenstown", category: "Nearest MRT" },
    { label: "Raffles Place", category: "Nearest MRT" },
    { label: "Ranggung", category: "Nearest MRT" },
    { label: "Redhill", category: "Nearest MRT" },
    { label: "Renjong", category: "Nearest MRT" },
    { label: "Riviera", category: "Nearest MRT" },
    { label: "Rochor", category: "Nearest MRT" },
    { label: "Rumbia", category: "Nearest MRT" },
    { label: "Sam Kee", category: "Nearest MRT" },
    { label: "Samudera", category: "Nearest MRT" },
    { label: "Segar", category: "Nearest MRT" },
    { label: "Sembawang", category: "Nearest MRT" },
    { label: "Sengkang", category: "Nearest MRT" },
    { label: "Senja", category: "Nearest MRT" },
    { label: "Serangoon", category: "Nearest MRT" },
    { label: "Simei", category: "Nearest MRT" },
    { label: "Sixth Avenue", category: "Nearest MRT" },
    { label: "Somerset", category: "Nearest MRT" },
    { label: "Soo Teck", category: "Nearest MRT" },
    { label: "South View", category: "Nearest MRT" },
    { label: "Stadium", category: "Nearest MRT" },
    { label: "Stevens", category: "Nearest MRT" },
    { label: "Sumang", category: "Nearest MRT" },
    { label: "Tai Seng", category: "Nearest MRT" },
    { label: "Tampines East", category: "Nearest MRT" },
    { label: "Tampines", category: "Nearest MRT" },
    { label: "Tampines West", category: "Nearest MRT" },
    { label: "Tan Kah Kee", category: "Nearest MRT" },
    { label: "Tanah Merah", category: "Nearest MRT" },
    { label: "Tanjong Pagar", category: "Nearest MRT" },
    { label: "Teck Lee", category: "Nearest MRT" },
    { label: "Teck Whye", category: "Nearest MRT" },
    { label: "Telok Ayer", category: "Nearest MRT" },
    { label: "Telok Blangah", category: "Nearest MRT" },
    { label: "Ten Mile Junction", category: "Nearest MRT" },
    { label: "Thanggam", category: "Nearest MRT" },
    { label: "Tiong Bahru", category: "Nearest MRT" },
    { label: "Toa Payoh", category: "Nearest MRT" },
    { label: "Tongkang", category: "Nearest MRT" },
    { label: "Tuas Crescent", category: "Nearest MRT" },
    { label: "Tuas Link", category: "Nearest MRT" },
    { label: "Tuas West Road", category: "Nearest MRT" },
    { label: "Ubi", category: "Nearest MRT" },
    { label: "Upper Changi", category: "Nearest MRT" },
    { label: "Woodlands", category: "Nearest MRT" },
    { label: "Woodlands South", category: "Nearest MRT" },
    { label: "Woodleigh", category: "Nearest MRT" },
    { label: "Yew Tee", category: "Nearest MRT" },
    { label: "Yio Chu Kang", category: "Nearest MRT" },
    { label: "Yishun", category: "Nearest MRT" }
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



//To test Mapbox Settings DELETE LATER
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
  }).then(function(response) {
    console.log(response.data.response.groups[0].items);
  })
}
// ------------

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
        let marker = new mapboxgl.Marker();
        marker.setLngLat([r.venue.location.lng, r.venue.location.lat]);
        marker.addTo(map); // <-- map is a global variable holding the mapboxgl Map object
 
 let mediaObject = `
<div class="container-fluid col-lg-8 col-sm-10 pt-3 pb-3 mt-3 mb-3 mx-auto" id='mediaObject'>
    <div class="row">
        <div class="col-lg-8 col-sm-10"><h5 class="redirectmarker">${count}. ${r.venue.name}</h5></div>
    </div>
    <div class="row">
        <div class="col-lg-2 col-sm-2"><img src='${r.venue.categories[0].icon.prefix}100${r.venue.categories[0].icon.suffix}'/></div>
        <div class="col-lg-10 col-sm-10">
        
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
        popup.setHTML("<span><b>" + r.venue.name + "</b></span>" +
          "<img src=" + r.venue.categories[0].icon.prefix + "32" + r.venue.categories[0].icon.suffix + ">" +
          "<p>" + r.venue.location.formattedAddress[0] +
          "<br>Singapore " + r.venue.location.formattedAddress[1] + "</p>");


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