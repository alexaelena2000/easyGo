import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    useMantineTheme,
} from '@mantine/core';
import { MainLinks } from "../../../components/MainLinks";
import { signOut } from "../../../util/auth";
import CustomAppShell from "../../../components/customAppShell";
import NearbyStationsToolbar from "../../../components/nearbyStations/nearbyStationsToolbar";
import NearbyStationsList from "../../../components/nearbyStations/nearbyStationsList";

export default function NearbyStations() {

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
            <NearbyStationsToolbar />
            <NearbyStationsList />
        </CustomAppShell>
    )
}