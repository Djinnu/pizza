import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import '../style/shoppingCart.css'
import { formatCurrency } from '../utilities/formatCurrency';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

const containerStyle = {
    width: "30%"
}

const drinks = [['Coca-Cola 0,5l', 1.20, 1], ['Fanta 0,5L', 1.20, 5], ['Sprite 0.5L', 1.20, 13], ['Vesi gaasiga 0,5L', 1.05, 9], ['Vesi gaasita 0,5L', 1.05, 10]]

const ShoppingCart = () => {
  const {cartItems, location, addItem} = useShoppingCart()  
  const totalCost = cartItems.reduce((acc, c) => acc + ((c.price + c.extraIngCost) * c.quantity), 0)  

  return (
    <div>
        <div>
            <h1 style={{paddingBottom: 30, textAlign: "center", borderBottom: "1px solid #dcdcdc", margin: "0px 15px 40px"}}>Ostukorv({cartItems.length})</h1>
        </div>
        {cartItems.length === 0 ? <div style={{margin: '50px auto', width: 600}}>
                                    <Stack spacing={3} alignItems='center'>
                                        <h2>Sinu ostukorv on hetkel tühi</h2>
                                        <Link to="/">
                                            <button style={{padding: '20px 10px', fontSize: '20px', fontWeight: '500', borderRadius: '10px', borderStyle: 'none', backgroundColor: '#cc0000', color: "white", cursor: 'pointer'}}>Menüüsse tagasi</button>
                                        </Link>
                                    </Stack>
                                  </div> : 
        <div style={{display: "flex", justifyContent: "center", gap: "2%"}}>
            <div style={containerStyle}>
                <div style={{paddingBottom: "35px", borderBottom: "1px solid #dcdcdc"}}>
                    <h2 style={{paddingBottom: '15px'}}>Kiosk</h2>
                    <h3>{location.name}</h3>
                </div>
                <div style={{marginTop: 25}}>
                    <h2 style={{paddingBottom: 15}}>Kättesaamisaeg</h2>
                    <span>Kolmapäev 07.06</span>
                    <span>10:30</span>
                </div>
            </div>
            <div style={containerStyle}>
                <h2>Tellimuse kokkuvõte</h2>
                {cartItems.map(item => (
                        <CartItem key={item.id} {...item}/>
                    ))}
                <div>
                    <h2 style={{marginTop: 10}}>Pizzakiosk soovitab</h2>
                    <section>
                        <Stack>
                            {drinks.map((drink, i) => (
                                <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dcdcdc', padding: '7px 0px'}}>
                                    <span style={{fontWeight: 'bolder'}}>{drink[0]}</span>
                                    <div style={{display: 'flex', gap: 15, alignItems: 'center'}}>
                                        <span style={{color: '#cc0000', fontWeight: 'bolder'}}>{formatCurrency(drink[1])}</span>
                                        <button className='drinkOptions' 
                                            onClick={() => addItem({name: drink[0], price: drink[1], quantity: 1, id: drink[2], removedIngredients: [], addedIngredients: [], extraIngCost: 0})}>
                                                <AddIcon sx={{fontSize: '16px', color: '#158d00'}} /></button>
                                    </div>  
                                </div>
                            ))}
                        </Stack>
                    </section>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 40}}>
                        <h2>Kokku</h2>
                        <span style={{fontSize: 22, color: '#cc0000'}}>{formatCurrency(totalCost)}</span>
                    </div>
                    <button className='purchase'><ShoppingBasketOutlinedIcon/>Makse</button>
                </div>
            </div> 
        </div>}
    </div>
    
  )
}

export default ShoppingCart