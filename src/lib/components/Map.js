import React, { useEffect } from 'react';
import './map.scss';
const MoldainMap = ({
  apiKey = '',
  id = 'moladin-map',
  className,
  lat = null,
  lng = null,
  customMarker = '',
  draggableMarker = false,
  onDragEnd,
}) => {
  const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    if (document.querySelectorAll(`script[src="${url}"]`).length === 0) {
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
      () => initMap(lat, lng)
    );
  });

  const initMap = (lat, lng) => {
    let map;
    const { google } = window;
    const coords = { lat, lng };
    map = new google.maps.Map(document.getElementById(id), {
      zoom: 18,
      center: coords,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
    });
    new google.maps.places.PlacesService(map);

    const marker = new google.maps.Marker({
      position: coords,
      map,
      icon: customMarker,
      draggable: draggableMarker,
      animation: google.maps.Animation.DROP,
    });

    marker.setMap(map);

    google.maps.event.addListener(marker, 'dragend', (e) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng()),
      };
      if (onDragEnd) {
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            onDragEnd(latlng, results);
          }
        });
      }
    });
  };

  return (
    <div className="display-map">
      <div className="display-map-inner">
        <div id={id} className={className} />
      </div>
    </div>
  );
};

export default MoldainMap;
