"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


const notify = () => toast.error('Invalid Username and password');
const notify1 = () => toast.success('User found.');

export default function Login(){

    const router = useRouter();
    const[user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try{
            setLoading(true);
            const response = await axios.post('../../api/user/login', user);
            console.log("response data", response);
            notify1();
            const userName = response.data.message.user;
            router.push(`/${userName}`);

        }catch(error:any){
            notify();
            console.log(error.message);
        }finally{
            setLoading(false);
        }

    };

    useEffect(() =>{
        if(user.email.length > 0 && user.password.length > 0)
        {
            setButtonDisable(false);
        }
        else
        {
            setButtonDisable(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl mb-5 font-sans">To Do</h1>
            <div className="flex flex-col p-10 rounded-2xl bg-gray-800">
            <h1 className="flex mb-4 text-3xl justify-center font-mono">{loading? "Proceessing": "Login"}</h1>
                <hr />
                {/* <label className="text-2xl" htmlFor="email">Email : </label> */}
                <input 
                    className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                />
                {/* <label className="text-2xl" htmlFor="password">password : </label> */}
                <input 
                    className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
                    id="password"
                    type="text"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                /> 
                <button onClick={onLogin}  className="mt-5 bg-blue-600 px-10 py-3 rounded-lg hover:bg-blue-700">{buttonDisable?"No Login": "Login"}</button> 
                <Toaster position="top-center" reverseOrder={false}/>
                <Link href="/signup" className="text-purple-400 mt-1 flex justify-center hover:text-cyan-300">Go to SignUp page</Link>
            </div>
        </div>
    );
}
