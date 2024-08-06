'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    APIProvider, Map, MapControl, ControlPosition, Marker, useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import { RoleContext, TRoleContext } from '@/contexts/role.context';
import carsLocate from '@/assets/icon/ambulance.png';
import carsLocateB from '@/assets/icon/ambulance_4550989.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loadding from '@/components/Loadding';
import { Button } from '@mui/material';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import { Locations } from '@/models/location.model';
import { LocateContext, TLocateC } from '@/contexts/locate.context';
import homeCss from './home.module.css'

type LatLng = {
    lat: number;
    lng: number;
};

type IconGoogleMap = {
    url: string;
    scaledSize: google.maps.Size;
    origin: google.maps.Point;
    anchor: google.maps.Point;
    labelOrigin: google.maps.Point;
};

type Props = {
    width: string
    hight: string
}
const GoogleApiMap = ({ hight, width }: Props) => {
    const [locate, setLocate] = useState<Locations>({} as Locations); // Initialize with default values
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(13);
    const [load, setLoad] = useState<boolean>(false);
    const { findMe, setFindMe } = useContext<TRoleContext>(RoleContext);
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)


    const getLoacation = useCallback(() => {
        setLoad(true)
        return new Promise<void>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const g = {} as Locations;
                        g.lat = latitude.toString()
                        g.long = longitude.toString()
                        setLocate(g);
                        setLoad(false)
                        resolve(); // Resolve without returning any value
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        setLoad(false)
                        reject(error);
                    }
                );
            } else {
                const error = new Error("Geolocation is not supported by this browser.");
                console.error(error);
                setLoad(false)
                reject(error);
            }
        });
    }, []);

    const onCheckUserLocation = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const g = { lat: latitude, lng: longitude };
                        setCenterLocate(g);
                        const center = setInterval(() => {
                            setCenterLocate(null);
                            clearInterval(center);
                        }, 500);
                        resolve();
                    },
                    (error) => {
                        console.error("Error retrieving geolocation:", error);
                        reject(error);
                    }
                );
            } else {
                const error = new Error("Geolocation is not supported by this browser.");
                console.error(error.message);
                reject(error);
            }
        });
    }, [setCenterLocate]);

    useEffect(() => {
        getLoacation().catch((error) => console.error("Failed to get location:", error));
        setLoad(true)
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps.Size) {
                const newIcon = {
                    url: carsLocate.src,
                    scaledSize: new window.google.maps.Size(45, 45),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new google.maps.Point(20, -5)
                };

                setIcon(newIcon);
                clearInterval(intervalId);
                setLoad(false)
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [getLoacation]);

    return (
        <>
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                <Map
                    style={{ height: hight, width: width }}
                    defaultCenter={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                    defaultZoom={zoom}
                    zoom={zoom}
                    center={centerLocate}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={(e) => console.log(e.detail.latLng)}
                >
                    <MapControl position={ControlPosition.CENTER}>
                        <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="none" />
                            <path d="M12 6V18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <Button onClick={onCheckUserLocation} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <NearMeIcon />
                        </Button>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <Button onClick={() => setZoom(zoom + 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <AddIcon />
                        </Button>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <Button onClick={() => setZoom(zoom - 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <RemoveIcon />
                        </Button>
                    </MapControl>
                    {icon &&
                        <Marker
                            onClick={(e) => console.log(e.latLng?.toString())}
                            icon={icon}
                            position={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                            label={'สพส.11071 CPA'}
                            animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}

                        />
                    }
                    {
                        missionUser.length > 0 ?
                            missionUser.map((r, i) =>
                                <Directions key={i} lat={Number(r.lat)} lng={Number(r.long)} />
                            ) :
                            null
                    }

                </Map>
            </APIProvider>
            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
};

function Directions({ lat, lng }: { lat: number, lng: number }) {
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
    const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContext)

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
                origin: {
                    lat: Number(userLocate.lat),
                    lng: Number(userLocate.long)
                },
                destination: { lat: lat, lng: lng },
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
        <>
            {/* <div className={homeCss.directions}>
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
            </div> */}
        </>
    );
}

export default GoogleApiMap;
