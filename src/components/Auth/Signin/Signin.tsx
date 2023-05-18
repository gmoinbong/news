import React, { useState } from 'react';

import './Signin.scss'

import { useSigninCheck } from 'reactfire';
import { UserAuth } from '../../../firebase/authContext';
import Logout from '../Logout';
import Account from '../Account';



const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(email, password)
      setEmail('')
      setPassword('')
    } catch (error: any) {
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