import React,{useState,useEffect} from "react";
import { auth } from "./firebase";
import Header from "./Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./Cart";
import { useStateValue } from "./ContextProvider";
import Address from "./Address";
import Payment from "./Payment";
import Category from "./Category";
import Seller from "./Seller";

const App = () =>{

  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        
        dispatch({
          type:'SET_USER',
          user:authUser
        })

      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path={`/category/${state.catlist}` }>
        {console.log(state.catlist)} 
          <Header/>
          <Category categ={state.catlist} />
        </Route>
      <Route path="/seller">
          <Header/>
          <Seller />
        </Route>
      <Route path="/checkout/payment">
          <Header/>
          <Payment/>
        </Route>
      <Route path="/checkout/address">
          <Header/>
          <Address/>
        </Route>
      <Route path="/checkout/cart">
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
