"use client"
import { FaEye } from "react-icons/fa6";
import TemplateUser from "../templatesUser/template01";
import { useState } from "react";
import { usePreviews } from "../../../../context/triggerPreview";
import { usePathname } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
interface listArray {
    id: string;
    url: string;
    title: string;
    active: boolean;
    userId?: string ;
    order: number;
}

interface LinksResponse {
    data: listArray[];
}
interface PropsLinks {
    linksData: LinksResponse
}
export default function Preview({ linksData }: PropsLinks) {
    // const [preview, setPreview] = useState<boolean>(false)
    const pathname = usePathname();

    const { setPreview, preview } = usePreviews()
    return (
        <div className="bg-bgDefault w-full" >
            <button onClick={() => setPreview(!preview)} className={`${preview ? "hidden" : "flex"} bg-white  justify-center active:scale-95 "flex my-  items-center gap-3  p-4 rounded-lg  h- w-full border "`}>
                <h1 className="text-gray-700 font-bold">Pré-vizualizar</h1>
                <FaEye className="text-black" />
            </button>
            {preview &&
                <div className=" w-full z-[9999] ">
                    <div className="flex justify-start items-center pl-3 h-10 bg-gray-600 w-full">
                        <FaArrowAltCircleLeft onClick={()=>setPreview(false)} className="text-2xl text-white"/>
                    </div>
                    <TemplateUser links={linksData} />
                </div>}
        </div>
    )
}