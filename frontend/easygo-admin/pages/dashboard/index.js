import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppShell, Navbar, Footer, useMantineTheme } from '@mantine/core';
import { signOut } from "../../util/auth";
import Welcome from "../../components/dashboard-welcome";
import CustomAppShell from "../../components/customAppShell";
import Analytics from "../../components/analytics";

export default function Dashboard() {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const theme = useMantineTheme();

    useEffect(() => {
        const tempUser = localStorage.getItem("user");
        if (tempUser) {
            setUser(tempUser);
            setLoading(false);
        } else {
            router.push("/login")
        }
    }, [user])

    if (!user) {
        return null
    }

    if (loading) {
        return <Loading />
    }

    return (
        <CustomAppShell>
            <Analytics />
        </CustomAppShell>
    );




}