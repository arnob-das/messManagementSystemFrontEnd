import { useEffect, useState } from "react";
import { getApprovedUsers } from "../../../features/mess/messSlice";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const MessMembers = () => {
    const [members, setMembers] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();
    const mess = useSelector((state) => state.mess.mess);
    const messId = mess._id;

    const fetchMembers = async () => {
        setStatus('loading');
        try {
            const response = await dispatch(getApprovedUsers({ messId }));
            setMembers(response.payload);
            setStatus('succeeded');
        } catch (error) {
            setStatus('failed');
            setError(error.message);
        }
    }
    
    useEffect(() => {
        fetchMembers();
    }, [dispatch, messId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Mess Members</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p className="text-red-500">{error}</p>}
            {status === 'succeeded' && (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left p-2">Full Name</th>
                                <th className="text-left p-2">Role</th>
                                <th className="text-left p-2">Email</th>
                                <th className="text-left p-2">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((user) => (
                                <tr key={user._id}>
                                    <td className="p-2">{user.fullName}</td>
                                    <td className="p-2">{user.role === "manager" ? 'Manager' : 'Member'}</td>
                                    <td className="p-2">
                                        <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                            {user.email}
                                        </a>
                                    </td>
                                    <td className="p-2">
                                        <a href={`tel:${user.phoneNumber}`} className="text-blue-500 hover:underline">
                                            <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                            {user.phoneNumber}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MessMembers;
