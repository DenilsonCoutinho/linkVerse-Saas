"use client"
// 📌 src/app/admin/components/LinksWrapper.tsx
import { Suspense, useEffect, useState } from "react";
import { auth } from "../../../../../auth";
import SkeletonLinks from "../skeletonLinks/skeleton";
import Links from "../links";
import { Session } from "next-auth";
interface listArray {
    id: string;
    url: string;
    active: boolean;
    userId: string;
    order: number;
}

interface LinksResponse {
    data: listArray[];
}
interface PropsLinks {
    session:Session|null
}
export default  function LinksWrapper({ session }: PropsLinks) {
    
    const [link,setLinks]= useState<any>()
    async function getLink() {

        const res = await fetch(`http://localhost:3000/api/getLinks?userId=${session?.user?.id}`, {
            method: "GET",
            cache: "no-store"
        });
        const dataLink = await res.json();
        console.log(dataLink)
        setLinks(dataLink)
    }
    useEffect(()=>{
        getLink()
    },[])
    return (
        <Suspense fallback={<div className="h-96 w-96 bg-white text-black text-center flex justify-center items-center">AA</div>}>
            <Links linksData={link} session={session} />
        </Suspense>
    );
}
