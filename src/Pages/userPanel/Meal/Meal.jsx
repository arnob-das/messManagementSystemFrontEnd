import { useState } from 'react';
import MealModal from '../../../components/MealModal/MealModal';
import MealTable from '../../../components/MealTable/MealTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


const Meal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Meals</h1>

            </div>
            {
                user.approved &&
                <div>
                    <button className="btn btn-success flex items-center" onClick={() => setIsModalOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Meal
                    </button>
                    <MealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            }

            <MealTable />
        </div>
    );
};

export default Meal;