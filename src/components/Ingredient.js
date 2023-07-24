import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const buttonStyles = {
    borderRadius: "5px",
    borderStyle: "none",
    width: "32px",
    height: "32px",
    cursor: 'pointer'
}

const buttonDisabled = {
  cursor: 'default',
  opacity: 0.4,
  pointerEvents: 'none',
  borderRadius: "5px",
  borderStyle: "none",
  width: "32px",
  height: "32px",
}

const Ingredient = ({extra, extraIngredient, ingredient, removeIngredients, removedIngredientsCount, addedIngredientsCount, addIngredients, addExtraIngredients, removeExtraIngredients}) => { 
  
  return (
        extra ? <div style={{display: "flex", justifyContent: "space-between", padding: "5px 0px", borderBottom: "1px solid gray", alignItems: "baseline"}}>
                    <div>
                      {extraIngredient.quantity > 0 &&
                      <span style={{marginRight: "15px", color: '#cc0000', fontWeight:'bold'}}>+</span>
                      }
                      <span style={extraIngredient.quantity > 0 ? {fontWeight:'bold'} : {fontWeight: 'normal'}}>{extraIngredient.name}</span>
                    </div>                    
                    <div style={{width: "100px", display: "flex", justifyContent:"flex-end", alignItems:"center", marginRight: 7}}>
                        {extraIngredient.quantity > 0 && 
                        <div>
                          <button style={removedIngredientsCount === 2 ? {...buttonDisabled, color: 'red'} : extraIngredient.quantity === 0 ? {...buttonDisabled, color: 'red'} : {...buttonStyles, color: 'red'}} onClick={()=>removeExtraIngredients(extraIngredient.id)}><RemoveIcon sx={{fontSize:'14px'}}/></button>
                          <span style={{margin: "0 10px"}}>{extraIngredient.quantity}</span>
                        </div>
                        }
                        <button style={addedIngredientsCount === 4 ? {...buttonDisabled, color: 'green' } : extraIngredient.quantity === 3 ? {...buttonDisabled, color: 'green' } : buttonStyles} onClick={()=>addExtraIngredients(extraIngredient.id)}><AddIcon fontSize='14px' color="success"/></button>
                    </div>
                </div> :
                <div style={{display: "flex", justifyContent: "space-between", padding: "5px 0px", borderBottom: "1px solid gray", alignItems: "baseline"}}>
                    <span>{ingredient.name}</span>
                    <div style={{width: "100px", display: "flex", justifyContent:"space-evenly", alignItems:"center"}}>
                        <button style={removedIngredientsCount === 2 ? {...buttonDisabled, color: 'red'} : ingredient.quantity === 0 ? {...buttonDisabled, color: 'red'} : {...buttonStyles, color: 'red'}} onClick={()=>removeIngredients(ingredient.id)}><RemoveIcon sx={{fontSize:'14px'}}/></button>
                        <span style={{margin: "0 10px"}}>{ingredient.quantity}</span>
                        <button style={addedIngredientsCount === 4 ? {...buttonDisabled, color: 'green' } : ingredient.quantity === 3 ? {...buttonDisabled, color: 'green' } : buttonStyles} onClick={()=>addIngredients(ingredient.id)}><AddIcon fontSize='14px' color="success"/></button>
                    </div>
                </div>
  )
}

export default Ingredient