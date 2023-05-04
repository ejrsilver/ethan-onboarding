import dynamic from "next/dynamic";
import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Layout from '../../components/layout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export default function MainMap() {
    const MapNoSSR = dynamic(() => import('../../components/Map'), {
        loading: () => <p>Map is loading...</p>,
        ssr: false
    });
    
    return(
        <Layout title="Main Campus - Queen's University Accessible Maps" description="An Accessible West Campus Map View for Queen's University.">
            <Container>
                <Typography component="h1" variant="h1">Main Campus Map</Typography>
                <Link href="/"><Button variant="contained">Back</Button></Link>
                <Container style={{height: "400", width: "400"}}>
                    <MapNoSSR/>
                </Container>
            </Container>
        </Layout>
    );
}