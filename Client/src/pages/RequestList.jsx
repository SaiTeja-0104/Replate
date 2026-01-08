import { useState, useContext, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaUtensils, FaComment, FaCommentDots } from "react-icons/fa";
import { DonorContext } from "../context/DonorContext";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import foodImg from "../assets/foodImg.png";


const DonationRequests = () => {
  const { getNgoDetails, getRequestsForDonation, getDonationDetails } = useContext(DonorContext);
  const { backendUrl, token } = useContext(UserContext);
  const { donationId } = useParams();
  const [allReq, setAllReq] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donation, setDonation] = useState({});
  const [available, setAvailable] = useState("");

  const getTimeDifference = (futureTime) => {
    const now = new Date();                
    const future = new Date(futureTime);   

    const diffMs = future - now;           

    if (diffMs <= 0) return "0h 0m";    

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };


  const startConversation = async (ngoId) => {
    try {

      const res = await axios.post(`${backendUrl}/conversations/init`, { ngoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = `/donor/notifications/${res.data.conversationId}`;
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };


  const refreshDonationData = async () => {
    const updatedRequests = await getRequestsForDonation(donationId);
    const updatedDonation = await getDonationDetails(donationId);
    updatedRequests.sort((a, b) => order[a.status] - order[b.status]);
    setRequests(updatedRequests || []);
    setDonation(updatedDonation || {});
    setAvailable(updatedDonation?.availableQuantity);
  };


  const claimRequest = async (rid) => {
    try {
      await axios.post(
        `${backendUrl}/donor/accept/${rid}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Request accepted successfully!");
      await refreshDonationData();
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      toast.error(errorMsg);
    }
  };


  const rejectRequest = async (rid) => {
    try {
      await axios.post(`${backendUrl}/donor/reject/${rid}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Request rejected successfully!");
      await refreshDonationData();
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };

  const order = {"pending": 1, "approved": 2, "rejected": 3};


  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeDifference(donation?.expiryDate));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [donation?.expiryDate]);

  //TO get data on component load
  useEffect(() => {
    const fetchData = async () => {
      if (donationId) {
        await refreshDonationData();
      }
    };
    fetchData();
  }, [donationId]);

  // Enrich requests with NGO details
  useEffect(() => {
    const fetchAll = async () => {
      const enriched = await Promise.all(
        requests.map(async (req) => {
          const ngo = await getNgoDetails(req._id);
          return { ...req, ngo, quantity: req.quantity, requestedAt: req.createdAt };
        })
      );
      setAllReq(enriched);
    };
    if (requests.length > 0) { fetchAll(); }
    else { setAllReq([]); }
  }, [requests]);



  return (
    <div className="pt-6 font-pop px-4 sm:px-6 bg-[#fffdf7]">
      {/* ================= FOOD SUMMARY ================= */}
      <div className="bg-[#fffdf7] border-[#FFD9B3]  py-5 sm:px-6 flex items-center flex-col md:flex-row gap-6">
        {/* Image */}
        <img
          src={foodImg}
          alt={donation.name}
          className="w-full md:w-48 h-40 object-cover rounded-xl border bg-white border-[#FFCC80]"
        />

        {/* Details */}
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-[#E65100] flex items-center gap-2">
            <FaUtensils className="mt-1 shrink-0" /> {donation.name}
          </h1>

          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">Prepared Food</span>
          </p>

          <p className="flex items-center gap-2 text-sm mt-3 text-gray-700">
            <FaMapMarkerAlt className="text-[#FB8C00] shrink-0" />
            {donation.location}
          </p>

          <p className="flex items-center gap-2 text-sm mt-0.5 text-gray-700">
            <FaClock className="text-[#FB8C00] shrink-0" />
            {donation.status === "Expired" ? "Donation Expired" : donation.status === "Active" ? "Expires in " + getTimeDifference(donation.expiryDate) : "Donation Claimed"}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-center bg-[#FFF3E0] border border-[#FFCC80] rounded-xl py-5 px-6">
          <div className="text-center">
            <p className="text-xs text-gray-500">Available Quantity</p>
            <p className="text-2xl font-bold text-[#E65100]">
              {available}
              {/* <span className="text-sm text-orange-400">/{donation?.quantity}</span> */}
            </p>
            <p className="text-xs text-gray-500">units</p>
          </div>
        </div>
      </div>

      {/* ===== Divider ===== */}
      <div className="flex items-center bg-[#fffdf7] gap-4 mb-6">
        <div className="flex-grow h-[1px] bg-[#FFD9B3]" />
        <h2 className="text-lg font-semibold text-[#E65100] whitespace-nowrap">
          Requests Available
        </h2>
        <div className="flex-grow h-[1px] bg-[#FFD9B3]" />
      </div>

      <div className="bg-white py-5 px-6 rounded-t-4xl border-t border-r border-l w-full border-b border-orange-400">
        {/* Requests Count */}
        <p className="text-sm text-gray-600 pb-6">
          Total Requests: <span className="font-semibold text-[#E65100]">{requests.length}</span>
        </p>

        {/* ================= NGO REQUESTS ================= */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {allReq.map((req) => (
            <div key={req._id}
              className={`rounded-2xl shadow-md py-6 px-4 hover:shadow-lg transition-all
                ${req.status === "pending" ? "bg-yellow-50 border border-yellow-300" : ""}
                ${req.status === "approved" ? "bg-green-50 border border-green-300" : ""}
                ${req.status === "rejected" ? "bg-red-50 border border-red-300" : ""}
                `}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* NGO Info */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[#E65100]">
                    <span className="break-all mt-0.5">{req.ngo?.data?.name}</span>
                  </h2>

                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <FaMapMarkerAlt className="text-[#FB8C00] mt-1 shrink-0" />
                    <span className="break-all mt-0.5">{req.ngo?.data?.location}</span>
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaEnvelope className="text-[#FB8C00] mt-1 shrink-0" />
                    <span className="break-all mt-0">{req.ngo?.data?.email}</span>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <FaPhoneAlt className="text-[#FB8C00] mt-1 shrink-0 " />
                    <span className="break-all mt-0.5">{req.ngo?.data?.mobile}</span>
                  </p>

                  <p className="flex items-center gap-2 text-xs text-gray-500">
                    <FaClock className="text-[#FB8C00] mt-1 shrink-0" />
                    <span className="break-all mt-0.5">
                      Requested at {new Date(req.requestedAt).toLocaleString()}
                    </span>
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <div className="text-right mb-4">
                    <p className="text-xs text-gray-500">Requested Quantity</p>
                    <p className="text-2xl font-bold text-[#E65100]">{req.quantity}</p>
                  </div>

                  {/* Status-specific UI */}
                  {req.status === "pending" && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => claimRequest(req._id)}
                        className="transition-transform hover:scale-110"
                      >
                        <FaCheckCircle size={36} className="text-green-600" />
                      </button>
                      <button
                        onClick={() => rejectRequest(req._id)}
                        className="transition-transform hover:scale-110"
                      >
                        <FaTimesCircle size={36} className="text-red-500" />
                      </button>
                    </div>
                  )}

                  {req.status === "approved" && (
                    <button onClick={() => startConversation(req.ngo?.data?._id)}
                      className="flex flex-col items-center justify-center gap-1 text-green-600 hover:text-green-800 pr-2"
                    >
                      <FaCommentDots size={26} />
                      <span className="text-sm font-medium">Chat</span>
                    </button>
                  )}

                  {req.status === "rejected" && (
                    <div className="flex flex-col items-center gap-2">
                      <FaTimesCircle size={28} className="text-red-500" />
                      <p className="text-sm text-red-600 font-medium">Rejected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
