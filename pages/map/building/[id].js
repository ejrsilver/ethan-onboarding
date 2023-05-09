import Layout from "../../../components/layout";
import { getBuildingData, getAllIds } from "../../../lib/getbuildings";
import { Button, Card, Typography, Stack } from "@mui/joy";
import Link from "next/link";
import dynamic from "next/dynamic";
import Slider from "../../../components/slider";


export default function Building({ buildingData }) {
    const DynMap = dynamic(() => import('../../../components/map-window'), {ssr: false,});
    return (
        <Layout title={`${buildingData.name} - Queen's University Accessible Maps`} description="An Accessible Campus Map View for Queen's University.">
            <Stack direction={"column"} spacing={2}>                
                <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                    <Typography level="h1">{buildingData.name}</Typography>
                    <Button variant="solid"><Link href="/map/main">Back</Link></Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <DynMap popup={false} zoom={20} buildings={[buildingData]} centre={buildingData.coords}/>
                    <Card>
                        <Typography level="h2">{buildingData.addr}</Typography>
                        <Slider images={buildingData.images} alts={buildingData.alts}></Slider>
                        {buildingData.access.map((value) => (<Typography level="p" key={value}>{value}</Typography>))}
                    </Card>
                </Stack>
            </Stack>
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