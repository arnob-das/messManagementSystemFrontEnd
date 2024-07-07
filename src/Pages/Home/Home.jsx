import { faBuilding, faCartShopping, faChartLine, faPlug, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import HomeImg from "../../assets/homeImg.jpg"

const Home = () => {
    return (
        <div>
            <section className="hero pt-10 pb-10 md:pt-20 md:pb-20 lg:min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <img src={HomeImg} className="hidden lg:block max-w-xs sm:max-w-sm rounded-lg shadow-2xl mb-6 lg:mb-0" alt="Hero Image" />
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">Welcome to Mess Management System</h1>
                        <p className="mb-4 lg:mb-6 text-base sm:text-lg">Efficiently manage your mess with our easy-to-use system. Keep track of members, meals, bills, and more all in one place.</p>
                        <Link to="/register" className="btn btn-secondary btn-lg">Get Started</Link>
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 bg-base-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                                <FontAwesomeIcon className='text-2xl' icon={faUser} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">User Management</h3>
                                <p>Manage user registrations, approvals, and role assignments with ease.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                                <FontAwesomeIcon className='text-2xl' icon={faUtensils} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">Meal Tracking</h3>
                                <p>Track daily meals and manage meal deposits effortlessly.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                            <FontAwesomeIcon className='text-2xl' icon={faCartShopping} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">Grocery Management</h3>
                                <p>Add your grocery cost and view monthly grocery cost effortlessly</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                            <FontAwesomeIcon className='text-2xl' icon={faPlug} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">Utility Bill Management</h3>
                                <p>Manage your utility bill and tracks records.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                            <FontAwesomeIcon className='text-2xl' icon={faBuilding} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">Flat Rent</h3>
                                <p>Assign Flat and Room rent easily by our system.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body">
                            <FontAwesomeIcon className='text-2xl' icon={faChartLine} />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">Dashboard</h3>
                                <p>User dashboard and manager dashboard will give you a clear idea of overall costing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Ready to simplify your mess management?</h2>
                    <Link to="/register">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
