
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const CreateUsers = () => {
    const { createUser, profileDetails, googleLogin } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [machPassword, setMachPassword] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setMachPassword(true)
        if (data.confirm !== data.password) {
            setMachPassword(false)
            return;
        }


        //createUser 
        createUser(data.email, data.password)
            .then(() => {
                profileDetails(data.name, data.photo)
                    .then(() => {
                        const user = { name: data.name, email: data.email, image:data.photo, role: 'student' }
                        fetch('https://dream-paint-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    navigate(from, { replace: true })

                                }
                            })


                    })
                    .catch((error) => console.log(error))

            })
            .catch(error => {
                console.log(error)
            })


    }

    // google login 

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {

                const user = { name: result.user.displayName, email: result.user.email, photo:result.user.photoURL, role: 'student' }
                fetch('https://dream-paint-server.vercel.app/users', {
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
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Dream Paint - SignUp</title>
            </Helmet>


            <div className="min-h-screen py-10 bg-base-200">
                <div className="w-72 md:w-96 flex-col mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold py-5">Sign Up</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} name="name" placeholder="Name" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="Email" name="email" required className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={!showPassword ? 'password' : "text"}   {...register("password", {
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <p className="text-red-600">More then 6 characters are valid</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Use At least one capital letter and one special character</p>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type={!showPassword ? 'password' : "text"}   {...register("confirm", {
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="Confirm Password" className="input input-bordered" />
                                {errors.confirm?.type === 'minLength' && <p className="text-red-600">More then 6 characters are valid</p>}
                                {errors.confirm?.type === 'pattern' && <p className="text-red-600">Use At least one capital letter and one special character</p>}


                                <span className="w-fit ml-auto " onClick={() => setShowPassword(!showPassword)}>

                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }

                                </span>
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="text" {...register("photo")} placeholder="PhotoURL" name="photo" required className="input input-bordered" />

                            </div>
                            <input type="submit" className=" btn btn-info" value="Sign Up" />
                            <div>
                                <p>Already have an account? <Link className="text-yellow-400" to="/login">login</Link></p>

                            </div>
                            <div>
                                {
                                    !machPassword && <p className="text-red-500">Password are not matched</p>
                                }

                            </div>
                            <div className="divider">OR</div>
                            <div className="pb-5 mx-auto">
                                <h1 onClick={handleGoogleLogin} className="btn">
                                    Login with google <FaGoogle className=" inline" onClick={handleGoogleLogin}></FaGoogle>
                                </h1>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUsers;