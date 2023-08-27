import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";


export default function Login() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const router = useRouter();

    useEffect(() => {
        const tempUser = localStorage.getItem("user");
        if(tempUser) {
            setUser(tempUser);
            setLoading(false);
            router.push("/")
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
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center">
            <LoginForm />
        </div>
        </>

    )
}