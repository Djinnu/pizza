import MenuItem from './MenuItem'
import Grid from '@mui/material/Grid';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Menu = () => {
  const {menu} = useShoppingCart()

  return (
    <Grid container spacing={1}>
        {menu.map((item, i) => {
           return <Grid item xs="auto" key={i}>
                    <MenuItem {...item} />
                  </Grid>
        })}
    </Grid>
  )
}

export default Menu
