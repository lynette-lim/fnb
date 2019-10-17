# Singapore F&B Directory
## Stream Two Project: Interactive Frontend Development - Code Institute
This web application serves as a F&B locator that will display all F&B business based in Singapore through an interactive search function and map.
## Demo
A live demo can be found [here](https://lynette-lyf.github.io/fnb/).
## UX
The simplistic design of the website puts emphasis onto the search function and interactive map. Inspired by Yelp’s search engine, some eye-catching food photos are put into a carousel that underlays the search boxes. The use of icons in the search engine elevates the interface in a way that makes it user-friendly and effective in communicating the purpose of each function. The colour scheme is heavily inspired by the iconic pink logo of Foodpanda, a leading global food delivery brand.
Both locals and tourists visiting Singapore and might find the website useful in locating various F&B establishments via location and filtering them by cuisine, establishment type, or food.
## Technologies
1.  HTML
2.  CSS
3.	Bootstrap (4.3.1)
4.	Javascript
5.	jQuery UI
6.	Axios CDN
7.	Mapbox
8.	Foursquare API
## Features
The search function allows the user to search their preferred cuisine, establishment type or food by:
1.  Geolocation (Only exclusive to IP addresses in Singapore)
2.  Names of the nearest MRT(Mass Rapid Transit) station and location
### Features Left to Implement
Adding an animated scroll feature that will pan to map upon clicking on the geolocate button (beside the location input box), then pan back to the search boxes after the user toggles the geolocate button (on the map)
## Testing
#### 1)	Filter by location:
**a) Geolocation (Only exclusive to IP addresses in Singapore)** 

Upon clicking on the geolocate button (beside the location input box), a popover will appear showing the instructions on how to toggle the function. Once the user has followed the instructions by toggling the geolocate button (on the map), there will be a popup requesting permission for the user’s location - depending on the user’s browser. Once the user has enabled location services, the map will pan and zoom to the user's location, the latitude and longitude will appear in the location input box and location input box will be disabled so that the user will know that the function is working and can proceed to the next step - typing their preferred cuisine, establishment or food filters into the next input box.

**b)	Names of the nearest MRT(Mass Rapid Transit) station and location**

Since the user have a choice to either type down the names of the nearest MRT station or location, an autocomplete widget using the jQuery UI has been implemented to assist the user in their search. The search terms will appear once the user type a character of a string of characters that match. All search terms in this category are taken from an external dataset .csv folder with the longitude and latitude of all MRT stations in Singapore.

#### 2)	Filter by cuisine, establishment type and food:
a)	This function is similar to 1b, whereby the user can make use of the autocomplete function to complete their search. These search terms are taken from Foursquare hence it has its limitations. The Foursquare API has limited category types that the user can filter from therefore not every cuisine type or food can be searched.

#### 3)	Search Button

Once user clicks on the search button, the results will be printed on the left panel of the page.

#### 4)	Reset Button

Toggling the reset button helps to perform the following actions:
-	Empty both input boxes
-	Map zooms out and resets to original position
-	If geolocation is toggled:
o	Geolocation button on map is removed
o	Geolocation button beside input box is re-enabled
o	Location input box will be re-enabled and lat/long values cleared

#### 5)	Map and Results
In desktop view, the search results show at the left panel of the map. In smaller screen sizes, the search results show below the map. The search results are displayed in a numbered order, along with the name of the establishment, address and category.

The map is interactive as it allows users to toggle the map from one location to another when the user clicks on the names of their places of interest. The map will perform a built-in animation that will move to and center their place of interest.
To ensure compatibility and responsiveness, the site was tested across multiple browsers such as Chrome, Firefox, Safari and Internet Explorer and on multiple android devices - Galaxy S5, Pixel 2, Pixel 2 XL and iOS devices - iPhone 5-X, iPad and iPad Pro. 

The media query is effective in performing its function to be responsive in all mobile devices in landscape and portrait mode. However, for the landscape mode in the iPad Pro, the carousel did not stretch out properly, leaving an empty gap between the map. Also, the map did not show up in the Internet Explorer browser.

## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named `index.html`.
To run locally, you can clone this repository directly into the editor of your choice by pasting git clone `https://github.com/lynette-lyf/fnb.git` into your terminal. To cut ties with this GitHub repository, type git remote rm origin into the terminal.
## Credits
### Media
- All photos were taken from [Pexels](https://www.pexels.com/), with the exception of the website’s logo and map’s custom markers which I created using Illustrator.
- Icons are taken from [The Noun Project](https://thenounproject.com/) and [Font Awesome](https://fontawesome.com/icons?d=gallery)
- Icons are recoloured using [PineTools](https://pinetools.com/colorize-image)

### Acknowledgements
- Template of Mapbox and Foursquare provided by the [lecturer](https://github.com/kunxin-chor/mapbox-showcase)
- Scroll to Top Button Feature was found through this tutorial [here](https://www.youtube.com/watch?v=gphMli74Chk)
- MRT Station Data source is taken from [DataWorld](https://data.world/hxchua/train-stations-in-singapore/workspace/file?filename=mrtsg.csv)
- The List of Categories from Foursquare is located [here](https://developer.foursquare.com/docs/resources/categories)

**This is for educational use.**
