import React, { useState } from 'react';

import '../../styles/Signin.scss'

import { Link, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import { UserAuth } from '../../firebase/authContext';
import Logout from './Logout';
import Account from './Account';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      setError(error.message)
    }
  };

  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <span>Зачекайте...</span>;
  }

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  if (signInCheckResult.signedIn === false || undefined) {
    return (
      <form className='signin' onSubmit={handleSubmit}>
        <input placeholder='email' className='input' onChange={handleOnChangeEmail} type='email' />
        <input className='input' onChange={handleOnChangePassword} type='password' placeholder='password' />
        <button className="log">Login</button>
      </form>
    );
  };
  return (<>
    <Account />
    <Logout />
  </>)
}

export default Signin;