import Paper from '@mui/material/Paper';
import { useShoppingCart } from '../context/ShoppingCartContext';

const LocationOption = (loc) => {
  const { setLocation, t } = useShoppingCart()

  return (
    <div onClick={()=> {
      setLocation(loc)
      loc.onClick(loc)
    }}>
        <Paper sx={{p: 1, cursor: 'pointer'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p style={{fontWeight: 'bold'}}>{loc.name}</p>
              {loc.distance && <span style={{fontWeight: 'bolder'}}>{loc.distance.toFixed(2)+' km'}</span>}
            </div>
            <p>{t('locationOption.ooteaeg')} {loc.waitTime+'m'}</p>
        </Paper>
    </div>
  )
}

export default LocationOption