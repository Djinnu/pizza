import { useState } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import BasicPopover from './Popover';
import '../style/header.css'
import { NavLink } from "react-router-dom"
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOption from './LocationOption';
import locationOptions from '../data/locations.json'
import Stack from '@mui/material/Stack';

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


const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {cartItems, location, setLocation} = useShoppingCart()
  const totalCost = cartItems.reduce((acc, c) => acc + ((c.price + c.extraIngCost) * c.quantity), 0)

  return (
    <header>
        <div className="left-header">
            <div className="logo">
              <img src="/images/PizzaKiosk.jpg" alt="lul"/>
            </div>
            <div className="header-tabs" style={{border: "1px solid #e0e0e0"}} onClick={handleOpen}>
              <LocationOnOutlinedIcon/>
              <span className="header-span">{location.name}</span>
            </div>
        </div>
        <div className="right-header">
            <NavLink to="/" 
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <LocalPizzaOutlinedIcon/>
                Tellimus
            </NavLink>
            <NavLink to="/contact" 
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <PlaceOutlinedIcon/>
                Kontakt
            </NavLink>
            <NavLink to="/login"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <AccountCircleOutlinedIcon/>
                Sisene
            </NavLink>
            <NavLink to="/cart"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <ShoppingBasketOutlinedIcon/>
                Ostukorv <span style={{color: "#959595"}}>{formatCurrency(totalCost)}</span>
            </NavLink>
            <BasicPopover/>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <ArrowBackIcon sx={{borderRadius: '50%', fontSize: '38px', padding: '5px', ":hover":{backgroundColor: '#e0e0e0'}}}/>
                  <BasicPopover/>
                  <NavLink to="/login"
                        className= "header-tabs" style={{marginLeft: 'auto'}}>
                    <AccountCircleOutlinedIcon/>
                    Sisene
                  </NavLink>
                </div>
                <h1 style={{fontSize: '28px', marginBottom: '30px'}}>Vali asukoht</h1>
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
                  {locationOptions.map(loc => <LocationOption {...loc} key={loc.id} onClick={handleClose}/>)}
                </Stack>
              </Box>
            </Modal>
        </div>
    </header>
  )
}

export default Header

