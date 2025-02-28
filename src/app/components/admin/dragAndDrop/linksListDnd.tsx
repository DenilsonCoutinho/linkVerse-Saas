"use client"
import { Draggable } from "@hello-pangea/dnd";
import { VscGripper } from "react-icons/vsc";

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
    return (
        <>
            <Draggable draggableId={link.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center flex-row gap-4 rounded-lg px-1 bg-gray-100 py-7 my-4">
                        <div className="flex flex-col gap-4 rounded-lg px- bg-gray-100 ">
                            <div className="flex items-center gap-3 select-none">
                                <VscGripper className="text-lg text-gray-400" />
                                <div className="flex flex-col items-">
                                    <h1 className="text-gray-700 text-md font-bold">{link?.title}</h1>
                                    <p className="text-gray-700 text-md ">{link?.url}</p>
                                </div>
                            </div>

                        </div>


                    </div>
                )
                }
            </Draggable >
        </>
    )
}