import { auth } from "../../../auth";
import RegisterComponent from "./components/register";
import Image from "next/image";

export default async function Register() {
    const data = await auth()

    return (
        <>
            <RegisterComponent session={data} />
        </>
    )
}


