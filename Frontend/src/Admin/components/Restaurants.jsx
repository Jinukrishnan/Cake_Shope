import React, { useEffect, useState } from 'react'
import apiIntegration from "../../ApiIntegration"
import axios from "axios"

const Restaurants = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "" })
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    listRestaurants()
  }, [])
  const listRestaurants = async () => {
    try {
      const res = await axios.get(`${apiIntegration()}/api/listrestaurants`);

      if (res.status === 200) {
        setRestaurants([...res.data])
      }

    } catch (error) {
      console.log(error);

    }
  }
  console.log(restaurants);

  const handleChange = (e) => {
    setData(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async () => {
    console.log(data);
    try {
      const res = await axios.post(`${apiIntegration()}/api/addrestaurant`, data)
      // console.log(res);
      if (res.status === 200) {
        alert(res.data.msg);

      }

    } catch (error) {
      console.log(error);

    }

  }
  return (
    <div className=' m-3'>
      <h3 className=''>Manage Restaurants</h3>
      {!showForm ? <div className="container  p-3 border cursor-pointer" onClick={() => setShowForm(true)}>ADD A NEW RESTAURANT</div> :
        <div className="card p-3 shadow">
          <h5 className="card-title">Enter Restaurant's Details</h5>
          <div className="mb-3">
            <label className="form-label">Restaurant Name</label>
            <input type="text" onChange={handleChange} name='name' className="form-control" placeholder="Enter restaurant name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" onChange={handleChange} name='email' className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" onChange={handleChange} name='phone' className="form-control" placeholder="Enter phone number" />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-dark" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-outline-dark" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      }
      <ul class="list-group mt-5">
        {restaurants.map((rest) => <li class="list-group-item my-1 d-flex justify-content-between">
         <div>
         <p>{rest.name}</p>
          <span>{rest.email}</span>
          <span>{rest.phone}</span>
         </div>
         <div>
          ...
         </div>
        </li>)}
      </ul>
    </div>
  )
}

export default Restaurants
