import { useState, useContext, useEffect } from "react";
import { DonorContext } from "../context/DonorContext";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";


const MyDonations = () => {
  const { donationData } = useContext(DonorContext);
  const { backendUrl, token } = useContext(UserContext);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [donationList, setDonationList] = useState(donationData || []);

  const order = { Active: 1, Claimed: 2, Expired: 3 };

  const dateTimeOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };



  const markAsClaimed = async (id) => {
    const result = await Swal.fire({
      title: "Mark donation as claimed?",
      text: "This will mark the donation as fully claimed and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", 
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, mark as claimed",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post(
        `${backendUrl}/donor/claim_all/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDonationList((prev) =>
        prev.map((donation) =>
          donation._id === id
            ? {
              ...donation,
              status: "Claimed",
              availableQuantity: 0,
            }
            : donation
        )
      );

      Swal.fire({
        icon: "success",
        title: "Donation Claimed",
        text: "The donation has been marked as fully claimed.",
        timer: 2000,
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


  useEffect(() => {
    setDonationList(donationData || []);
  }, [donationData]);


  const filteredDonations = donationList
    .filter((d) => (filter === "All" ? true : d.status === filter))
    .filter((d) =>
      `${d.name} ${d.location} ${d.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="font-pop min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-5 sm:px-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Donations
        </h1>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search donations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {["Active", "Claimed", "Expired", "All"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === status
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white text-gray-600 hover:bg-orange-100"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.length ? (
          filteredDonations.map((item) => {
            const claimed = item.quantity - item.availableQuantity;
            const percent = item.quantity
              ? (claimed / item.quantity) * 100
              : 0;

            const canClaim =
              item.status === "Active" && item.availableQuantity > 0;

            return (
              <div
                key={item._id}
                className="relative bg-white rounded-xl shadow-md  hover:shadow-lg transition-all overflow-hidden"
              >
                {/* CONTENT */}
                <div className="p-5 pb-6 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-base font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Claimed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <hr className="text-gray-200" />

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-2 pt-4">
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Consume before:</strong>{" "}
                      {new Date(item.expiryDate).toLocaleString(
                        "en-GB",
                        dateTimeOptions
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <Link to={`./request/${item._id}`} className="flex-1">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-md text-xs font-semibold transition">
                        View Requests
                      </button>
                    </Link>

                    {canClaim && (
                      <button
                        onClick={() => markAsClaimed(item._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-md text-xs font-semibold transition"
                      >
                        Mark as Claimed
                      </button>
                    )}
                  </div>
                </div>

                {/* BOTTOM-ATTACHED PROGRESS BAR (NO TEXT) */}
                <div className="absolute bottom-0 left-0 w-full">
                  <div className="w-full h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                    <div
                      className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-8">
            No donations match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
