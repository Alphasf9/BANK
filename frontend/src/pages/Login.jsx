import  { useState ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        aadhar_id: "",
        userPassword: "",
    });

    const navigate = useNavigate();

    const {user,setUser}= useContext(UserDataContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
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

                setUser(data.user);

                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
    
                toast.success("Login successful!");

                navigate('/dashboard')

                setFormData({ email: "", aadhar_id: "", userPassword: "" }); // Reset form
            } else {
                toast.error("Unexpected response. Please try again.");
                console.log("Unexpected Response:", response.data);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            console.error("Error during login:", errorMessage);
            toast.error(errorMessage);
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
            <p className='mt-5'>Create an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/register')}>Click here</span></p>
        </div>
    );
};

export default Login;
