import { useState } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import BasicPopover from './Popover';
import '../style/header.css'
import { NavLink, Link } from "react-router-dom"
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency'
import LocationModule from './LocationModule';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const {cartItems, location, t} = useShoppingCart()
  const totalCost = cartItems.reduce((acc, c) => acc + ((c.price + c.extraIngCost) * c.quantity), 0)

  return (
    <header>
        <div className="left-header">
            <div className="logo" style={{marginRight: 30}}>
              <Link to ="/">
                <img src="/images/PizzaKiosk.jpg" alt="logo"/>
              </Link>
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
                  {t("header.tellimus")}        
            </NavLink>
            <NavLink to="/contact" 
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <PlaceOutlinedIcon/>
                {t("header.kontakt")}
            </NavLink>
              {isAuthenticated ? <NavLink to="/profile"
                                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                                    <div style={{display: 'flex', alignItems:'center', gap: 5}}>
                                      <AccountCircleOutlinedIcon/>
                                      {t("header.profiil")}
                                    </div>  
                                </NavLink> :
                                <NavLink to="/login"
                                            className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                                    <div style={{display: 'flex', alignItems:'center', gap: 5}} onClick={() => loginWithRedirect()}>
                                      <AccountCircleOutlinedIcon/>
                                      {t("header.sisene")}
                                    </div>  
                                </NavLink>
            }
            <NavLink to="/cart"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "header-tabs active" : "header-tabs"}>
                <ShoppingBasketOutlinedIcon/>
                {t("header.ostukorv")} <span style={{color: "#959595"}}>{formatCurrency(totalCost)}</span>
            </NavLink>
            <BasicPopover/>
            <LocationModule open={open} handleClose={handleClose}/>
        </div>
    </header>
  )
}

export default Header

