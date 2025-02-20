"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import LinksListDnd from "./dragAndDrop/linksListDnd"
import { useEffect, useState } from "react"
import CreateLink from "../../../../actions/createLink"
import { Session } from "next-auth";
import { GetLinkUser } from "@/app/services/getLinksUser"
import { updateLinkOrder } from "@/app/services/updateLinkOrder"

interface listArray {
    id: string;
    userId: string | null;
    url: string;
    active: boolean;
}
interface PropsMenu {
    session: Session | null;

}
export default function Links({ session }: PropsMenu) {
    const [linkName, setLinkName] = useState<string>("")
    const [link, setLink] = useState<listArray[] | null>()

    useEffect(() => {
        async function getLink() {
            if (session?.user?.id) {
                const data = await GetLinkUser(session?.user?.id)
                const sortedLinks = data?.sort((a: any, b: any) => a?.order - b?.order);
                setLink(sortedLinks)
            }
        }
        getLink()
    }, [])

    async function createLinkUser() {
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
        if (link) {
            const item: listArray[] = remodelList(link, res.source.index, res.destination.index)
            setLink(item)
            const newCategoryOrder = item?.map((item, index) => ({
                id: item.id,
                name: item.url,
                order: index // O index é o novo valor de order
            }));
            const { error, success } = await updateLinkOrder(newCategoryOrder)
           
        }
    }
    return (
        <div className="px-4 w-full">
            <div className="my-10">
                <input onChange={(e) => setLinkName(e.target.value)} value={linkName} />
                <button onClick={() => createLinkUser()} className="bg-white border">Criar</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories" type="list" direction="vertical" >
                    {(provided) => (
                        <article className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                link?.map((link: any, index: number) => {
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