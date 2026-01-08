import { useMemo, useState, useContext, useEffect } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaBox,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { NgoContext } from "../context/NgoContext";

const NgoRequest = () => {
  const [search, setSearch] = useState("");
  const { availableDonations } = useContext(NgoContext);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    updateNow();
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;
    const timeout = setTimeout(() => {
      updateNow();
      const interval = setInterval(updateNow, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  // Active only
  const activeDonations = useMemo(
    () => availableDonations.filter((d) => d.status === "Active"),
    [availableDonations]
  );

  // Sort by expiry
  const sortedDonations = useMemo(
    () =>
      [...activeDonations].sort(
        (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
      ),
    [activeDonations]
  );

  // Search
  const filteredDonations = sortedDonations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase())
  );

  // Time left
  const getTimeLeft = (expiryDate) => {
    const diffMs = new Date(expiryDate) - now;
    if (diffMs <= 0) return null;
    const mins = Math.floor(diffMs / 60000);
    return { hours: Math.floor(mins / 60), mins: mins % 60 };
  };

  return (
    <div className="min-h-screen py-8 px-8 font-pop">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#14532D]">
          Active Donations
        </h1>

        <div className="relative mt-4 md:mt-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by donor or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-2 py-2 border border-[#B7E4C7] rounded-lg outline-none focus:ring-2 focus:ring-[#43A047] w-72"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="pt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.length ? (
          filteredDonations.map((donation) => {
            const timeLeft = getTimeLeft(donation.expiryDate);
            if (!timeLeft) return null;

            const { hours, mins } = timeLeft;
            const totalMins = hours * 60 + mins;

            const urgencyColor =
              totalMins < 60
                ? "bg-red-100 text-red-700"
                : totalMins < 120
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-700";

            const claimed =
              donation.quantity - donation.availableQuantity;
            const percent = donation.quantity
              ? (claimed / donation.quantity) * 100
              : 0;

            return (
              <div
                key={donation._id}
                className="relative bg-white rounded-xl shadow-md border border-[#B7E4C7] hover:shadow-lg transition-all overflow-hidden"
              >
                {/* CONTENT */}
                <div className="p-5">
                  {/* Top */}
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-[#14532D]">
                      {donation.name}
                    </h2>
                    <span
                      className={`px-3 py-1 flex items-center rounded-full text-xs font-medium ${urgencyColor}`}
                    >
                      <FaClock className="mr-1" />
                      {hours}h : {mins}m
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-gray-700 text-sm px-1">
                    <p className="flex items-center gap-2">
                      <FaUser className="text-[#43A047]" />
                      <span className="font-medium">
                        {donation.donorName}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaBox className="text-[#43A047]" />
                      {donation.availableQuantity}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#43A047]" />
                      {donation.location}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-6">
                    <Link to={`./${donation._id}/form`}>
                      <button className="w-full px-4 py-2 bg-[#43A047] text-white text-sm font-medium rounded-lg hover:bg-[#2E7D32] transition-all">
                        Request Pickup
                      </button>
                    </Link>
                  </div>
                </div>

                {/* BOTTOM-ATTACHED PROGRESS BAR */}
                <div className="absolute bottom-0 left-0 w-full">
                  <div className="w-full h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                    <div
                      className="h-1 bg-[#43A047] transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No active donations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NgoRequest;
