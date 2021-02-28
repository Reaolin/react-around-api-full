import { React, useState } from 'react';
import { Link, useHistory} from 'react-router-dom'

function Login ({handleLogin}) {

    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
  
    const history = useHistory();
  
    function handleSubmit(e) {
      e.preventDefault();
      console.log(username, password);
      handleLogin(username, password);
      if(localStorage.getItem('jwt')) {
        history.push('/');
      }
    }
  
  
    return (
      <div className="login">
        <form action="#" className="form" onSubmit={handleSubmit}>
          <h3 className="login__title">Log In</h3>
          <input className="form__username-input" type="email"  name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Email" required />
          <input className="form__username-input" type="password" name="password"  value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" className="login__button">Log in</button>
          <div>
            <Link to="signup" className="login__subtext">Not a member yet? Sign up here!</Link>
          </div>
        </form>
      </div>
    )
  }
  
  export default Login;