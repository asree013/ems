function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function haversines(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // console.log(`Latitudes and Longitudes: lat1=${lat1}, lon1=${lon1}, lat2=${lat2}, lon2=${lon2}`);
    if(!lat1 || !lon1){
        return 0
    }
    const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    // console.log(`Delta Lat: ${dLat}, Delta Lon: ${dLon}`);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    // console.log(`a: ${a}`);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // console.log(`c: ${c}`);

    const distance = R * c; // ระยะทางในหน่วยกิโลเมตร

    return distance;
}

export async function getLatLng(): Promise<{ lat: number; long: number } | undefined> {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    resolve({ lat, long });
                },
                (error) => {
                    console.error(error);
                    reject(undefined);
                }
            );
        });
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        return undefined;
    }
}