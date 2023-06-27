import React from 'react'
import menuItems from "../data/items.json"
import MenuItem from './MenuItem'
import Grid from '@mui/material/Grid';

const Menu = () => {
  return (
    <Grid container spacing={1}>
        {menuItems.map((item, i) => {
           return <Grid item xs="auto" key={i}>
                    <MenuItem {...item} />
                  </Grid>
        })}
    </Grid>
  )
}

export default Menu
