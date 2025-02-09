import React, { useEffect, useState } from 'react'
import axios from "axios"
const Index = () => {
	const [search, setSearch] = useState("")
	const [list, setList] = useState([])
	const [products, setProducts] = useState([])
	let [count,setCount]=useState(0)
	useEffect(() => {
		jQuery("document").ready(function ($) {

			document.querySelectorAll(".filterbtn").forEach(button => {
				button.addEventListener("click", function () {
					this.classList.toggle("selected");
				});
			});
		});
		getProducts();
	}, [count])

	const getProducts = async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/getproducts");
			if (res.status == 200) {
				setProducts([...res.data.products])
			}

		} catch (error) {
			console.log(error);

		}
	}
	const handleChange = (e) => {
		console.log(e.target.value);

		setSearch(e.target.value)
		e.target.value ? setList([...products.filter((product) => product.name.toLowerCase().includes(e.target.value.toLowerCase()))]) : setList([])
	}
	const handleSearch = () => {
		setProducts([...products.filter((product => product.name.toLowerCase().includes(search.toLowerCase())))])
	}
	const listSort = (name) => {
		setProducts([...products.filter((product => product.name.toLowerCase().includes(name.toLowerCase())))])
		setList([])


	}


	console.log(list);


	return (
		<div>

			<section className="fixed-header-top">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="header-wrapper-div">
								<div className="search-wrapper">
									<button className="backbtn" onClick={() => setCount(count+=1)}><i className="fa-solid fa-angle-left"></i></button>
									<input type="text" placeholder="Search" onChange={handleChange} />
									<button className="searchbtn" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>
									{
										list.length != 0 && <div className='border mt-2 p-2 rounded shadow max-h-40 ' style={{ minHeight: "auto", maxHeight: "200px", overflowY: "scroll" }}>
											{
												list.map((ls, index) => (<ul key={index} className='list-group'>
													{/* <li className='list-group-item'>{ls.name}</li> */}
													<button className='list-group-item list-group-item-action' onClick={() => listSort(ls.name)}>{ls.name}</button>
												</ul>))
											}
										</div>
									}
								</div>

								<div className="filter-wrapper">
									<button className="filterbtn"><img src="img/veg.svg" alt="VEG" /> Veg</button>
									<button className="filterbtn"><img src="img/non-veg.svg" alt="Non Veg" /> Non-Veg</button>
									<button className="filterbtn">Rating 4.0+</button>
									<button className="filterbtn">Top Selling</button>
									<button className="filterbtn">Rating 4.0+</button>
									<button className="filterbtn">Top Selling</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


			<section className="content-scroller">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="contents-holder-div">
								<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
									<div className="carousel-inner">
										<div className="carousel-item active">
											<div className="banner-ads-div">
												<span><img src="img/chocolate-cake.png" alt="" /></span>
												<div>
													<h6>Shake It Up with 30% Off!</h6>
													<p>Indulge in your favorite shakes at a discounted
														price—limited time only!</p>
												</div>
											</div>
										</div>
										<div className="carousel-item">
											<div className="banner-ads-div">
												<span><img src="img/tendercoconut.png" alt="" /></span>
												<div>
													<h6>Shake It Up with 30% Off!</h6>
													<p>Indulge in your favorite shakes at a discounted
														price—limited time only!</p>
												</div>
											</div>
										</div>
										<div className="carousel-item">
											<div className="banner-ads-div">
												<span><img src="img/blueberry-cheese-cake.png" alt="" /></span>
												<div>
													<h6>Shake It Up with 30% Off!</h6>
													<p>Indulge in your favorite shakes at a discounted
														price—limited time only!</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								{
									products.map((product, index) => (
										<div className="contents-item-div vegicon" key={index}>
											<div className="item-image-div"><img src="img/redvelvet-cheese-cake.png" alt="Red Velvet Cheese Cake" /></div>
											<div className="contentsholder-item">
												<h5>{product.name}</h5>
												<h4><i className="fa-solid fa-indian-rupee-sign"></i> {product.price}</h4>
												<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
											</div>

											<div className="quality-buttons">
												<span>
													<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
													<input type="text" />
													<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
												</span>
											</div>
										</div>
									))
								}

								{/* <div className="contents-item-div nonvegicon">
							<div className="item-image-div"><img src="img/oreo-cheese-cake.png" alt="Oreo Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Oreo Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								 <!--
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text">
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
								--> 
								<button className="add-btn">Add</button>
							</div>
						</div> */}
								{/* 
						<div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/blueberry-cheese-cake.png" alt="Blue Berry Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Blue Berry Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text"/>
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/chocolate-cake.png" alt="Chocolate Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Chocolate Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								 <!--
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text">
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
								--> 
								<button className="add-btn">Add</button>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/tendercoconut.png" alt="Tender Coconut Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Tender Coconut Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text"/>
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/redvelvet-cheese-cake.png" alt="Red Velvet Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Red Velvet Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text"/>
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
							</div>
						</div> */}
								{/* 
						<div className="contents-item-div nonvegicon">
							<div className="item-image-div"><img src="img/oreo-cheese-cake.png" alt="Oreo Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Oreo Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								 <!--
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text">
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
								--> 
								<button className="add-btn">Add</button>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/blueberry-cheese-cake.png" alt="Blue Berry Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Blue Berry Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text"/>
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/chocolate-cake.png" alt="Chocolate Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Chocolate Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								 <!--
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text">
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
								--> 
								<button className="add-btn">Add</button>
							</div>
						</div> */}

								{/* <div className="contents-item-div vegicon">
							<div className="item-image-div"><img src="img/tendercoconut.png" alt="Tender Coconut Cheese Cake"/></div>
							<div className="contentsholder-item">
								<h5>Tender Coconut Cheese Cake (1kg)</h5>
								<h4><i className="fa-solid fa-indian-rupee-sign"></i> 210</h4>
								<h6><i className="fa-solid fa-star"></i> <b>4.4</b> (1432)</h6>
							</div>

							<div className="quality-buttons">
								<span>
									<button className="minus-btn"><i className="fa-solid fa-minus"></i></button>
									<input type="text"/>
									<button className="plus-btn"><i className="fa-solid fa-plus"></i></button>
								</span>
							</div>
						</div> */}

							</div>
						</div>
					</div>
				</div>
			</section>


			<button className="checkout-button"><span>5</span><i className="fa-solid fa-cart-shopping"></i></button>

		</div>
	)
}

export default Index
