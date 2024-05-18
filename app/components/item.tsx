import React from 'react';
import { MdDelete } from 'react-icons/md';
import axios from "axios";

interface ItemProps {
  cct: string; 
  id: string;
  onDelete: (id: string) => void;
}


const Item: React.FC<ItemProps> = ({ cct, id, onDelete}) => {
  const deleteItem = async()=>{
      console.log(id);
      try {
        const res = await axios.get('/api/contentdelete', {params:{id:id}});
        console.log(res);
        onDelete(id);
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="flex bg-gray-800 py-2 px-[.5px] mb-2 rounded-md">
      <div className="w-full text-gray-300 p-2 text-sm h-8 text-stone-300">
        {cct}
      </div>
      <div className="p-2" onClick={deleteItem}>
        <MdDelete 
          className="text-xl text-amber-400 hover:text-amber-600"
        /> 
      </div>
    </div>
  );
};

export default Item;
