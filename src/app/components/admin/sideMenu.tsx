"use client"
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBrush } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import logo from '../../assets/logo.svg'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { GetUserData } from "@/app/services/users/getUserName";
import { usePreviews } from "../../../../context/triggerPreview";

interface PropsDataUser {
    id_UserName: string;
    username: string;
    createdAt: Date;
    userId: string | null;
}

interface PropsUser {
    session: Session
    getDataUser: any
}
export default function SideMenu({ session, getDataUser }: PropsUser) {
    const [dataUser, setDataUser] = useState<PropsDataUser | null>()
    const [screenX, setScreenX] = useState<number | undefined>()
    const { preview } = usePreviews()

    useEffect(() => {

        async function getUserData() {
            if (session?.user?.id) {
                const userName = await GetUserData(session?.user?.id as string)
                if (userName instanceof Error) return
                setDataUser(userName)
            }
        }
        getUserData()
    }, [])

    useEffect(() => {
        setScreenX(window.innerWidth)
        const handleResize = () => {
            window.addEventListener("resize", () => {
                setScreenX(window.innerWidth)
            })
        }
        handleResize()
        return () => {
            document.removeEventListener("resize", handleResize);
        }
    }, [screenX])
    return (
        !preview && <div>
            <div className="border-r bg-bgDefault md:flex hidden border-dashed border-gray-400 w-64 h-screen pl-3  flex-col items-start justify-between gap-4">
                <div className=" flex flex-col items-start justify-between gap-4">
                    <Image width={100} src={logo} alt="logo" className="pb-5" />
                    <div className="flex items-center gap-2">
                        <FaBarsStaggered className="text-white" />
                        <h1 className="text-white font-medium text-sm">Links</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaBrush className="text-white" />
                        <h1 className="text-white font-medium text-sm">Customizar</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaChartSimple className="text-white" />
                        <h1 className="text-white font-medium text-sm">Analytics</h1>
                    </div>
                </div>
                <div className="flex items-center pb-5">
                    <div className="flex items-center gap-3 ">
                        <div className="flex items-center justify-center h-10 w-10 overflow-hidden rounded-full bg-gray-500">
                            {getDataUser?.data?.image ?
                                <img
                                    src={getDataUser?.data?.image}
                                    alt="Profile"
                                    className=" w-16 h-16 object-contain rounded-full"
                                    width={100} height={100}
                                />
                                :
                                <h1 className="text-white ">
                                    {dataUser?.username.substring(0, 1).toUpperCase()}
                                </h1>
                            }
                        </div>
                        <h1 className="text-white font-bold text-xs">{dataUser?.username}</h1>
                    </div>
                </div>
            </div>

            <div className="md:hidden h-16 relative ">
                <div className="border-t py-2 bottom-0  z-[999] fixed bg-bgDefault border-gray-400 w-full px-2 gap-4">
                    <div className=" flex flex-row items-start justify-between gap-4 bg-bgDefault ">
                        <div className="flex flex-col items-center gap-1  ">
                            <FaBarsStaggered className="text-white" />
                            <h1 className="text-white font-medium text-xs">Links</h1>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaBrush className="text-white" />
                            <h1 className="text-white font-medium text-xs">Customizar</h1>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaChartSimple className="text-white" />
                            <h1 className="text-white font-medium text-xs">Analytics</h1>
                        </div>
                        <div className="flex items-center ">
                            <div className="flex flex-col items-center gap-1 ">
                                <div className="flex items-center justify-center text-xs text-white h-4 w-4 overflow-hidden rounded-full bg-gray-500">
                                    {getDataUser?.data?.image ?
                                        <img
                                            src={getDataUser?.data?.image}
                                            alt="Profile"
                                            className=" w-16 h-16 object-cover   rounded-full"
                                            width={100} height={100}
                                        />
                                        :
                                        dataUser?.username.substring(0, 1).toUpperCase()}
                                </div>
                                <h1 className="text-white font-medium text-xs">Perfil</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}