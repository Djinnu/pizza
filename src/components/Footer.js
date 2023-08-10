import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Stack from '@mui/material/Stack';

const footerOptions = ['Tingimused', 'Kinkekaart', 'Templikaart', 'Allergeenid', 'Frantsiis', 'Meie lugu', 'Sponsorlus', 'Töökohad', 'Pizzakiosk', 'Privaatsuspoliitika', 'Kontakt']

const Footer = () => {
  return (
    <footer style={{bottom: '0', padding: 30, marginTop: 'auto'}}>
        <span style={{display: 'block', width: 60, height: 60, margin: '50px auto 80px'}}>
            <FacebookRoundedIcon sx={{fontSize: 60}}/>
        </span>
        <Stack direction='row' spacing={3} justifyContent='center'>
            {footerOptions.map((x,i) => <span key={i} style={{fontWeight: '600'}}>{x}</span>)}
        </Stack>
    </footer>
  )
}

export default Footer