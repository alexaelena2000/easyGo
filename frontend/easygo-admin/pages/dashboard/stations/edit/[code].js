import Loading from "../../../../components/Loading";
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
    Anchor,
    Breadcrumbs,
    useMantineTheme,
} from '@mantine/core';
import EditStationForm from "../../../../components/station/editStationForm";
import { signOut } from "../../../../util/auth";
import CustomAppShell from "../../../../components/customAppShell";

export default function EditStation() {


    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Use String splice for fetching code from pathname instead of passing query from station list
    const { code } = router.query

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const signout = () => {
        signOut();
        router.push("/login")
    }

    const items = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Stations', href: '/dashboard/stations' },
        { title: code },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <CustomAppShell>
            <Breadcrumbs className="ml-7 mb-4">{items}</Breadcrumbs>
            <EditStationForm code={code} />
        </CustomAppShell>
    )
}