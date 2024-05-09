import React,{useEffect,useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login"
import { AuthContext,FirebaseContext } from "./store/firebaseContext";
import CreatePage from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/postsContext";

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    console.log(user);
  })
  return (
    <>
    <Post>
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/login" element={< LoginPage/>} />
        <Route path="/sell" element={<CreatePage/>}/>
        <Route path="/view" element={<ViewPost/>}/>
      </Routes>
    </Router>
    </Post>
    </>
  );
}

export default App;
