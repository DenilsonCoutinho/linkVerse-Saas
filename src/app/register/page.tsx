import { auth } from "../../../auth";
import RegisterComponent from "./components/register";

export default async function Register() {
    const DATA_AUTH = await auth()
    return (
        <>
            <RegisterComponent session={DATA_AUTH} />
        </>
    )
}


