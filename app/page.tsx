"use client"
import Item from "./components/item"
// import tokenData from "@/helper/getdatafromtoken";
import React from "react";
import axios from "axios";

export default function Home() {
// const [value, setValue] = React.useState('');

async function logout(){
  const data = await axios.get("../api/user/data");
  console.log(data);
}
  return (
    <main className="flex p-10 justify-center">
      <div  className="flex flex-col w-3/4">
      <button onClick={logout} className="outline-none border-2 w-20 p-2 rounded-md m-2 hover:border-amber-500 hover:text-amber-500">Log out</button> 
        <div className="flex justify-center w-full gap-2.5 h-14 mb-16">
          <input 
          name="content"
          placeholder="Enter to do item"
          className="p-2 bg-zinc-800 border-amber-900 outline-none w-full rounded-md text-gray-400"
          />
          <button className="px-6 rounded-md bg-amber-500">Add</button>
        </div>
        <Item />
      </div>
    </main>
  );
}
