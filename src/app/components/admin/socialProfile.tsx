"use client"
import Image from "next/image";
import imageProfile from '../../assets/uranus.png'
import { FaFacebook, FaPlus, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { Session } from "next-auth";
import CreateLink from "../../../../actions/createLink";
import { usePreviews } from "../../../../context/triggerPreview";
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { type Crop } from 'react-image-crop'

export default function SocialProfile({ session }: { session: Session | null }) {
    function textSlice(text: string) {
        return text.substring(0, 40) + "..."
    }
    const { preview } = usePreviews()
    // const [crop, setCrop] = useState<Crop>({
    //     unit: '%', // Can be 'px' or '%'
    //     x: 25,
    //     y: 25,
    //     width: 50,
    //     height: 50
    //   })

    // async function handleUpload(): Promise<responseUpload> {
    //     const uploads = imageCouple.map((image: any) => {
    //         const storageRef = ref(storage, `user/${idUser}/images/${image?.name}`);
    //         return uploadBytes(storageRef, image) // Faz o upload de cada foto
    //             .then((snapshot) => {

    //                 return getDownloadURL(snapshot.ref); // Obtém a URL de download
    //             })
    //             .catch((error) => {
    //                 console.error(`Erro ao enviar foto ${image}:`, error);
    //             });
    //     })

    //     try {
    //         const urls = await Promise.all(uploads);
    //         return { imgUpload: urls }
    //     } catch (error) {
    //         console.error("Erro ao enviar as fotos:", error);
    //         return { errorImg: "Algo deu errado!" }
    //     }
    // }
    return (
        <div className={`${preview ? "hidden" : "flex"} flex-col w-full  py-2 px-2 bg rounded-md border-slate-700`}>
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-center ">
                    <div className=" relative border shadow-md w-16 h-16 rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center p-3" >
                        {/* <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                            <Image src={imageProfile} alt="imageProfile" />
                        </ReactCrop> */}

                        <Image
                            src={imageProfile}
                            alt="Profile"
                            className=" w-11 h-11 object-cover "
                        />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex items-center flex-row gap-1">
                        <h1 className="NameBio text-white text-sm font-medium">@Deni</h1>
                        <MdEdit className="text-white" />
                    </div>
                    <div className="flex items-center flex-row gap-1">
                        <h1 className="BioText text-white text-xs my-2 font-medium">{textSlice("Você pode tipar isso diretamente sem usar interface.")}</h1>
                        <MdEdit className="text-white" />
                    </div>
                    <div className="Icons-Social flex flex-row items-center gap-4 ">
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaTiktok className="text-2xl text-white" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaFacebook className="text-2xl text-white" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaTiktok className="text-2xl text-white" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaYoutube className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}