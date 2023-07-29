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
import LocationModule from './LocationModule';

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
            <LocationModule open={open} handleClose={handleClose}/>
        </div>
    </header>
  )
}

export default Header

