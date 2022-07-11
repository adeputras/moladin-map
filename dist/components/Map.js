"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./map.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MoldainMap = function MoldainMap(_ref) {
  var _ref$apiKey = _ref.apiKey,
      apiKey = _ref$apiKey === void 0 ? '' : _ref$apiKey,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'moladin-map' : _ref$id,
      className = _ref.className,
      _ref$lat = _ref.lat,
      lat = _ref$lat === void 0 ? null : _ref$lat,
      _ref$lng = _ref.lng,
      lng = _ref$lng === void 0 ? null : _ref$lng,
      _ref$customMarker = _ref.customMarker,
      customMarker = _ref$customMarker === void 0 ? '' : _ref$customMarker,
      _ref$draggableMarker = _ref.draggableMarker,
      draggableMarker = _ref$draggableMarker === void 0 ? false : _ref$draggableMarker,
      onDragEnd = _ref.onDragEnd;

  var loadScript = function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        return callback();
      };
    }

    if (document.querySelectorAll("script[src=\"".concat(url, "\"]")).length === 0) {
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };

  (0, _react.useEffect)(function () {
    loadScript("https://maps.googleapis.com/maps/api/js?key=".concat(apiKey, "&libraries=places"), function () {
      return initMap(lat, lng);
    });
  });

  var initMap = function initMap(lat, lng) {
    var map;
    var _window = window,
        google = _window.google;
    var coords = {
      lat: lat,
      lng: lng
    };
    map = new google.maps.Map(document.getElementById(id), {
      zoom: 18,
      center: coords,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });
    new google.maps.places.PlacesService(map);
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: customMarker,
      draggable: draggableMarker,
      animation: google.maps.Animation.DROP
    });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'dragend', function (e) {
      var geocoder = new google.maps.Geocoder();
      var latlng = {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng())
      };

      if (onDragEnd) {
        geocoder.geocode({
          location: latlng
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            onDragEnd(latlng, results);
          }
        });
      }
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "display-map"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "display-map-inner"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: className
  })));
};

var _default = MoldainMap;
exports.default = _default;