import Layout from "../../../components/layout";
import { getBuildingData, getAllIds } from "../../../lib/getbuildings";
import { Button, Card, Typography, Stack } from "@mui/joy";
import Link from "next/link";
import dynamic from "next/dynamic";
import Carousel from "../../../components/carousel";

export default function Building({ coords, buildingData }) {
    const DynMap = dynamic(() => import('../../../components/map-window'), {ssr: false,});

    return (
        <Layout title={`${buildingData.name} - Queen's University Accessible Maps`} description="An Accessible Campus Map View for Queen's University.">
            <Stack direction={"column"} spacing={2}>           
                <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                    <Typography level="h1">{buildingData.name} {buildingData.name !== buildingData.addr ? " - "+buildingData.addr : ""}</Typography>
                    <Link href="/map/main"><Button variant="solid" sx={{width: 150, height: 70}}>Back</Button></Link>
                </Stack>

                <Stack direction="column" spacing={2}>
                    <DynMap popup={false} zoom={20} buildings={[buildingData]} centre={buildingData.coords} height="200px"/>
                    <Stack direction={"column"} spacing={2} sx={{ padding: 1}}>
                        {(buildingData.location != "") ? (<><Typography level="h2">Location</Typography><Typography>{buildingData.location}</Typography></>) : (<></>)}
                        {(buildingData.entrances != [] && buildingData.entrances != "") ? (<><Typography level="h2">Entrances</Typography>{buildingData.entrances.map((value) => (<Typography level="p" key={value}>{value}</Typography>))}</>) : (<></>)}
                        {(buildingData.corridors != "") ? (<><Typography level="h2">Corridors</Typography><Typography>{buildingData.corridors}</Typography></>) : (<></>)}
                        {(buildingData.wayfinding != "") ? (<><Typography level="h2">Wayfinding</Typography><Typography>{buildingData.wayfinding}</Typography></>) : (<></>)}
                        {(buildingData.washrooms != "") ? (<><Typography level="h2">Washrooms</Typography><Typography>{buildingData.washrooms}</Typography></>) : (<></>)}
                        {(buildingData.fountains != "") ? (<><Typography level="h2">Fountains</Typography><Typography>{buildingData.fountains}</Typography></>) : (<></>)}
                        {(buildingData.classrooms != "") ? (<><Typography level="h2">Classrooms</Typography><Typography>{buildingData.classrooms}</Typography></>) : (<></>)}
                        {(buildingData.elevators != "") ? (<><Typography level="h2">Elevators</Typography><Typography>{buildingData.elevators}</Typography></>) : (<></>)}
                        {(buildingData.services != "") ? (<><Typography level="h2">Services</Typography><Typography>{buildingData.services}</Typography></>) : (<></>)}
                        {(buildingData.parking != "") ? (<><Typography level="h2">Parking</Typography><Typography>{buildingData.parking}</Typography></>) : (<></>)}
                        {(buildingData.access != [] && buildingData.access != "" && buildingData.access[0] != " ") ? (<><Typography level="h2">Other</Typography>{buildingData.access.map((value) => (<Typography level="p" key={value}>{value}</Typography>))}</>) : (<></>)}
                        <Typography level="h2">Gallery</Typography>
                        <Carousel images={buildingData.images} />
                    </Stack>
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