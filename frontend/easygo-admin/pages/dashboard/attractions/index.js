import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Box,
    Group,
    Space,
    Button,
    Text,
    MediaQuery,
    Burger,
    ActionIcon,
    useMantineTheme,
} from '@mantine/core';
import { MainLinks } from "../../../components/MainLinks";
import { signOut } from "../../../util/auth";
import Welcome from "../../../components/dashboard-welcome";
import AttractionList from "../../../components/attraction/attractionList";
import AttractionToolbar from "../../../components/attraction/attractionToolbar";
import CustomAppShell from "../../../components/customAppShell";

export default function Attractions() {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const tempUser = localStorage.getItem("user");
        if (tempUser) {
            setUser(tempUser);
            setLoading(false);
        } else {
            router.push("/login")
        }
    }, [user])

    const signout = () => {
        signOut();
        router.push("/login")
    }

    if (!user) {
        return null
    }

    if (loading) {
        return <Loading />
    }


    return (
        <CustomAppShell>
            <AttractionToolbar />
            <AttractionList />
        </CustomAppShell>
    )
}