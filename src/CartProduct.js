import React from 'react'
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';
import "./CartProduct.css";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width : 70
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CartProduct({id,image,title,price}) {
    
    const [state,dispatch] =useStateValue();

    const classes = useStyles();
    const [num, setNum] = React.useState('');
    const handleChange = (event) => {
      setNum(event.target.value);
    };

    const removeProduct = () => {
           dispatch({
               type:'REMOVE_PRODUCT',
               id:id
           })
    }
    return (
        <div>
            <div className="cartproduct">
            <img className="cartproduct_image" src={image} />
            <div className="cartproduct_info">
            <p>{title}</p>
            
            <div>₹ {price}</div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Qty</InputLabel>
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
            <Button onClick={removeProduct} variant="contained" color="secondary">
                 Remove 
            </Button>
            

        </div>
    )
}

export default CartProduct;
