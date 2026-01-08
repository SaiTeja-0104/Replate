import { useState,useContext } from "react";
import {  FaUtensils,FaBoxOpen,FaMapMarkerAlt,FaClock,FaImage,} from "react-icons/fa";
import { DonorContext } from "../context/DonorContext";

const AddDonationForm = () => {
  const defaultForm = {
    name: "",
    quantity: "",
    location: "",
    hours: "",
    mins: "",
    image: null,
  };
  const {newDonation} = useContext(DonorContext);
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await newDonation(form)
    setForm(defaultForm);
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-pop px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 border border-[#FFD9B3]">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#f17532] text-center mb-6">
          Add New Donation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <div className="relative">
              <FaUtensils className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="text"
                name="name"
                placeholder="e.g. Packaged Meals"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#FFCC80] rounded-lg focus:ring-2 focus:ring-[#FB8C00] outline-none"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (Servings)
            </label>
            <div className="relative">
              <FaBoxOpen className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="number"
                name="quantity"
                placeholder="e.g. 25"
                value={form.quantity}
                onChange={handleChange}
                min={1}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#FFCC80] rounded-lg focus:ring-2 focus:ring-[#FB8C00] outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="text"
                name="location"
                placeholder="e.g. Hyderabad, Telangana"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#FFCC80] rounded-lg focus:ring-2 focus:ring-[#FB8C00] outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full pl-10 text-sm text-gray-600 border border-[#FFCC80] rounded-lg px-3 py-2 cursor-pointer bg-[#FFF3E0] hover:bg-[#FFE0B2] focus:outline-none"
              />
            </div>
          </div>

          {/* Expiry Time */}
          <label className="text-sm font-medium text-gray-700 pb-2">
            Consume Before
          </label>
          <div className="flex gap-4 p-1">
            <div className="flex-1 relative">
              <FaClock className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="number"
                name="hours"
                placeholder="Hours"
                value={form.hours}
                onChange={handleChange}
                min={0}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#FFCC80] rounded-lg focus:ring-2 focus:ring-[#FB8C00] outline-none"
              />
            </div>
            <div className="flex-1 relative">
              <FaClock className="absolute left-3 top-3 text-[#FB8C00]" />
              <input
                type="number"
                name="mins"
                placeholder="Minutes"
                value={form.mins}
                onChange={handleChange}
                required
                min={0}
                max={59}
                className="w-full pl-10 pr-4 py-2 border border-[#FFCC80] rounded-lg focus:ring-2 focus:ring-[#FB8C00] outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FB8C00] hover:bg-[#EF6C00] text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            Add Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonationForm;

