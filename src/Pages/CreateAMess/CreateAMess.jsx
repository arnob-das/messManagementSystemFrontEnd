import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAMess = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
        toast.success("Mess created successfully!");
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
                                type="text"
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
