import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PopoverOption from './PopoverOption';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <img src="/images/estonia.png" alt="flag" style={{boxShadow: "0px 0px 5px #888888"}}/>
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
                <span style={{padding: "10px", display: "inline-block"}}>Vali keel</span>
                <PopoverOption language="Estonian" src="/images/estonia.png"/>
                <PopoverOption language="English" src="/images/united-kingdom.png"/>
                <PopoverOption language="Russian" src="/images/russia.png"/>
                <PopoverOption language="Finnish" src="/images/finland.png"/>
                <PopoverOption language="Swedish" src="/images/sweden.png"/>
            </div>
        </Typography>
      </Popover>
    </div>
  );
}