import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <img src="/images/estonia.png" alt="flag"/>
      </Button>
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