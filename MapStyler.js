/**
 * MapStyler.
 * @param map
 * @constructor
 */
var MapStyler = function( map, json ) {
  /**
   * initialise class.
   */
  var self = this;
  self.map = map;
  self.index = 0;
  self.styles = [];
  self.json = json;

  var items = document.createElement( 'div' );
  items.id = 'items';

  var add = document.createElement( 'input' );
  add.id = 'add-style';
  add.type = 'button';
  add.value = '+ Add';
  add.addEventListener( 'click', function() {
    self.appendItem();
  } );

  var tray = document.getElementById("style-tray");
  tray.appendChild(items);
  tray.appendChild(add);

  /**
   * Features list.
   * @type {*[]}
   */
  var features = [
    {name: "water", dVal: "45, 76"},
    {name: "landscape", dVal: "27, 89"},
    {name: "landscape.man_made", dVal: "27, 89"},
    {name: "landscape.natural", dVal: "15, 95"},
    {name: "poi", dVal: "43, 78"},
    {name: "poi.medical", dVal: "41, 87"},
    {name: "poi.school", dVal: "48, 83"},
    {name: "poi.business", dVal: "15, 85"},
    {name: "poi.government", dVal: "15, 85"},
    {name: "poi.place_of_worship", dVal: "15, 85"},
    {name: "poi.sports_complex", dVal: "15, 85"},
    {name: "poi.park", dVal: "43, 78"},
    {name: "poi.attraction", dVal: "43, 78"},
    {name: "road", dVal: "100, 64"},
    {name: "road.highway", dVal: "100, 64"},
    {name: "road.arterial", dVal: "100, 77"},
    {name: "road.local", dVal: "100, 100"},
    {name: "administrative", dVal: "0, 51"},
    {name: "administrative.country", dVal: "0, 51"},
    {name: "administrative.land_parcel", dVal: "0, 51"},
    {name: "administrative.locality", dVal: "0, 0"},
    {name: "administrative.neighborhood", dVal: "0, 51"},
    {name: "administrative.province", dVal: "0, 51"},
    {name: "transit", dVal: "0, 75"}
  ];

  /**
   * Element list.
   * @type {*[]}
   */
  var elements = [
    {name: "all"},
    {name: "geometry.fill"},
    {name: "geometry.stroke"},
    {name: "labels.text.fill"},
    {name: "labels.text.stroke"}
  ];

  /**
   * Visibility options.
   * @type {*[]}
   */
  var visibility = [
    {name: "on"},
    {name: "simplified"},
    {name: "off"}
  ];

  /**
   * Appends a new Style.
   */
  self.appendItem = function() {
    var item = self.getItem();
    document.getElementById( "items" ).appendChild( item );
    self.index++;

    item.getElementsByClassName( "featureType" )[0]
      .addEventListener( 'change', function() {
        self.changed( this );
      } );

    item.getElementsByClassName( "elementType" )[0]
      .addEventListener( 'change', function() {
        self.changed( this );
      } );

    item.getElementsByClassName( "visibility" )[0]
      .addEventListener( 'change', function() {
        self.changed( this );
      } );

    item.getElementsByClassName( "weight" )[0]
      .addEventListener( 'change', function() {
        self.changed( this );
      } );

    item.getElementsByClassName( "color" )[0]
      .addEventListener( 'change', function() {
        self.changed( this );
      } );

    item.getElementsByClassName( "close-button" )[0]
      .addEventListener( 'click', function() {
        self.deleteItemDiv( this );
      } );

    return item;
  };

  /**
   * Deletes a style.
   */
  self.deleteItemDiv = function( button ) {
    var item = button.parentNode;
    document.getElementById( "items" ).removeChild( item );
    self.deleteStyle( parseInt( item.getElementsByClassName( "index" )[0].innerHTML ) - 1 );
  };

  /**
   * Item values changed handler.
   * @param el
   */
  self.changed = function( el ) {
    var item = el.parentNode.parentNode.parentNode;
    self.calculate( item );
  };

  /**
   * Delete a style from style Array
   */
  self.deleteStyle = function( id ) {
    if ( id < self.index - 1 ) {
      self.changeHtmlIds( id );
    }
    self.styles.splice( id, 1 );
    self.index--;
    self.renderStyle();
  };

  /**
   * changes the IDs of the HTML Style divs to be equal with Style Array IDs
   */
  self.changeHtmlIds = function( deletedId ) {
    for ( var i = deletedId + 1; i < self.index; i++ ) {
      var item = document.getElementById( "item-" + i.toString() );
      item.setAttribute( "id", "item-" + (i - 1) );
      item.getElementsByClassName( "index" )[0].innerHTML = i;
    }
  };

  /**
   * Returns a new HTML Item Div.
   */
  self.getItem = function() {
    /**
     * Features options HTML.
     */
    var features_opt = "";
    for ( var i = 0; i < features.length; i++ ) {
      features_opt += '<option>' + features[i].name + '</option>';
    }

    /**
     * Elements options HTML.
     */
    var elements_opt = "";
    for ( var i = 0; i < elements.length; i++ ) {
      elements_opt += '<option>' + elements[i].name + '</option>';
    }

    /**
     * Visibility options HTML.
     * @type {string}
     */
    var visibility_opt = "";
    for ( var i = 0; i < visibility.length; i++ ) {
      visibility_opt += '<option>' + visibility[i].name + '</option>';
    }

    //      var value = '<input type="hidden" name="id" class="index" value="' + self.index + '">';
    var value = '<div class="index">' + (self.index + 1) + '</div>';
    value += '<div class="close-button"></div>';
    value += '<div class="wrap">';
    value += '  <div class="left">Feature: </div>';
    value += '  <div class="right">';
    value += '    <select name="featureType" class="featureType">';
    value += features_opt;
    value += '    </select>';
    value += '  </div>';
    value += '</div>';
    value += '<div class="wrap">';
    value += '  <div class="left">Element: </div>';
    value += '  <div class="right">';
    value += '    <select name="elementType" class="elementType">';
    value += elements_opt;
    value += '    </select>';
    value += '  </div>';
    value += '</div>';
    value += '<div class="wrap">';
    value += '  <div class="left">Visibility: </div>';
    value += '  <div class="right">';
    value += '    <select name="visibility" class="visibility">';
    value += visibility_opt;
    value += '    </select>';
    value += '  </div>';
    value += '</div>';
    value += '<div class="wrap">';
    value += '  <div class="left">Weight: </div>';
    value += '  <div class="right">';
    value += '   <input type="range" name="weight" class="weight" min="1" max="10" value="1" />';
    value += '  </div>';
    value += '</div>';
    value += '<div class="wrap">';
    value += '  <div class="left">Color: </div>';
    value += '  <div class="right">';
    value += '    <input type="color" name="color" class="color"/>';
    value += '  </div>';
    value += '</div>';

    // Create the new element.
    var newItem = document.createElement( 'div' );
    newItem.setAttribute( 'id', "item-" + self.index );
    newItem.setAttribute( 'class', "item" );
    newItem.innerHTML = value;
    return newItem;
  };

  /**
   * Build the style obj.
   */
  self.calculate = function( item ) {
    var id = parseInt( item.getElementsByClassName( "index" )[0].innerHTML ) - 1;
    var featureType = item.getElementsByClassName( "featureType" )[0].value;
    var elementType = item.getElementsByClassName( "elementType" )[0].value;
    var visibility = item.getElementsByClassName( "visibility" )[0].value;
    var weight = item.getElementsByClassName( "weight" )[0].value;
    var color = item.getElementsByClassName( "color" )[0].value;

    // Add to style.
    self.styles[id] = {
      id:          id,
      featureType: featureType,
      elementType: elementType,
      stylers:     [
        {weight: weight},
        {visibility: visibility},
        {color: color}
      ]
    }

    self.renderStyle();
  };

  /**
   * update map Style.
   */
  self.renderStyle = function() {
    self.map.setOptions( {styles: self.styles} );
    self.updateField();
  }

  /**
   * Update the style field textarea.
   */
  self.updateField = function() {
    self.json = ( JSON.stringify( self.styles, null, '  ' ) );
    var e = new CustomEvent( 'mapStylerUpdate', {detail: {json: self.json}} );
    document.dispatchEvent( e );
  }

  self.bootstrap = function() {
    if ( typeof self.json != 'undefined' ) {
      try {
        self.styles = JSON.parse( self.json );
        self.map.setOptions( {styles: self.styles} );

        document.getElementById( 'items' ).innerHTML = '';
        if ( 1 > self.styles.length ) {
          self.appendItem();
        }
        for ( var i = 0; i < self.styles.length; i++ ) {
          var item = self.appendItem();
          if ( typeof self.styles[i].featureType != 'undefined' ) {
            item.getElementsByClassName( 'featureType' )[0].value = self.styles[i].featureType;
          }
          if ( typeof self.styles[i].elementType != 'undefined' ) {
            item.getElementsByClassName( 'elementType' )[0].value = self.styles[i].elementType;
          }

          for ( var j = 0; j < self.styles[i].stylers.length; j++ ) {
            if ( typeof self.styles[i].stylers[j].weight != 'undefined' ) {
              item.getElementsByClassName( 'weight' )[0].value = self.styles[i].stylers[j].weight;
            }
            if ( typeof self.styles[i].stylers[j].visibility != 'undefined' ) {
              item.getElementsByClassName( 'visibility' )[0].value = self.styles[i].stylers[j].visibility;
            }
            if ( typeof self.styles[i].stylers[j].color != 'undefined' ) {
              item.getElementsByClassName( 'color' )[0].value = self.styles[i].stylers[j].color;
            }
          }
        }
      }
      catch ( e ) {
        console.log( 'Style JSON: ' + e.message );
        self.appendItem();
      }
    }
  }
}
