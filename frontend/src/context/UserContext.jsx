/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'
export const UserDataContext = createContext();


const UserContext = ({children}) => {
    const [user, setUser] = useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        phoneNo: "",
        dob: "",
        gender: "",
        aadhar_id: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        maritalStatus: "",
        occupation: "",
        nationality: "",
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext