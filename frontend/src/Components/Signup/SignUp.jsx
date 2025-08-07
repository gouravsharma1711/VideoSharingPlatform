import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput.jsx'; 
import FormLabel from './FormLabel.jsx';
import user from '../../backendUtility/user.utility.js'
import LoadingSpinner from '../dashBoard/LoadingSpinner.jsx'
import {toast} from 'react-toastify';
function SignUp() {
    const navigate=useNavigate();
    const inputClass = 'w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300';
    const labelClass = 'block text-sm font-medium text-gray-300 mb-2';
    const fileInputClass = "w-full text-sm text-gray-300 border border-gray-600/50 rounded-xl cursor-pointer bg-slate-700/50 file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300";

    const [formData,setFormData]=useState({
        userName:'',
        fullName:'',
        email:'',
        password:'',
        avatar:'',
        coverImage:''
    });
    const [loading,setLoading]=useState(false);

    const changeHandler=(e)=>{
        const { name, files, type, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:type==='file'?files[0]:value
        }))
    }

    const signUpSubmitHandler=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {

            const response=await user.registerUser(formData);
            if(response.statusCode===200){
                toast.success('Account created successfully');
                navigate('/user/signin')
            }else{
                toast.error(response.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);   
        }finally{
            setLoading(false);
        }
        
    }
    // LoadingSpinner
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
                        <h1 className="relative text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-4 py-2">
                            VideoStream
                        </h1>
                    </div>
                    <p className="text-gray-400 mt-2">Join our community and start sharing your videos</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                    <form className="space-y-6" onSubmit={signUpSubmitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <FormLabel forLabel="userName" customClass={labelClass}>Username</FormLabel>
                                <FormInput 
                                    type='text' 
                                    name="userName" 
                                    id='userName' 
                                    onChange={changeHandler}
                                    customClass={inputClass} 
                                    placeholder="Enter username"
                                    isRequired={true}
                                    canChange={!loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <FormLabel forLabel="fullName" customClass={labelClass}>Full Name</FormLabel>
                                <FormInput 
                                onChange={changeHandler}
                                    type='text' 
                                    name="fullName" 
                                    id='fullName' 
                                    customClass={inputClass} 
                                    placeholder="Enter full name"
                                    isRequired={true}
                                    canChange={!loading}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <FormLabel forLabel="email" customClass={labelClass}>Email Address</FormLabel>
                            <FormInput 
                            onChange={changeHandler}
                                type='email' 
                                name="email" 
                                id='email' 
                                customClass={inputClass} 
                                placeholder="Enter email address"
                                isRequired={true}
                                canChange={!loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormLabel forLabel="password" customClass={labelClass}>Password</FormLabel>
                            <FormInput 
                                onChange={changeHandler}
                                type='password' 
                                name="password" 
                                id='password' 
                                customClass={inputClass} 
                                placeholder="Enter password"
                                isRequired={true}
                                canChange={!loading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <FormLabel forLabel="avatar" customClass={labelClass}>
                                    <i className="fa-solid fa-user mr-2 text-purple-400"></i>
                                    Avatar Image
                                </FormLabel>
                                <FormInput 
                                    onChange={changeHandler}
                                    type='file' 
                                    name="avatar" 
                                    id='avatar' 
                                    customClass={fileInputClass}
                                    accept="image/*"
                                    isRequired={true}
                                    canChange={!loading}
                                />
                                <p className="text-xs text-gray-400">{formData.avatar?`${Number((formData.avatar.size/(1024*1024)).toFixed(2))} Mb`:"PNG, JPG, or GIF"}</p>
                            </div>

                            <div className="space-y-2">
                                <FormLabel forLabel="coverImage" customClass={labelClass}>
                                    <i className="fa-solid fa-image mr-2 text-purple-400"></i>
                                    Cover Image
                                </FormLabel>
                                <FormInput 
                                    onChange={changeHandler}
                                    type='file' 
                                    name="coverImage" 
                                    id='coverImage' 
                                    customClass={fileInputClass}
                                    accept="image/*"
                                    canChange={!loading}
                                />
                                <p className="text-xs text-gray-400">{formData.coverImage?`${Number((formData.coverImage.size/(1024*1024)).toFixed(2))} Mb`:"PNG, JPG, or GIF"} </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            <span className="relative z-10">{loading?(
                                <div className='flex items-center justify-center gap-2'>
                                <LoadingSpinner size={20}/> 
                            </div>) :"Create Account"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link 
                                to="/user/signin" 
                                className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
