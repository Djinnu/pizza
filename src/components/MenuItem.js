import * as React from 'react';
import { formatCurrency } from '../utilities/formatCurrency'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Ingredient from './Ingredient';
import CloseIcon from '@mui/icons-material/Close';
import '../style/menuItem.css'
import { useShoppingCart } from '../context/ShoppingCartContext';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  outline: 0,
  padding: '0 10px 10px 10px',
};

const liha = [["Hakkliha", 1.5], ["Kebab", 2.5], ["Krevetid", 2.5], ["Lihapallid", 2.5], ["Peekon", 0.9], ["Pepperoni", 2.5], ["Salaami", 0.9], ["Sink", 1.5], ["Vorst", 1.5], ["Suitsukana",2.5]]
const taimsed = [["Ananass", 0.9], ["Basiilik", 0.9] , ["Jalapeno", 0.9], ["Kappar", 1.5], ["Kimchi", 2.5], ["Mais", 0.9], ["Mango", 1.5], ["Mustad oliivid", 0.9], ["Paprika", 0.9], ["Tomat", 0.9], ["Marineeritud kurk", 0.9]]
const kastmed = [["BBQ kaste", 1.5], ["Cheddar kaste", 1.5], ["Chipotle kaste", 2.5], ["Holy Cow kaste", 1.5], ["Karri mango kaste", 1.5], ["Mango-jalapeno kaste", 2.5]]
const juust = [["Mozzarella", 2.5], ["Sinihallitusjuust", 0.9], ["Vegan juust", 3.8], ["Suitsujuust", 0.9], ["Juustuäär", 1.5]]


const MenuItem = ({id, name, ingredients, priceSmall, priceLarge, imgUrl}) => {
  const {addItem} = useShoppingCart()
  //const quantity = getItemQuantity(id)

  const ingredientsArr = ingredients.map(x => x[0])
  const newIngredientsArr = ingredients.map((x,i) =>{
    return {
      id: i,
      name: x[0],
      quantity: 1,
      price: x[1]
    }
  })

  //making all available extra ingredients into array of objects to be able to modify them better

  const extraMeat = liha.filter(x => !ingredientsArr.includes(x[0])).map((x, i) => {
    return {
      id: newIngredientsArr.length + i,
      name: x[0],
      quantity: 0,
      price: x[1]
    }
  })

  const extraVeggies = taimsed.filter(x => !ingredientsArr.includes(x[0])).map((x, i) => {
    return {
      id: newIngredientsArr.length + i+ 11,
      name: x[0],
      quantity: 0,
      price: x[1]
    }
  })

  const extraSauce = kastmed.filter(x => !ingredientsArr.includes(x[0])).map((x, i) => {
    return {
      id: newIngredientsArr.length + i + 21,
      name: x[0],
      quantity: 0,
      price: x[1]
    }
  })

  const extraCheese = juust.filter(x => !ingredientsArr.includes(x[0])).map((x, i) => {
    return {
      id: newIngredientsArr.length + i + 31,
      name: x[0],
      quantity: 0,
      price: x[1]
    }
  })
  //one huge state object for extra ingredients
  const extra = {'Liha': extraMeat, 'Taimsed': extraVeggies, 'Kastmed': extraSauce, 'Juust': extraCheese}
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [activeName, setActiveName] = useState('Liha')
  const [orderSize, setOrderSize] = useState("Suur")
  const [removedIngredientsCount, setRemovedIngredientsCount] = useState(0)
  const [addedIngredientsCount, setAddedIngredientsCount] = useState(0)
  const [itemIngredients, setItemIngredients] = useState(newIngredientsArr)
  const [extraIng, setExtraIng] = useState(extra)
  const [extraIngCost, setExtraIngCost] = useState(0)
  const [addedIngredients, setAddedIngredients] = useState([])
  const [removedIngredients, setRemovedIngredients] = useState([])
  const [quantity, setQuantity] = useState(1)

  const handleActiveButton = (e) => {
    const targeted = e.target.innerHTML
    setActiveName(targeted)
  }

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

  const removeExtraIngredients = (id) => {
    let totalSum = extraIngCost
    let foundIngredientArr = extraIng[activeName].map(element=> {
      if(element.id === id) {
        totalSum-=element.price
        return {...element, quantity: element.quantity-1}
      } else {
        return element
      }
    })

    let newExtraIngredientObj = { ...extraIng, [activeName]: foundIngredientArr }
    setExtraIngCost(totalSum)

    let currentAddedCount = addedIngredientsCount
    currentAddedCount--
    setAddedIngredientsCount(currentAddedCount)

    let currentRemovedCount = removedIngredientsCount
    currentRemovedCount++
    setRemovedIngredientsCount(currentRemovedCount)

    setExtraIng(newExtraIngredientObj)

    const foundIngredient = newExtraIngredientObj[activeName].find(element => element.id === id)
    if(foundIngredient.quantity > 1) {
      setAddedIngredients(currItems => {
        return currItems.map(item => {
          if(item.name === foundIngredient.name) {
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      })
    } else {
      setAddedIngredients(addedIngredients.filter(item => item.name !== foundIngredient.name))
    }
  }

  const addExtraIngredients = (id) => {
    let totalSum = extraIngCost

    let foundIngredientArr = extraIng[activeName].map(element => {
      if(element.id === id) {
        totalSum+=element.price
        return {...element, quantity: element.quantity+1}
      } else {
        return element
      }})

    let newExtraIngredientObj = { ...extraIng, [activeName]: foundIngredientArr }
    setExtraIngCost(totalSum)

    let currentAddedCount = addedIngredientsCount
    currentAddedCount++
    setAddedIngredientsCount(currentAddedCount)

    let currentRemovedCount = removedIngredientsCount
    currentRemovedCount--
    setRemovedIngredientsCount(currentRemovedCount)

    setExtraIng(newExtraIngredientObj)

    const foundIngredient = newExtraIngredientObj[activeName].find(element => element.id === id)
    if(foundIngredient.quantity) {
      setAddedIngredients(currItems => {
        if(currItems.find(item => item.name === foundIngredient.name) !== undefined) {
          return currItems.map(item => {
            if(item.name === foundIngredient.name) {
              return {...item, quantity: item.quantity + 1}
            } else {
              return item
            }
          })
        } else {
          return [...currItems, {id, name: foundIngredient.name, quantity: 1, price: foundIngredient.price}]
        }
      })
    }
  }

  const removeIngredients = (id) => {
    let totalSum = extraIngCost
    let foundIngredient = itemIngredients.find(element => element.id === id)
    let newIngredientObj = { ...foundIngredient, quantity: foundIngredient.quantity-1}
    
    if(newIngredientObj.quantity === 0) {
      setRemovedIngredients([...removedIngredients, {id, name: foundIngredient.name, price: foundIngredient.price}])
    } else if(newIngredientObj.quantity > 1) {
      setAddedIngredients(addedIngredients.map(item => {
        if(item.name === newIngredientObj.name) {
          return {...item, quantity: item.quantity - 1}
        } else {
          return item
        }}))
      totalSum -= foundIngredient.price
      setExtraIngCost(totalSum)  
    } else if(newIngredientObj.quantity === 1) {
      setAddedIngredients(addedIngredients.filter(item => item.name !== foundIngredient.name))
      totalSum -= foundIngredient.price
      setExtraIngCost(totalSum)
    }
    
    let currentRemovedCount = removedIngredientsCount
    currentRemovedCount++
    setRemovedIngredientsCount(currentRemovedCount)

    let currentAddedCount = addedIngredientsCount
    currentAddedCount--
    setAddedIngredientsCount(currentAddedCount)

    setItemIngredients(itemIngredients.map(ingredient => ingredient.id === id ? newIngredientObj : ingredient))
  }
  
  const addIngredients = (id) => {
    let totalSum = extraIngCost
    let foundIngredient = itemIngredients.find(element => element.id === id)
    let newIngredientObj = { ...foundIngredient, quantity: foundIngredient.quantity+1}
    if(newIngredientObj.quantity === 1) {
      setRemovedIngredients(currItems => currItems.filter(item => item.id !== id))
    } else if(newIngredientObj.quantity > 1) {
      setAddedIngredients(currItems => {
        if(currItems.find(item => item.name === foundIngredient.name) !== undefined) {
          return currItems.map(item => {
            if(item.name === foundIngredient.name) {
              return {...item, quantity: item.quantity + 1}
            } else {
              return item
            }
          })
        } else {
          return [...currItems, {id, name: foundIngredient.name, price: foundIngredient.price, quantity: 1}]
        }
      })
      totalSum+= newIngredientObj.price
      setExtraIngCost(totalSum)
    }
    let currentRemovedCount = removedIngredientsCount
    currentRemovedCount--
    setRemovedIngredientsCount(currentRemovedCount)

    let currentAddedCount = addedIngredientsCount
    currentAddedCount++
    setAddedIngredientsCount(currentAddedCount)

    setItemIngredients(itemIngredients.map(ingredient => ingredient.id === id ? newIngredientObj : ingredient))
  }
  
  
  return (
    <div>
      <div onClick={handleOpen} style={{width: "275px", display: "flex", flexDirection: "column", alignItems: "center", rowGap: "10px"}}>
        <img src={imgUrl} alt={name} style={{width: "220px", heigth: "220px" }}/>
        <h3>{name}</h3>
        <p style={{fontSize: "12px", color: "rgb(149, 149, 149)", fontWeight: "bold", textAlign: "center"}}>{ingredients.map(x=> x[0]).join(", ")}</p>
        <span style={{fontSize: "14px", color: "rgb(204, 0, 0)", fontWeight: "bold"}}>alates {formatCurrency(priceSmall)}</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ height: 450, overflowX: 'hidden', overflowY: 'auto', padding: '30px 15px'}}>
              <div style={{position: 'relative', right: "-1rem", top: "-1rem"}}>
                <Box sx={{borderRadius: "50%", position: "absolute", right:"2rem", top:"1rem", width:"30px", height:"30px", border: "1px solid #e2e2e2", padding: "4px 4px", cursor: "pointer", backgroundColor: "white", '&:hover': {backgroundColor: '#dcdcdc'}}} 
                  onClick={handleClose}><CloseIcon fontSize='small'/></Box>
              </div>
              <div>
                <h1 style={{textAlign: 'center'}}>{name}</h1>
                <img src={imgUrl} alt={name} style={{width: 220, heigth: 220, display: 'block', margin: "0 auto"}}/>
                <p style={{fontSize: 14, textAlign: 'center', fontWeight: 600, marginBottom: 30}}>{ingredients.map(x=> x[0]).join(", ")}</p>
              </div>
              <div style={{textAlign: 'center', marginBottom: 10}}>
                <Button text="Suur 30cm" orderSize={orderSize} onClick={()=>setOrderSize("Suur")}/>
                <Button text="Väike 20cm" orderSize={orderSize} onClick={()=>setOrderSize("Väike")}/>
              </div>
              <div>
                <h3>Pitsa koostis</h3>
                <p style={{fontSize: 12, color: '#999999', fontWeight: 'bolder'}}>Eemalda kuni 2 asja</p>
                {itemIngredients.map(ingredient => {
                  return (
                    <Ingredient
                      ingredient={ingredient}
                      key={ingredient.id}
                      removeIngredients={removeIngredients}
                      removedIngredientsCount={removedIngredientsCount}
                      addIngredients={addIngredients}
                      addedIngredientsCount={addedIngredientsCount}/>
                  )
                })}
              </div>
              <div>
                <h3>Lisa koostisosa</h3>
                <p style={{fontSize: 12, color: '#999999', fontWeight: 'bolder'}}>Lisa kuni 4tk</p>
                <div style={{margin: "10px 0px"}}>
                  <Button text="Liha" onClick={(e)=>{
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  <Button text="Taimsed" onClick={(e)=>{
                    handleActiveButton(e)}} activeName={activeName}></Button>
                  <Button text="Kastmed" onClick={(e)=>{
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  <Button text="Juust" onClick={(e)=>{
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  {extraIng[activeName].map((extraIngredient, i) => {
                    return (
                      <Ingredient
                        extra={true} 
                        extraIngredient={extraIngredient} 
                        key={extraIngredient.id}
                        removedIngredientsCount={removedIngredientsCount}
                        addExtraIngredients={addExtraIngredients}
                        addedIngredientsCount={addedIngredientsCount}
                        removeExtraIngredients={removeExtraIngredients}/>
                    )
                  })}
                </div>
              </div>
            </div>
            <div style={{display: "flex", heigth: "62px", justifyContent: "space-between", marginTop: '15px'}}>
              <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", borderRadius: 50, border: "1px solid #dcdcdc"}}>
                <button className={quantity === 1 ? "btn-disabled" : "btn-footer"} onClick={()=> decreaseQuantity()}><RemoveIcon sx={{color: "#cc0000"}} fontSize="small"/></button>
                <span>{quantity}</span>
                <button className="btn-footer" onClick={()=> increaseQuantity()}><AddIcon color="success" fontSize="small"/></button>
              </div>
              <Button text={orderSize === 'Suur' ? 'Lisa ostukorvi ' + formatCurrency((priceLarge + extraIngCost) * quantity)  : 'Lisa ostukorvi ' + formatCurrency((priceSmall + extraIngCost) * quantity)}
              active={true} 
              onClick={()=> {
                addItem({id, name, addedIngredients, removedIngredients, orderSize, quantity, extraIngCost, price: orderSize === "Suur" ? priceLarge + extraIngCost : priceSmall + extraIngCost})
                handleClose()}}></Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default MenuItem