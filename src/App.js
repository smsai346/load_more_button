import {useEffect, useState} from "react"
import './App.css';

function App() {
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const [count, setCount]=useState(0);
  const [error,setError]=useState(null)
  const [disablebutton,setDisablebutton]=useState(false)
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        setLoading(true)
        const response=await fetch(`https://dummyjson.com/products?limit=20&skip=${count===0? 0:count*20}`);
        const data=await response.json()
        console.log(data)
        if (data && data.products && data.products.length){
          setProducts((prevData)=>[...prevData,...data.products])
          setLoading(false)
        }

      }catch(e){
        setError(e.message)
        setLoading(false)
      }
    }
    fetchdata()
  },[count]);
  useEffect(()=>{
    if (products &&products.length===100) setDisablebutton(true)
  },[])
  if (loading){
    return <div>loading data ! Please wait.</div>
  }
  if (error !==null){
    return <div>Error occured! {error}</div>
  }
  return (
    <div className="container_load">
     <div className="product-container">
      {products && products.length? (products.map((item)=>
       <div className="product" key={item.id}>
        <img src={item.thumbnail} alt={item.title}/>
        <p>{item.title}</p>
       </div> 
      )):null}
     </div>
     <div className="button-container">
      <button  disabled={disablebutton} onClick={()=>setCount(count+1)} className="buttonload">Load More Products</button>
     {disablebutton===true?<p>"Reached 100 products"</p>:null}
     </div>
    </div>
  );
}

export default App;
