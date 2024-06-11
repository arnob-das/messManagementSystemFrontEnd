// src/ProfilePage.jsx
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const user = useSelector((state) => state.auth);

    const onSubmit = data => {
        console.log(data);
        // Handle form submission logic here, like sending data to the server
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="card w-full max-w-2xl shadow-xl bg-white">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Profile</h2>
                    <div className="my-4">
                        <p><strong>Full Name:</strong>{user?.user?.fullName}</p>
                        <p><strong>Email:</strong>{user?.user?.email}</p>
                        <p><strong>Phone Number:</strong>{user?.user?.phoneNumber}</p>
                        <p><strong>National ID:</strong>{user?.user?.nationalId}</p>
                        <p><strong>Role:</strong>{user?.user?.role}</p>
                        <p><strong>Current Mess:</strong> Not Assigned</p>
                    </div>
                    <h3 className="text-xl font-bold">Update Information</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register("fullName", { required: true })}
                                className={`input input-bordered ${errors.fullName ? 'input-error' : ''}`}
                            />
                            {errors.fullName && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="123-456-7890"
                                {...register("phoneNumber", { required: true })}
                                className={`input input-bordered ${errors.phoneNumber ? 'input-error' : ''}`}
                            />
                            {errors.phoneNumber && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                {...register("password", { required: true })}
                                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">National ID</span>
                            </label>
                            <input
                                type="text"
                                placeholder="123456789"
                                {...register("nationalId", { required: true })}
                                className={`input input-bordered ${errors.nationalId ? 'input-error' : ''}`}
                            />
                            {errors.nationalId && <span className="text-error">This field is required</span>}
                        </div>
                        <div className="form-control mt-6 md:col-span-2">
                            <button type="submit" className="btn btn-primary w-full">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
