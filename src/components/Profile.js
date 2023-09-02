import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import '../style/profile.css'
import { useShoppingCart } from '../context/ShoppingCartContext';

const Profile = () => {
  const { user, logout, isLoading } = useAuth0();
  const { t } = useShoppingCart()

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div style={{width: 500, margin: '50px auto'}}>
        <Stack direction="row" justifyContent="space-between">
            <h1>{t('profile.tere')}, {user.given_name.toUpperCase()}!</h1>
            <button className="logOut" onClick={()=> logout()}>{t('profile.logOut')}</button>
        </Stack>
        <h3 style={{margin: "30px 0"}}>{t('profile.andmed')}</h3>
        <Stack spacing={2}>
          <TextField label={t("profile.name")} defaultValue={user.given_name}/>
          <TextField label={t("profile.perekonnanimi")} defaultValue={user.family_name}/>
          <TextField label={t("profile.e-mail")} defaultValue={user.email}/>
          <button className='confirm'>{t("profile.kinnita")}</button>
        </Stack>
    </div>
  )
}

export default Profile