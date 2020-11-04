import React, { useEffect,useState } from 'react'
import Product from './Product'
import axios from "axios"
import "./Homepage.css"

function Homepage() {
    const [resi , setResi] =useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
        await axios.get('https://fakestoreapi.com/products')
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
            <h1>Homepage</h1>
            
            
            {loading && <p>Loading...</p>}
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

export default Homepage;