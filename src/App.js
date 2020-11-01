import React,{useState,useEffect} from "react";
import './App.css';
import { auth } from "./firebase";
import { Button, Modal, Input } from "@material-ui/core";
import Header from "./Header"

const App = () =>{
  
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (event) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));

    setOpen(false);
    auth.signOut();
    setUser(null);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message);
    });

    setOpenSignIn(false);
  };


  return (
    <div className="App">
      
      <Header/>
    </div>
    
  );
}


export default App;
