import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Link from "next/link";

export default function Map({buildings, centre}) {    
    return (
        <MapContainer
        //Centre of Queen's Campus
        center={centre}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%"}}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buildings.map(({id, 'coords':points, name}) => (
                <Marker position={points} key={id}>
                    <Popup><Link href={`/map/building/${id}`}>{name}</Link></Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};