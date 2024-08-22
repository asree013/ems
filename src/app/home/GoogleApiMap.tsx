'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    APIProvider, Map, MapControl, ControlPosition, Marker, useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import carsLocate from '@/assets/icon/ambulance.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, FormControlLabel, styled } from '@mui/material';
import { Locations } from '@/models/location.model';
import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
import homeCss from './home.module.css';
import { Missions } from '@/models/mission.model';

import Switch, { SwitchProps } from '@mui/material/Switch';

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
    mission: Missions
}

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const GoogleApiMap = ({ mission }: Props) => {
    const [locate, setLocate] = useState<Locations>({} as Locations);
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(10);
    const [load, setLoad] = useState<boolean>(false);
    const [isSub, setIsSub] = useState<boolean>(false)
    const {userLocate, setUserLocate} = useContext<TLocateC>(LocateContextUser)
    const getLoacation = useCallback(() => {
        setLoad(true);
        return new Promise<void>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const g = {} as Locations;
                        g.lat = latitude.toString();
                        g.long = longitude.toString();
                        setLocate(g);
                        setLoad(false);
                        resolve();
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        setLoad(false);
                        reject(error);
                    }
                );
            } else {
                const error = new Error("Geolocation is not supported by this browser.");
                console.error(error);
                setLoad(false);
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
        setLoad(true);
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps.Size) {
                const newIcon = {
                    url: carsLocate.src,
                    scaledSize: new window.google.maps.Size(45, 45),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new window.google.maps.Point(20, -5),
                };

                setIcon(newIcon);
                clearInterval(intervalId);
                setLoad(false);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [getLoacation]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection: 'column' }}>
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} onChange={(e) => setIsSub(e.target.checked)} checked={isSub} />}
                    label="โหมดเดินทาง"
                />
                {
                    load ?
                        <p>loading...</p> :
                        <Map
                            className={homeCss.sizeMap}
                            defaultCenter={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                            zoom={zoom} // ใช้ค่า zoom ที่ตั้งไว้
                            center={isSub === false ? centerLocate: {lat: parseInt(userLocate.lat), lng: parseInt(userLocate.long)}}
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
                                <Button type='button' onClick={onCheckUserLocation} variant='contained' className='m-2'>
                                    <NearMeIcon />
                                </Button>
                            </MapControl>
                            <MapControl position={ControlPosition.RIGHT}>
                                <Button type='button' onClick={() => setZoom(zoom + 1)} variant='contained' className='m-2'>
                                    <AddIcon />
                                </Button>
                            </MapControl>
                            <MapControl position={ControlPosition.RIGHT}>
                                <Button type='button' onClick={() => setZoom(zoom - 1)} variant='contained' className='m-2'>
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
                            {mission &&
                                <Directions lat={Number(mission.lat)} lng={Number(mission.long)} />
                            }
                        </Map>
                }
            </APIProvider>
        </div>
    );
};

function Directions({ lat, lng }: { lat: number, lng: number }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];
    const { userLocate } = useContext<TLocateC>(LocateContextUser);

    useEffect(() => {
        if (!routesLibrary || !map) return;

        const service = new routesLibrary.DirectionsService();
        const renderer = new routesLibrary.DirectionsRenderer({ map });

        setDirectionsService(service);
        setDirectionsRenderer(renderer);

        return () => {
            renderer.setMap(null); // clear on unmount
        };
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !userLocate.lat || !userLocate.long) return;

        directionsService.route({
            origin: { lat: Number(userLocate.lat), lng: Number(userLocate.long) },
            destination: { lat: lat, lng: lng },
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

    }, [directionsService, directionsRenderer, userLocate, lat, lng]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <>
            {/* Optional UI for route selection and display */}
        </>
    );
}

export default GoogleApiMap;


