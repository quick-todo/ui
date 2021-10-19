import axios from 'core/axios'
import styles from './Login.module.css';

import { useState } from 'react';

const login = async (email: string) => {
  try {
    const resp = await axios.post('magic-link/create', { email })
    console.log(resp);
  } catch (error) {
    console.log(error)
  }
}


const Login = () => {
  const [email, setEmail] = useState<string>('')

  return <div className={styles.cover}>
    <div className={styles.loginWrapper}>
    <h2>Welcome To Quick TODO</h2>
      <div className="">
        <label htmlFor="username">Email</label>
        <input 
          type="text" 
          className={styles.emailInput}
          placeholder="Email"
          value={email} 
          onInput={(e: any) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={(e) => login(email)}>Login / Sing up</button>
      </div>
    </div>
  </div>
}

export default Login;