import { createContext, useState } from 'react'
export const UserDataContext = createContext();


const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        photo: "",
        email: "",
        phoneNo: "",
        dob: "",
        gender: "",
        aadhar_id: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        maritalStatus: "",
        occupation: "",
        nationality: "",
    })

    const [account, setAccount] = useState({
        accountNumber: "",
        accountType: "",
        balance: "",
        branchDetails: {
            branchName: "",
            branchCode: "",
            ifscCode: "",
        },
        nominee: {
            nomineeName: "",
            nomineeRelation: "",
            nomineeContact: "",
        }
    });

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser, account, setAccount }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext