import React, { useState } from 'react';
import "./Address.css";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';

const Seller = () => {
    
    const [state,dispatch]=useStateValue();
    let history = useHistory();
    const [proname,setproname]=useState('');
    const [proprice,setproprice]=useState('');
    const [prodescrip,setprodescrip]=useState('');
    const [procateg,setprocateg]=useState('');
    const [proimage,setproimage]=useState('');
   
    
    const onName = (e) =>{
        setproname(e.target.value);
    }
    
    const onPrice = (e) =>{
        setproprice(e.target.value);
    }

    const onDescription = (e) =>{
        setprodescrip(e.target.value);
    }

    const onCategory = (e) =>{
        setprocateg(e.target.value);
    }

    const onImage = (e) =>{
        setproimage(e.target.value);
    }

    const click = () =>{
        dispatch({
            type:'SET_SELLERPRODUCT',
            product:{
                userid:state.user,
                name:proname,
                price:proprice,
                description:prodescrip,
                category:procateg,
                

             }
          })
          history.push("/");
          console.log(state.product)
    }

    return (
        <div>
            <h4 className="title">
                Welcome to the Seller's section
            </h4>
            <div className="form">
                <form method="POST">
                <div className="contact">
                    <TextField onChange={onName} name="name" value={proname} required className="inpt" margin="normal" label="Name of Product" variant="outlined" />
                    <TextField onChange={onPrice} name="price" value={proprice} required className="inpt" margin="normal" label="₹ price" variant="outlined" />
                    <TextField onChange={onDescription} name="description" value={prodescrip} required className="inpt" margin="normal" label="Description" variant="outlined" />
                    <TextField onChange={onCategory} name="category" value={procateg} required className="inpt" margin="normal" label="Category" variant="outlined" />
                    <Button
                
                variant="contained"
                component="label"
                >
                Upload IMAGE
                <input
                    type="file"
                    style={{ display: "none" }}
                />
                </Button>
                <br className="upl"/>
                </div>
                </form>
                
                <Button disabled={state.user ? false:true } onClick={click} className="button" variant="contained" color="secondary">
                 LIST THE PRODUCT
                </Button>
            </div>
        </div>
    )
}

export default Seller;
