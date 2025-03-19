"use client"
import Image from "next/image";
import imageProfile from '../../assets/uranus.png'
import { FaFacebook, FaPlus, FaTiktok, FaYoutube } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Session } from "next-auth";
import { usePreviews } from "../../../../context/triggerPreview";
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { type Crop } from 'react-image-crop'
import { useEffect, useState } from "react";
import { ModalCropImage } from "../modalCropImage/modalCropImage";
interface PropsUser {
    session: Session
    getDataUser: any
}
export default function SocialProfile({ session, getDataUser }: PropsUser) {
    const dataUser = getDataUser
    // console.log(dataUser)
    function textSlice(text: string) {
        return text.substring(0, 40) + "..."
    }
    const { preview } = usePreviews()
    // async function getImageUser() {

    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getIDataUser?userId=${session?.user?.id}`, {
    //         method: "GET",
    //         next: { tags: ["image"] }
    //     })
    //     const data = await res.json()
    //     setDataUser(data)
    // }
    // useEffect(() => {
    //     getImageUser()
    // }, [])
    return (
        <div className={`${preview ? "hidden" : "flex"} flex-col w-full  py-2 px-2 bg rounded-md border-slate-700`}>
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-center ">


                    <div className=" relative border shadow-md w-16 h-16 rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center " >
                        {dataUser?.data?.image ? <img
                            src={dataUser?.data?.image}
                            alt="Profile"
                            className=" w-16 h-16 object-cover   rounded-full"
                            width={100} height={100}
                        />
                            :
                            <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full bg-gray-500">
                                <h1 className="text-white ">
                                    {dataUser?.data.userName[0].username?.substring(0, 1).toUpperCase()}
                                </h1>
                            </div>
                        }
                    </div>

                    <ModalCropImage session={session} />
                </div>
                <div className="flex flex-col ">
                    <div className="flex items-center flex-row gap-1">
                        <h1 className="NameBio text-white text-sm font-medium">{dataUser?.data?.userName[0]?.username}</h1>
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