import { Metadata } from "next";
import { auth } from "../../../auth";
import SideMenu from "../components/admin/sideMenu";
import Links from "../components/admin/links";
import SocialProfile from "../components/admin/socialProfile";

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Tela de admin',
}
export default async function Admin() {
    const authAdmin = await auth()

    return (
        <div className="bg-bgDefault flex flex-row w-full">
            <SideMenu session={authAdmin} />
            <div className="flex flex-col w-full ">
                <SocialProfile />
                <Links session={authAdmin} />
            </div>
        </div>
    )
}