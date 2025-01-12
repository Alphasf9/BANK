import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const Register = () => {

    const [currStep, setCurrStep] = useState(0); // Step tracker
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

        accountType: "",
        accountPassword: "",
        branchName: "",
        branchCode: "",
        ifscCode: "",
        nomineeName: "",
        nomineeContact: "",
        nomineeRelation: ""
    });

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
            <form>

                {currStep === 0 && (
                    <div>
                        <h3 className='text-xl ml-7 mb-5'>User Details</h3>
                        <div className="flex flex-wrap justify-around">
                            <div className="flex flex-col items-center justify-center h-[150px] w-[150px] border rounded-lg bg-gray-50 shadow-sm">
                                <label htmlFor="user-img">
                                    <img
                                        className="w-16 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition"
                                        src={assets.upload_area}
                                        alt="Upload"
                                    />
                                </label>
                                <input type="file" id="user-img" hidden />
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
                                            required
                                        />
                                        <input
                                            className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-lg text-gray-700">Email</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                                        type="email"
                                        placeholder="email@example.com"
                                        required
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
                                    />
                                </div>

                                <div className="flex flex-col w-full md:w-[40%]">
                                    <label className="text-lg text-gray-700">Aadhar ID</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        placeholder="Aadhar ID"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">DOB</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="date"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Gender</label>
                                    <select
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
                                    <select className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
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
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nationality</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
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
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">House No</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Street</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                        </div>

                        <div className="flex justify-around w-full flex-wrap gap-4 mt-5">
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">City</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Zip</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>
                        </div>

                        <div className="flex justify-around w-full flex-wrap gap-4 mt-5">
                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">State</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
                            </div>

                            <div className="w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Country</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" />
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
                                        <select className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option value="">Select</option>
                                            <option value="Saving">Saving</option>
                                            <option value="Current">Current</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Branch Name</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Branch Code</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">IFSC Code</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-around w-full flex-wrap gap-4">
                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Name</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Relation</label>
                                    <input
                                        className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                    />
                                </div>

                                <div className="w-full md:w-[30%]">
                                    <label className="text-lg text-gray-700">Nominee Contact</label>
                                    <input
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
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" />
                            </div>

                            <div className="flex flex-col w-full md:w-[40%]">
                                <label className="text-lg text-gray-700">Account Password</label>
                                <input className="border rounded-lg bg-gray-50 px-3 py-2 w-full mt-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-10">
                    {currStep > 0 && (
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={handlePrev}
                        >
                            Back
                        </button>
                    )}
                    {currStep < 4 ? (
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>

    )
}

export default Register