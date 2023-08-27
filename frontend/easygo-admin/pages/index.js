import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Home() {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tempUser = localStorage.getItem("user");
    if(tempUser) {
        setUser(tempUser);
        setLoading(false);
        router.push("/dashboard")
    } else {
        router.push("/login")
    }
}, [user])

if(!user) {
    return null
}

if(loading) {
    return <Loading />
}

  return (
    <></>
  )
}
