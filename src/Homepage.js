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
            
            {!loading && 
            <>
                {
                    resi.map((resp,i)=>(
                                    <div className="home" key={i}>
                                     <Product
                                        title={resp.title}
                                        des={resp.description}
                                        category ={resp.category}
                                        price={resp.price}
                                        image={resp.image} />
                                    </div>
                    ))
                }

            </> }                   
            
        </div>
    )
}

export default Homepage;