MapStyler
=========

Google Maps API Simple Styled Map Tool

## Usage

* Create a map:
	
	```js
	var mapOptions = {
	  center: { lat: 51, lng: 0},
	  zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	```

* Get the JSON:

	```js
	var json = document.getElementsByTagName('textarea')[0].value;
	```
  
* Initialize the app:

	```js
	var styler = new MapStyler( map, json );
	styler.bootstrap();
	```

* Collect the new creaed JSON:

	```js
	document.addEventListener('mapStylerUpdate', function(e) {
	document.getElementsByTagName('textarea')[0].value = e.detail.json;
	});
	```

* Locate the Map and the Style Tray in your page:

	```html
	<div id="style-tray"></div>
	<div id="map-canvas"></div>
	```
	
