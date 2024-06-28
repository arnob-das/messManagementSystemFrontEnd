import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedUsers, updateUserRole } from "../../../features/mess/messSlice"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";

const RoleManagement = () => {
    const [members, setMembers] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const fetchMembers = async () => {
        try {
            const response = await dispatch(getApprovedUsers({ messId: user.currentMessId }));
            setMembers(response.payload);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, [dispatch, user.currentMessId]);

    const handleChangeRole = async (member, newRole) => {
        try {
            const response = await dispatch(updateUserRole({ messId:user.currentMessId, userId: member._id, role: newRole }));
            if (response.payload.success) {
                toast.success(`Role updated to ${newRole} for ${member.fullName}`);
                if(newRole=="user"){
                    dispatch(logout());
                    navigate('/login');
                }
                fetchMembers();
            } else {
                toast.error(`Failed to update role for ${member.fullName}`);
            }
        } catch (error) {
            toast.error(`Error updating role for ${member.fullName}`);
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center mb-10">Role Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Members</h3>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {members.filter(member => member.role === "user").map((member) => (
                            <div key={member._id} className="flex justify-between items-center mb-2 p-2 border-b">
                                <div>
                                    <h4 className="font-medium">{member.fullName}</h4>
                                    <p className="text-sm text-gray-600">{member.email}</p>
                                    <p className="text-sm text-gray-600">{member.phoneNumber}</p>
                                </div>
                                <button 
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleChangeRole(member, "manager")}
                                >
                                    Make Manager
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Managers</h3>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {members.filter(member => member.role === "manager").map((member) => (
                            <div key={member._id} className="flex justify-between items-center mb-2 p-2 border-b">
                                <div>
                                    <h4 className="font-medium">{member.fullName}</h4>
                                    <p className="text-sm text-gray-600">{member.email}</p>
                                    <p className="text-sm text-gray-600">{member.phoneNumber}</p>
                                </div>
                                <button 
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleChangeRole(member, "user")}
                                >
                                    Make User
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;
