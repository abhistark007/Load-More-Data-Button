
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const [count,setCount]=useState(0);
  const [diableButton,setDisableButton]=useState(false);


  async function fetchProducts(){
    
    try{
      setLoading(true);
      const response=await fetch(`https://dummyjson.com/products?limit=20&skip=${count===0?0:count*20}`);
      const result=await response.json();

      if(result && result.products && result.products.length){
        setProducts((prevData)=>[...prevData, ...result.products]);
        setLoading(false);
      }
      // setLoading(false);
      // console.log(loading);
      // console.log(result);
      // console.log(result.products);
      // console.log(result.products.length);
    }catch(e){
      console.log(e.message);
      setLoading(false);
    }
   
  }

  useEffect(()=>{
    fetchProducts();
  },[count])

  useEffect(()=>{
    if(products && products.length===100)setDisableButton(true);
    console.log(products.length);
  },[products])


  if(loading){
    return <div>Loading Products</div>
  }

  return (
   <div className='w-full  min-h-screen flex flex-col justify-center items-center'>
    <div className='flex w-[95%] flex-wrap  mx-auto justify-center  gap-4'>
      {
        products && products.length? 
        products.map((item,index)=>(
          <div className=' flex flex-col text-center border-2 ' key={index}>
            <img src={item.thumbnail} alt="" className='w-[400px] h-[300px] object-contain'/>
            <p>{item.title}</p>
          </div>
        ))
        :null
      }
    </div>
    <div className='my-6 flex flex-col gap-2'>
      <button disabled={diableButton} onClick={()=>setCount(count+1)} className='p-2 bg-purple-600 text-white font-bold'>Load More Products!</button>
      {
        diableButton? <p>You have reached 100 products</p>:null
      }
    </div>
   </div>
  )
}

export default App
