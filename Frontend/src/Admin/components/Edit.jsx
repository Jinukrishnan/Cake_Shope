import React, { useState } from "react";

const Edit = ({ rest, setEdit, handleEdit }) => {
  const [updatedData, setUpdatedData] = useState({
    name: rest.name,
    email: rest.email,
    phone: rest.phone,
  });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-3 shadow">
      <h5 className="card-title">Edit Restaurant</h5>
      <div className="mb-3">
        <label className="form-label">Restaurant Name</label>
        <input type="text" onChange={handleChange} name="name" value={updatedData.name} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" onChange={handleChange} name="email" value={updatedData.email} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input type="text" onChange={handleChange} name="phone" value={updatedData.phone} className="form-control" />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-success" onClick={() => handleEdit(rest._id, updatedData)}>
          Update
        </button>
        <button className="btn btn-outline-dark" onClick={() => setEdit(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Edit;
