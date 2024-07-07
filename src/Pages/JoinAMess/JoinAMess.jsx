// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { addMemberToMess } from "../../features/mess/messSlice"; // Assuming your slice location
// import { toast } from "react-toastify";
// import { updateUserById } from "../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const JoinAMess = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.auth.user);
//     const { register, handleSubmit } = useForm();
//     const navigate = useNavigate();


//     const joinMess = async (data) => {
//         const { messId } = data;
//         try {
//             const response = await dispatch(addMemberToMess({ messId, userId: user._id }));
//             if (addMemberToMess.fulfilled.match(response)) {
//                 console.log(response.payload);
//                 toast.success(response.payload);
//                 navigate('/user-dashboard');
//                 const updateUserData = {
//                     role: "user",
//                     approved: false,
//                     currentMessId: response.payload.mess._id
//                 };
//                 const updateUserAction = await dispatch(updateUserById({ userId: user._id, userData: updateUserData }));

//                 if (updateUserById.fulfilled.match(updateUserAction)) {
//                     toast.success(updateUserAction.payload.message);
//                     navigate('/user-dashboard');
//                 } else {
//                     toast.error("Failed to update user info");
//                 }
//             }
//         } catch (error) {
//             console.error(error);
//             toast.info(error.message || "Failed to join mess");
//         }
//     };


//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4 text-center">Join a Mess</h2>
//             <form onSubmit={handleSubmit(joinMess)}>
//                 <div className="form-control mb-4">
//                     <label className="label" htmlFor="messId">
//                         Enter Mess ID
//                     </label>
//                     <input
//                         type="text"
//                         {...register("messId", { required: true })}
//                         id="messId"
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div className="card-actions justify-center">
//                     <button type="submit" className="btn btn-primary">
//                         Search
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default JoinAMess;

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMemberToMess } from "../../features/mess/messSlice"; // Assuming your slice location
import { toast } from "react-toastify";
import { logout, updateUserById } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const JoinAMess = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const joinMess = async (data) => {
        const { messId } = data;
        try {
            const response = await dispatch(addMemberToMess({ messId, userId: user._id }));
            if (addMemberToMess.fulfilled.match(response)) {
                toast.success(response.payload.message || "Joined mess");
                navigate('/');
                const updateUserData = {
                    role: "user",
                    approved: false,
                    currentMessId: response.payload.mess._id
                };
                const updateUserAction = await dispatch(updateUserById({ userId: user._id, userData: updateUserData }));

                if (updateUserById.fulfilled.match(updateUserAction)) {
                    // toast.success(updateUserAction.payload.message || "User info updated successfully");
                    navigate('/user-dashboard');
                    
                } else {
                    toast.error(updateUserAction.payload || "Failed to update user info");
                }
            } else {
                toast.error(response.payload || "Failed to join mess");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to join mess");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Join a Mess</h2>
            <form onSubmit={handleSubmit(joinMess)}>
                <div className="form-control mb-4">
                    <label className="label" htmlFor="messId">
                        Enter Mess ID
                    </label>
                    <input
                        type="text"
                        {...register("messId", { required: true })}
                        id="messId"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="card-actions justify-center">
                    <button type="submit" className="btn btn-primary">
                        Join
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinAMess;
