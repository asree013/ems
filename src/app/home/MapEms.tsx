'use client';

import React, { useCallback, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

type Geografice = {
    center: {
        lat: number
        lng: number
    },
    zoom: number
}

const AnyReactComponent = (value: { text: string, lat: number, lng: number }) => <div>{value.text}</div>;

export default function MapEms() {
    const [locate, setLocate] = useState<Geografice>({
        center: { lat: 0, lng: 0 },
        zoom: 11
    });

    const getLoacation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) => {
                const g = {
                    center: {
                        lat: p.coords.latitude,
                        lng: p.coords.longitude,
                    },
                    zoom: 11,
                };
                setLocate(g);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [setLocate]);

    useEffect(() => {
        getLoacation();
        
    }, [getLoacation]);

    return (
        <div style={{ height: '50vh', width: '60%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                center={locate.center}
                zoom={locate.zoom}
            >
                <AnyReactComponent
                    lat={locate.center.lat}
                    lng={locate.center.lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}
