import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/login/LoginForm";
import Loading from "../components/Loading";

export default function Login() {

    const router = useRouter();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tempUser = localStorage.getItem("user");
        if(tempUser) {
            setUser(tempUser);
            setLoading(false);
            router.push("/dashboard");
        } else {
            setLoading(false);
        }
    },[user])

    if(loading) {
        return <Loading />
    }

    if(user) {
        return null
    }

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center">
            <LoginForm />
        </div>
        </>
    )
}