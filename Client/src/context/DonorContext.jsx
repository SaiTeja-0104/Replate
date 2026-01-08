import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from './UserContext';

export const DonorContext = createContext()

const DonorProvider = (props) => {
    const { backendUrl, token, role } = useContext(UserContext);
    const [donationData, setDonationData] = useState([]);

    useEffect(() => {
        if (role == "donor" && token) {
            getDonationData();
        }
    }, [token, role]);

    const markExpiredDonations = async (donationId) => {
        try {
            await axios.put(`${backendUrl}/donation/update/${donationId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error) {
            toast.error("Error marking expired donations:", error);
        }
    };

    const dataAfterExpiryCheck = async () => {
        setDonationData(prevData => {
            // create a new array with updated statuses
            const updated = prevData.map(donation => {
                if (
                    new Date(donation.expiryDate) < new Date() &&
                    donation.status === "Active"
                ) {
                    markExpiredDonations(donation._id);
                    return { ...donation, status: "Expired" };
                }
                return donation;
            });
            return updated;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dataAfterExpiryCheck();
        }, 60000);

        return () => clearInterval(interval); 
    }, []);


    //To get all Donations made by Donor
    const getDonationData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/donation/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDonationData(response.data);
            dataAfterExpiryCheck();
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    }
    //To add a new Donation
    const newDonation = async (form) => {
        try {
            await axios.post(`${backendUrl}/donation/create`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Donation added successfully!");
            getDonationData();
        }
        catch (err) {
            toast.error(err.response?.data || err.message);
        }
    }

    //To get particular donation's details
    const getDonationDetails = async (donationId) => {
        try {
            const response = await axios.get(`${backendUrl}/donation/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    };

    //To get all requests for a particular donation
    const getRequestsForDonation = async (donationId) => {
        try {
            const response = await axios.get(`${backendUrl}/donor/all/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    };

    //To get ngo's details from a request id
    const getNgoDetails = async (requestId) => {
        try {
            const response = await axios.get(`${backendUrl}/user/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    };

    const value = { getDonationData, newDonation, donationData, getRequestsForDonation, getNgoDetails, getDonationDetails };
    return (
        <DonorContext.Provider value={value}>
            {props.children}
        </DonorContext.Provider>
    )
}
export default DonorProvider;