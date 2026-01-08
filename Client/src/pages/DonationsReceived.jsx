import { useState, useMemo, useContext, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaSearch, FaCommentDots, FaTimes } from "react-icons/fa";
import { NgoContext } from "../context/NgoContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";


const DonationsReceived = () => {
  const [filter, setFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [requestSupply, setRequestSupply] = useState([]);
  const { getRequestSupply } = useContext(NgoContext);
  const { backendUrl, token } = useContext(UserContext);


  const fetch = async () => {
    const data = await getRequestSupply();
    setRequestSupply(data || []);
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');   
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');       
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };


  useEffect(() => {
    fetch();
  }, []);

  const startConversation = async (donorId) => {
    try {

      const res = await axios.post(`${backendUrl}/conversations/init`, { donorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = `/ngo/notifications/${res.data.conversationId}`;
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };


const cancelRequest = async (requestId) => {
  const result = await Swal.fire({
    title: "Cancel Request?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, cancel it",
    cancelButtonText: "No, keep it",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `${backendUrl}/ngo/delete/${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRequestSupply((prev) =>
      prev.filter((request) => request._id !== requestId)
    );

    Swal.fire({
      icon: "success",
      title: "Cancelled",
      text: "Request has been cancelled successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.error || err.message,
    });
  }
};



  // Sort donations by date (latest first)
  const sortedDonations = useMemo(() => {
    return [...requestSupply].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [requestSupply]);

  // Filter and search logic
  const filteredDonations = sortedDonations.filter((d) => {
    const matchStatus = filter === "All" || d.status === filter.toLowerCase();
    const matchSearch =
      d.donation?.name.toLowerCase().includes(search.toLowerCase()) ||
      d.donation?.donorName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen py-8 px-6 font-pop">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#14532D]">Donation Supplies</h1>

        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by donor or item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#B7E4C7] rounded-lg outline-none focus:ring-2 focus:ring-[#43A047]"
            />
          </div>

          <div className="flex gap-2">
            {["Pending", "Approved", "Rejected", "All"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${filter === tab
                    ? "bg-[#43A047] text-white"
                    : "bg-white text-[#14532D] hover:bg-[#C8E6C9]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-[#B7E4C7]">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-[#E8F5E9] text-[#14532D]">
            <tr>
              <th className="py-3 px-5">Donor</th>
              <th className="py-3 px-5">Item</th>
              <th className="py-3 px-5">Quantity</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((i) => (
                <tr
                  key={i._id}
                  className="border-b hover:bg-[#F4FDF0] transition-all"
                >
                  <td className="py-3 px-5 font-semibold">{i.donation.donorName}</td>
                  <td className="py-3 px-5">{i.donation.name}</td>
                  <td className="py-3 px-5">{i.quantity}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1 w-fit ${i.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : i.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {i.status === "approved" && <FaCheckCircle />}
                      {i.status === "pending" && <FaClock />}
                      {i.status === "rejected" && <FaTimesCircle />}
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-sm">{formatDateTime(i.createdAt)}</td>
                  <td className="py-3 px-5 flex justify-center items-center gap-3">

                    <div className="group relative flex ">

                      <FaCommentDots onClick={() => { startConversation(i.donation.donor) }} className=" cursor-pointer text-green-300" size={20} />
                      <p className="hidden group-hover:inline-block text-xs absolute z-10  left-6 top-0.5 px-1 rounded-full bg-gray-200">Chat</p>
                    </div>
                    {
                      i.status === "pending" &&
                      <div className="group relative flex ">
                        <FaTimes onClick={()=>{cancelRequest(i._id)}} className="cursor-pointer text-red-300" size={20} />
                        <p className="hidden group-hover:inline-block text-xs absolute z-10 right-6 px-1 py-0.5 rounded-full bg-gray-200">Cancel</p>
                      </div>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationsReceived;
