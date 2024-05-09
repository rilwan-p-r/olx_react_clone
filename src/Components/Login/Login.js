import React,{useState, useContext} from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const {firebase} = useContext(FirebaseContext)
const handleSubmit = (e)=>{
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
    navigate('/')
  }).catch((error)=>{
    alert(error.message)
  })

}
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='enter the name'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=>setPass(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signUp'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
