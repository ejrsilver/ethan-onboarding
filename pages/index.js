import Link from 'next/link';
import  {Box, Card, Stack, Typography, Button, CardOverflow, AspectRatio} from '@mui/joy';
import Image from 'next/image';
import Layout from '../components/layout';

export default function HomePage() {
    return(
        <Layout title="Queen's University Accessible Maps" description="An Accessible Map and Campus Access platform for Queen's University.">
            <Stack alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={2} justifyContent={'center'}>
                    <AspectRatio ratio={"4/3"}>
                        <Image src="/images/Queens_University_logo.png" width={300} height={300} alt="Queen's University Logo"/>
                    </AspectRatio>
                    <Typography level="h1">Accessible Maps</Typography>

                    <Button variant="solid"><Link href="/map/main">View Main Campus</Link></Button>
                    <Button variant="solid"><Link href="/map/west">View West Campus</Link></Button>
                </Stack>
            </Stack>
        </Layout>
    );
}