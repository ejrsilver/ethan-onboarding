import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map({buildings}) {
    console.log(buildings);
    
    return (
        <MapContainer
        //Centre of Queen's Campus
        center={[44.226,-76.4960]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%"}}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buildings.map(({id, long, lat, title}) => (
                <Marker position={[long, lat]}>
                    <Popup>{title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};