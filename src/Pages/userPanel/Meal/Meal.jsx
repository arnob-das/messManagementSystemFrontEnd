import { useState } from 'react';
import MealModal from '../../../components/MealModal/MealModal';
import MealTable from '../../../components/MealTable/MealTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Meal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Meals</h1>

            </div>
            <button className="btn btn-success flex items-center" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Meal
                </button>
            <MealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <MealTable />
        </div>
    );
};

export default Meal;