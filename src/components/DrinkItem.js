import Stack from '@mui/material/Stack';
import '../style/drinkItem.css'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency'


const DrinkItem = ({id, name, price, imgUrl}) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem, t } = useShoppingCart()

  const increaseQuantity = () => {
    let currQuantity = quantity
    currQuantity++
    setQuantity(currQuantity)
  }

  const decreaseQuantity = () => {
    let currQuantity = quantity
    currQuantity--
    setQuantity(currQuantity)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 275, heigth: 338, alignItems: 'center', gap: '10px'}}>
        <img style={{width: 220, height: 220}} src={imgUrl} alt={name}/>
        <h3 style={{fontFamily: 'Lora, serif'}}>{name}</h3>
        <p style={{color: '#cc0000', fontWeight: 'bolder'}}>{formatCurrency(price)}</p>
        <Stack direction='row' spacing={2}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 50, border: "1px solid #dcdcdc", height: 32}}>
            <button className={quantity === 1 ? "btn-drink-disabled" : "btn-drink"} onClick={()=>decreaseQuantity()}><RemoveIcon sx={{color: "#cc0000"}} fontSize="xs"/></button>
            <span>{quantity}</span>
            <button className="btn-drink" onClick={()=>increaseQuantity()}><AddIcon color="success" fontSize="xs"/></button>
          </div>
          <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#cc0000', border: 'none', borderRadius: '4px', padding: '4px 15px', gap: '5px', cursor: 'pointer'}}
            onClick={()=> {addItem({id, name, price, quantity, removedIngredients: [], addedIngredients: [], extraIngCost: 0})
                           setQuantity(1)}}>
            <ShoppingBasketOutlinedIcon/>
            {t('drinks.lisa')}
          </button>
        </Stack>
    </div>
  )
}

export default DrinkItem