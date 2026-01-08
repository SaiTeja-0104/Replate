import React, { useEffect, useContext, useState } from "react";
import { FaUser, FaBoxOpen, FaClipboardList, FaMailBulk, FaPhone } from "react-icons/fa";
import { toast } from "react-hot-toast"
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";


const RequestForm = () => {

  const { token, backendUrl } = useContext(UserContext);
  const { rid } = useParams();
  const [data, setDonationData] = useState(null);
  const [quantity, setQuantity] = useState(data?.availableQuantity || "");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`${backendUrl}/donation/${rid}`);
        setDonationData(res.data);
        setQuantity(res.data.availableQuantity);
      } catch (err) {
        toast.error("Error fetching donation:", err);
      }
    };
    getDetails();
  }, [rid]);


  // ✅ handle input change
  const handleChange = (e) => {
    const { value } = e.target;
    setQuantity(value);
  };

  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backendUrl}/ngo/claim_request/${rid}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(res.data);
      toast.success("Request submitted successfully!");
      setQuantity("");
      setTimeout(() => {
        window.location.href = '/ngo/requestSupplies';
      }, 1500);
    } catch (error) {
      toast.error("Failed to submit request!");
    }
  };

  const { userData } = useContext(UserContext);

  return (
    <div className="min-h-screen flex justify-center items-center py-6 px-6 font-pop">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-[#B7E4C7] p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#14532D] mb-6 text-center">
          Create New Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Donation ID */}
          <div className="pt-4 flex items-center gap-3 text-lg">
            <FaClipboardList className="text-[#43A047]" />
            <div className="font-medium text-[#14532D] ">
              Food Item : <span className="text-gray-400 ">{data?.name}</span>
            </div>
          </div>
          <div className="pt-2 flex items-center gap-3 text-lg">
            <FaUser className="text-[#43A047]" />
            <div className="font-medium text-[#14532D] ">
              NGO Name : <span className="text-gray-400 ">{userData.name}</span>
            </div>
          </div>
          <div className="pt-2  flex items-center gap-3 text-lg">
            <FaMailBulk className="text-[#43A047]" />
            <div className="font-medium text-[#14532D] ">
              Email Id : <span className="text-gray-400">{userData.email}</span>
            </div>
          </div>
          <div className="pt-2 pb-2 flex items-center gap-3 text-lg">
            <FaPhone className="text-[#43A047] rotate-90" />
            <div className="font-medium text-[#14532D] ">
              Mobile Number : <span className="text-gray-400">{userData.mobile}</span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-[#14532D] mb-1">
              Quantity
            </label>
            <div className="relative">
              <FaBoxOpen className="absolute left-3 top-3 text-[#43A047]" />
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
                placeholder="Enter Quantity"
                min="1"
                max={data?.availableQuantity}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#B7E4C7] rounded-lg outline-none focus:ring-2 focus:ring-[#43A047]"
              />
            </div>
          </div>



          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 mt-4 bg-[#43A047] text-white font-semibold rounded-lg hover:bg-[#2E7D32] transition-all shadow-sm"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
