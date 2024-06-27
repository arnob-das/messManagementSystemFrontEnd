import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUtility } from '../../../features/utilityBill/utilityBillSclice';

const UtilityBill = () => {
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

    const totalUtilityCost = utilityBill?.utilities?.reduce((total, utility) => total + utility.utilityCost, 0) || 0;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-4">
                    <div className="card shadow-lg p-4">
                        <h1 className="text-xl leading-tight font-medium text-black">Total Utility Bill</h1>
                        <p className="text-2xl font-bold mt-2">{totalUtilityCost} Taka</p>
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-lg leading-tight font-medium text-black">Utility Bills for {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h2>
                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Utility Name</th>
                                    <th>Utility Cost</th>
                                </tr>
                            </thead>
                            {
                                utilityBill?.utilities &&
                                <tbody>
                                    {utilityBill.utilities.map((utility) => (
                                        <tr key={utility._id}>
                                            <td>{utility.utilityName}</td>
                                            <td>${utility.utilityCost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UtilityBill;