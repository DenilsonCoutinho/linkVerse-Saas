"use client"
import { Draggable } from "@hello-pangea/dnd";
import { FaGripVertical } from "react-icons/fa6";
interface linkProps {
    link: {
        id: string;
        userId: string;
        url: string;
        active: boolean;
    }
    index: number;
}

export default function LinksListDnd({ link, index }: linkProps,) {
    return (
        <>
            <Draggable draggableId={link.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center flex-row gap-4 rounded-lg px-3 bg-gray-100 py-3 my-4">
                        <div className="flex flex-col gap-4 rounded-lg px-3 bg-gray-100 ">
                            <div className="flex items-center gap-3 select-none">
                                <FaGripVertical className="text-lg text-gray-400" />
                                <p className="text-gray-700 text-md ">{link?.url}</p>
                            </div>

                        </div>


                    </div>
                )
                }
            </Draggable >
        </>
    )
}