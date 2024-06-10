import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex items-center justify-center md:my-10">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email@example.com" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit"  className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p>Do not Have an account? <Link className="text-blue-500" to="/register">Register</Link></p>
                    </div>
                    <div className="text-center mt-4">
                        <a href="#" className="link link-hover">Forgot password?</a>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Login;
