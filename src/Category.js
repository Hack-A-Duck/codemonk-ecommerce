import React, { useEffect,useState } from 'react'
import Product from './Product'
import axios from "axios"
import "./Homepage.css"
import * as ReactBootstrap from "react-bootstrap"
import { useStateValue } from './ContextProvider'

function Category({categ}) {
    const [resi , setResi] =useState([]);
    const [loading,setLoading] = useState(false);
    const [state,dispatch] = useStateValue();

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
        await axios.get(`https://fakestoreapi.com/products/category/${state.catlist}`)
                           .then(resp=> {
                               setResi(resp.data)
                               setLoading(false)
                           }
                           )
                           .catch(err=> alert(err))
        }
      
        getData();
        
   } , [] )

    return (
        <div>
            <h3>Category : {state.catlist} </h3>
            
            
            {loading && <ReactBootstrap.Spinner className="loading" animation="border" role="status" />}
            <div className="home">
            {!loading && 
            <>
                {
                    resi.map((resp,i)=>(
                                    <div  key={i}>
                                     <Product
                                        id={resp.id}
                                        title={resp.title}
                                        des={resp.description}
                                        category ={resp.category}
                                        price={resp.price}
                                        image={resp.image}
                                        quant={0}/>
                                    </div>
                    ))
                }

            </> }                   
            </div>
        </div>
    )
}

export default Category;