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
import { Button } from '@mui/material';
import { Locations } from '@/models/location.model';
import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
import homeCss from './home.module.css';
import { Missions } from '@/models/mission.model';

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

const GoogleApiMap = ({ mission }: Props) => {
    const [locate, setLocate] = useState<Locations>({} as Locations);
    const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
    const [icon, setIcon] = useState<IconGoogleMap | null>(null);
    const [zoom, setZoom] = useState<number>(10); // ปรับค่า zoom เริ่มต้นให้เป็น 10
    const [load, setLoad] = useState<boolean>(false);

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <APIProvider apiKey={enviromentDev.keyGoogleApi}>
                {
                    load ?
                        <p>loading...</p> :
                        <Map
                            className={homeCss.sizeMap}
                            defaultCenter={{ lng: Number(locate.long), lat: Number(locate.lat) }}
                            zoom={zoom} // ใช้ค่า zoom ที่ตั้งไว้
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



// 'use client'
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import {
//     APIProvider, Map, MapControl, ControlPosition, Marker, useMapsLibrary,
//     useMap
// } from '@vis.gl/react-google-maps';
// import { enviromentDev } from '@/configs/enviroment.dev';
// import NearMeIcon from '@mui/icons-material/NearMe';
// import { FindMeContext, TFindContext } from '@/contexts/findme.context';
// import carsLocate from '@/assets/icon/ambulance.png';
// import carsLocateB from '@/assets/icon/ambulance_4550989.png';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import Loadding from '@/components/Loadding';
// import { Button } from '@mui/material';
// import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
// import { Locations } from '@/models/location.model';
// import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
// import homeCss from './home.module.css'
// import { MissionContexts, TMissionCs } from '@/contexts/missions.context';
// import { Missions } from '@/models/mission.model';

// type LatLng = {
//     lat: number;
//     lng: number;
// };

// type IconGoogleMap = {
//     url: string;
//     scaledSize: google.maps.Size;
//     origin: google.maps.Point;
//     anchor: google.maps.Point;
//     labelOrigin: google.maps.Point;
// };

// type Props = {
//     mission: Missions
// }
// const GoogleApiMap = ({ mission }: Props) => {
//     const [locate, setLocate] = useState<Locations>({} as Locations); // Initialize with default values
//     const [centerLocate, setCenterLocate] = useState<LatLng | null>(null);
//     const [icon, setIcon] = useState<IconGoogleMap | null>(null);
//     const [zoom, setZoom] = useState<number>(13);
//     const [load, setLoad] = useState<boolean>(false);


//     const getLoacation = useCallback(() => {
//         setLoad(true)
//         return new Promise<void>((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     async (position) => {
//                         const { latitude, longitude } = await position.coords;
//                         const g = {} as Locations;
//                         g.lat = latitude.toString()
//                         g.long = longitude.toString()
//                         setLocate(g);
//                         setLoad(false)
//                         resolve(); // Resolve without returning any value
//                     },
//                     (error) => {
//                         console.error("Error getting geolocation:", error);
//                         setLoad(false)
//                         reject(error);
//                     }
//                 );
//             } else {
//                 const error = new Error("Geolocation is not supported by this browser.");
//                 console.error(error);
//                 setLoad(false)
//                 reject(error);
//             }
//         });
//     }, []);

//     const onCheckUserLocation = useCallback(() => {
//         return new Promise<void>((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         const g = { lat: latitude, lng: longitude };
//                         setCenterLocate(g);
//                         const center = setInterval(() => {
//                             setCenterLocate(null);
//                             clearInterval(center);
//                         }, 500);
//                         resolve();
//                     },
//                     (error) => {
//                         console.error("Error retrieving geolocation:", error);
//                         reject(error);
//                     }
//                 );
//             } else {
//                 const error = new Error("Geolocation is not supported by this browser.");
//                 console.error(error.message);
//                 reject(error);
//             }
//         });
//     }, [setCenterLocate]);

//     useEffect(() => {
//         getLoacation().catch((error) => console.error("Failed to get location:", error));
//         setLoad(true)
//         const intervalId = setInterval(() => {
//             if (window.google && window.google.maps.Size) {
//                 const newIcon = {
//                     url: carsLocate.src,
//                     scaledSize: new window.google.maps.Size(45, 45),
//                     origin: new window.google.maps.Point(0, 0),
//                     anchor: new window.google.maps.Point(20, 20),
//                     labelOrigin: new google.maps.Point(20, -5)
//                 };

//                 setIcon(newIcon);
//                 clearInterval(intervalId);
//                 setLoad(false)
//             }
//         }, 100);

//         return () => clearInterval(intervalId);
//     }, [getLoacation]);

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <APIProvider apiKey={enviromentDev.keyGoogleApi}>
//                     {
//                         load ?
//                             <p>loadding ...</p> :
//                             <Map
//                                 className={homeCss.sizeMap}
//                                 defaultCenter={{ lng: Number(locate.long), lat: Number(locate.lat) }}
//                                 zoom={zoom}
//                                 center={centerLocate}
//                                 gestureHandling={'greedy'}
//                                 disableDefaultUI={true}
//                                 onClick={(e) => console.log(e.detail.latLng)}
//                             >
//                                 <MapControl position={ControlPosition.CENTER}>
//                                     <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <rect width="24" height="24" fill="none" />
//                                         <path d="M12 6V18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
//                                         <path d="M6 12H18" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </MapControl>
//                                 <MapControl position={ControlPosition.RIGHT}>
//                                     <Button type='button' onClick={onCheckUserLocation} variant='contained' className='m-2'>
//                                         <NearMeIcon />
//                                     </Button>
//                                 </MapControl>
//                                 <MapControl position={ControlPosition.RIGHT}>
//                                     <Button type='button' onClick={() => setZoom(zoom + 1)} variant='contained' className='m-2'>
//                                         <AddIcon />
//                                     </Button>
//                                 </MapControl>
//                                 <MapControl position={ControlPosition.RIGHT}>
//                                     <Button type='button' onClick={() => setZoom(zoom - 1)} variant='contained' className='m-2'>
//                                         <RemoveIcon />
//                                     </Button>
//                                 </MapControl>
//                                 {icon &&
//                                     <Marker
//                                         onClick={(e) => console.log(e.latLng?.toString())}
//                                         icon={icon}
//                                         position={{ lng: Number(locate.long), lat: Number(locate.lat) }}
//                                         label={'สพส.11071 CPA'}
//                                         animation={centerLocate ? window.google.maps.Animation.BOUNCE : null}

//                                     />
//                                 }
//                                 {
//                                     !mission?
//                                     null
//                                     :<Directions lat={Number(mission.lat)} lng={Number(mission.long)} />
//                                 }

//                             </Map>
//                     }
//                 </APIProvider>
//             </div>
//         </>
//     );
// };

// function Directions({ lat, lng }: { lat: number, lng: number }) {
//     const map = useMap();
//     const routesLibrary = useMapsLibrary('routes');
//     const [directionsService, setDirectionsService] =
//         useState<google.maps.DirectionsService>();
//     const [directionsRenderer, setDirectionsRenderer] =
//         useState<google.maps.DirectionsRenderer>();
//     const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
//     const [routeIndex, setRouteIndex] = useState(0);
//     const selected = routes[routeIndex];
//     const leg = selected?.legs[0];
//     const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContextUser)

//     // Initialize directions service and renderer
//     useEffect(() => {
//         if (!routesLibrary || !map) return;
//         setDirectionsService(new routesLibrary.DirectionsService());
//         setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//     }, [routesLibrary, map]);

//     // Use directions service
//     useEffect(() => {
//         if (!directionsService || !directionsRenderer) return;

//         directionsService
//             .route({
//                 origin: {
//                     lat: Number(userLocate.lat),
//                     lng: Number(userLocate.long)
//                 },
//                 destination: { lat: lat, lng: lng },
//                 travelMode: google.maps.TravelMode.DRIVING,
//                 provideRouteAlternatives: true
//             })
//             .then(response => {
//                 directionsRenderer.setDirections(response);
//                 setRoutes(response.routes);
//             });

//         return () => directionsRenderer.setMap(null);
//     }, [directionsService, directionsRenderer]);

//     // Update direction route
//     useEffect(() => {
//         if (!directionsRenderer) return;
//         directionsRenderer.setRouteIndex(routeIndex);
//     }, [routeIndex, directionsRenderer]);

//     if (!leg) return null;

//     return (
//         <>
//             {/* <div className={homeCss.directions}>
//                 <p>Distance: {leg.distance?.text}</p>
//                 <p>Duration: {leg.duration?.text}</p>

//                 <h2>Other Routes</h2>
//                 <ul>
//                     {routes.map((route, index) => (
//                         <li key={route.summary}>
//                             <button onClick={() => setRouteIndex(index)}>
//                                 {route.summary}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div> */}
//         </>
//     );
// }

// export default GoogleApiMap;
