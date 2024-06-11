import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/user/login", data);

            if (response.status === 200) {
                // Login successful
                dispatch(loginSuccess(response.data.user));
                toast.success("Login successful");
                navigate('/user-dashboard');
                // Handle success, such as redirecting to another page
            } else {
                // Handle other status codes
                dispatch(loginFailure("Server error"));
                toast.error("Server error");
            }
        } catch (err) {
            // Login failed
            if (err.response) {
                dispatch(loginFailure(err.response.data.message));
                toast.error(err.response.data.message);
            } else {
                dispatch(loginFailure("Server error"));
                toast.error("Server error");
            }
        }
    };

    return (
        <div className="flex items-center justify-center md:my-10">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="input input-bordered"
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", { required: "Password is required" })}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p>
                            Do not Have an account?{" "}
                            <Link className="text-blue-500" to="/register">
                                Register
                            </Link>
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <a href="#" className="link link-hover">
                            Forgot password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
