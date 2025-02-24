"use client"
import Image from "next/image";
import logo from "../../assets/logo.svg"
import { useEffect, useState } from "react";
import { FaCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import VerifyUserExist from "@/app/services/verifyUserExist";
import { CreateUserName } from "../../../../actions/createUserName";
import Loading from "@/app/components/ui/loadingRegister";
import { Session } from "next-auth";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { GetUserData } from "@/app/services/users/getUserName";
import GlobalLoading from "@/app/components/loading/loading";

function useRegister(nameUser: string, useSession: Session | null) {
    const [nameExist, setNameExist] = useState<boolean | undefined>(undefined)
    const [loading, setLoading] = useState<boolean | undefined>(false)
    const [loadingUi, setLoadingUi] = useState<boolean | undefined>(true)
    const [isRegexAceept, setIsRegexAceept] = useState<boolean>(false)

    const regex = /^[a-zA-Z0-9_]+$/;
    const route = useRouter()



    function myRegex(string: string) {
        return setIsRegexAceept(regex.test(string))
    }

    useEffect(() => {
        myRegex(nameUser)
    }, [nameUser])

    useEffect(() => {
        setLoading(true)
        if (!regex.test(nameUser)) {
            setLoading(false)
            return
        }

        if (nameUser) {
            const time = setTimeout(async () => {
                try {
                    const { data } = await VerifyUserExist(nameUser)
                    if (!data) return setNameExist(false)
                    await verifyExist(data.username || "")
                } catch (error) {
                    setNameExist(false);
                } finally {
                    setLoading(false);
                }
            }, 900)

            return () => clearTimeout(time)
        }
        setLoading(false)
    }, [nameUser])

    async function verifyExist(name: string) {
        if (nameUser === name) return setNameExist(true)
    }
    async function hasUserName() {
        try {
            const userName = await GetUserData(useSession?.user?.id as string)
            if (userName instanceof Error) return

            if (userName?.username) {
                route.replace("/admin");
                return
            }
            setLoadingUi(false)
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Alerta!",
                    description: error.message,
                    action: <ToastAction onClick={() => route.push('/login')} altText="Logar">Logar</ToastAction>
                })
            }
        } 

    }
    useEffect(() => {
        if (!useSession){
            return route.replace("/login")
        }
        hasUserName()
    }, [])

    return {
        nameExist, loading, isRegexAceept, loadingUi
    }
}

export default function RegisterComponent({ session }: { session: Session | null }) {
    const route = useRouter()
    const idUser = session?.user?.id as string
    const [nameUser, setNameUser] = useState("")
    const { nameExist, loading, isRegexAceept, loadingUi } = useRegister(nameUser, session);

    async function handlerSubmit() {
        try {

            await CreateUserName(nameUser, idUser)

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                toast({
                    variant: "destructive",
                    title: "Alerta!",
                    description: error.message,
                    action: <ToastAction onClick={() => route.push('/login')} altText="Logar">Logar</ToastAction>
                })
            }
        }
    }
    if (loadingUi) {
        return <GlobalLoading />
    }
    return (
        <div className="h-screen bg-bgDefault px-2">
            <div className="m-auto max-w-[1000px] ">
                <div className="header m-auto pt-10">
                    <Image src={logo} alt="logo" quality={100} width={200} />
                </div>
                <div className=" flex flex-col items-center">
                    <h1 className="text-white md:text-5xl text-xl text-center mt-20 font-extrabold">Bem vindo ao LinkVerso</h1>
                    <p className="text-white md:text-lg text-xs text-center  font-medium">Escolha seu nome de usuário do LinkVerso. Você sempre pode alterá-lo depois.</p>
                </div>
                <div className="flex justify-center pt-10 flex-row items-center">
                    <div className="flex items-center pl-1 border-l focus:outline-none border-t rounded-l-md border-b  bg-transparent border-white h-14 text-white">
                        linkverso.xyz/
                    </div>
                    <input onChange={(e) => setNameUser(e.target.value.toLocaleLowerCase())} value={nameUser} placeholder="Nome de usuário" className="h-14 text-white max-w-[1000px] w-full rounded- bg-transparent  border-t border-b  border-white" />
                    {loading ?
                        <div className="flex items-center px-1 border-r focus:outline-none border-t rounded-r-md border-b  bg-transparent border-white h-14 text-white">
                            <Loading />
                        </div>
                        :
                        <div className="flex items-center px-1 border-r focus:outline-none border-t rounded-r-md border-b  bg-transparent border-white h-14 text-white">
                            {
                                nameExist && nameUser !== "" || !isRegexAceept && nameUser ?
                                    <FaRegCircleXmark className="text-red-600" />
                                    : !nameExist && nameUser !== "" ?
                                        <FaCircleCheck className="text-green-400" />
                                        :
                                        <></>
                            }
                        </div>
                    }
                </div>
                {
                    !isRegexAceept && nameUser ? <p className="text-red-500 text-sm">Apenas letras e números são permitidos.</p>
                        : nameUser !== "" && nameExist && <p className="text-red-500 text-sm">Esse nome já está em uso!</p>
                }
                {nameUser !== "" && nameExist ?
                    <button disabled={true} className="text-white font-bold text-center bg-gradient-to-r from-[#04DFFA] via-[#E7851A] to-[#E7851A]  w-full rounded-lg mt-4 h-10">Continuar</button>
                    : !isRegexAceept && nameUser ? <button disabled={true} className="text-white font-bold text-center bg-gradient-to-r from-[#04DFFA] via-[#E7851A] to-[#E7851A]  w-full rounded-lg mt-4 h-10">Continuar</button> :
                        <button disabled={nameUser == "" ? true : loading} onClick={() => handlerSubmit()} className="text-white font-bold text-center bg-gradient-to-r from-[#04DFFA] via-[#E7851A] to-[#E7851A]  w-full rounded-lg mt-4 h-10">Continuar</button>
                }
                <h1 className="text-white md:text-xl text-base text-center mt-20">Já tem uma conta? <span className="underline">Conecte-se</span></h1>
            </div>
        </div>
    )
}


