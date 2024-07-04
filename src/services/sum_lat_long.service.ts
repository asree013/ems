function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function haversines(lat1: number, lon1: number, lat2: number, lon2: number): number {
    console.log(`Latitudes and Longitudes: lat1=${lat1}, lon1=${lon1}, lat2=${lat2}, lon2=${lon2}`);

    const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    console.log(`Delta Lat: ${dLat}, Delta Lon: ${dLon}`);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    console.log(`a: ${a}`);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    console.log(`c: ${c}`);

    const distance = R * c; // ระยะทางในหน่วยกิโลเมตร

    return distance;
}