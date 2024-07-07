import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createMess } from '../../features/mess/messSlice';
import { useNavigate } from 'react-router-dom';
import { getUserById, logout, updateUserById } from '../../features/auth/authSlice';
import Swal from 'sweetalert2';

const CreateAMess = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(createMess(data));
            console.log(resultAction.payload._id)

            if (createMess.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload.message);
                // After successful mess creation
                // update the user to manager
                const updateUserData = {
                    role: "manager",
                    approved: true,
                    currentMessId: resultAction.payload._id
                };
                const updateUserAction = await dispatch(updateUserById({ userId: user._id, userData: updateUserData }));
                console.log(updateUserAction);

                if (updateUserById.fulfilled.match(updateUserAction)) {
                    toast.success(updateUserAction.payload.message);
                    Swal.fire({
                        title: "Mess created successfully. To get manager access please login again.",
                        showDenyButton: true,
                        confirmButtonText: "Log out",
                        denyButtonText: `Cancel`
                    }).then((result) => {
                        if (result.isConfirmed) {

                            dispatch(logout())
                        } else if (result.isDenied) {
                            //   Swal.fire("Changes are not saved", "", "info");
                        }
                    });
                } else {
                    toast.error("Failed to update user info");
                }
            } else {
                toast.error("Failed to create mess");
            }
        } catch (error) {
            toast.error("Server error");
        }
    };

    return (
        <div className="flex items-center justify-center py-10">
            <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Create a Mess</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mess Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Mess Name"
                                className="input input-bordered"
                                {...register('messName', { required: 'Mess name is required' })}
                            />
                            {errors.messName && (
                                <p className="text-red-500 text-sm">{errors.messName.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Location"
                                className="input input-bordered"
                                {...register('messLocation', { required: 'Location is required' })}
                            />
                            {errors.messLocation && (
                                <p className="text-red-500 text-sm">{errors.messLocation.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Owner Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Owner Name"
                                className="input input-bordered"
                                {...register('messOwnerName', { required: 'Owner name is required' })}
                            />
                            {errors.messOwnerName && (
                                <p className="text-red-500 text-sm">{errors.messOwnerName.message}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Owner Phone Number</span>
                            </label>
                            <input
                                type="Number"
                                placeholder="Enter Owner Phone Number"
                                className="input input-bordered"
                                {...register('messOwnerPhoneNumber', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Invalid phone number'
                                    }
                                })}
                            />
                            {errors.messOwnerPhoneNumber && (
                                <p className="text-red-500 text-sm">{errors.messOwnerPhoneNumber.message}</p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">Create Mess</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAMess;
