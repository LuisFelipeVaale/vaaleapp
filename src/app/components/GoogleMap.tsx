'use client'
import {
  useLoadScript,
  GoogleMap,
  Marker as MarkerF,
} from '@react-google-maps/api';
import { useMemo, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';


const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on', // Oculta las etiquetas
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        saturation: -100, // Desatura el paisaje
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        saturation: -100, // Desatura los puntos de interés
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        saturation: -100, // Desatura las carreteras
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        saturation: -100, // Desatura los medios de transporte
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        saturation: -100, // Desatura el agua
      },
    ],
  },
];
interface LocalData {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
}
interface GoogleMapComponentProps {
  local: LocalData[];
  highlightedMark: number | null;
  createMarkerMouseOverHandler: (id: number) => void;
  createMarkerMouseOutHandler: () => void;
}
const GoogleMapComponent = ({ local, highlightedMark,createMarkerMouseOverHandler, createMarkerMouseOutHandler}: GoogleMapComponentProps) => {
  const [lat, setLat] = useState(4.712265676846472);
  const [lng, setLng] = useState(-74.06593973724544);
  const mapRef = useRef<GoogleMap | null>(null);
 
  if (!local) {
    return <p>Loading...</p>;
  }
  
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      styles: mapStyles,
      disableDefaultUI: false,
      clickableIcons: true,
      gestureHandling: 'cooperative',
      keyboardShortcuts: false,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const localMarkers = local.map((local) => {
    const iconUrl =
      highlightedMark === local.id
        ? 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png'
        : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    const icon = {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(45, 45),
    };
    return {
      position: {
        lat: local.lat,
        lng: local.lng,
      },
      id: local.id,
      icon: icon,
      title: local.name,
    };
  });  

  return (
    <div className={styles.homeWrapper}>
      <GoogleMap
        ref={(map) => (mapRef.current = map)}
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '560px', height: '800px' }}
        onLoad={(map) => console.log('Map Loaded')}
      >
        {localMarkers.map((marker) => (
        <div key={marker.id}>
          <MarkerF
            position={marker.position}
            icon={marker.icon}
            title={marker.title}
            onMouseOver={() =>createMarkerMouseOverHandler(marker.id)}
            onMouseOut={createMarkerMouseOutHandler}
          />
          </div>
      ))}
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log('Marker Loaded')}
        />
      </GoogleMap>
    </div>
    
  );

};

export default GoogleMapComponent;

















  // const localMarkers = localData.map((local) => ({
    
  //   position: {
  //     lat: local.lat,
  //     lng: local.lng,
  //   },
  //   id:local.id,
  //    onMouseEnter:createMarkerMouseOverHandler(local.id),
  //    onMouseLeave:createMarkerMouseOutHandler,
  //   icon: highlightedMark === local.id ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  //   title:local.name,
  //   eventHandler: {
  //     mouseover: () => handleMarkerMouseEnter(local.id),
  //     mouseout: handleMarkerMouseLeave,
  //   },
    

  // }));

    // const createMarkerMouseOverHandler = (index: number) => {
  //   return () => {
  //     handleMarkerMouseEnter(index);
  //   };
  // };

  // const createMarkerMouseOutHandler = () => {
  //   return () => {
  //     handleMarkerMouseLeave();
  //   };
  // };

  // useEffect(() => {
  //   if (highlightedMarker !== null) {
  //     const selectedMarker = localMarkers.find(marker => marker.id === highlightedMarker);
  //     if (selectedMarker && mapRef.current) {
  //       mapRef.current.panTo({ lat: selectedMarker.position.lat, lng: selectedMarker.position.lng });
  //     }
  //   }
  // }, [highlightedMarker]);