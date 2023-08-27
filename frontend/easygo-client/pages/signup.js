import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";

export default function Signup() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const router = useRouter();

    useEffect(() => {
        const tempUser = localStorage.getItem("user");
        if (tempUser) {
            setUser(tempUser);
            setLoading(false);
            router.push("/")
        } else {
            setLoading(false);
        }
    }, [user])

    if (loading) {
        return <Loading />
    }

    if (user) {
        return null
    }
    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex justify-center items-center">
                <SignupForm />
            </div>
        </>
    )
}