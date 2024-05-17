"use client"
import Image from 'next/image'
import React, {use, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import { getAuth, signInWithPopup } from "firebase/auth";
import app from "../config";
import {  GoogleAuthProvider } from 'firebase/auth';


const notify = () => toast.error('Sign Up unSuccessfull.');
const notify1 = () => toast.success('Sign up Successfully.');
const notify3 = () => toast.error('Invalid email type');
const notify4 = () => toast.error('Invalid password type');

export default function SignUpPage () {

        const router = useRouter();
        const [User, setUSer] = React.useState<string | null>("");
        const[user, setUser] = React.useState({
            username:"",
            email:"",
            password:"",
        })
    
        const [buttonDisable, setButtonDisable] = React.useState(false);
        const [loading, setLoading] = React.useState(false);


        // on click sign up button
        const onSignUp = async () =>{
            try{
                if(user.email.endsWith("@gmail.com")){
                    setLoading(true);
                    const response = await axios.post("../../api/user/signup", user);
                    console.log("response ddata: ", response);
                    notify1();
                    router.push('/login');
                }
                else{
                    notify3();
                }

            }catch(error:any){
                notify();
                console.log(error.message);
            }finally{
                setLoading(false);
            }
    
        }

        useEffect(() =>{
            const auth = getAuth(app);
            const unsubscribe = auth.onAuthStateChanged((currUser)=>{
                if(currUser){setUSer(currUser.email);}
                else{setUSer(null);}
            })
            console.log(process.env.MONGOOSE_URL);
            if(user.username.length > 0 && user.password.length > 0 && user.email.length > 0)
            {
                setButtonDisable(false);
            }
            else
            {
                setButtonDisable(true);
            }
            return () =>unsubscribe();
        }, [user]);

        const signWithGoogle = async() =>{
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            try{
                const a = await signInWithPopup(auth, provider);
                console.log(a.user.displayName);
                const displayName = a.user.displayName || '';
                const firstName = displayName.split(' ')[0];
                const currUser = {
                    username: firstName,
                    email: a.user.email,
                    password: ""
                }
                const response = await axios.post("../../api/user/signup", currUser);
                console.log("response ddata: ", response);
                router.push(`/${firstName}`);
            }catch(error:any){
                console.log("for signpup: ", error.message);
            }
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <h1 className="text-5xl mb-5 font-sans">To Do</h1>
                <div className="flex flex-col p-10 rounded-2xl bg-gray-800">
                    <h1 className="flex mb-4 text-3xl justify-center font-mono">{loading? "Proceessing": "Sign Up"}</h1>
                    <hr />
                    {/* <label className="text-lg mt-3" htmlFor="username">User Name</label> */}
                    <input 
                        className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({...user, username:e.target.value})}
                    />
                    {/* <label className="text-2xl" htmlFor="username">Email : </label> */}
                    <input 
                        className="mt-5 p-4 rounded-lg borger-gray-300 focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email:e.target.value})}
                    />
                    {/* <label className="text-2xl" htmlFor="password">password : </label> */}
                    <input 
                        className="mt-5 p-4 border-none rounded-lg borger-gray-300 focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
                        id="password"
                        type="text"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password:e.target.value})}
                    /> 
                    <button onClick={onSignUp} className="mt-5 bg-blue-600 px-10 py-3 rounded-lg hover:bg-blue-700">{buttonDisable ? "No sign up": "Sign Up"}</button> 
                    <Toaster position="top-center" reverseOrder={false}/>
                    <button onClick={signWithGoogle} className="border-2 rounded-md text-sm p-2 text-amber-500 hover:text-blue-600 mt-2"> Signup with Google </button>
                    <Link href="/login" className="text-purple-400 mt-1 flex justify-center hover:text-cyan-300">Go to Login page</Link>
                </div>
            </div>
        );
    
}