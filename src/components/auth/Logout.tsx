import React from 'react';
import { UserAuth } from '../../firebase/authContext';
import '../../styles/Signin.scss';
const Logout = () => {
  const { logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
    }
  };

  return (
    <button className='logout' onClick={handleLogout} >
      Вихід
    </button>
  );
};

export default Logout;