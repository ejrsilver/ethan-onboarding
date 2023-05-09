import dynamic from "next/dynamic";
import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Layout from '../../components/layout';
import { getAllMaps, getBuildingsMinimalData, getMapData } from "../../lib/getbuildings";

export async function getStaticProps({ params }) {
    const buildingsData = getBuildingsMinimalData();
    const mapData = getMapData(params.map);
    return {
        props: {
            mapData,
            buildingsData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllMaps();
    return {
        paths,
        fallback: false,
    }
}

export default function Map({mapData, buildingsData}) {
    const DynMap = dynamic(() => import('../../components/Map-Window'), {ssr: false,});
    return(
        <Layout title={`${mapData.name} Campus - Queen's University Accessible Maps" description="An Accessible Campus Map View for Queen's University.'`}>
            <Container>
                <Typography component="h1" variant="h1">{mapData.name} Campus Map</Typography>
                <Link href="/"><Button variant="contained">Back</Button></Link>
                <Container sx={{height: 600}}>
                    <DynMap buildings={buildingsData} centre={mapData.coords}/>
                </Container>
            </Container>
        </Layout>
    );
}