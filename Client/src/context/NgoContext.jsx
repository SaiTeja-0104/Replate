import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const NgoContext = createContext()

const NgoProvider = (props) => {
    const { backendUrl, token, role } = useContext(UserContext);

    useEffect(() => {
        if (role == "ngo" && token) {
            allDonations();
        }
    }, [token, role]);

    const [availableDonations, setAvailableDonations] = useState([]);

    const allDonations = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/donation/all`);
            setAvailableDonations(response.data);
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    }

    const getRequestSupply = async () => {
        try {
            const response = await axios.get(`${backendUrl}/ngo/requests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("Request Supply Data:", response.data[0]["requestsMade"]);
            return response.data[0]["requestsMade"];
            // setRequestSupply(response.data[0]["requestsMade"] || []);
        } catch (error) {
            toast.error("Error fetching request supply:", error);
        }
    };

    const value = { availableDonations, getRequestSupply };
    return (
        <NgoContext.Provider value={value}>
            {props.children}
        </NgoContext.Provider>
    )
}
export default NgoProvider;