import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import RegisterComponent from "./components/register";


export default async function Register() {
    const data = await auth()

    return (
        <>
          {/* <SessionProvider> */}
            <RegisterComponent session={data} />
          {/* </SessionProvider> */}
        </>
    )
}


