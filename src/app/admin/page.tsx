import { Metadata } from "next";
import { auth } from "../../../auth";
import SideMenu from "../components/admin/sideMenu";
import Links from "../components/admin/dragAndDrop/links";
import SocialProfile from "../components/admin/socialProfile";
import { redirect } from "next/navigation";
import ButtonCreateLink from "../components/admin/buttonCreateLink";
import Preview from "../components/admin/preview";
import { usePreviews } from "../../../context/triggerPreview";

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Tela de admin',
}

export default async function Admin() {

    const authAdmin = await auth()
    if (!authAdmin) {
        return redirect('/login')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getLinks?userId=${authAdmin?.user?.id}`, {
        method: "GET",
        next: { tags: ["links"] }
    })
   
    const dataLink = await res.json()
    const sortedLinks = dataLink?.data?.sort((a: any, b: any) => a?.order - b?.order);
    return (
        <div className="bg-bgDefault w-full ">
            <div className="bg-bgDefault flex md:flex-row flex-col-reverse w-full">
                <SideMenu session={authAdmin} />
                <div className=" flex bg-bgDefault flex-col items-center max-w-[800px] w-full mx-auto px-3 ">
                    <SocialProfile session={authAdmin} />
                    <ButtonCreateLink session={authAdmin} linksLength={sortedLinks?.length} />
                    <div className="w-full">
                        <Links linksData={sortedLinks} session={authAdmin} />
                    </div>
                </div>
            </div>
            <Preview linksData={dataLink} />
        </div>
    )
}