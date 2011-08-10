// ==========================================================================
// Project:  SproutCore Touch
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('sproutcore-touch/system/sylvester');

var RotationXMatrix = function(a) {
  return $M([
    [1,0,0,0],
    [0,Math.cos(a), Math.sin(-a), 0],
    [0,Math.sin(a), Math.cos( a), 0],
    [0,0,0,1]
  ]);
};

var RotationYMatrix = function(b) {
  return $M([
    [Math.cos( b), 0, Math.sin(b),0],
    [0,1,0,0],
    [Math.sin(-b), 0, Math.cos(b), 0],
    [0,0,0,1]
  ]);
};

var RotationZMatrix = function(c) {
  return $M([
    [Math.cos(c), Math.sin(-c), 0, 0],
    [Math.sin(c), Math.cos( c), 0, 0],
    [0,0,1,0],
    [0,0,0,1]
  ]);
};

var TranslationMatrix = function(tx,ty,tz) {
  return $M([
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [tx,ty,tz,1]
  ]);
};

var ScaleMatrix = function(s) {
  return $M([
    [s,0,0,0],
    [0,s,0,0],
    [0,0,s,0],
    [0,0,0,1]
  ]);
};

(function($) {
  if ( !$.cssHooks ) {
    throw("jQuery 1.4.3+ is needed for this plugin to work");
    return;
  }
  
  var applyMatrix = function(elm) {
      var transforms = elm.data('transforms');
      
      var rotX = transforms.rotateX,
          rotY = transforms.rotateY,
          rotZ = transforms.rotateZ,
          scale = transforms.scale,
          translateX = transforms.translateX,
          translateY = transforms.translateY,
          translateZ = transforms.translateZ;
          
      var transformMatrix = RotationXMatrix(rotX)
                            .x(RotationYMatrix(rotY))
                            .x(RotationZMatrix(rotZ))
                            .x(ScaleMatrix(scale))
                            .x(TranslationMatrix(translateX,translateY,translateZ));
      
      s  = "matrix3d(";
        s += tM.e(1,1).toFixed(10) + "," + tM.e(1,2).toFixed(10) + "," + tM.e(1,3).toFixed(10) + "," + tM.e(1,4).toFixed(10) + ",";
        s += tM.e(2,1).toFixed(10) + "," + tM.e(2,2).toFixed(10) + "," + tM.e(2,3).toFixed(10) + "," + tM.e(2,4).toFixed(10) + ",";
        s += tM.e(3,1).toFixed(10) + "," + tM.e(3,2).toFixed(10) + "," + tM.e(3,3).toFixed(10) + "," + tM.e(3,4).toFixed(10) + ",";
        s += tM.e(4,1).toFixed(10) + "," + tM.e(4,2).toFixed(10) + "," + tM.e(4,3).toFixed(10) + "," + tM.e(4,4).toFixed(10);
      s += ")";
      
      elm.style.WebkitTransform = s;
  }
  
  var hookFor = function(name) {
    return {
      get: function( elem, computed, extra ) {
        var transforms = elem.data('transforms');
        return transforms[name] || 0;
      },
      set: function( elem, value) {
        var transforms = elem.data('transforms');
        if (transforms === undefined) transforms = {};
        
        transforms[name] = value;
        
        elem.data('transforms',transforms);
        applyMatrix(elem);
      }
    }
  }
  
  var properties = [
    'rotateX',
    'rotateY',
    'rotateZ',
    'translateX',
    'translateY',
    'translateZ',
    'scale'
  ];
  
  for (var i=0, l=properties.length; i<l; i++) {
    var name = properties[i];
    $.cssHooks[name] = hookFor(name);
  }

})(jQuery);
