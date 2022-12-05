import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../actions/authActions';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setError('')
    dispatch(signupUser(email, password));
    navigate("/account");
  }

  return (
    <>
      <div className='mx-auto px-4 max-w-md w-full'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {error ? <p className='bg-red-300 p-3 my-2'>{error}</p> : null}
        <form onSubmit={handleSubmit} >
          <div className='my-4'>
            <label className='text-secondary'>Email</label>
            <div className='my-2 w-full relative rounded-[15px]'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full py-2 px-6 bg-primary border border-accent rounded-[15px]'
                type='email'
              />
              <AiOutlineMail className='absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary' />
            </div>
          </div>
          <div className='my-4'>
            <label className='text-secondary'>Password</label>
            <div className='my-2 w-full relative'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full py-2 px-6 bg-primary border border-accent rounded-[15px]'
                type='password'
              />
              <AiFillLock className='absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary' />
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-[15px]'>
            Sign up
          </button>
        </form>
        <p className='my-4 text-center'>
        <span className="text-secondary">Already have an account?{' '}</span>
          
          <Link to='/signin' className='text-primary'>
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Signup