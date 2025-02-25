
import { Metadata } from "next";
import { auth } from "../../../auth";
import SideMenu from "../components/admin/sideMenu";
import Links from "../components/admin/links";
import SocialProfile from "../components/admin/socialProfile";
import ButtonCreateLink from "../components/admin/buttonCreateLink";

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Tela de admin',
}
export default async function Admin() {
    const authAdmin = await auth()
    const res = await fetch(`http://localhost:3000/api/getLinks?userId=${authAdmin?.user?.id}`, {
        method: "GET",
        next: { tags: ['links'] },
    })
    const dataLink = await res.json()
    return (
        <div className="bg-bgDefault flex flex-row w-full">
            <SideMenu session={authAdmin} />
            <div className="flex flex-col max-w-[800px] w-full mx-auto px-3">
                <SocialProfile session={authAdmin}/>
                {/* <ButtonCreateLink session={authAdmin} linksUser={dataLink}/> */}
                <Links session={authAdmin} linksUser={dataLink} />
            </div>
        </div>
    )
}