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
  return <a href={`http://localhost:3000/magic-link/${hash}`}>
    Click to autoLogin
  </a>
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [hash, setHash] = useState<string>('')

  return <div>
    <div className={styles.loginCover}>
      <div className={styles.loginFormCover}>
        <form className="register-form">
          <input 
            className={styles.input}
            type="email" 
            placeholder="Email"
            value={email}
            required={true}
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