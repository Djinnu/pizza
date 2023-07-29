import { useShoppingCart } from '../context/ShoppingCartContext'
import Button from './Button'
import menuItems from "../data/items.json"
import { useState } from 'react'

const buttonContainerStyles = {
    display: "flex",
    marginBottom: "20px"
}

const Filter = () => {
  const {setMenu, handleMainActiveButton, mainActive} = useShoppingCart()
  const mereannid = [11, 28]
  const taimne = [8, 14, 19, 22, 26]
  const kanalihta = [2, 3, 4, 5, 11, 16, 20, 24, 25]
  const veiseliha = [1, 4, 16, 7]
  const sealiha = [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 21, 23, 24, 27]
  const [activeName, setActiveName] = useState('Kõik')


  const handleActiveButton = (e) => {
    const targeted = e.target.innerHTML
    setActiveName(targeted)
  }

  const handleClick = (e) => handleMainActiveButton(e)

  return (
    <div>
        <div style={buttonContainerStyles}>
            <Button mainActive={mainActive} text="Pitsad" onClick={(e) => handleClick(e)}/>
            <Button mainActive={mainActive} text="Joogid" onClick={(e) => handleClick(e)}/>
            <Button mainActive={mainActive} text="Magus" onClick={(e) => handleClick(e)}/>
        </div>
        <div style={buttonContainerStyles}>
            <Button activeName={activeName} text="Kõik" onClick={(e) => {
              setMenu(menuItems)
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text="Sealiha" onClick={(e) => {
              setMenu(menuItems.filter(pizza => sealiha.includes(pizza.id)))
              handleActiveButton(e)
            }}/>
            <Button activeName={activeName} text="Veiseliha" onClick={(e) => {
              setMenu(menuItems.filter(pizza => veiseliha.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text="Kanaliha" onClick={(e) => {
              setMenu(menuItems.filter(pizza => kanalihta.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text="Taimne" onClick={(e) => {
              setMenu(menuItems.filter(pizza => taimne.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text="Mereannid" onClick={(e) => {
              setMenu(menuItems.filter(pizza => mereannid.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
        </div>
    </div>
  )
}

export default Filter