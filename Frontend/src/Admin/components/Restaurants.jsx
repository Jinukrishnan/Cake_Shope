import React, { useEffect, useState } from "react";
import apiIntegration from "../../ApiIntegration";
import axios from "axios";
import { IoMdMore } from "react-icons/io";
import Edit from "./Edit";
import { ToastContainer, toast } from 'react-toastify';

const Restaurants = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "" });
  const [restaurants, setRestaurants] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [edit,setEdit]=useState(null)
  const [count,setCount]=useState(0)

  useEffect(() => {
    listRestaurants();
  }, [showForm,count]);

  const listRestaurants = async () => {
    try {
      const res = await axios.get(`${apiIntegration()}/api/listrestaurants`);
      if (res.status === 200) {
        setRestaurants([...res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${apiIntegration()}/api/addrestaurant`, data);
      if (res.status === 201) {
        alert(res.data.msg);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async(_id) => {
    try {
      const res = await axios.delete(`${apiIntegration()}/api/deleterestaurant/${_id}`);
      if (res.status === 200) {
       
         toast.success("Restaurant Deleted successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  
                  });
        setCount(count+1)
        setEdit(null); // Close the edit form after update
      }
    } catch (error) {
      console.log("Error updating restaurant:", error);
    }
  };

  const handleEdit =async (_id,updatedData) => {
    try {
      const res = await axios.put(`${apiIntegration()}/api/updaterestaurant/${_id}`, updatedData);
      if (res.status === 201) {
       
         toast.success("Restaurant updated successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  
                  });
              
        setRestaurants((prev) =>
          prev.map((rest) => (rest._id === _id ? { ...rest, ...updatedData } : rest))
        );
        setEdit(null); // Close the edit form after update
      }
    } catch (error) {
      console.log("Error updating restaurant:", error);
    }
    
  };

  return (
    <div className="m-3">
            <ToastContainer />
      
      <h3>Manage Restaurants</h3>

      {!showForm ? (
        <div className="container p-3 border cursor-pointer" onClick={() => setShowForm(true)}>
          ADD A NEW RESTAURANT
        </div>
      ) : (
        <div className="card p-3 shadow">
          <h5 className="card-title">Enter Restaurant's Details</h5>
          <div className="mb-3">
            <label className="form-label">Restaurant Name</label>
            <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="Enter restaurant name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" onChange={handleChange} name="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" onChange={handleChange} name="phone" className="form-control" placeholder="Enter phone number" />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-dark" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-outline-dark" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="list-group mt-5">
        {restaurants.map((rest,index) => (
        <>
         {
          edit===rest._id?<Edit rest={rest} setEdit={setEdit} handleEdit={handleEdit}/>: <li key={index} className="list-group-item pt-2 pb-5 my-1 d-flex justify-content-between ">
          <div className="pt-3">
            <p className="mb-0 fw-bold">{rest.name} <span className="text-muted"> {rest.phone}</span></p>
            <span className="text-secondary">{rest.email}</span>
          </div>

          <div className="position-relative">
            <IoMdMore
              className="fs-4 cursor-pointer"
              onClick={() => setDropdownVisible(dropdownVisible === rest._id ? null : rest._id)}
            />
            {dropdownVisible === rest._id && (
              <div className="position-absolute bg-white border rounded shadow p-2" style={{ right: 0, minWidth: "100px" }}>
                <button style={{border:"none",backgroundColor:"white"}} className=" w-100 text-start" onClick={() => setEdit(rest._id)}>
                  Edit
                </button>
                <button style={{border:"none",backgroundColor:"white"}} className=" w-100 text-start text-danger" onClick={() => handleDelete(rest._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </li>
         }
        </>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;
