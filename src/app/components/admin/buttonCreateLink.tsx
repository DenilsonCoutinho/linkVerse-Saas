"use client"
import { Session } from "next-auth"
import { useEffect, useState } from "react"
import CreateLink from "../../../../actions/createLink"
import { FaPlusCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GetLinkUser } from "@/app/services/users/getLinksUser"
import { useToast } from "@/hooks/use-toast"
interface PropsButtonCreateLink {
    session: Session | null;
    linksLength: number
}
export default function ButtonCreateLink({ session, linksLength }: PropsButtonCreateLink) {
    const [url, setUrl] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const IS_ALWAYS_THE_FIRST_LINK_IN_LIST = linksLength - linksLength - linksLength === 0 ? 0 : linksLength - linksLength - linksLength
    const { toast } = useToast()

    async function createLinkUser() {
        try {
            if (!url || title) {
                return toast({
                    variant: "destructive",
                    title: "Alerta",
                    description: "Preencha todos os campos!",
                })
            }
            await CreateLink(title, url, true, session?.user?.id!!, IS_ALWAYS_THE_FIRST_LINK_IN_LIST)
            setUrl("")
            setTitle("")
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Alerta",
                    description: error.message,
                })
            }
        }
    }


    const urlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }
    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex my-10  items-center gap-3 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-textColorSecundary duration-500 before:duration-500 hover:duration-500  hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-textColorDefault relative bg-neutral-800 h- w-full border text-left p-7 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-bgColorBlueLight before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-bgColorOrange after:right-8 after:top-3 after:rounded-full after:blur-lg">
                        Adicionar Link
                        <FaPlusCircle className="text-white" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Insira sua URL</DialogTitle>

                    </DialogHeader>
                    <div className=" gap-4 py-4">
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                TÍTULO
                            </Label>
                            <Input id="title" onChange={titleOnChange} placeholder="Nosso produto..." value={title} className=" w-full" />
                        </div>
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                URL
                            </Label>
                            <Input id="url" onChange={urlOnChange} placeholder="www.google.com" value={url} className=" w-full" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={() => createLinkUser()} className="flex my-3  items-center gap-3 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-textColorSecundary duration-500 before:duration-500 hover:duration-500  hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-textColorDefault relative bg-neutral-800 h-10 w-full border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-bgColorBlueLight before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-bgColorOrange after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                Criar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}