import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Profile from "./Profile";
import MyDonation from "./MyDonation"
import AddDonationForm from "./AddDonationForm";
import RequestsList from "../pages/RequestList"
import NotificationsChat from "../pages/NotificationsChat";
import ConversationsPage from "../pages/ConversationsPage";
import DonorDash from "./DonorDash";

const Donor = () => {
  const loc = useLocation();
  return (
    <div className="flex h-screen bg-[#fffdf7]">
      <div className="fixed top-0 left-0 xl:sticky h-full z-20">
        <SideBar role={"donor"} />
      </div>
      <div className="ml-12 xl:ml-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<DonorDash />} />
          <Route path="profile" element={<Profile role={"donor"} />} />
          <Route path="myDonations" element={<MyDonation />} />
          <Route path="addDonation" element={<AddDonationForm />} />
          <Route path="myDonations/request/:donationId" element={<RequestsList />} />
          <Route path="notifications" element={<ConversationsPage role={"donor"} />} />
          <Route path="notifications/:conversationId" element={<NotificationsChat role={"donor"} />} />
        </Routes>
      </div>
    </div>
  )
}


export default Donor
