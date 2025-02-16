"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import LinksListDnd from "./dragAndDrop/linksListDnd"
import { useState } from "react"
interface listArray {
    id: string
    link: string
}
export default function Links() {
    const ArrayLinks = [
        {
            id: "1",
            link: "teste.com"
        },
        {
            id: "2",
            link: "teste2.com"
        }
    ]
    const [originalArrayLinks, setOriginalArrayLinks] = useState<listArray[]>(ArrayLinks)
    
    function remodelList<T>(list: T[], startIndex: number, endIndex: number) {
        //"Array.from" cria uma nova instância do meu array para garantir a imutabilidade dele.
        const res = Array.from(list)
        const [removed] = res.splice(startIndex, 1)
        res.splice(endIndex, 0, removed)
        console.log(res)
        return res
    }

    async function compareArray(originalArray: any, newArray: any) {
        if (originalArray.length !== newArray.length) return false;
        return originalArray.every((element:any, index:number) => element === newArray[index]);
    }
    async function onDragEnd(res: any) {
        if (!res.destination) return

        const item: listArray[] = remodelList(originalArrayLinks, res.source.index, res.destination.index)
        setOriginalArrayLinks(item)
    }
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories" type="list" direction="vertical" >
                    {(provided) => (
                        <article className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                originalArrayLinks?.map((link: any, index: any) => {
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
        </>
    )
}