import { createContext, useContext, useState } from 'react';
import location from '../data/locations.json';

const defaultLocation = location[9]

const ShoppingCartContext = createContext({})

//This is the radio that listens for context
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

//This is the radio station that broadcasts the context
export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [location, setLocation] = useState(defaultLocation)

    const addItem = (item) => {
        const newItem = {...item}
        setCartItems([...cartItems, newItem])  
    }

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item => {
            if(item.id === id) {
                let newItem = {...item, quantity: item.quantity + 1}
                return newItem
            }else{
                return item
            }
        }))
    }

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item => {
            if(item.id === id) {
                let newItem = {...item, quantity: item.quantity - 1}
                return newItem
            } else {
                return item
            }
        }))
    }

    return (
        <ShoppingCartContext.Provider value={{addItem, cartItems, increaseQuantity, decreaseQuantity, location, setLocation}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}