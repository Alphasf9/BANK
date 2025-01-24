/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (!accessToken || !refreshToken) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login')
        }


        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getcurrentuser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'x-refresh-token': refreshToken
            }
        }).then(response => {
            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                setIsLoading(false)
            }
        }).catch(err => {
            console.error(err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login')
        })
    }, [accessToken, refreshToken, navigate, setUser])


    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <>
            {children}
        </>
    )

}

export default UserProtectedWrapper