"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import LinksListDnd from "./dragAndDrop/linksListDnd"
import { useEffect, useState } from "react"
import CreateLink from "../../../../actions/createLink"
import { Session } from "next-auth";
import { GetLinkUser } from "@/app/services/users/getLinksUser"
import { updateLinkOrder } from "@/app/services/updateLinkOrder"
import { useToast } from "@/hooks/use-toast"
interface listArray {
    id: string;
    url: string;
    active: boolean;
    userId: string;
}
interface PropsMenu {
    session: Session | null;

}
export default function Links({ session }: PropsMenu) {
    const { toast } = useToast()
    const [linkName, setLinkName] = useState<string>("")
    const [links, setLinks] = useState<listArray[] | undefined>()

    useEffect(() => {
        async function getLink() {
            if (session?.user?.id) {
                const data = await GetLinkUser(session?.user?.id)
                const sortedLinks = data?.sort((a: any, b: any) => a?.order - b?.order);
                setLinks(sortedLinks)
            }
        }
        getLink()
    }, [])

    async function createLinkUser() {
        if (!linkName) return alert("Please, enter a link name")
        if (session?.user?.id) {
            await CreateLink(linkName, true, session?.user?.id)
        }
    }

    function remodelList<T>(list: T[], startIndex: number, endIndex: number) {
        const res = Array.from(list)
        const [removed] = res.splice(startIndex, 1)
        res.splice(endIndex, 0, removed)
        return res
    }

    async function compareArray(originalArray: any, newArray: any) {
        if (originalArray.length !== newArray.length) return false;
        return originalArray.every((element: any, index: number) => element === newArray[index]);
    }
    
    async function onDragEnd(res: any) {
        if (!res.destination) return
        try {
            if (!links) {
                throw new Error('Erro ao atualizar link!');
            }
            const isLinkRemodel: listArray[] = remodelList(links, res.source.index, res.destination.index)
            setLinks(isLinkRemodel)
            const newLinksOrder = isLinkRemodel?.map((item, index) => ({ id: item.id, name: item.url, order: index }));
            const arrayIsEqual = await compareArray(isLinkRemodel, links)
            if (!arrayIsEqual) {
                const { error, success } = await updateLinkOrder(newLinksOrder)
                if (error) {
                    toast({
                        variant: "destructive",
                        title: "Alerta",
                        description: "Erro ao atualizar posição do link!",
                    })
                }
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: "Alerta",
                    description: error?.message,
                })
            }
        }

    }
    return (
        <div className=" w-full">
            <div className="my-10 ">
                <input className="w-full" onChange={(e) => setLinkName(e.target.value)} value={linkName} />
                <button onClick={() => createLinkUser()} className="bg-white border">Criar</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories" type="list" direction="vertical" >
                    {(provided) => (
                        <article className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                links?.map((link: any, index: number) => {
                                    return <LinksListDnd
                                        key={link?.id}
                                        link={link}
                                        index={index} />
                                })
                            }
                            {provided.placeholder}
                        </article>
                    )}
                </Droppable>

            </DragDropContext>
        </div>
    )
}