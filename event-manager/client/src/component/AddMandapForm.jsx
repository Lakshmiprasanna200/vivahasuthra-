import React, { useState } from "react";
import axios from "axios";

const AddMandapForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    location: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/addMandap", formData);
      alert("Mandap added successfully!");
      setFormData({
        id: "",
        name: "",
        image: "",
        location: "",
        description: "",
        price: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error adding mandap.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Mandap</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["id", "name", "image", "location", "description", "price"].map((field) => (
          <div key={field}>
            <label className="block font-semibold">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMandapForm;
