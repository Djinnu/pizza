import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOption from './LocationOption';
import locationOptions from '../data/locations.json'
import Stack from '@mui/material/Stack';
import { NavLink } from "react-router-dom"
import BasicPopover from './Popover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 450, 
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

const LocationModule = ({open, handleClose}) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <ArrowBackIcon sx={{borderRadius: '50%', fontSize: '38px', padding: '5px', ":hover":{backgroundColor: '#e0e0e0'}}}/>
            <BasicPopover/>
            <NavLink to="/login"
                className= "header-tabs" style={{marginLeft: 'auto'}}>
            <AccountCircleOutlinedIcon/>
            Sisene
            </NavLink>
        </div>
        <h1 style={{fontSize: '28px', marginBottom: '30px'}}>Vali asukoht</h1>
        <TextField
            hiddenLabel
            fullWidth
            size="normal"
            id="input-with-icon-textfield"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            ),
            disableUnderline: true
            }}
            variant="filled"
        />
        <Stack spacing={2} mt={2}>
            {locationOptions.map(loc => <LocationOption {...loc} key={loc.id} onClick={handleClose}/>)}
        </Stack>
        </Box>
    </Modal>
  )
}

export default LocationModule