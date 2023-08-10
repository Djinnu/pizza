import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Stack from '@mui/material/Stack';

const Profile = () => {
  const { user, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div style={{width: 500, margin: '50px auto'}}>
        <Stack direction="row" justifyContent="space-between">
            <h1>Tere, {user.given_name.toUpperCase()}!</h1>
            <button onClick={()=> logout()}>Logi välja</button>
        </Stack>
    </div>
  )
}

export default Profile