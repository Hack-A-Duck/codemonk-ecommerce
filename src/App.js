import React,{useState,useEffect} from "react";

import { auth } from "./firebase";
import Header from "./Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./Cart";

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
    <Router>
    <div className="App">
      <Switch>
      <Route path="/cart">
          <Header/>
          <Cart/>
        </Route>
        <Route path="/">
          <Header/>
          <Homepage/>
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}


export default App;
