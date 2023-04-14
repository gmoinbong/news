import React from 'react';
import { UserAuth } from '../../firebase/authContext';
import '../../styles/Auth.scss';
const Account = () => {
  const { user } = UserAuth();
  return (
    <p className='Email'>Email: {user && user.email}</p>
  );
};

export default Account;