import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnapprovedUsers } from "../../../features/mess/messSlice";

const ApproveUsers = () => {
    const dispatch = useDispatch();
    const [unApprovedUsers, setUnApprovedUsers] = useState();
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getUnapprovedUsers({ messId: user.user.currentMessId }));
                setUnApprovedUsers(response.payload);
            } catch (error) {
                console.error('Failed to fetch unapproved users:', error.message);
            }
        };

        fetchData();
    }, [dispatch, user.user.currentMessId]);

    const handleApprovalChange = (userId, approved) => {
        // Dispatch action to update approval status locally and possibly save to backend
        // dispatch(updateUserApproval({ userId, approved }));
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Approve Users</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="px-4 py-2 text-left">Full Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone Number</th>
                            <th className="px-4 py-2 text-left">NID</th>
                            <th className="px-4 py-2 text-left">Approved</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unApprovedUsers && unApprovedUsers.map((user) => (
                            <tr key={user._id} className="border-b border-gray-200">
                                <td className="px-4 py-2">{user.fullName}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.phoneNumber}</td>
                                <td className="px-4 py-2">{user.nationalId}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={user.approved ? 'true' : 'false'}
                                        onChange={(e) => handleApprovalChange(user._id, e.target.value === 'true')}
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="true">Approved</option>
                                        <option value="false">Not Approved</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        // onClick={() => handleSave(user._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ApproveUsers;