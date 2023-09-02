import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useShoppingCart } from '../context/ShoppingCartContext';

const Footer = () => {
  const { t } = useShoppingCart()
  const footerOptions = [t('footer.tingimused'), t('footer.kinkekaart'), t('footer.templikaart'), t('footer.allergeenid'), t('footer.frantsiis'), t('footer.meieLugu'), t('footer.sponsorlus'), t('footer.töökohad'), t('footer.pizzakiosk'), t('footer.privaatsus'), t('footer.kontakt')]

  return (
    <footer style={{bottom: '0', padding: 30, marginTop: 'auto'}}>
        <Link to="https://www.facebook.com/pizzakiosk.ee/" target="_blank">
           <span style={{display: 'block', width: 60, height: 60, margin: '50px auto 80px'}}>
            <FacebookRoundedIcon sx={{fontSize: 60}}/>
          </span>
        </Link>
        <Stack direction='row' spacing={3} justifyContent='center'>
            {footerOptions.map((x,i) => <span key={i} style={{fontWeight: '600', cursor: 'pointer'}}>{x}</span>)}
        </Stack>
    </footer>
  )
}

export default Footer