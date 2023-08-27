import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "../util/auth";

export default function Navbar() {
    const pathname = useRouter().pathname;
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (pathname == "/login" || pathname == "/signup") {
            setIsLogin(true);
        }
        const tempUser = localStorage.getItem("user");
        if (tempUser) {
            setUser(tempUser);
        }
    }, [pathname, user])

    const signout = () => {
        signOut();
        setUser(null);
        router.push("/")
    }

    return (
        <>
            <div className="navbar bg-indigo-700">
                <div className="flex-1">
                    <Link href="/">
                        <a className="ml-4 normal-case text-2xl font-bold cursor-pointer text-base-100">EasyGo.</a>
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link href="/feeling-lucky"><a className="font-bold btn btn-ghost text-base-100 normal-case">Suggest A Trip</a></Link></li>
                        {(!user) ?
                            (
                                <>
                                    <li><Link href="/login"><a className="font-bold btn btn-ghost text-base-100 normal-case">Sign In / Sign Up</a></Link></li>

                                </>

                            ) : (

                                <>
                                    <li><Link href="/my-tickets"><a className="font-bold btn btn-ghost text-base-100 normal-case">My Tickets</a></Link></li>
                                    <li><Link href="/profile"><a className="font-bold btn btn-ghost text-base-100 normal-case">Profile</a></Link></li>
                                    <li><a className="font-bold btn btn-ghost text-base-100 normal-case" onClick={signout}>Sign Out</a></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )

}