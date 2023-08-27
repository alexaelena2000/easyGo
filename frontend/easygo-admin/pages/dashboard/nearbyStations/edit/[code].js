import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Anchor,
    Breadcrumbs,
    useMantineTheme,
} from '@mantine/core';
import EditStationForm from "../../../../components/station/editStationForm";
import CustomAppShell from "../../../../components/customAppShell";
import EditNearbyStationsForm from "../../../../components/nearbyStations/editNearbyStationsForm";

export default function EditNearbyStations() {

    const router = useRouter();

    const { code } = router.query

    const items = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Stations', href: '/dashboard/nearbyStations' },
        { title: code },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <CustomAppShell>
            <Breadcrumbs className="ml-7 mb-4">{items}</Breadcrumbs>
            <EditNearbyStationsForm code={code} />
        </CustomAppShell>
    )
}