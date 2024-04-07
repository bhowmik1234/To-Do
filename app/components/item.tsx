import { MdDelete } from "react-icons/md";

export default function Item(props:any){
    return(
        <div className="flex bg-gray-800 p-2 rounded-md">
          <div className="w-full text-gray-300 p-2">
            content
          </div>
          <div className="p-2">
          <MdDelete 
          className="text-xl text-amber-400"
          /> 
          </div>
        </div>
    )
}