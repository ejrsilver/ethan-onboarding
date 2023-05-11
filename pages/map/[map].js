import * as react from "react";
import dynamic from "next/dynamic";
import Link from 'next/link';
import {Card, Typography, Button, Stack, AspectRatio}  from '@mui/joy';
import { Container } from "@mui/material";
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
    const DynMap = dynamic(() => import('../../components/map-window'), {ssr: false,});
    return(
        <Layout title={`${mapData.name} Campus - Queen's University Accessible Maps`} description="An Accessible Campus Map View for Queen's University.">
            <Stack direction={"column"} spacing={2}>
                <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                    <Typography level="h1">{mapData.name} Campus Map</Typography>
                    <Button variant="solid" sx={{width: 150}}><Link href="/">Back</Link></Button>
                </Stack>
                <DynMap popup={true} zoom={16} buildings={buildingsData} centre={mapData.coords}/>
            </Stack>
        </Layout>
    );
}