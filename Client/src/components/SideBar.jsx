import { useState } from 'react';
import Logo from './Logo';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const SideBar = ({ role }) => {
  const { setToken } = useContext(UserContext);
  const [flip, setFlip] = useState(false);
  const [visible, setVisible] = useState(true);
  const loc = useLocation();
  const sideBarItems = role == "donor" ? [
    {
      label: 'Profile', to: '/donor/profile',
      icon: (
        <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
      ),
    },
    {
      label: 'Dashboard', to: '/donor/dashboard',
      icon: (
        <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
      ),
    },
    {
      label: 'My Donations', to: '/donor/myDonations',
      icon: (
        <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-440v-80h81q14-127 103-216t216-103v-41h80v41q127 14 216 103t103 216h81v80H40Zm163-80h554q-14-103-92.5-171.5T480-760q-106 0-184.5 68.5T203-520Zm372 80H320v240h222q21 0 40.5-7t35.5-21l166-137q-8-8-18-12t-21-6q-17-3-33 1t-30 15l-108 87H400v-80h146l44-36q5-3 7.5-8t2.5-11q0-10-7.5-17.5T575-440Zm-335 0h-80v280h80v-280Zm0 360h-80q-33 0-56.5-23.5T80-160v-280q0-33 23.5-56.5T160-520h415q85 0 164 29t127 98l27 41-223 186q-27 23-60 34.5T542-120H309q-11 18-29 29t-40 11Zm240-440Z" /></svg>
      ),
    },
    {
      label: 'Add New Donation', to: '/donor/addDonation',
      icon: (
        <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-640h120-120Zm-440 0h338-18 14-334Zm16-80h528l-34-40H250l-34 40Zm184 270 80-40 80 40v-190H400v190Zm182 330H200q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v196q-19-7-39-11t-41-4v-122H640v153q-35 20-61 49.5T538-371l-58-29-160 80v-320H200v440h334q8 23 20 43t28 37Zm138 0v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" /></svg>
      ),
    },
    {
      label: 'Notifications', to: '/donor/notifications',
      icon: (
        <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>
      ),
    },
  ] :
    [
      {
        label: 'Profile', to: '/ngo/profile',
        icon: (
          <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
        ),
      },
      {
        label: 'Dashboard', to: '/ngo/dashboard',
        icon: (
          <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
        ),
      },
      {
        label: 'Donations Received', to: '/ngo/receivedDonations',
        icon: (
          <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80v-366q-54-14-87-57t-33-97v-280h80v240h40v-240h80v240h40v-240h80v280q0 54-33 97t-87 57v366h-80Zm400 0v-381q-54-18-87-75.5T520-667q0-89 47-151t113-62q66 0 113 62.5T840-666q0 73-33 130t-87 75v381h-80Z" /></svg>
        )
      },
      {
        label: 'Request Food Supply', to: '/ngo/requestSupplies',
        icon: (
          <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" /></svg>
        )
      },
      {
        label: 'Notifications', to: '/ngo/notifications',
        icon: (
          <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>
        ),
      },
    ]
  return (
    <div className={`font-pop z-20  ${flip ? 'w-12' : 'w-64'} `}>
      <aside className={`transition-all duration-500 ease-in-out h-screen border-r-2 ${role == "donor" ? 'border-orange-200 bg-[#fffaee]' : 'bg-[#E8F5E9] border-green-200'}  text-white flex flex-col overflow-hidden relative`}>
        {/* Header */}
        <div className="py-4 px-3 border-b-2 border-gray-200 flex items-center justify-between">
          {/* Logo */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${visible ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <Logo />
          </div>

          {/* Toggle Button */}
          <svg onClick={() => {
            setFlip(!flip);
            setVisible(!visible);
          }}
            className={`transition-transform duration-500 ease-in-out ${role == "donor" ? 'hover:bg-orange-50' : 'hover:bg-[#dceddc]'}  rounded-md cursor-pointer fill-black ${flip ? 'rotate-180' : 'rotate-0'
              }`}
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e3e3e3"
          >
            <path d="m242-200 206.67-280L242-760h82l206.67 280L324-200h-82Zm247.33 0L696-480 489.33-760h82L778-480 571.33-200h-82Z" />
          </svg>
        </div>

        {/* Menu */}
        <div className="pt-5">
          <ul>
            {sideBarItems.map((item, index) => (
              <NavLink to={item.to} key={index} className={`${loc.pathname.includes(item.to.split('/').pop()) ? `active-link-${role}` : ''}`}>
                <li className={`flex items-center gap-3 ${visible ? 'pl-6' : 'px-3'} py-4 ${role == "donor" ? ' hover:bg-[#faf0e0]' : 'hover:bg-[#dceddc]'}  text-black cursor-pointer`}>
                  <span className={`flex justify-center`}>
                    {item.icon}
                  </span>
                  <span className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${visible ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                    {item.label}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t-2 border-gray-200">
          <ul>
            <li onClick={async () => {
              const result = await Swal.fire({
                title: "Confirm Logout",
                text: "Do you really want to log out?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Logout",
                cancelButtonText: "Cancel",
              });

              if (result.isConfirmed) {
                await Swal.fire("Logged out successfully!", "", "success");
                setToken(null);
                localStorage.removeItem("token");
                window.location.href = "/";
              }
            }}
              className={`${role == "donor" ? 'hover:text-orange-400 hover:bg-orange-100' : 'hover:bg-[#C8E6C9] hover:text-green-500'} flex gap-3 items-center ${visible ? 'px-8' : 'px-3'} py-4  text-black cursor-pointer`}>
              <span className={` flex items-center justify-center`}>
                <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
              </span>
              <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${visible ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                Logout
              </span>
            </li>
            <Link to="/" className={``}>
              <li className={`${visible ? 'px-8' : 'px-3'} flex items-center gap-3  py-4 ${role == "donor" ? 'hover:text-orange-400 hover:bg-orange-100' : 'hover:bg-[#C8E6C9] hover:text-green-500'} text-black cursor-pointer`}>
                <span className="flex items-center justify-center">
                  <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z" /></svg>
                </span>
                <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${visible ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                  Go Back
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;