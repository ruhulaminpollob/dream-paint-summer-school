
import { useContext } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const Login = () => {

    const [isError, setIsError] = useState("")
    const { login, googleLogin } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'

    // todo ---
    isError && console.log("");

    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .catch(err => {
                setIsError(err)
            })


    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                const user = { name: result.user.displayName, email: result.user.email, role: 'student' }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() => {

                        navigate(from, { replace: true })
                    })
            })
            .catch(err => {
                setIsError(err);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Dream Paint-Login</title>
            </Helmet>



            <div className="min-h-screen py-10 bg-base-200">
                <div className="w-72 md:w-96 flex-col mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold py-5">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="Email" name="email" required className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type={showPassword ? 'password' : "text"}   {...register("password", {
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <p className="text-red-600">More then 6 characters are valid</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Use At least one capital letter and one special character</p>}


                                <span className="w-fit ml-auto " onClick={() => setShowPassword(!showPassword)}>

                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }

                                </span>
                            </div>



                            <input type="submit" className=" btn btn-info" value="Login" />
                            <div>
                                <p>Already have an account? <Link className="text-yellow-400" to="/signup">Sign UP</Link></p>

                            </div>

                        </div>

                        <div>

                        </div>
                        <div className="divider">OR</div>
                        <div className="pb-5 mx-auto">
                            <h1 onClick={handleGoogleLogin} className="btn">
                                Login with google <FaGoogle className=" inline"></FaGoogle>
                            </h1>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;