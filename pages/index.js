import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Image from 'next/image';
import Layout from '../components/layout';

export default function HomePage() {
    return(
        <Layout title="Queen's University Accessible Maps" description="An Accessible Map and Campus Access platform for Queen's University.">
        <Container>
                <Image src="/images/Queens_University_logo.png" width={500} height={500} alt="Queen's University"/>
                <Typography component="h1" variant="h1">Accessible Maps</Typography>
                <Link href="/map/main"><Button variant="contained">View Main Campus</Button></Link>
                <Link href="/map/west"><Button variant="contained">View West Campus</Button></Link>
        </Container>
        </Layout>
    );
}