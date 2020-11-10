import React, { useState } from 'react'
import { useStateValue } from './ContextProvider';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const CategoryList = () => {

    const [state,dispatch] = useStateValue();   
    const[category,setCategory] = useState('');
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
            setAnchorEl(null)
    };
  

    const clickHandle = (event) =>{
        const { myValue } = event.currentTarget.dataset;
        {console.log(myValue)}
        setAnchorEl(null);
        setCategory(myValue);
        
        dispatch({
            type:'CAT_CHANGE',
            catlist:myValue
        })
        
        history.push(`/category/${myValue}`);
        

    }

    return (
        <div>
            <Button  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            CATEGORY
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem data-my-value="electronics"  onClick={clickHandle}>Electronics</MenuItem>
                <MenuItem data-my-value="jewelery"  onClick={clickHandle}>Jewellery</MenuItem>
            </Menu>
            
          
  
        </div>
    )
}

export default CategoryList;
