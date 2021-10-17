import axios from 'core/axios'

const login = async (e:  React.MouseEvent<HTMLElement>) => {
  try {
    const resp = await axios.post('user/create', {x:'y'})
    console.log(resp);
  } catch (error) {
    console.log(error)
  }
}

const Login = () => {
  return <div className="login">
  <form>
    <div className="">
      <label className="" htmlFor="username">Username</label>
      <input className="" id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
      <label className="" htmlFor="password">Password</label>
      <input className="" id="password" type="password" placeholder="" />
      <p className="">Please choose a password.</p>
    </div>
    <div className="">
      <button className="" type="button" onClick={login}>Sign In</button>
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    ©2020 Acme Corp. All rights reserved.
  </p>
</div>
}

export default Login;