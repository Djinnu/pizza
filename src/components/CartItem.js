import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


const buttonStyle = {
    width: 38,
    height: 38,
    borderRadius: 38,
    borderStyle: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
}

const CartItem = (item) => {
  const [open, setOpen] = useState(false);  
  const {increaseQuantity, decreaseQuantity, setCartItems, cartItems} = useShoppingCart()
  const handleClickOpen = () => setOpen(true)
  const handleClose = (e) => {
    if(e.target.innerText === "TÜHISTA") {
      setOpen(false)
    } else {
      setCartItems(cartItems.filter(x => x.id !== item.id))
      setOpen(false)
    }
  }

  
  return (
    <div style={{padding: '10px 0', borderBottom: '1px solid #dcdcdc'}}>
        <div style={{display: 'flex', justifyContent: "space-between"}}>
            <h3>{item.name}</h3>
            <span style={{color: '#cc0000', fontWeight: 'bold'}}>{formatCurrency((item.price+item.extraIngCost) * item.quantity)}</span>
        </div>
        {item.orderSize &&<span style={{fontSize: 12, color: '#959595', fontWeight: 'bold'}}>{item.orderSize} {item.orderSize === "Suur"? '30cm':'20cm'}</span>}
        {item.removedIngredients.length > 0 || item.addedIngredients.length > 0 ?
        <div>
            <h4 style={{fontSize: '12px', marginTop: '10px', marginBottom: '5px'}}>Lisad</h4>
            {item.removedIngredients.map(x => {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span><RemoveIcon sx={{color: '#cc0000', width: '14px', height: '14px'}}/></span>
                    <span style={{color: '#cc0000', fontSize: '12px', fontWeight: 'bold'}}>{x.name}</span>
                </div>
            )
            })}
            {item.addedIngredients.map(x => {
            return (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span><AddIcon sx={{width: '14px', height: '14px', color: '#000000', opacity: 1}}/></span>
                        <span style={{color: 'black', fontSize: '12px', fontWeight: 'bold'}}>{x.name}</span>
                    </div>
                    <span style={{fontSize: '12px', fontWeight: 'bold', color: '#cc0000'}}>{formatCurrency(x.price)}</span>
                </div>
            )
            })}
        </div>
        : ""}
        <div style={{marginTop: '10px'}}>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", borderRadius: 38, border: "1px solid #dcdcdc", width: 105}}>
                <button style={buttonStyle}><RemoveIcon sx={{color: "#cc0000"}} fontSize="small" onClick={()=>{
                    console.log(item.quantity)
                    if(item.quantity === 1) {
                        handleClickOpen()
                    } else {
                        decreaseQuantity(item.id)
                    }                  
                }}/></button>
                <span>{item.quantity}</span>
                <button style={buttonStyle} onClick={()=>increaseQuantity(item.id)}><AddIcon color="success" fontSize="small"/></button>
            </div>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            {"HOIATUS"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Kas soovid tõesti selle üksuse eemaldada?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={(e) => {
                handleClose(e)}}>TÜHISTA</Button>
            <Button onClick={handleClose} autoFocus>
                KINNITA
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default CartItem