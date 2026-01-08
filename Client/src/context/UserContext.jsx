import { createContext, useState } from 'react'
import axios from 'axios';
import { useEffect, } from 'react';
import { toast } from 'react-hot-toast';

export const UserContext = createContext()

const UserProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({});
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            validateToken();
        }
        else{
            setLoading(false);
        }
    }, []);

    const validateToken = async () => {
        try {
            await axios.get(`${backendUrl}/user/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await getUserData();
        } catch (error) {
            setToken(null);
            localStorage.removeItem('token');
            toast.error("Session expired. Please log in again.");
            setTimeout(() => {
                window.location.href = '/register';
            }, 2000)
            setLoading(false);
        }
    }

    const getUserData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserData(response.data.data);
            setRole(response.data.data.role);
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    }




    const value = {
        token, setToken, backendUrl, userData, role, setUserData,loading
    }

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default UserProvider;