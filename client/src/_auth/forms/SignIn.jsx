import React, { useContext } from 'react'
import { set, useForm } from "react-hook-form";
import { AppContext } from '../../context/AppContext';
import axios from "axios"
import { toast } from 'react-toastify';

function SignIn() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { setUser, navigate ,BASE_URL } = useContext(AppContext);

    const handleClick = () => {
        navigate("/sign-up")
    }
    const formSubmit = async (data) => {

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/signin`, data)
            if (response.data.success === true) {

                localStorage.setItem('token', response.data.token)
                toast.success(response.data.message)
                const userResponse = await axios.get(`${BASE_URL}/api/v1/user/data`, {
                    headers: { Authorization: `Bearer ${response.data.token}` },
                });
                if (userResponse.data.success) {
                    setUser(userResponse.data.user);
                    navigate("/")
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Login failed. Please try again.")
        }
    }
    return (
        <div className=' flex justify-center py-20'>
            <div className=" flex flex-col h-full items-center justify-center px-10 py-10 shadow-2xl bg-[#EFFFFE] rounded-2xl">
                <h1 className="text-3xl font-bold">Log in to your account</h1>
                <p className="text-gray-800 pt-2 ">Welcome back! Please enter your details</p>
                <div className="mb-6 mt-4">
                    <form className="" onSubmit={handleSubmit(formSubmit)}>
                        <div className="my-2">
                            <label className="font-medium " >Email</label>
                            <div className={`${errors.email && 'border border-red-600'} bg-[#EFFFFE] shadow-md hover:shadow-2xl mt-2 rounded-lg`}>
                                <input className="focus:outline-none w-100 p-3 rounded-lg" type="email" {...register('email',
                                    {
                                        required: { value: true, message: "Required" },
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" }
                                    }
                                )} />
                            </div>
                            {errors?.email && <p className="text-red-600" >{errors.email.message}</p>}
                        </div>
                        <div className="my-2 mb-6">
                            <label>Password</label>

                            <div className={` ${errors.password && 'border border-red-600'} bg-[#EFFFFE] shadow-md hover:shadow-2xl mt-2 rounded-lg`}>
                                <input className=" focus:outline-none w-100 p-3 rounded-lg focus:outline " type="password"  {...register('password',

                                    {
                                        required: { value: true, message: "Required" },
                                        minLength: { value: 3, message: "minimum 3" },
                                        maxLength: { value: 20, message: "maximum 20" },
                                    }
                                )} />
                            </div>
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                        </div>
                        <div>
                            <button className="w-100 bg-blue-300 shadow-xl text-white py-3 rounded-lg font-semibold" disabled={isSubmitting}>{isSubmitting ? 'submitting....' : 'Log in'}</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p className="text-center py-2">Don't have an account? <span onClick={handleClick} className="cursor-pointer text-blue-600">Sign Up</span></p>
                </div>

            </div>
        </div>
    )
}

export default SignIn