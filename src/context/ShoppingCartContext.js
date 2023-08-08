import { createContext, useContext, useState, useEffect } from 'react';
import location from '../data/locations.json';
import menuItems from "../data/items.json"
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultLocation = location[9]

const ShoppingCartContext = createContext({})

//This is the radio that listens for context
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

//This is the radio station that broadcasts the context
export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('shopping-cart', [])
    const [location, setLocation] = useState(()=> {
        const data = localStorage.getItem('MY_LOCATION')
        if(data !== null) return JSON.parse(data)
        return defaultLocation}
    )    
    const [menu, setMenu] = useState(menuItems)
    const [mainActive, setMainActive] = useState("Pitsad")

    useEffect(() => {
        localStorage.setItem('MY_LOCATION', JSON.stringify(location))
    }, [location])


    const handleMainActiveButton = (e) => {
        const targeted = e.target.innerHTML
        setMainActive(targeted)
    }

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
        <ShoppingCartContext.Provider value={{addItem, cartItems, increaseQuantity, decreaseQuantity, location, setLocation, menu, setMenu, mainActive, handleMainActiveButton}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}