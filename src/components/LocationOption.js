import Paper from '@mui/material/Paper';
import { useShoppingCart } from '../context/ShoppingCartContext';

const LocationOption = (loc) => {
  const { setLocation } = useShoppingCart()

  return (
    <div onClick={()=> {
      setLocation(loc)
      loc.onClick(loc)
    }}>
        <Paper sx={{p: 1}}>
            <p style={{fontWeight: 'bold'}}>{loc.name}</p>
            <p>Ooteaeg {loc.waitTime+'m'}</p>
        </Paper>
    </div>
  )
}

export default LocationOption