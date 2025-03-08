    import React, { useContext } from 'react'
    import { useForm } from "react-hook-form";
    import { AppContext } from '../../context/AppContext';
    import axios from "axios"
    import { toast } from 'react-toastify';

    function SignUp() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const {navigate,BASE_URL } = useContext(AppContext);
    const handleClick = () => {
        navigate("/sign-in")
        }

        const formSubmit = async(data) => {
        try{
            const response= await axios.post(`${BASE_URL}/api/v1/user/signup`,data)
        if(response.data.success===true){
            toast.success(response.data.message)
            navigate("/sign-in")
        }else{
            toast.error(response.data.message)
        }
        }catch(error){
            console.log(error.message);
            toast.error("Signup failed. Please try again.")
        } 
        }
        
    return (
        <div className=' flex justify-center py-10'>
        <div className=" flex flex-col h-full items-center justify-center bg-[#EFFFFE] px-10 shadow-2xl py-4 rounded-2xl">
        <h1 className="text-3xl font-bold">Create a new account</h1>
        <p className="text-gray-800 pt-2 ">Please enter your details</p>
        <div className="mb-6">
            <form className="" onSubmit={handleSubmit(formSubmit)}>
               <div className="my-2">
                    <label className="font-medium " >Username</label>
                    <div className={`${errors.username && 'border border-red-600'} bg-[#EFFFFE] shadow-md hover:shadow-2xl mt-2 rounded-lg`}>
                        <input className="focus:outline-none w-100 p-3 rounded-lg" type="text" {...register('username',
                            {
                                required: { value: true, message: "Required" },
                                minLength: { value: 3, message: "minimum 3" },
                                maxLength:{value:20,message:"maximum 20"}
                            }
                        )} />
                    </div>
                    {errors?.username && <p className="text-red-600" >{errors.username.message}</p>}
                </div> <div className="my-2">
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
                    <button className="w-100 bg-[#8EC5FF] shadow-xl text-white py-3 rounded-lg font-semibold" disabled={isSubmitting}>{isSubmitting ? 'submitting....' : 'Sign Up'}</button>
                </div>
            </form>
        </div>
        <div>
            <p className="text-center py-2">Already have an account? <span onClick={handleClick} className="cursor-pointer text-blue-600">Sign In</span></p>
        </div>

    </div>
        </div>
    )
    }

    export default SignUp