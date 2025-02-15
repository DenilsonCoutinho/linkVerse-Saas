import { Metadata } from "next";
import { auth } from "../../../auth";
import SideMenu from "../components/admin/sideMenu";
export const metadata: Metadata = {
    title: 'Admin',
    description: 'Tela de admin',
  }
export default async function Admin() {
    const authAdmin = await auth()

    return (
        <div className="bg-bgDefault">
            <SideMenu session={authAdmin}/>
        </div>
    )
}