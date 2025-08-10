import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../Signup/FormInput.jsx'
import FormLabel from '../Signup/FormLabel'
import User from '../../backendUtility/user.utility.js'
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../../Features/User/User.slice.js';

function SignIn() {
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onChangerHandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const { emailOrUsername, password } = formData;
        console.log(`formData : ${JSON.stringify(formData)}`);

        if (!emailOrUsername && !password) {
            alert('Please fill all the fields');
            return;
        }

        const loginPayload = {
            password,
            ...(emailOrUsername.includes('@')
                ? { email: emailOrUsername }
                : { userName: emailOrUsername })
        };
        

        let apiResponse;
        try {
            console.log("payload : ", loginPayload);

            const response = await User.logInUser(loginPayload);
            apiResponse = response;
        } catch (error) {
            console.error('Login failed:', error);
        }

        if (apiResponse && apiResponse.statusCode === 200) {
            dispatch(loggedInUser(apiResponse.data));
            navigate('/');
        } else {
            alert("Invalid Credentials")
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
                        <h1 className="relative text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-4 py-2">
                            VideoStream
                        </h1>
                    </div>
                    <p className="text-gray-400 mt-2">Welcome back! Please sign in to your account</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="space-y-2">
                            <FormLabel forLabel="emailOrUsername" customClass="block text-sm font-medium text-gray-300">
                                Email or Username
                            </FormLabel>
                            <FormInput
                                id="emailOrUsername"
                                name="emailOrUsername"
                                type="text"
                                placeholder="Enter your email or username"
                                customClass="w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                                isRequired={true}
                                onChange={onChangerHandler}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormLabel forLabel="password" customClass="block text-sm font-medium text-gray-300">
                                Password
                            </FormLabel>
                            <FormInput
                                onChange={onChangerHandler}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                customClass="w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                                isRequired={true}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            <span className="relative z-10">Sign In</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link 
                                to="/user/signup" 
                                className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn