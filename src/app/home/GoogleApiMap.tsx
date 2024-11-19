'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    APIProvider, Map, MapControl, ControlPosition, Marker, useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Card, FormControlLabel, styled } from '@mui/material';
import { Locations } from '@/models/location.model';
import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
import HomeCss from './HomeCss.module.css';
import { MissionById, Missions } from '@/models/mission.model';

import Switch, { SwitchProps } from '@mui/material/Switch';
import { CurrentVehicleContext, TCurrentVehicles } from './CurrentVehicle.context';

import HelitopterIcon from '@/assets/image/icon_menu/helicopter_5768628.png';
import ShipIcon from '@/assets/image/icon_menu/ship_3469160.png'
import AmbulanceIcon from '@/assets/icon/ambulance.png';
import UserIcon from '@/assets/image/icon_menu/placeholder_3207670.png';
import { Vehicles } from '@/models/vehicle.model';
import '../globals.css';


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
    mission: MissionById
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
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(8);
    const [load, setLoad] = useState<boolean>(false);
    const [isSub, setIsSub] = useState<boolean>(false)
    const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContextUser)
    const { vehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)

    useEffect(() => {

        setLoad(true);
        const intervalId = setInterval(async () => {
            if (window.google && window.google.maps.Size) {

                setIcon(convertIconByVehicle() ?? {
                    url: UserIcon.src,
                    scaledSize: new window.google.maps.Size(35, 35),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new window.google.maps.Point(20, 55),

                });
                clearInterval(intervalId);
                setLoad(false);
            }
        }, 100);

        return () => {
            clearInterval(intervalId);
        }
    }, [userLocate, vehicle]);

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

    function convertIconByVehicle() {
        if (vehicle.car) {
            return {
                url: AmbulanceIcon.src,
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                labelOrigin: new window.google.maps.Point(20, 55),
            };
        }
        if (vehicle.helicopter) {
            return {
                url: HelitopterIcon.src,
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                labelOrigin: new window.google.maps.Point(20, 55),
            };
        }
        if (vehicle.ship) {
            return {
                url: ShipIcon.src,
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                labelOrigin: new window.google.maps.Point(20, 55),
            };
        }
        if (!vehicle) {
            return {
                url: UserIcon.src,
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                labelOrigin: new window.google.maps.Point(20, 55),

            };
        }
    }


    return (
        <Card className={HomeCss.sizeMap} elevation={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: '10px', marginTop: '10px' }}>
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} onChange={(e) => setIsSub(e.target.checked)} checked={isSub} />}
                    label="โหมดเดินทาง"
                />
                {
                    load ?
                        <p>loading...</p> :
                        <Map
                            defaultCenter={{ lng: Number(userLocate.long), lat: Number(userLocate.lat) }}
                            zoom={zoom} // ใช้ค่า zoom ที่ตั้งไว้
                            center={isSub === false ? centerLocate : { lat: Number(userLocate.lat), lng: Number(userLocate.long) }}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            onClick={(e) => console.log(e.detail.latLng)}
                        >
                            {
                                isSub ?
                                    null :
                                    <MapControl position={ControlPosition.CENTER}>
                                        <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="24" height="24" fill="none" />
                                            <path d="M12 6V18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 12H18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </MapControl>
                            }

                            <MapControl position={ControlPosition.RIGHT}>
                                <Button type='button' onClick={onCheckUserLocation} variant='contained' style={{ margin: 5 }}>
                                    <NearMeIcon />
                                </Button>
                            </MapControl>
                            <MapControl position={ControlPosition.RIGHT}>
                                <Button type='button' onClick={() => setZoom(zoom + 1)} variant='contained' style={{ margin: 5 }}>
                                    <AddIcon />
                                </Button>
                            </MapControl>
                            <MapControl position={ControlPosition.RIGHT}>
                                <Button type='button' onClick={() => setZoom(zoom - 1)} variant='contained' style={{ margin: 5 }}>
                                    <RemoveIcon />
                                </Button>
                            </MapControl>
                            {icon &&
                                <Marker
                                    zIndex={50}
                                    onClick={(e) => console.log(e.latLng?.toString())}
                                    icon={icon}
                                    position={{ lng: Number(userLocate.long), lat: Number(userLocate.lat) }}
                                    label={convertNameVehicle()}
                                    animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}
                                />
                            }
                            {mission &&
                                <Directions lat={Number(mission.lat)} lng={Number(mission.long)} />
                            }
                        </Map>
                }
            </APIProvider>
        </Card>
    );

    function convertNameVehicle() {
        if (vehicle.car) {
            return {
                text: vehicle.car.Car.number.toString(),
                fontSize: "1.1rem",
                className: HomeCss.labelIconGoogle
            };
        }
        if (vehicle.ship) {
            return {
                text: vehicle.ship.Ship.calling.toString(),
                fontSize: "1.1rem",
                className: HomeCss.labelIconGoogle
            };
        }
        if (vehicle.helicopter) {
            return {
                text: vehicle.helicopter.Helicopter.number.toString(),
                fontSize: "1.1rem",
                className: HomeCss.labelIconGoogle
            };
        }
        if (!vehicle) {
            return {
                text: "ตำแหน่งของคุณ",
                fontSize: "1.1rem",
                className: HomeCss.labelIconGoogle
            };
        }
    }

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



