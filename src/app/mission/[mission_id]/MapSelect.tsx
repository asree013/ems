import React, { useCallback, useContext, useEffect, useState } from 'react';
import { APIProvider, Map, MapControl, ControlPosition, Marker, MapMouseEvent } from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import { TMissionC, MissionContext } from '@/contexts/missions.context';
import rootAdmin from '@/assets/icon/admin.png';
import Loadding from '@/components/Loadding';
import missionCss from './mission_id.module.css';
import MgrsPole from 'mgrs-pole-test';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as mgrs from 'mgrs';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
const utmObj = require('utm-latlng');

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
    const MGRS = new MgrsPole();
  const {open, setOpen} = useContext<TOpenModalMap>(OpenModalMapContext)


    const [locate, setLocate] = useState<LatLng>({ lat: 0, lng: 0 });
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(8);
    const [load, setLoad] = useState<boolean>(false);
    const { mission, setMission } = useContext<TMissionC>(MissionContext);

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

    function onSelectLatLng(p: MapMouseEvent) {
        if (p.detail.latLng) {
            const utm = UTM.convertLatLngToUtm(p.detail.latLng.lat, p.detail.latLng.lng, 1);
            const mgrss = mgrs.forward([p.detail.latLng.lng, p.detail.latLng.lat])
            
            setMission({
                ...mission,
                lat: p.detail.latLng.lat.toString(),
                long: p.detail.latLng.lng.toString(),
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
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                <Map
                    className={missionCss.map}
                    defaultCenter={locate}
                    defaultZoom={zoom}
                    zoom={zoom}
                    center={centerLocate}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={onSelectLatLng}
                >
                    <MapControl position={ControlPosition.CENTER}>
                        <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="none" />
                            <path d="M12 6V18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <button onClick={onCheckUserLocation} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <NearMeIcon />
                        </button>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <button onClick={() => setZoom(zoom + 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <AddIcon />
                        </button>
                    </MapControl>
                    <MapControl position={ControlPosition.RIGHT}>
                        <button onClick={() => setZoom(zoom - 1)} className='m-2 border-2 border-black rounded-sm bg-gray-100 hover:bg-gray-300'>
                            <RemoveIcon />
                        </button>
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
            </APIProvider>
            {load && <Loadding />}
        </>
    );
};

export default MapSelect;
