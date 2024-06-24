import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { getApprovedMembersSeatRents, updateSeatRentForMember } from '../../../features/mess/messSlice';

const SetRent = () => {
    const dispatch = useDispatch();
    const mess = useSelector((state) => state.mess.mess);
    const [getMemberRents, setMemberRents] = useState([]);
    const { control, handleSubmit, reset } = useForm();

    const messId = mess._id;

    const fetchData = async () => {
        try {
            const response = await dispatch(getApprovedMembersSeatRents({ messId }));
            setMemberRents(response.payload);
        } catch (error) {
            console.error('Failed to fetch approved members:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, messId]);

    useEffect(() => {
        if (getMemberRents.length > 0) {
            const defaultValues = getMemberRents.reduce((acc, member) => {
                acc[member.userId] = member.seatRent;
                return acc;
            }, {});
            reset(defaultValues);
        }
    }, [getMemberRents, reset]);

    const handleSaveRent = async (userId, data) => {
        try {
            const seatRent = data[userId];
            await dispatch(updateSeatRentForMember({ messId, userId, seatRent }));
            toast.success('Seat rent updated successfully!');
            fetchData();
            reset();
        } catch (error) {
            toast.error('Failed to update seat rent.');
            console.error('Failed to update seat rent:', error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Set Rent for Approved Members</h1>
            <form>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Seat Rent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getMemberRents.map(member => (
                                <tr key={member.userId}>
                                    <td>{member.fullName}</td>
                                    <td>
                                        <Controller
                                            name={member.userId}
                                            control={control}
                                            defaultValue={member.seatRent}
                                            render={({ field }) => (
                                                <input
                                                    type="number"
                                                    className="input input-bordered w-24"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleSubmit((data) => handleSaveRent(member.userId, data))}
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SetRent;
