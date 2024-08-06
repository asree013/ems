'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { APIProvider, Map, MapControl, ControlPosition, Marker, MapMouseEvent, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import rootAdmin from '@/assets/icon/admin.png';
import Loadding from '@/components/Loadding';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as mgrs from 'mgrs';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
import { Button } from '@mui/material';
import { MissionFromContext, TMissionFromContext } from '@/contexts/mission.from.context';
const utmObj = require('utm-latlng');

import missionCss from './mission_id.module.css';


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

const MapSelect = () => {
    const UTM = new utmObj('Everest');
    const { open, setOpen } = useContext<TOpenModalMap>(OpenModalMapContext)


    const [locate, setLocate] = useState<LatLng>({ lat: 0, lng: 0 });
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(8);
    const [load, setLoad] = useState<boolean>(false);
    const { missions, setMissions } = useContext<TMissionFromContext>(MissionFromContext);

    const getLoacation = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const g = { lat: latitude, lng: longitude };
                        setLocate(g);
                        resolve();
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        reject(error);
                    }
                );
            } else {
                const error = new Error("Geolocation is not supported by this browser.");
                console.error(error);
                reject(error);
            }
        });
    }, []);

    const onCheckUserLocation = useCallback(() => {
        setLoad(true);

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
                            setLoad(false);

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

    function onSelectLatLng(p: MapCameraChangedEvent) {
        if (p.detail.center) {
            const utm = UTM.convertLatLngToUtm(p.detail.center.lat, p.detail.center.lng, 1);
            const mgrss = mgrs.forward([p.detail.center.lng, p.detail.center.lat])

            setMissions({
                ...missions,
                lat: p.detail.center.lat.toString(),
                long: p.detail.center.lng.toString(),
                utm: JSON.stringify(utm),
                mgrs: mgrss
            });
            setOpen(false)
        }
    }

    useEffect(() => {
        getLoacation().catch((error) => console.error("Failed to get location:", error));
        setLoad(true);
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps.Size) {
                const newIcon = {
                    url: rootAdmin.src,
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new window.google.maps.Point(20, -10)
                };
                setIcon(newIcon);
                clearInterval(intervalId);
                setLoad(false);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [getLoacation]);

    return (
        <>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                    {
                        load ?
                            <p>กำลังประมลผลแผนที่</p> :
                            <Map
                                className={missionCss.map}
                                defaultCenter={locate}
                                defaultZoom={zoom}
                                zoom={zoom}
                                center={centerLocate}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                                // onClick={onSelectLatLng}
                                onCameraChanged={onSelectLatLng}
                            >
                                <MapControl position={ControlPosition.CENTER}>
                                    <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" fill="none" />
                                        <path d="M12 6V18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 12H18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </MapControl>
                                <MapControl position={ControlPosition.RIGHT}>
                                    <Button onClick={onCheckUserLocation} className='m-2 border-2 border-black rounded-sm bg-gray-100 active:bg-gray-300'>
                                        <NearMeIcon />
                                    </Button>
                                </MapControl>
                                <MapControl position={ControlPosition.RIGHT}>
                                    <Button onClick={() => setZoom(zoom + 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 active:bg-gray-300'>
                                        <AddIcon />
                                    </Button>
                                </MapControl>
                                <MapControl position={ControlPosition.RIGHT}>
                                    <Button onClick={() => setZoom(zoom - 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 active:bg-gray-300'>
                                        <RemoveIcon />
                                    </Button>
                                </MapControl>
                                {icon &&
                                    <Marker
                                        onClick={(e) => console.log(e.latLng?.toString())}
                                        icon={icon}
                                        position={locate}
                                        label={'ตำแหน่งของฉัน'}
                                        animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}
                                    />
                                }
                            </Map>
                    }
                </APIProvider>
            </div>
        </>
    );
};

export default MapSelect;
