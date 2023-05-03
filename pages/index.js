import {useState} from 'react';
import Link from 'next/link';
import  {Container}  from '@mui/material';
import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material';

export default function HomePage() {
    return(
        <Container>
            <Box sx={{my:4}}>
                <Typography component="h1" variant="h1">Develop. Preview. Ship. 🚀</Typography>
                <Link href="/main-campus/map"><Button variant="contained">View Map</Button></Link>
            </Box>
        </Container>
    );
}