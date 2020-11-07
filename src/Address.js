import React, { useState } from 'react';
import "./Address.css";

import TextField from '@material-ui/core/TextField';
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';
import { useHistory } from "react-router-dom";

const Address = () => {
    
    const history= useHistory();
    const [state,dispatch]=useStateValue();

    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [pin,setPin]=useState('');
    const [adrs,setAdrs]=useState('');
    const [town,setTown]=useState('');
    const [city,setCity]=useState('');
   
    const onName = (e) =>{
        setName(e.target.value);
    }

    const onMobile = (e) =>{
        setMobile(e.target.value);
    }
    
    const onPin = (e) =>{
        setPin(e.target.value);
    }

    const onAddress = (e) =>{
        setAdrs(e.target.value);
    }

    const onTown = (e) =>{
        setTown(e.target.value);
    }

    const onCity = (e) =>{
        setCity(e.target.value);
    }

    const addAddress = () => {
        
    dispatch({
        type:'SET_ADDRESS',
        name:name,
        mobile:mobile,
        pin:pin,
        address:adrs,
        town:town,
        city:city,
      })

    }

    const click = () =>{
        history.push('/checkout/payment');
        addAddress();
    }

    return (
        <div>
            <h4 className="title">
                Delivery Address
            </h4>
            <div className="form">
                <h4 className="lab1">CONTACT DETAILS</h4>
                <form method="POST">
                <div className="contact">
                    <TextField onChange={onName} value={name} required className="inpt" margin="normal" label="Name" variant="outlined" />
                    <TextField onChange={onMobile} value={mobile} required className="inpt" margin="normal" label="Mobile Number" variant="outlined" />
                </div>
                <h4 className="lab2">ADDRESS</h4>
                <div className="address">
                    <TextField onChange={onPin} value={pin} required className="inpt" margin="normal" label="Pincode" variant="outlined" />
                    <TextField onChange={onAddress} value={adrs} required className="inpt" margin="normal" label="Address(House No, Building, Street, Area)" variant="outlined" />
                    <TextField onChange={onTown} value={town} required className="inpt" margin="normal" label="Locality/ Town" variant="outlined" />
                    <TextField onChange={onCity} value={city} required className="inpt" margin="normal" label="City/ District" variant="outlined" />
                </div>
                </form>
                <Button disabled={state.user ? false:true } onClick={click} className="button" variant="contained" color="secondary">
                 Continue
                </Button>
            </div>
        </div>
    )
}

export default Address;
