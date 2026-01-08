import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Profile from "./Profile";
import NgoDash from "./NgoDash";
import DonationsReceived from "./DonationsReceived";
import NgoRequest from "./NgoRequest";
import RequestForm from "./RequestForm";
import NotificationsChat from "../pages/NotificationsChat";
import ConversationsPage from "../pages/ConversationsPage";

const Ngo = () => {
  const loc = useLocation();
  return (
    <div className="flex h-screen bg-[#F4FDF0]">
      <div className="fixed top-0 left-0 xl:sticky h-full z-20">
        <SideBar role={"ngo"} />
      </div>
      <div className="ml-12 xl:ml-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="profile" element={<Profile role={"ngo"} />} />
          <Route path="dashboard" element={<NgoDash />} />
          <Route path="receivedDonations" element={<DonationsReceived />} />
          <Route path="requestSupplies" element={<NgoRequest />} />
          <Route path="requestSupplies/:rid/form" element={<RequestForm />} />
          <Route path="notifications" element={<ConversationsPage role={"ngo"} />} />
          <Route path="notifications/:conversationId" element={<NotificationsChat role={"ngo"} />} />
        </Routes>
      </div>
    </div>
  )

}


export default Ngo
