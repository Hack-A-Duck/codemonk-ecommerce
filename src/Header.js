import React,{useState,useEffect} from "react";
import './Header.css';
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "./firebase";
import { Button, Modal, Input } from "@material-ui/core";
import { useStateValue } from "./ContextProvider";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid lightgray",
    borderRadius:"10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2, 4),
    outlineStyle:"none"
  },
}));


const Header = () =>{
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [user, setUser] = useState(null);
  const [state,dispatch]= useStateValue();

  
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
    <div className="app">
     
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_login">
            <center>
              <h1 className="signup">Sign Up</h1>
            </center>
            <Input
              classname="inpt"
              type="text"
              placeholder="username"
              value={username}
              onChange={(eg) => setusername(eg.target.value)}
            />
            <Input
              classname="inpt"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              classname="inpt"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              onClick={signUp}
              variant="contained"
              color="primary"
              className="signup"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_login">
            <center>
              <h1 className="signin">Sign In</h1>
            </center>

            <Input
              classname="inpt"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              classname="inpt"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              onClick={signIn}
              variant="contained"
              
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
          <Link to="/" className="app_logo">
        <h3 >CodeMonk</h3>
        </Link>
        <Link to="/checkout/cart" className="app_cart">
        <h2 className="cart">Cart {state.cart?.length}</h2>
        </Link>
        
        {user ? (
            <>
            <h2>{user.displayName}</h2>
          <Button className="app_loginHome" onClick={() => auth.signOut()}>
            Log Out
          </Button>
          </>
        ) : (
          <form className="app_loginHome">
            <Button className="signin" onClick={() => setOpenSignIn(true)}>
              <h4 className="signin"> Sign In</h4>
            </Button>
            <Button
              className="signup"
              onClick={() => setOpen(true)}
              color="primary"
            >
              <h4 className="signup"> Sign Up</h4>
            </Button>
          </form>
        )}
      </div>

    </div>
    
  );
}


export default Header;
