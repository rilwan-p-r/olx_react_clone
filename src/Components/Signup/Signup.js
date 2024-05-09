import React, { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/firebaseContext";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [number, setUserNumber] = useState("");
  const [password, setUserPass] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                username: username,
                phone: number,
              })
              .then(() => {
                navigate("/login");
              });
          });
        });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <div>
      {error && (
            <p className="error">
              {error.message.split(" ").splice(1).join(" ")}
            </p>
          )}
      <div className="signupParentDiv">
        
        <img width="200px" height="200px" src={Logo}></img>
        
        <form onSubmit={handleSubmit}>
          

          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder="enter the name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            className="input"
            type="email"
            name="email"
            placeholder="enter thhe email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setUserNumber(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            placeholder="enter the phone no"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setUserPass(e.target.value)}
            className="input"
            type="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
