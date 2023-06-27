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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const liha = ["Hakkliha", "Kebab", "Krevetid", "Lihapallid", "Peekon", "Pepperoni", "Salaami", "Sink", "Vorst", "Suitsukana"]
const taimsed = ["Ananass", "Basiilik", "Jalapeno", "Kappar", "Kimchi", "Mais", "Mango", "Mustad oliivid", "Paprika", "Tomat", "Marineeritud kurk"]
const kastmed = ["BBQ kaste", "Cheddar kaste", "Chipotle kaste", "Holy Cow kaste", "Karri mango kaste", "Mango-jalapeno kaste"]
const juust = ["Mozzarella", "Sinihallitusjuust", "Vegan juust", "Suitsujuust", "Juustuäär"]

const MenuItem = ({id, name, ingredients, priceSmall, priceLarge, imgUrl}) => {
  const ingredientsArr = ingredients.split(", ")
  const newIngredientsArr = ingredientsArr.map((x,i) =>{
    return {
      id: i,
      name: x,
      quantity: 1
    }
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [active, setActive] = useState(liha)
  const [activeName, setActiveName] = useState('liha')
  const [orderSize, setOrderSize] = useState("Suur")
  const [removedIngredientsCount, setRemovedIngredientsCount] = useState(0)
  const [addedIngredientsCount, setAddedIngredientsCount] = useState(0)
  const [itemIngredients, setItemIngredients] = useState(newIngredientsArr)

  
  const extraIngredientsArr = active.filter(x => !ingredientsArr.includes(x)).map((x, i) => {
    return {
      id: newIngredientsArr.length + i,
      name: x,
      quantity: 0
    }
  })

  const [extraIngredients, setExtraIngredients] = useState(extraIngredientsArr)

  const handleActiveButton = (e) => {
    const targeted = e.target.innerHTML
    setActiveName(targeted)
  }

  const addExtraIngredients = (id) => {
    let foundIngredient = extraIngredients.find(element => element.id === id)
    let newIngredientObj = { ...foundIngredient, quantity: foundIngredient.quantity+1}
    if(newIngredientObj.quantity > 0) {
      let currentCount = addedIngredientsCount
      currentCount++
      setAddedIngredientsCount(currentCount)
    }
    setExtraIngredients(extraIngredients.map(ingredient => ingredient.id === id ? newIngredientObj : ingredient))
  }

  const removeIngredients = (id) => {
    let foundIngredient = itemIngredients.find(element => element.id === id)
    let newIngredientObj = { ...foundIngredient, quantity: foundIngredient.quantity-1}
    if(newIngredientObj.quantity === 0) {
      let currentCount = removedIngredientsCount
      currentCount++
      setRemovedIngredientsCount(currentCount)
    } else if(newIngredientObj.quantity >= 1) {
      let currentCount = addedIngredientsCount
      currentCount--
      setAddedIngredientsCount(currentCount)
    }
    setItemIngredients(itemIngredients.map(ingredient => ingredient.id === id ? newIngredientObj : ingredient))
  }
  
  const addIngredients = (id) => {
    let foundIngredient = itemIngredients.find(element => element.id === id)
    let newIngredientObj = { ...foundIngredient, quantity: foundIngredient.quantity+1}
    if(newIngredientObj.quantity === 1) {
      let currentCount = removedIngredientsCount
      currentCount--
      setRemovedIngredientsCount(currentCount)
    } else if(newIngredientObj.quantity > 1) {
      let currentCount = addedIngredientsCount
      currentCount++
      setAddedIngredientsCount(currentCount)
    }
    setItemIngredients(itemIngredients.map(ingredient => ingredient.id === id ? newIngredientObj : ingredient))
  }
  
  console.log(removedIngredientsCount, addedIngredientsCount)
  return (
    <div onClick={handleOpen} style={{width: "275px", display: "flex", flexDirection: "column", alignItems: "center", rowGap: "10px"}}>
        <img src={imgUrl} alt={name} style={{width: "220px", heigth: "220px" }}/>
        <h3>{name}</h3>
        <p style={{fontSize: "12px", color: "rgb(149, 149, 149)", fontWeight: "bold", textAlign: "center"}}>{ingredients}</p>
        <span style={{fontSize: "14px", color: "rgb(204, 0, 0)", fontWeight: "bold"}}>alates {formatCurrency(priceSmall)}</span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{height: 450, overflow: 'auto', padding: '1rem'}}>
              <div style={{position: 'relative', right: "-1rem", top: "-1rem"}}>
                <Box sx={{borderRadius: "50%", position: "absolute", right:"2rem", top:"1rem", width:"30px", height:"30px", border: "1px solid #e2e2e2", padding: "4px 4px", cursor: "pointer", backgroundColor: "white", '&:hover': {backgroundColor: '#dcdcdc'}}}><CloseIcon fontSize='small'/></Box>
              </div>
              <div>
                <h1 style={{textAlign: 'center'}}>{name}</h1>
                <img src={imgUrl} alt={name} style={{width: 220, heigth: 220, display: 'block', margin: "0 auto"}}/>
                <p style={{fontSize: 14, textAlign: 'center', fontWeight: 600, marginBottom: 30}}>{ingredients}</p>
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
                    setActive(liha)
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  <Button text="Taimsed" onClick={(e)=>{
                    setActive(taimsed)
                    handleActiveButton(e)}} activeName={activeName}></Button>
                  <Button text="Kastmed" onClick={(e)=>{
                    setActive(kastmed)
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  <Button text="Juust" onClick={(e)=>{
                    setActive(juust)
                    handleActiveButton(e)
                    }} activeName={activeName}></Button>
                  {extraIngredientsArr.map((extraIngredient, i) => {
                    return (
                      <Ingredient
                        extra={true} 
                        extraIngredient={extraIngredient} 
                        key={extraIngredient.id}
                        removeIngredients={removeIngredients}
                        removedIngredientsCount={removedIngredientsCount}
                        addExtraIngredients={addExtraIngredients}
                        addedIngredientsCount={addedIngredientsCount}/>
                    )
                  })}
                </div>
              </div>
            </div>
            <div style={{display: "flex", heigth: "62px", justifyContent: "space-between", padding: 10}}>
              <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", borderRadius: 50, border: "1px solid #dcdcdc"}}>
                <button className="btn-footer"><RemoveIcon sx={{color: "red"}} fontSize="small"/></button>
                <span>1</span>
                <button className="btn-footer"><AddIcon color="success" fontSize="small"/></button>
              </div>
              <Button text={orderSize === 'Suur' ? 'Lisa ostukorvi ' + formatCurrency(priceLarge) : 'Lisa ostukorvi ' + formatCurrency(priceSmall)} active={true}></Button>
            </div>
          </Box>
        </Modal>
    </div>
  )
}

export default MenuItem