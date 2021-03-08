import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [coords, setCoords] = useState([]);

    const changePosition = ({coords: {latitude, longitude}}) => setCoords([longitude, latitude]);
    const handleError = (e) => console.warn(e.message);

    useEffect(() => {
        var watcher = !!navigator && !! navigator.geolocation &&
            navigator.geolocation.watchPosition(changePosition, handleError);

        return () => watcher && navigator.geolocation.clearWatch(watcher);
    }, []);

    return coords;
}

export default useGeolocation;