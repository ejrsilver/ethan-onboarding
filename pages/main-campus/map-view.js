import dynamic from "next/dynamic";
import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Layout from '../../components/layout';
import { useState } from "react";

export default function MainMap() {
    const DynMap = dynamic(() => import('../../components/Map'), {ssr: false,});
    const [map, setMap] = useState();
    return(
        <Layout title="Main Campus - Queen's University Accessible Maps" description="An Accessible West Campus Map View for Queen's University.">
            <Container>
                <Typography component="h1" variant="h1">Main Campus Map</Typography>
                <Link href="/"><Button variant="contained">Back</Button></Link>
                <Container sx={{height: 400}}>
                    <DynMap />
                </Container>
            </Container>
        </Layout>
    );
}