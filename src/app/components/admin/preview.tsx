"use client"
import { FaEye } from "react-icons/fa6";
interface listArray {
    id: string;
    url: string;
    active: boolean;
    userId: string;
    order: number;
}

interface LinksResponse {
    data: listArray[];
}
interface PropsLinks {
    linksData: LinksResponse
}
export default function Preview({ linksData }: PropsLinks) {
    return (
        <button className="active:scale-95 duration-300 bg-white shadow-md my-3 fixed bottom-10 w-80 h-10 rounded-full flex justify-center items-center gap-2">
            <h1 className="text-gray-700 font-bold">Pré-vizualizar</h1>
            <FaEye className="text-black"/>
        </button>
    )
}