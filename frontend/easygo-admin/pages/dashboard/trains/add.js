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
    Anchor,
    Breadcrumbs,
    useMantineTheme,
} from '@mantine/core';
import { signOut } from "../../../util/auth";
import CustomAppShell from "../../../components/customAppShell";
import AddTrainForm from "../../../components/train/addTrainForm";

export default function AddTrain() {


    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const signout = () => {
        signOut();
        router.push("/login")
    }

    const items = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Trains', href: '/dashboard/trains' },
        { title: 'Add Train', href: '/dashboard/trains/add' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <CustomAppShell>
            <Breadcrumbs className="ml-7 mb-4">{items}</Breadcrumbs>
            <AddTrainForm />
        </CustomAppShell>
    )
}