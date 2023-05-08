import dynamic from "next/dynamic";
import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Layout from '../../components/layout';
import { getBuildingsData } from "../../lib/getbuildings";

export async function getStaticProps() {
    const buildingsData = getBuildingsData();
    
    return {props: {buildingsData,},};
}
export default function WestMap({buildingsData}) {
    const DynMap = dynamic(() => import('../../components/Map'), {ssr: false,});
    return(
        <Layout title="West Campus - Queen's University Accessible Maps" description="An Accessible West Campus Map View for Queen's University.">
            <Container>
                <Typography component="h1" variant="h1">Main Campus Map</Typography>
                <Link href="/"><Button variant="contained">Back</Button></Link>
                <Container sx={{height: 600}}>
                    <DynMap buildings={buildingsData} centre={[44.228,-76.5136]}/>
                </Container>
            </Container>
        </Layout>
    );
}
