import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Registration = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // form submit
    const onSubmit = async (data) => {
        // check password and confirm password match or not
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/user/register', data);
            if (response.status === 201) {
                toast.success(response.data);
                navigate('/login');
            }
            if (response.status === 400) {
                toast.success(response.data);
            }
        } catch (err) {
            console.error(err);
            toast.error('Server Error');
        }
    };

    const password = watch('password');

    return (
        <div className="md:my-10 flex items-center justify-center">
            <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">User Registration</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('fullName', { required: 'Full Name is required' })}
                                placeholder="John Doe"
                                className="input input-bordered"
                            />
                            {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                                placeholder="email@example.com"
                                className="input input-bordered"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value => value === password || 'Passwords do not match'
                                })}
                                placeholder="confirm password"
                                className="input input-bordered"
                            />
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                {...register('phoneNumber', { required: 'Phone Number is required' })}
                                placeholder="123-456-7890"
                                className="input input-bordered"
                            />
                            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">National ID Number</span>
                            </label>
                            <input
                                type="text"
                                {...register('nationalId', { required: 'National ID Number is required' })}
                                placeholder="123456789"
                                className="input input-bordered"
                            />
                            {errors.nationalId && <span className="text-red-500">{errors.nationalId.message}</span>}
                        </div>
                        <div className="form-control mt-6 md:col-span-2">
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
