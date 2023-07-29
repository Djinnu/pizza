import { useState } from 'react'
import CarouselComponent from './CarouselComponent'
import Filter from './Filter'
import Menu from './Menu'
import { useShoppingCart } from '../context/ShoppingCartContext'
import Drinks from './Drinks'

const Main = () => {
  const {mainActive} = useShoppingCart()

  return (
    <main>
        <CarouselComponent/>
        <Filter/>
        {mainActive === "Joogid" ? <Drinks/> : <Menu/>}
    </main>
  )
}

export default Main