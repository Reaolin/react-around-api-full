import { React, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register ({handleRegistration}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password);
    if (localStorage.getItem('jwt')) {
      history.push('/');
    }
  }

 

  return (
    <div className="login">
      <form action="#" onSubmit={handleSubmit} className="form">
        <h2 className="login__title">Sign up</h2>
        <input required className="form__username-input"  name="email" type="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input required className="form__username-input"  name="password" type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="login__button">Sign up!</button>
        <Link to="/signin" className="login__subtext">Already a member?  Log in here!</Link>
      </form>
    </div>
  )
}

export default Register;