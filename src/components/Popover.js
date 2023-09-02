import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PopoverOption from './PopoverOption';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useState } from 'react';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [img, setImg] = useState("/images/estonia.png")
  const { t } = useShoppingCart()

  const handleFlag = (src) => {
    setImg(src)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} sx={{width: '40px', height: '40px',':hover':{backgroundColor: '#e0e0e0'}}}>
        <img src={img} alt="flag" style={{boxShadow: "0px 0px 5px #888888"}}/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 0 }} style={{borderRadius: "5px"}}>
            <div>
                <span style={{padding: "10px", display: "inline-block", fontWeight: 'bolder'}}>{t("popover.message")}</span>
                <PopoverOption language="Estonian" src="/images/estonia.png" lang="est" handleClose={handleClose} handleFlag={handleFlag}/>
                <PopoverOption language="English" src="/images/united-kingdom.png" lang="en" handleClose={handleClose} handleFlag={handleFlag}/>
            </div>
        </Typography>
      </Popover>
    </div>
  );
}