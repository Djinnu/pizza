import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext';

const buttonStyle = {
    width: 38,
    height: 38,
    borderRadius: 38,
    borderStyle: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
}

const CartItem = (item) => {
  const {increaseQuantity, decreaseQuantity} = useShoppingCart()
  console.log(item)
  return (
    <div style={{padding: '10px 0', borderBottom: '1px solid #dcdcdc'}}>
        <div style={{display: 'flex', justifyContent: "space-between"}}>
            <h3>{item.name}</h3>
            <span style={{color: '#cc0000', fontWeight: 'bold'}}>{formatCurrency((item.price+item.extraIngCost) * item.quantity)}</span>
        </div>
        <span style={{fontSize: 12, color: '#959595', fontWeight: 'bold'}}>{item.orderSize} {item.orderSize === "Suur"? '30cm':'20cm'}</span>
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
                <button style={buttonStyle}><RemoveIcon sx={{color: "#cc0000"}} fontSize="small" onClick={()=>decreaseQuantity(item.id)}/></button>
                <span>{item.quantity}</span>
                <button style={buttonStyle} onClick={()=>increaseQuantity(item.id)}><AddIcon color="success" fontSize="small"/></button>
            </div>
        </div>
    </div>
  )
}

export default CartItem