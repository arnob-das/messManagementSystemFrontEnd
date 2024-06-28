import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { changePassword } from '../../features/auth/authSlice';

const ProfilePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const mess = useSelector((state) => state.mess)

    const onSubmit = data => {
        dispatch(changePassword({
            userId: user._id,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }))
            .unwrap()
            .then((response) => {
                console.log(response);
                toast.success(response);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="card w-full max-w-2xl shadow-xl bg-white">
                <div className="card-body">
                    <div className="flex justify-center mb-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold mb-4">Profile</h2>
                    <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-3" />
                            <span>{user?.fullName}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="mr-3" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faIdCard} className="mr-3" />
                            <span>{user?.nationalId}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-3" />
                            <span>{user?.role}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-3" />
                            <span>{mess?.mess?.messName || "Not Assigned"}</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mt-6 mb-4">Change Password</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Old Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("oldPassword", { required: true })}
                                className={`input input-bordered ${errors.oldPassword ? 'input-error' : ''}`}
                            />
                            {errors.oldPassword && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("newPassword", { required: true })}
                                className={`input input-bordered ${errors.newPassword ? 'input-error' : ''}`}
                            />
                            {errors.newPassword && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control mt-6 md:col-span-2">
                            <button type="submit" className="btn btn-primary w-full" >Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
