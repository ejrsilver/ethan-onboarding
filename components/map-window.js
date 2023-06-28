import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Link from "next/link";

export default function Map({popup, zoom, buildings, centre, height}) {    
    return (
        <MapContainer center={centre} zoom={zoom} scrollWheelZoom={false} style={{width: "100%", minHeight: height}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {(popup) ? buildings.map(({id, 'coords':points, name}) => (<Marker position={points} key={id}><Popup><Link href={`/map/building/${id}`}>{name}</Link></Popup></Marker>)) 
                     : buildings.map(({id, 'coords':points, name}) => (<Marker position={points} key={id}></Marker>))
            }
        </MapContainer>
    );
};
