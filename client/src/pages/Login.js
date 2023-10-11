import {React, useState} from 'react';
import Icon from 'react-icons-kit';
import {view} from 'react-icons-kit/ikons/view';
import {view_off} from 'react-icons-kit/ikons/view_off';
import axios from 'axios';

function Login() {
  const [type, setType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const data = {
      username: username,
      password: password
    }

    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
      else {
        sessionStorage.setItem("accessToken", response.data);
      }
    });
  };

  return (
    <div>
      
      <div className='nav'>
        <p className='navTitle'>Log in</p>
        <div className='secondaryButton'>
            Create Account
        </div>
      </div>
      <div className='authForm'>
      <div className='authFormInput'>
        <label>Username</label>
        <input className="textField" name='username' onChange={(e) => {setUsername(e.target.value)}}></input>
      </div>
      <div className='authFormInput'>
        <label>Password</label>
        <div className="passwordField">
          <input type={type} autoComplete="off" className="textField password" name='password' onChange={(e) => {setPassword(e.target.value)}}></input>
          {type === 'password' ? (
            <span className='iconSpan' onClick={() => setType('text')}>
              <Icon icon={view} size={18}/>
            </span>
          ): 
          (
            <span className='iconSpan' onClick={() => setType('password')}>
              <Icon icon={view_off} size={18}/>
            </span>
          )}
        </div>
      </div>
      <button className='authButton' type='submit' onClick={login}>Log In</button> 
      </div>
    </div>
    
  )
}

export default Login