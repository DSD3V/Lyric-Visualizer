import React, { useEffect, useState } from 'react'
import { logIn, signUp } from '../actions/userActions'
import { useDispatch } from 'react-redux'

export const LoginSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const dispatch = useDispatch()
  return (
    <>
      {!register ? (
        <div className='login'>
          <div className='login_container'>
            <input
              type='text'
              className='login_email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail Address'
            />
            <input
              type='password'
              className='login_password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <button
              className='login_btn'
              onClick={() => dispatch(logIn({ email, password }))}
            >
              Login
            </button>
            {/* <button className="login_btn login_google" onClick={signInWithGoogle}>
        Login with Google
      </button> */}
            <div>
              Don't have an account?{' '}
              <div onClick={() => setRegister(true)}>Register</div> now.
            </div>
          </div>
        </div>
      ) : (
        <div className='register'>
          <div className='register_container'>
            <input
              type='text'
              className='register_email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail Address'
            />
            <input
              type='password'
              className='register_password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <button
              className='register_btn'
              onClick={() => dispatch(signUp({ email, password }))}
            >
              Register
            </button>
            {/* <button className="login_btn login_google" onClick={signInWithGoogle}>
        Login with Google
      </button> */}
            <div>
              Already have an account?{' '}
              <div onClick={() => setRegister(false)}>Log in</div> now.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
