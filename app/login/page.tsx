"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { getAuth, signInWithPopup } from "firebase/auth";
import app from "../config";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Autour_One } from "next/font/google";

const notify = () => toast.error("Invalid Username and password");
const notify1 = () => toast.success("User found.");

export default function Login() {
  const router = useRouter();
  const [User, setUSer] = React.useState<string | null>("");
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("../../api/user/login", user);
      console.log("response data", response);
      notify1();
      const userName = response.data.message.user.username;
      router.push(`/${userName}`);
    } catch (error: any) {
      notify();
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((currUser) => {
      if (currUser) {
        setUSer(currUser.email);
      } else {
        setUSer(null);
      }
    });
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
    return () => unsubscribe();
  }, [user]);

  const signWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const a = await signInWithPopup(auth, provider);
      console.log(a);
      console.log(1);
      const displayName = a.user.displayName || "";
      const b = displayName.split(" ")[0];
      const res = await axios.post("../../api/userdetail", { username: b });
      console.log(res);
      if (res.data.message == "user found") {
        router.push(`/${b}`);
      } else router.push("/signup");
      console.log(2);
      // router.push(`/login`);
    } catch (error: any) {
      console.log("for signpup: ", error.message);
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //     <h1 className="text-5xl mb-5 font-sans">To Do</h1>
    //     <div className="flex flex-col p-10 rounded-2xl bg-gray-800">
    //     <h1 className="flex mb-4 text-3xl justify-center font-mono">{loading? "Proceessing": "Login"}</h1>
    //         <hr />
    //         {/* <label className="text-2xl" htmlFor="email">Email : </label> */}
    //         <input
    //             className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
    //             id="email"
    //             type="text"
    //             placeholder="Email"
    //             value={user.email}
    //             onChange={(e) => setUser({...user, email:e.target.value})}
    //         />
    //         {/* <label className="text-2xl" htmlFor="password">password : </label> */}
            // <input
            //     className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
            //     id="password"
            //     type="text"
            //     placeholder="Password"
            //     value={user.password}
            //     onChange={(e) => setUser({...user, password:e.target.value})}
            // />
            // <button onClick={onLogin}  className="mt-5 bg-blue-600 px-10 py-3 rounded-lg hover:bg-blue-700">{buttonDisable?"No Login": "Login"}</button>
            // <Toaster position="top-center" reverseOrder={false}/>
            // <button onClick={signWithGoogle} className="border-2 rounded-md text-sm p-2 text-amber-500 hover:text-blue-600 mt-2"> Sign in with Google </button>
            // <Link href="/signup" className="text-purple-400 mt-1 flex justify-center hover:text-cyan-300">Go to SignUp page</Link>
    //     </div>
    // </div>
    <>
      <div className="relative p-10 flex items-center justify-center h-screen">
        <Image
          src="/img1.jpeg"
          alt="loign"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
        <div className="flex border-[.5px] flex-row items-center justify-center w-[700px] h-[400px]">
          <div className="relative w-1/2 h-full">
            <Image
              src="/task.svg"
              alt="image"
              layout="fill"
              objectFit="contain"
              className="p-20 bg-emerald-900"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-1/2 border-l-[.5px] h-full p-8">
            <h1 className="text-3xl text-stone-400">Login </h1>
            <p className="text-sm text-neutral-500">Fill the necessary details</p>
            <input
                className="mt-5 p-2 text-sm bg-transparent border-b-[.5px] rounded-t-lg w-full focus:outline-none focus:scale-105 text-gray-400 "
                id="email"
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value})}
            />
            <input
                className="mt-5 p-2 text-sm bg-transparent border-b-[.5px] rounded-t-lg w-full focus:outline-none focus:scale-105 text-gray-400 "
                id="password"
                type="text"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
            />
            <button onClick={buttonDisable ? undefined : onLogin} className={`mt-5 w-full px-10 py-2 text-sm rounded-lg bg-emereal-700 ${buttonDisable ? 'bg-emerald-700 cursor-not-allowed' : 'bg-emerald-700 hover:bg-blue-700'} `}>Login</button>
            <Toaster position="top-center" reverseOrder={false}/>
            <p className="text-xs text-gray-300 mt-2">or</p>
            <button onClick={signWithGoogle} className="text-[1.5rem] text-sm p-2"> <FcGoogle /> </button>
            <Link href="/signup" className=" text-xs text-green-600 mt-1 flex justify-center hover:text-violet-400">Go to SignUp page</Link>
          </div>
        </div>
      </div>
    </>
  );
}
