import axios from 'core/axios'
import { displayError } from 'core/errorsWrapper'
import styles from './Login.module.css';
import { useState } from 'react';

function login(email: string) {
  return axios.post('magic-link/create', { email })
}

function DisplayLoginUrl({hash}: {hash: string}) {
  if (!hash) {
    return null
  }

  const url = `http://localhost:3000/magic-link/${hash}`;
  return <a href={url} className="text-red-500 font-bold block text-center mt-10">
    Click to Auto Login    
  </a>
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [hash, setHash] = useState<string>('')
  return <div>
    <div className={`${styles.loginCover} flex justify-center items-center h-screen`}>
      <div className="bg-white border p-10">
        <h1 className="text-center text-xl mb-8">Welcome to TODO App</h1>
        <form className="register-form">
          <input 
            className="outline-none border w-full p-3"
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="on"
            required
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <button className={styles.loginButton} onClick={(e: any) => {
            e.preventDefault();            
            login(email).then((data: any) => {
              setHash(data.hash)
            }).catch(displayError)
          }}>
            Login / Sign up
          </button>
        </form>
        <DisplayLoginUrl hash={hash} />
      </div>
    </div>
  </div>
}

export default Login;