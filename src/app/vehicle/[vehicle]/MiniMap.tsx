'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    APIProvider, Map, MapControl, ControlPosition, Marker, useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Card } from '@mui/material';

import HelitopterIcon from '@/assets/image/icon_menu/helicopter_5768628.png';
import ShipIcon from '@/assets/image/icon_menu/ship_3469160.png'
import AmbulanceIcon from '@/assets/icon/ambulance.png';
import UserIcon from '@/assets/image/icon_menu/placeholder_3207670.png';
import { Vehicles } from '@/models/vehicle.model';
import { Locations } from '@/models/location.model';
import styled from 'styled-components';


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
    vehicle: Vehicles
    locate: Locations
}

const MiniMap = ({ locate, vehicle }: Props) => {
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(8);
    const [load, setLoad] = useState<boolean>(false);
    const [isSub, setIsSub] = useState<boolean>(false)

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
    }, [locate, vehicle]);

    const safeLatLng = useCallback((): LatLng | null => {
        const lat = parseFloat(String(locate.lat));
        const lng = parseFloat(String(locate.long));
        if (isNaN(lat) || isNaN(lng)) {
            console.error("Invalid lat/lng:", locate.lat, locate.long);
            return null;
        }
        return { lat, lng };
    }, [locate]);

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

    const mapCenter = isSub === false ? centerLocate : safeLatLng();

    return (
        <Card className='w-[250px] h-[150px]' elevation={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: '10px', marginTop: '10px' }}>
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                <Map
                    defaultCenter={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                    zoom={zoom} // ใช้ค่า zoom ที่ตั้งไว้
                    center={safeLatLng() || { lat: 0, lng: 0 }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={(e) => console.log(e.detail.latLng)}
                >

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
                            position={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                            label={convertNameVehicle()}
                            animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}
                        />
                    }
                </Map>
            </APIProvider>
        </Card>
    );



    function convertNameVehicle() {

        if (vehicle.car) {
            return {
                text: vehicle.car.Car.number.toString(),
                fontSize: "1.1rem",
                className: 'bg-white text-black rounded-md p-1 border border-black font-bold'
            };
        }
        if (vehicle.ship) {
            return {
                text: vehicle.ship.Ship.calling.toString(),
                fontSize: "1.1rem",
                className: 'bg-white text-black rounded-md p-1 border border-black font-bold'
            };
        }
        if (vehicle.helicopter) {
            return {
                text: vehicle.helicopter.Helicopter.number.toString(),
                fontSize: "1.1rem",
                className: 'bg-white text-black rounded-md p-1 border border-black font-bold'
            };
        }
        if (!vehicle) {
            return {
                text: "ตำแหน่งของคุณ",
                fontSize: "1.1rem",
                className: 'bg-white text-black rounded-md p-1 border border-black font-bold'
            };
        }
    }

};

export default MiniMap;



