import React, { useCallback, useContext, useEffect, useState } from 'react';
import { APIProvider, Map, MapControl, ControlPosition, Marker } from '@vis.gl/react-google-maps';
import { enviromentDev } from '@/configs/enviroment.dev';
import NearMeIcon from '@mui/icons-material/NearMe';
import { RoleContext, TRoleContext } from '@/contexts/role.context';
import rootAdmin from '@/assets/icon/admin.png';
import baseAdmin from '@/assets/icon/base_admin.png';
import usersLocate from '@/assets/icon/user_locate.png';
import carsLocate from '@/assets/icon/ambulance.png';
import carsLocateB from '@/assets/icon/ambulance_4550989.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loadding from '@/components/Loadding';

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

// const iconLocate = {
//     admin: rootAdmin,
//     root_admin: baseAdmin,
//     user: usersLocate,
//     cars: carsLocate
// };
let Icon2: any
let base1: any

type Props = {
    width: string
    hight: string
}
const GoogleApiMap = ({hight,width}: Props) => {
    const [locate, setLocate] = useState<LatLng>({ lat: 0, lng: 0 }); // Initialize with default values
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(8);
    const [load, setLoad] = useState<boolean>(false);
    const { role, setRole } = useContext<TRoleContext>(RoleContext);


    const getLoacation = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const g = { lat: latitude, lng: longitude };
                        setLocate(g);
                        resolve(); // Resolve without returning any value
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
                Icon2 = {
                    url: carsLocateB.src,
                    scaledSize: new window.google.maps.Size(45, 45),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new google.maps.Point(20, -5)
                };
                base1 = {
                    url: baseAdmin.src,
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
                    defaultCenter={locate}
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
                            label={'สพส.11071 CPA'}
                            animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}

                        />
                    }
                    
                </Map>
            </APIProvider>
            {
                load?
                <Loadding />:
                null
            }
        </>
    );
};

export default GoogleApiMap;
