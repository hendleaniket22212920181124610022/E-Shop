import {useEffect,useState, useMemo} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
// import Product from '../Component/Products'

const url = `https://dummyjson.com`

function useProductApi() {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])

    //states to calculate of cart subtotal ,total,tax,delivery charges 
    const [subTotal,setSubTotal] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [gst,setGst] = useState(5)
    const [dc,setDc] = useState(50)

    const readProduct = async ()=>{
        const out = await axios.get(`${url}/products`);
        setProducts(out.data.products)
    }

    const initValue = useMemo(()=>(
      {value:[products,setProducts]}
    ))  //[] we want pass any dependency like declared a state
    
    useEffect(()=>{
      readProduct()
    },[])

    //add product to card
    const addToCart = async(product)=>{
      // console.log('cart=',product)

      //product exist in cart or not
      const check = cart.every(item=>{
        return item.id !== product.id;
      });
      if(check){
        toast.success('product added in cart')
        setCart([...cart,{...product,quantity:1}])
      }else{
        toast.warning('product already in cart')
      }
    }

  return {
   product :initValue,
   cart:[cart,setCart],
   addToCart:addToCart,
   subTotal: [subTotal,setSubTotal],
   gst : [gst, setGst],
   dc: [dc,setDc],
   discount : [discount,setDiscount]
}
}
export default useProductApi
