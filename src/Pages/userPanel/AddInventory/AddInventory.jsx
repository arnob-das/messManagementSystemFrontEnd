import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroceryCost, deleteGroceryCost } from '../../../features/groceryCost/gorceryCostSlice';
import { toast } from "react-toastify";
import AddGroceryForm from './AddGroceryForm';
import EditGroceryForm from './EditGroceryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AddInventory = () => {
    const dispatch = useDispatch();
    const [totalCost, setTotalCost] = useState(0);
    const [month] = useState(new Date().getMonth() + 1);
    const [year] = useState(new Date().getFullYear());
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const groceryCost = useSelector((state) => state.groceryCosts.groceryCost);
    const currentMessId = user.currentMessId;

    useEffect(() => {
        dispatch(getGroceryCost({ messId: currentMessId, month, year }));
    }, [dispatch, currentMessId, month, year]);

    useEffect(() => {
        if (groceryCost) {
            const total = groceryCost.groceries.reduce((acc, item) => acc + item.price, 0);
            setTotalCost(total);
        }
    }, [groceryCost]);

    const handleDelete = async () => {
        try {
            await dispatch(deleteGroceryCost({
                messId: currentMessId,
                month,
                year,
                groceryId: deleteItem._id
            }));
            setDeleteItem(null);
            toast.success('Grocery cost deleted successfully');
            dispatch(getGroceryCost({ messId: currentMessId, month, year }));
        } catch (error) {
            toast.error('Failed to delete grocery cost');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Manage Grocery</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        {totalCost > 0 && (
                            <div className="card w-full bg-base-100 shadow-xl mb-4">
                                <div className="card-body">
                                    <h2 className="card-title">Total Grocery Cost for {month}/{year}</h2>
                                    <p className="text-2xl font-bold">{totalCost.toFixed(2)} Taka</p>
                                </div>
                            </div>
                        )}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="card-title mb-5">Add Grocery</h2>
                            <AddGroceryForm currentMessId={currentMessId} month={month} year={year} />
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Grocery Costs for {month} / {year}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Grocery Details</th>
                                        <th>Cost</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groceryCost ?
                                        groceryCost.groceries.map((item, index) => (
                                            <tr key={index}>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td>{item.groceryDetails}</td>
                                                <td>{item.price.toFixed(2)} Taka</td>
                                                <td className="flex space-x-2">
                                                    <button onClick={() => setEditItem(item)} className="btn btn-sm btn-primary">
                                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                    </button>
                                                    <button onClick={() => setDeleteItem(item)} className="btn btn-sm btn-error">
                                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan="4" className="text-center">No grocery cost found.</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {editItem && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Grocery Cost</h3>
                        <EditGroceryForm
                            currentMessId={currentMessId}
                            month={month}
                            year={year}
                            editItem={editItem}
                            setEditItem={setEditItem}
                        />
                    </div>
                </div>
            )}

            {deleteItem && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Delete</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
                            <button className="btn" onClick={() => setDeleteItem(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddInventory;
