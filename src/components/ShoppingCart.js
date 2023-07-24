import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"

const containerStyle = {
    width: "30%"
}

const ShoppingCart = () => {
  const {cartItems, location} = useShoppingCart()  

  return (
    <div>
        <div>
            <h1 style={{paddingBottom: 30, textAlign: "center", borderBottom: "1px solid #dcdcdc", margin: "40px 15px"}}>Ostukorv({cartItems.length})</h1>
        </div>
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
                        <CartItem {...item}/>
                    ))}
                <h2>Pizzakiosk soovitab</h2>
            </div>
        </div>
    </div>
    
  )
}

export default ShoppingCart