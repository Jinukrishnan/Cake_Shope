import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = () => {
    const [cart,setCart]=useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(()=>{
        userCart()
    },[])
    const userCart=async()=>{
        try {
            const res=await axios.get("http://localhost:3000/api/usercart/67a774af895aaa4f2579d4c1")
           console.log(res.data[0].productId.price);
           
            
            if(res.status==200){
                setCart([...res.data])
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }
    useEffect(() => {
        const total = cart.reduce((sum, item) => 
            sum + (item.quantity * item.productId.price), 0)
        setTotalPrice(total)
    }, [cart])
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
                        cart.map((item,index)=> <div className="checkoutmenu-item" key={index}>
                        <div className="checkout-image"><img src="img/blueberry-cheese-cake.png" alt=""/></div>
                        <h5>{item.productId.name}<button><i className="fa-regular fa-trash-can"></i></button></h5>
                        <div className="row">
                            <div className="col-7">
                                <div className="quality-buttons">
                                    <span>
                                        <button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
                                        <input type="text" value={item.quantity}/>
                                        <button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
                                    </span>
                                </div>
                            </div>
                            <div className="col-5"><h6><i className="fa-solid fa-indian-rupee-sign"></i> {item.quantity*item.productId.price}</h6></div>
                        </div>
                    </div>)
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
                        <div className="col-6 pe-1"><button>Go to Menu</button></div>
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
