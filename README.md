

MRT Station Data source:
https://data.world/hxchua/train-stations-in-singapore/workspace/file?filename=mrtsg.csv

Back to top button:
https://www.youtube.com/watch?v=gphMli74Chk

Images:
https://www.pexels.com/

Image resizer:
https://www.iloveimg.com/resize-image

Icons:
https://thenounproject.com/
https://fontawesome.com/icons?d=gallery

Recolour Icons:
https://pinetools.com/colorize-image

Get Geolocation Coordinates via Mapbox:
https://stackoverflow.com/questions/50877315/getting-mapbox-geolocation-coordinates-into-a-variable


Problem 1(SEE SCRIPT.JS LINE 765):

Objective: To remove geolocate button on mapbox, upon toggling the reset button.
Problem: If function is added:  Reset button unable to work > if user did not activate geolocate button
                                Reset button can work > as long as user activates geolocate button at
                                least ONCE before attemping to use location search input.
Possible solution: IF map.addControl(geolocate) TRUE, removeControl(geolocate);`
  
  map.removeControl(geolocate);

Problem 2: 
Objective: If no results found > Prompt user to try searching for other terms.
Possible solution: If results==[0], alert ??

Problem 3:
Objective: Add validator to input boxes.
a) User cannot press search button without filling up both input boxes.
b) User cannot search for any terms OUTSIDE of autofill form.

Problem 4:

Objective: User can search as many locations/cuisines as they like, WITHOUT pressing reset button.
Problem: User must either double-click to get results OR nothing shows up at all. Until reset button is activated
Possible solution: ???