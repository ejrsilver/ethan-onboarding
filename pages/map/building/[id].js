import Layout from "../../../components/layout";
import { getBuildingData, getAllIds } from "../../../lib/getbuildings";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";


export default function Building({ buildingData }) {
    const DynMap = dynamic(() => import('../../../components/map-window'), {ssr: false,});
    return (
        <Layout title={`${buildingData.name} - Queen's University Accessible Maps`} description="An Accessible Campus Map View for Queen's University.">
            <Container>
                <Typography component="h1" variant="h1">{buildingData.name}</Typography>
                <Button sx={{m:2}}variant="contained"><Link href="/map/main">Back</Link></Button>
                <Container sx={{height: 600}}>
                    <DynMap popup={false} zoom={19} buildings={[buildingData]} centre={buildingData.coords}/>
                </Container>
            </Container>
        </Layout>  
    )
  }

export async function getStaticPaths() {
    const paths = getAllIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const buildingData = getBuildingData(params.id)
    return {
        props: {
            buildingData
        }
    }
}