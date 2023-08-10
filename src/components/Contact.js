import Stack from '@mui/material/Stack';
import { useShoppingCart } from '../context/ShoppingCartContext';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationModule from './LocationModule';
import { useState } from 'react'


const Contact = () => {
  const {location} = useShoppingCart()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>
        <div>
            <h1 style={{paddingBottom: 30, textAlign: "center", borderBottom: "1px solid #dcdcdc", margin: "0px 15px 40px"}}>Kontakt</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 60}}>
            <section style={{width: 540}}>
                <Stack spacing={3} alignItems="center">
                    <h1 style={{fontSize: '28px', lineHeight: '37px'}}>{location.name}</h1>
                    <p style={{fontSize: '20px'}}>{location.address}</p>
                    <div style={{width: '100%'}}>
                        <Stack direction='row' spacing={2} justifyContent='space-between'>
                            <button style={{width: '80%', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', borderRadius: '10px', border: '1px solid #dcdcdc', backgroundColor: 'white', fontSize: '20px', cursor: 'pointer'}}><LocalPhoneRoundedIcon/>{location.phone}</button>
                            <button style={{width: '15%', borderRadius: '10px', border: '1px solid #dcdcdc', backgroundColor: 'white', cursor: 'pointer'}}><FacebookRoundedIcon/></button>
                        </Stack>
                    </div>
                    <button onClick={handleOpen} style={{width: '100%', fontSize: '20px', padding: '18px', color: 'white', backgroundColor: '#cc0000', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>Vaheta asukohta</button>
                </Stack>
            </section>
            <section style={{width: 540}}>
                <h3 style={{textAlign: "center", borderBottom: '1px solid #dcdcdc', paddingBottom: '16px', marginBottom: '20px'}}>Lahtioleku ajad</h3>
                <Stack gap={2}>
                    {location.open.map((time, i) => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                                <span style={{fontSize: '20px'}}>{time[0]}</span>
                                <span style={{fontSize: '20px', color: '#959595'}}>{time[1]}</span>
                            </div>
                        )
                    })}
                </Stack>
            </section>
            <LocationModule open={open} handleClose={handleClose}/>
        </div>
    </div>
  )
}

export default Contact