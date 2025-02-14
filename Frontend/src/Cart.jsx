import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiIntegration from './ApiIntegration'
import{Link} from 'react-router-dom';
const Cart = () => {
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [count,setCountt]=useState(0);
    useEffect(() => {
        userCart()
    }, [count])
    const userCart = async () => {
        try {
            const res = await axios.get(`${apiIntegration()}/api/cart`)
            // console.log(res.data[0].productId.price);
            console.log(res);
            

            if (res.status == 200) {
                setCart([...res.data])
            }
        } catch (error) {
          
            
            console.log(error);

        }

    }
    useEffect(() => {
        const total = cart.reduce((sum, item) =>
            sum + (item?.quantity * item?.products[0].price), 0)
        setTotalPrice(total)
    }, [cart])


    // add to cart

	const addToCart = async (productId) => {

		console.log(productId);
		try {

			const res = await axios.post(`${apiIntegration()}/api/addtocart`, { productId })
            setCountt(count+1)
			console.log(res.data);

		} catch (error) {
			console.log(error.response.data.msg);


		}
	}

	// remove from cart

	const removeFromCart = async (productId) => {

		console.log(productId);
		try {

			const res = await axios.post(`${apiIntegration()}/api/removefromcart`, { productId })
            setCountt(count+1)

			console.log(res.data);

		} catch (error) {
			console.log(error.response.data.msg);

		}
	}
    console.log(cart[0]?.quantity);
    
    return (
       <div>
             <section className="cart-header">
                 <div className="container">
                     <div className="row justify-content-center">
                         <div className="col-lg-5">
                             <h4><i className="fa-solid fa-cart-shopping"></i> Checkout</h4>
                         </div>
                     </div>
                 </div>
             </section>
 
             <section className="checkoutmenu-list">
                 <div className="container">
                     <div className="row justify-content-center">
                         <div className="col-lg-5">
                             <div className="checkoutmenu-wrapper">
                                 {
                                     cart.map((item, index) =>
                                      <div className="checkoutmenu-item" key={index}>
                                         <div className="checkout-image"><img src="img/blueberry-cheese-cake.png" alt="" /></div>
                                         <h5>{item?.products[0].name}<button><i className="fa-regular fa-trash-can"></i></button></h5>
                                         <div className="row">
                                             <div className="col-7">
                                                 <div className="quality-buttons">
                                                     <span>
                                                     <button className="minus-btn" onClick={()=>removeFromCart(`${item?.products[0]._id}`)} ><i className="fa-solid fa-minus"></i></button>
                                                         {/* <input type="text" value={item.quantity}/> */}
                                                         <input
                                                             type="text"
                                                             value={item?.quantity}
                                                             onChange={(e) => {
                                                                 const updatedCart = cart.map((cartItem, cartIndex) =>
                                                                     cartIndex === index ? { ...cartItem, quantity: e.target.value } : cartItem
                                                                 );
                                                                 setCart(updatedCart);
                                                             }}
                                                         />
                                                     <button className="plus-btn" onClick={() => addToCart(`${item?.products[0]._id}`)}><i className="fa-solid fa-plus"></i></button>
                                                     </span>
                                                 </div>
                                             </div>
                                             <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> {Math.floor(item?.quantity * item?.products[0].price)}</h6></div>
                                         </div>
                                     </div>
                                     )
                                 }
                                 {/* <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/chocolate-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/oreo-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/redvelvet-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/blueberry-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/chocolate-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/oreo-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/redvelvet-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/blueberry-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/chocolate-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/oreo-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div>
                         <div className="checkoutmenu-item">
                             <div className="checkout-image"><img src="img/redvelvet-cheese-cake.png" alt=""/></div>
                             <h5>Red Velvet Cheese Cake (1kg) <button><i className="fa-regular fa-trash-can"></i></button></h5>
                             <div className="row">
                                 <div className="col-7">
                                     <div className="quality-buttons">
                                         <span>
                                             <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                             <input type="text" value="1"/>
                                             <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                         </span>
                                     </div>
                                 </div>
                                 <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> 2100</h6></div>
                             </div>
                         </div> */}
                             </div>
 
                         </div>
                     </div>
                 </div>
             </section>
 
 
             <section className="orderpage-footer">
                 <div className="container">
                     <div className="row justify-content-center">
                         <div className="col-lg-5">
                             <h4>Total: <b>INR {totalPrice}</b></h4>
                             <div className="row">
                                 <div className="col-6 pe-1"><Link to={"/"}><button>Go to Menu</button></Link></div>
                                 <div className="col-6 ps-1"><button>Make Order</button></div>
                             </div>
                         </div>
                     </div>
                 </div>
             </section>
 
         </div>
      
    )
}

export default Cart
