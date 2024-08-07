'use client'
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';

const API_KEY = enviromentDev.keyGoogleApi

const Maps = () => (
  <div style={{ width: '900px', height: '500px', margin: '80px 50px' }}>
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={{ lat: 43.65, lng: -79.38 }}
        defaultZoom={9}
        gestureHandling={'greedy'}
        fullscreenControl={false}>
        <Directions />
      </Map>
    </APIProvider>
  </div>
);

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: '100 Front St, Toronto ON',
        destination: '500 College St, Toronto ON',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div style={{ width: '800px', height: '800px', margin: '80px 50px' }}>
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Maps;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Maps />
    </React.StrictMode>
  );
}