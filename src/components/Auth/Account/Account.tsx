import React from 'react';
import { UserAuth } from '../../../firebase/authContext';
import './Account.scss';
const Account = () => {
  const { user } = UserAuth();
  return (
    <p className='Email'>Email: {user && user.email}</p>
  );
};

export default Account;