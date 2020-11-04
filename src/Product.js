import React,{useEffect, useState} from 'react';
import "./Product.css";
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width : 70,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }));

const Product = ({id,title,des,price,image}) => {

    const [state,dispatch]=useStateValue();
    const [dis,setDis] =useState(false);

    const classes = useStyles();
    const [num, setNum] = React.useState('');
    const handleChange = (event) => {
      setNum(event.target.value);
    };

    const addProduct = () =>{
        
        dispatch({
            type:"ADD_PRODUCT",
            product:{
                id:id,
                title:title,
                image:image,
                price:price,
                quant:num
            }
        })
        setDis(true);
        console.log(state.cart)
    }
    

    return (
        <div className="product">
            
            <img className="product_image" src={image} />
            <div className="product_info">
            <strong>{title}</strong>
            <div className="cartproduct_pricequant">
            <div>₹ {price}</div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  id="demo-simple-select-outlined-label">Qty</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={num}
                onChange={handleChange}
                label="Qty"
                >
                
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                </Select>
            </FormControl>
            </div>
            </div>
            
            <Button disabled={dis} onClick={addProduct} variant="contained" color="secondary">
                 Add to Cart
            </Button>
        </div>
    )
}

export default Product;
