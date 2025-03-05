"use client"
import { FaEye } from "react-icons/fa6";
import templateCloud from "../templatesUser/templateCloud";
import { useState } from "react";
import { usePreviews } from "../../../../context/triggerPreview";
import { usePathname } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import TemplateCloud from "../templatesUser/templateCloud";
import TemplateCloudSky from "../templatesUser/templateCloudSky";
interface listArray {
    id: string;
    url: string;
    title: string;
    active: boolean;
    userId?: string;
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
        preview && <div className="bg-bgDefault w-full overflow-hidden" >
            <div className="">
                <div className="flex justify-start items-center pl-3 h-10 bg-gray-600 w-full  relative z-[99999]">
                    <FaArrowAltCircleLeft onClick={() => setPreview(false)} className="text-2xl text-white" />
                </div>
                <TemplateCloudSky links={linksData} />
            </div>
        </div>
    )
}