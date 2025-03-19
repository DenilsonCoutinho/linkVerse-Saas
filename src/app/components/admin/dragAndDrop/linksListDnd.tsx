"use client"
import { Input } from "@/components/ui/input";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { VscGripper } from "react-icons/vsc";
import { AlertDialogDemo } from "../../modalConfirm/modalConfirm";
import DeleteLink from "@/app/services/deleteLink";
import { useToast } from "@/hooks/use-toast";
import { revalidateTag } from "next/cache";
import UpdateLink from "@/app/services/updateLink";

interface linkProps {
    link: {
        id: string;
        userId: string;
        url: string;
        title: string;
        active: boolean;
    }
    index: number;
}

export default function LinksListDnd({ link, index }: linkProps,) {
    const [title, setTitle] = useState<string>(link.title)
    const [url, setUrl] = useState<string>(link.url)
    const { toast } = useToast()
    const regex = /\.(com\.br|com|net|org|gov|edu|mil|io|dev|tech|info|biz|tv|ai|co|me|us|uk|ca|de|fr|es|it|au|jp|cn|br|mx|ar|cl|nz|ru|in|id|sg|hk|za|pt|tr|vn|kr|th|my)\b/;

    async function deleteLink(id: string) {
        if (!id) {
            toast({
                variant: "destructive",
                title: "Alerta",
                description: "Erro ao atualizar posição do link!",
            })
        }
        try {
            await DeleteLink(id)
            toast({
                variant: "default",
                title: "Deletado",
                description: "Link deletado com sucesso!",
            })

        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Alerta",
                    description: error?.message,
                })
            }
        }
    }

    async function editLink(id: string, titleLink: string, urlLink: string) {
        try {
            if(title === link.title && url === link.url ) return
            
            if (!id) {
                setUrl(link?.url)
                setTitle(link?.title)
                throw new Error("Erro ao editar: ID inválido, caso esse erro ocorra com frequência, envie ao suporte!")
            }
            await UpdateLink(id, titleLink, urlLink)
            console.log("Updated successfully!")
            toast({
                variant: "default",
                title: "Ok!",
                description: "Link atualizado com sucesso!",
            })
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
    return (
        <div className="">
            <Draggable draggableId={link.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center flex-row gap-4 h-28 rounded-lg px-1 bg-gray-100  my-4">
                        <div className="flex items-center flex-row justify-between w-full gap-4 rounded-lg px- bg-gray-100 ">
                            <div className="flex items-center gap-3 select-none">
                                <VscGripper className="text-lg text-gray-400" />
                                <div className="flex flex-col gap-2 items-">
                                    <div className="flex items-center gap-1  justify-center">
                                        <Input onBlur={() => editLink(link.id, title, url)} onChange={(e) => setTitle(e.target.value)} value={title} className="relative text-gray-700 text-md font-bold z-10 bg-transparent rounded-none border-r-0 border-t-0 border-l-0  border-gray-400 p-2 px- outline-none h-6 focus-visible:ring-transparent focus-visible:ring-offset-0 " />
                                        <MdEdit className="text-gray-700 -" />
                                    </div>
                                    <div className="flex items-center gap-1  justify-center">
                                        <Input onBlur={() => editLink(link.id, title, url)} onChange={(e) => setUrl(e.target.value)} value={url} className="relative z-10 bg-transparent  rounded-none border-r-0 border-t-0 border-l-0 border-gray-400 p-2 px- outline-none h-6 focus-visible:ring-transparent focus-visible:ring-offset-0 " />
                                        <MdEdit className="text-gray-700 " />
                                    </div>
                                </div>
                            </div>
                            <AlertDialogDemo onDelete={() => deleteLink(link?.id)} ElementDelete={<FaTrash className="cursor-pointer active:text-sm duration-100 text-gray-700" />} />
                        </div>
                    </div>
                )
                }
            </Draggable >

        </div>
    )
}