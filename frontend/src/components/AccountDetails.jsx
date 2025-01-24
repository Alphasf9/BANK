import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const AccountDetails = () => {
    const { account } = useContext(UserDataContext);

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
                Account Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-lg font-medium">{account.accountNumber}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="text-lg font-medium">{account.accountType}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-lg font-medium">₹{account.balance}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Branch Name</p>
                    <p className="text-lg font-medium">{account.branchDetails.branchName}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Branch Code</p>
                    <p className="text-lg font-medium">{account.branchDetails.branchCode}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">IFSC Code</p>
                    <p className="text-lg font-medium">{account.branchDetails.ifscCode}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Nominee Name</p>
                    <p className="text-lg font-medium">{account.nominee.nomineeName}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Nominee Relation</p>
                    <p className="text-lg font-medium">{account.nominee.nomineeRelation}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Nominee Contact</p>
                    <p className="text-lg font-medium">{account.nominee.nomineeContact}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
