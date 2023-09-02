import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOption from './LocationOption';
import locationOptions from '../data/locations.json'
import Stack from '@mui/material/Stack';
import { NavLink } from "react-router-dom"
import BasicPopover from './Popover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { calculateDistance } from '../utilities/calculateDistance';
import { useShoppingCart } from '../context/ShoppingCartContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 450, 
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

const LocationModule = ({open, handleClose}) => {
  const { loginWithRedirect } = useAuth0()
  const [currentPosition, setCurrentPosition] = useState(null);
  const { t } = useShoppingCart()
  
  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude})
        },
        (error) => console.error("Error getting geolocation:", error.message)
      )
    } else {
      console.error("Geolocation not available");
    }
  }, [])

  const distances = currentPosition ? locationOptions.map((place) => {
    const distance = calculateDistance(
        currentPosition.latitude,
        currentPosition.longitude,
        place.location.latitude,
        place.location.longitude
    );
    return { ...place, distance}
  }) : locationOptions

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <ArrowBackIcon sx={{borderRadius: '50%', fontSize: '38px', padding: '5px', ":hover":{backgroundColor: '#e0e0e0'}}} onClick={handleClose}/>
            <BasicPopover/>
            <NavLink to="/login"
                className= "header-tabs" style={{marginLeft: 'auto'}} onClick={loginWithRedirect}>
            <AccountCircleOutlinedIcon/>
            {t('location.sisene')}
            </NavLink>
        </div>
        <h1 style={{fontSize: '28px', marginBottom: '30px'}}>{t('location.valiAsukoht')}</h1>
        <TextField
            hiddenLabel
            fullWidth
            size="normal"
            id="input-with-icon-textfield"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            ),
            disableUnderline: true
            }}
            variant="filled"
        />
        <Stack spacing={2} mt={2}>
            {distances.map(loc => <LocationOption {...loc} key={loc.id} onClick={handleClose}/>)}
        </Stack>
        </Box>
    </Modal>
  )
}

export default LocationModule