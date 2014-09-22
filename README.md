MapStyler
=========

Google Maps API Simple Styled Map Tool http://konforti.net/MapStyler/example

## Usage

1. Create a map:

	```javascript
	var mapOptions = {
	  center: { lat: 51, lng: 0},
	  zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	```
2. Get the JSON:

  ```javascript
  var json = document.getElementsByTagName('textarea')[0].value;
  ```
  
3. Initialize the app:

  ```javascript
  var styler = new MapStyler( map, json );
  styler.bootstrap();
  ```
4. Collect the new creaed JSON:

  ```javascript
  document.addEventListener('mapStylerUpdate', function(e) {
    document.getElementsByTagName('textarea')[0].value = e.detail.json;
  });
  ```
5. Locate the Map and the Style Tray in your page:

  ```html
  <div id="style-tray"></div>
  <div id="map-canvas"></div>
  ```
	
