import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addUtility, getUtility, updateUtility, deleteUtility } from '../../../features/utilityBill/utilityBillSclice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AssignBills = () => {
    const { register, handleSubmit, reset } = useForm();
    const [editingUtility, setEditingUtility] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const dispatch = useDispatch();
    const mess = useSelector((state) => state.mess.mess);
    const utilityBill = useSelector((state) => state.utilityBill.utilityBill);

    useEffect(() => {
        if (mess._id) {
            dispatch(getUtility({ messId: mess._id, month, year }));
        }
    }, [month, year, dispatch, mess._id]);

    const onSubmit = async (data) => {
        if (editingUtility) {
            await dispatch(updateUtility({ ...data, utilityId: editingUtility._id, messId: mess._id, month, year }));
            toast.success('Utility updated successfully');
        } else {
            await dispatch(addUtility({ ...data, messId: mess._id, month, year }));
            toast.success('Utility added successfully');
        }
        reset();
        setEditingUtility(null);
        setIsModalOpen(false);
    };

    const handleEdit = (utility) => {
        setEditingUtility(utility);
        setIsModalOpen(true);
    };

    const handleDelete = async (utilityId) => {
        await dispatch(deleteUtility({ utilityId, messId: mess._id, month, year }));
        toast.success('Utility deleted successfully');
    };

    const totalUtilityCost = utilityBill?.utilities?.reduce((total, utility) => total + utility.utilityCost, 0) || 0;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-4">
                    <div className="card shadow-lg p-4">
                        <h1 className="text-xl leading-tight font-medium text-black">Total Utility Bill</h1>
                        <p className="text-2xl font-bold mt-2">{totalUtilityCost} Taka</p>
                    </div>
                    <h1 className="text-lg leading-tight font-medium text-black mt-6">Assign Bills</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="Utility Name"
                            {...register('utilityName', { required: true })}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Utility Cost"
                            {...register('utilityCost', { required: true })}
                            className="input input-bordered w-full"
                            required
                        />
                        <div className="flex space-x-4">
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                {[...Array(12).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            {editingUtility ? 'Update Utility' : 'Add Utility'}
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-lg leading-tight font-medium text-black">Utility Bills for {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h2>
                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full table-zebra">
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th>Utility Name</th>
                                    <th>Utility Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {
                                utilityBill?.utilities &&
                                <tbody>
                                    {utilityBill.utilities.map((utility) => (
                                        <tr key={utility._id}>
                                            <td>{utility.utilityName}</td>
                                            <td>{utility.utilityCost} Taka</td>
                                            <td>
                                                <button onClick={() => handleEdit(utility)} className="btn btn-sm btn-info mr-2">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => handleDelete(utility._id)} className="btn btn-sm btn-error">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Utility</h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                                <input
                                                    type="text"
                                                    placeholder="Utility Name"
                                                    defaultValue={editingUtility.utilityName}
                                                    {...register('utilityName', { required: true })}
                                                    className="input input-bordered w-full"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Utility Cost"
                                                    defaultValue={editingUtility.utilityCost}
                                                    {...register('utilityCost', { required: true })}
                                                    className="input input-bordered w-full"
                                                    required
                                                />
                                                <button type="submit" className="btn btn-primary w-full">
                                                    Update Utility
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignBills;
