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
    return (
        <>
            <Draggable draggableId={link.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center flex-row gap-4 rounded-lg px-1 bg-gray-100 py-7 my-4">
                        <div className="flex items-center flex-row justify-between w-full gap-4 rounded-lg px- bg-gray-100 ">
                            <div className="flex items-center gap-3 select-none">
                                <VscGripper className="text-lg text-gray-400" />
                                <div className="flex flex-col gap-2 items-">
                                    <h1 className="text-gray-700 text-md font-bold">{link?.title}</h1>
                                    <div className="flex items-center gap-1  justify-center">
                                        <Input onChange={(e) => setTitle(e.target.value)} value={title} className="relative z-10 bg-transparent border-none px-0 outline-none h-4 focus-visible:ring-slate-400 focus-visible:ring-offset-1 " />
                                        <MdEdit className="text-gray-700 -translate-x-4" />
                                    </div>
                                    <div className="flex items-center gap-1  justify-center">
                                        <Input onChange={(e) => setUrl(e.target.value)} value={url} className="relative z-10 bg-transparent border-none px-0 outline-none h-4 focus-visible:ring-slate-400 focus-visible:ring-offset-1 " />
                                        <MdEdit className="text-gray-700 -translate-x-4" />
                                    </div>
                                </div>
                            </div>
                            <AlertDialogDemo onDelete={() => deleteLink(link?.id)} ElementDelete={<FaTrash className="cursor-pointer active:text-sm duration-100 text-gray-700" />} />
                        </div>
                    </div>
                )
                }
            </Draggable >

        </>
    )
}