import Grid from '@mui/material/Grid';
import drinkItems from "../data/drinks.json";
import DrinkItem from './DrinkItem';

const Drinks = () => {
    return (
        <Grid container spacing={1} rowSpacing={3}>
            {drinkItems.map((item, i) => {
               return <Grid item xs="auto" key={i}>
                        <DrinkItem {...item} />
                      </Grid>
            })}
        </Grid>
    )
}

export default Drinks