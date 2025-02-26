
import { Metadata } from "next";
import { auth } from "../../../auth";
import SideMenu from "../components/admin/sideMenu";
import Links from "../components/admin/links";
import SocialProfile from "../components/admin/socialProfile";
import Preview from "../components/admin/preview";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SkeletonLinks from "../components/admin/skeletonLinks/skeleton";
import LinksWrapper from "../components/admin/linksWrapper/linksWrapper";

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Tela de admin',
}

export default async function Admin() {

    const authAdmin = await auth()
    if (!authAdmin) {
        return redirect('/login')
    }
    // const res = await fetch(`http://localhost:3000/api/getLinks?userId=${authAdmin?.user?.id}`, {
    //     method: "GET",
    //     next: { tags: ["links"] }
    // })

    // const dataLink = await res.json()

    return (
        <div className="bg-bgDefault flex flex-row w-full">
            <SideMenu session={authAdmin} />

            <div className="relative flex flex-col items-center max-w-[800px] w-full mx-auto px-3 md:h-screen h-[44em] overflow-y-auto scroll-smooth overflow-hidden">
                <SocialProfile session={authAdmin} />
                <LinksWrapper session={authAdmin}/>
                {/* <Preview linksData={dataLink} /> */}
            </div>
        </div>
    )
}