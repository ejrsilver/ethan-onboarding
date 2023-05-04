import {useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import Image from 'next/image';

export default function HomePage() {
    return(
        <>
        <Head>
            <title>Queen's University Accessible Maps</title>
        </Head>
        <Container>
                <Image src="/images/Queens_University_logo.png" width={500} height={500} alt="Queen's University"/>
                <Typography component="h1" variant="h1">Accessible Maps</Typography>
                <Link href="/main-campus/map"><Button variant="contained">View Main Campus</Button></Link>
                <Link href="/west-campus/map"><Button variant="contained">View West Campus</Button></Link>
        </Container>
        </>
    );
}