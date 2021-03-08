import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { AccessibilityNew, DriveEta } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { compose, curry, length, lt } from "ramda";
import { mapIndexed } from "ramda-godlike";
import useGeolocation from "./useGeolocation";
 
const CarPin = ({ name, handleClick }) => (
    <div>
        <Typography color="secondary">{name}</Typography>
        <DriveEta color="secondary" onClick={handleClick} />
    </div>
);

const UserPin = () => <AccessibilityNew />
 
const gMap = curry(([lngCords, latCords], zoom, children) => (
    <div style={{ height: "90vh", width: "100%" }}>
        <GoogleMapReact
            // Insert another API key here cuz its not free
            bootstrapURLKeys={{key: "AIzaSyDIRYTP1bEcq1rQaNLl0jyRBsAt3bXdIzs"}}
            defaultCenter={{
                lng: lngCords,
                lat: latCords
            }}
            defaultZoom={zoom}
        >
            {children}
        </GoogleMapReact>
    </div>
));

export const map = (cars) => {
    const [selected, setSelected] = useState(null);
    const [userCoords, setUserCoords] = useState([]);
    const defaultCoords = [10.001389, 53.565278];
    const coords = useGeolocation();

    useEffect(async() => {
        setUserCoords(coords);
    }, [coords])

    return compose(
        gMap(lt(0, length(userCoords)) ? userCoords : defaultCoords, 13), // If deafault coordinates are not passed to the Google Map, it will not show the map
        (...carPins) => [carPins, lt(0, length(userCoords)) && <UserPin lng={userCoords[0]} lat={userCoords[1]} />], // Add new item to the return array
        mapIndexed(
            ({coordinates: [lngCords, latCords], name}, k) =>
                (k + 1 === selected || !!!selected) && // Check if this car selected or none selected
                <CarPin 
                    key={`car-pin-${k}`}
                    lng={lngCords} 
                    lat={latCords} 
                    name={!!selected ? name : " "} 
                    handleClick={() => setSelected(!!selected ? null : k + 1)} // k + 1 is used as !!0 = false. Handle this will require more unnecessary code.
                />
        )
    )(cars);
}

