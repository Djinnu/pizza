import { useShoppingCart } from '../context/ShoppingCartContext'
import Button from './Button'
import menuItems from "../data/items.json"
import { useState } from 'react'

const buttonContainerStyles = {
    display: "flex",
    marginBottom: "20px"
}

const Filter = () => {
  const {setMenu, handleMainActiveButton, mainActive, t} = useShoppingCart()
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
            <Button mainActive={mainActive} text={t("filter.pitsad")} onClick={(e) => handleClick(e)}/>
            <Button mainActive={mainActive} text={t("filter.joogid")} onClick={(e) => handleClick(e)}/>
            <Button mainActive={mainActive} text={t("filter.magus")} onClick={(e) => handleClick(e)}/>
        </div>
        {(mainActive === 'Pitsad' || mainActive === "Pizza") &&
        <div style={buttonContainerStyles}>
            <Button activeName={activeName} text={t("filter.kõik")} onClick={(e) => {
              setMenu(menuItems)
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text={t("filter.sealiha")} onClick={(e) => {
              setMenu(menuItems.filter(pizza => sealiha.includes(pizza.id)))
              handleActiveButton(e)
            }}/>
            <Button activeName={activeName} text={t("filter.veiseliha")} onClick={(e) => {
              setMenu(menuItems.filter(pizza => veiseliha.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text={t("filter.kanaliha")} onClick={(e) => {
              setMenu(menuItems.filter(pizza => kanalihta.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text={t("filter.taimne")} onClick={(e) => {
              setMenu(menuItems.filter(pizza => taimne.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
            <Button activeName={activeName} text={t("filter.mereannid")} onClick={(e) => {
              setMenu(menuItems.filter(pizza => mereannid.includes(pizza.id)))
              handleActiveButton(e)
              }}/>
        </div>}
    </div>
  )
}

export default Filter