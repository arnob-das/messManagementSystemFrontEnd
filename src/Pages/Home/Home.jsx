const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://via.placeholder.com/400" className="max-w-sm rounded-lg shadow-2xl" alt="Hero Image" />
                    <div>
                        <h1 className="text-5xl font-bold">Welcome to Mess Management System</h1>
                        <p className="py-6">Efficiently manage your mess with our easy-to-use system. Keep track of members, meals, bills, and more all in one place.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-base-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold">User Management</h3>
                                <p>Manage user registrations, approvals, and role assignments with ease.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold">Meal Tracking</h3>
                                <p>Track daily meals and manage meal deposits effortlessly.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold">Billing & Payments</h3>
                                <p>Automate billing, track utility costs, and handle payments seamlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 bg-primary text-primary-content">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to simplify your mess management?</h2>
                    <button className="btn btn-secondary">Sign Up Now</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
