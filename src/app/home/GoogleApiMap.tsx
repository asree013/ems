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

const iconLocate = {
    admin: rootAdmin,
    root_admin: baseAdmin,
    user: usersLocate,
    cars: carsLocate
};
let Icon2: any
let base1: any
const GoogleApiMap = () => {
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
    }, []);

    useEffect(() => {
        getLoacation().catch((error) => console.error("Failed to get location:", error));
        setLoad(true)
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps) {
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
                    style={{ height: '50vh', width: '60%' }}
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
                            icon={icon}
                            position={locate}
                            label={'สพส.11071 CPA'}
                            animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}
                        />
                    }
                    <Marker
                        icon={Icon2}
                        position={{ lat: 6.688854231769756, lng: 101.41557825530519 }}
                        label={'สพส.11079 CPA หยุดใช้งานเกิน 24 ชม.'}
                    />
                    <Marker
                        icon={Icon2}
                        position={{ lat: 6.03459715510895, lng: 101.23708104748255 }}
                        label={'สพส.11085 CPA หยุดใช้งานเกิน 24 ชม.'}
                    />
                     <Marker
                        icon={base1}
                        position={{ lat: 6.434318436423724, lng: 101.816506799488 }}
                        label={'สำนักงานสมาคมอาสาสมัครพลเมืองสันติภาพ CPA'}
                    />
                    <Marker
                        icon={icon}
                        position={{ lat: 7.133134322055934, lng: 100.60217225918223 }}
                        label={'สพส.11099 CPA'}
                    />
                    <Marker
                        icon={icon}
                        position={{ lat: 5.886724434118425, lng: 102.27702953281732 }}
                        label={'สพส.11099 CPA'}
                    />
                     <Marker
                        icon={base1}
                        position={{ lat: 7.019445396285869, lng: 100.4981549385656 }}
                        label={'สำนักงานสมาคมอาสาสมัครพลเมืองสันติภาพ CPA'}
                    />
                     <Marker
                        icon={base1}
                        position={{ lat: 3.027315206462688, lng: 101.73974565519372 }}
                        label={'สำนักงานสมาคมอาสาสมัครพลเมืองสันติภาพ CPA'}
                    />
                    <Marker
                        icon={base1}
                        position={{ lat: 13.716100842961414, lng: 100.3827865061942 }}
                        label={'สำนักงานสมาคมอาสาสมัครพลเมืองสันติภาพ CPA'}
                    />
                    <Marker
                        icon={Icon2}
                        position={{ lat: 13.714218329589393, lng: 100.37995336988897 }}
                        label={'สพส.11079 CPA หยุดใช้งานเกิน 24 ชม.'}
                    />
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
