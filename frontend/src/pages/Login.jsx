import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        aadhar_id: "",
        userPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Form Submitted:", formData);
    
        try {
            const { email, aadhar_id, userPassword } = formData;
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
                { email, aadhar_id, userPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200 && response.data.accessToken) {
                const data = response.data;
                console.log("Login Successful:", data);
    
                // Store tokens in local storage
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
    
                alert("Login successful!");
                setFormData({ email: "", aadhar_id: "", userPassword: "" }); // Reset form
            } else {
                // Handle unexpected success responses without tokens
                alert("Unexpected response. Please try again.");
                console.log("Unexpected Response:", response.data);
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Something went wrong. Please try again.";
            console.error("Error during login:", errorMessage);
            alert(errorMessage);
        }
    };
    

    return (
        <div className="m-auto mt-7 mb-7 border rounded-lg w-[90%] md:w-[40%] shadow-lg p-6 bg-white overflow-auto">
            <h1 className="flex justify-center mb-7 font-bold text-2xl text-gray-700">
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                    <label className="text-lg text-gray-700 mb-2">Email</label>
                    <input
                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="text-lg text-gray-700 mb-2">Aadhar ID</label>
                    <input
                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        name="aadhar_id"
                        placeholder="Aadhar ID"
                        value={formData.aadhar_id}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="text-lg text-gray-700 mb-2">Password</label>
                    <input
                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        name="userPassword"
                        placeholder="Password"
                        value={formData.userPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
