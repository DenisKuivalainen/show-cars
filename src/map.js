import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { AccessibilityNew, DriveEta } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { compose, curry, map } from "ramda";
import { mapIndexed } from "ramda-godlike";
 
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

export default (cars) => {
    const [selected, setSelected] = useState(null);
    const [userCoords, setUserCoords] = useState([]);

    useEffect(() => {
        !!navigator.geolocation &&
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => setUserCoords([longitude, latitude])
        )
    }, [])
    

    return compose(
        gMap(userCoords, 13),
        (...carPins) => [carPins, <UserPin lng={userCoords[0]} lat={userCoords[1]} />],
        mapIndexed(
            ({coordinates: [lngCords, latCords], name}, k) => 
                (k + 1 === selected || !!!selected) && // Check if this car selected or none selected
                <CarPin 
                    lng={lngCords} 
                    lat={latCords} 
                    name={!!selected ? name : " "} 
                    handleClick={() => setSelected(!!selected ? null : k + 1)} // k + 1 is used as !!0 = false. Handle this will require more unnecessary code.
                />
        )
    )(cars);
}
