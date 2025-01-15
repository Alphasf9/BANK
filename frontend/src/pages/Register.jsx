import { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserDataContext } from '../context/UserContext'


const Register = () => {

    const [currStep, setCurrStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        aadhar_id: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        religion: "",
        occupation: "",
        nationality: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        userPassword: "",
        photo: null,

        accountType: "",
        accountPassword: "",
        branchName: "",
        branchCode: "",
        ifscCode: "",
        nomineeName: "",
        nomineeContact: "",
        nomineeRelation: "",
        otp: ""
    });


    const navigate = useNavigate();


    const { user, setUser } = useContext(UserDataContext);


    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0]
        })
    }





    const [isOtpVerified, setIsOtpVerified] = useState(false);


    const [isOtpSent, setIsOtpSent] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key !== 'photo') {
                formDataToSend.append(key, formData[key])
            }
        })

        if (formData.photo) {
            formDataToSend.append('photo', formData.photo)
        }


        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, formDataToSend, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.status === 200) {
                toast.success('OTP has been sent to your email. Please check and verify.');
                setIsOtpSent(true)
            }


        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Something went wrong. Please try again.');
        }

    };

    const handleOtpVerification = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/user/verifyOtp`,
                { otp: formData.otp },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);

                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                toast.success('OTP verified successfully!');
                setFormData({ ...formData, otp: "" });
                setIsOtpVerified(true);
                navigate('/login')
            } else {
                console.log("Unexpected Response:", response.data);
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {

            console.error("Error occurred during OTP verification:", error.response?.data || error.message);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const handleNext = () => {
        if (currStep < 4) {
            setCurrStep(currStep + 1);
        }
    };

    const handlePrev = () => {
        if (currStep > 0) {
            setCurrStep(currStep - 1);
        }
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        console.log("Current Step:", currStep);
    }, [currStep]);

    return (
        <div className="m-auto mt-7 mb-7 border rounded-lg w-[90%] md:w-[50%] shadow-lg p-6 bg-white overflow-auto">
            <h1 className="flex justify-center mb-7 font-bold text-2xl text-gray-700">Register</h1>
            <form onSubmit={handleSubmit}>

                {currStep === 0 && (
                    <div>
                        <h3 className='text-xl ml-7 mb-5'>User Details</h3>
                        <div className="flex flex-wrap justify-around">
                            <div className="flex flex-col items-center justify-center h-[150px] w-[150px] border rounded-lg bg-gray-50 shadow-sm">
                                <label htmlFor="user-img">
                                    <img
                                        className="w-16 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition"
                                        src={formData.photo ? URL.createObjectURL(formData.photo) : assets.upload_area}
                                        alt="Upload"
                                    />
                                </label>
                                <input type="file"
                                    id="user-img" hidden
                                    onChange={handleFileChange}
                                    accept='image/*'
                                    required
                                />
                                <p className="text-sm text-gray-600">Upload<br /> photo</p>
                            </div>

                            <div className="flex flex-col gap-4 w-[60%]">
                                <div>
                                    <label className="text-lg text-gray-700">Name</label>
                                    <div className="flex gap-4 mt-2">
                                        <input
                                            className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            type="text"
                                            placeholder="First Name"
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            type="text"
                                            placeholder="Last Name"
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-lg text-gray-700">Email</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                                        type="email"
                                        name='email'
                                        placeholder="email@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-6 space-y-4">
                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="flex flex-col w-full md:w-[40%]">
                                    <label className="text-lg text-gray-700">Phone No</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        placeholder="Phone Number"
                                        name='phoneNo'
                                        value={formData.phoneNo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-full md:w-[40%]">
                                    <label className="text-lg text-gray-700">Aadhar ID</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        placeholder="Aadhar ID"
                                        name='aadhar_id'
                                        value={formData.aadhar_id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">DOB</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="date"
                                        value={formData.dob}
                                        name='dob'
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Gender</label>
                                    <select
                                        name='gender'
                                        required
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Marital Status</label>
                                    <select
                                        name='maritalStatus'
                                        required
                                        value={formData.maritalStatus}
                                        onChange={handleInputChange}
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option value="">Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widow/widower">Widow/widower</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Religion</label>
                                    <select
                                        name='religion'
                                        value={formData.religion}
                                        onChange={handleInputChange}
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                                        <option value="">Select</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Muslim">Muslim</option>
                                        <option value="Sikh">Sikh</option>
                                        <option value="Christian">Christian</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Occupation</label>
                                    <input
                                        name='occupation'
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nationality</label>
                                    <input
                                        name='nationality'
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currStep === 1 && (
                    <div>
                        <h3 className='text-xl ml-7 mb-3'>Address</h3>
                        <div className="flex justify-around w-full flex-wrap mt-5 gap-4">
                            {/* <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">House No</label>
                                <input
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div> */}
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Street</label>
                                <input
                                    name='street'
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                        </div>

                        <div className="flex justify-around w-full flex-wrap gap-4 mt-5">
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">City</label>
                                <input
                                    name='city'
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Zip</label>
                                <input
                                    name='zip'
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                        </div>

                        <div className="flex justify-around w-full flex-wrap gap-4 mt-5">
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">State</label>
                                <input
                                    name='state'
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>

                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Country</label>
                                <input
                                    name='country'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                        </div>
                    </div>
                )}

                {currStep === 2 && (
                    <div>
                        <h3 className='text-xl ml-7'>Account Details</h3>
                        <div className='className="flex flex-col mt-1 space-y-4'>
                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="flex justify-around w-full flex-wrap mt-5 gap-4">
                                    <div className="w-full md:w-[40%]">
                                        <label className="text-lg text-gray-700">Account Type</label>
                                        <select
                                            name='accountType'
                                            value={formData.accountType}
                                            onChange={handleInputChange}
                                            required
                                            className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option value="">Select</option>
                                            <option value="Saving">Saving</option>
                                            <option value="Current">Current</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Branch Name</label>
                                    <input
                                        name='branchName'
                                        value={formData.branchName}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Branch Code</label>
                                    <input
                                        name='branchCode'
                                        value={formData.branchCode}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">IFSC Code</label>
                                    <input
                                        name='ifscCode'
                                        value={formData.ifscCode}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Name</label>
                                    <input
                                        name='nomineeName'
                                        value={formData.nomineeName}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Relation</label>
                                    <input
                                        name='nomineeRelation'
                                        value={formData.nomineeRelation}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Contact</label>
                                    <input
                                        name='nomineeContact'
                                        value={formData.nomineeContact}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currStep === 3 && (
                    <div>
                        <h3 className='text-xl ml-7'>Password</h3>
                        <div className='flex flex-col justify-center items-center mt-5'>
                            <div className="flex flex-col w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">User Password</label>
                                <input
                                    name='userPassword'
                                    value={formData.userPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" />
                            </div>

                            <div className="flex flex-col w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Account Password</label>
                                <input
                                    name='accountPassword'
                                    value={formData.accountPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-10">
                    {currStep > 0 && (
                        <button
                            type="button"
                            className="px-6 py-2 mt-6 bg-gray-500 h-10 text-white rounded hover:bg-gray-600"
                            onClick={handlePrev}
                        >
                            Back
                        </button>
                    )}

                    {currStep < 4 && !isOtpVerified ? (
                        <button
                            type="button"
                            className="px-6 py-2 mt-6 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    ) : null}

                    {currStep === 4 && (
                        <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
                            <input
                                type="text"
                                className="border rounded-lg bg-gray-50 px-3 py-2 w-full md:w-[40%] hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter OTP"
                                value={formData.otp}
                                onChange={(e) => {
                                    setFormData({ ...formData, otp: e.target.value })
                                }}
                            />

                            <button
                                type="button"
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                Send OTP
                            </button>

                            <button
                                type="button"
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleOtpVerification}
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {currStep === 4 && isOtpVerified && (
                        <div className="mt-5 text-green-600 text-lg font-semibold">
                            Registration complete. Thank you!
                        </div>
                    )}
                </div>
            </form>
            {currStep === 0 && (
                <p className='mt-5'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>Login here</span></p>
            )}
        </div>

    )
}

export default Register