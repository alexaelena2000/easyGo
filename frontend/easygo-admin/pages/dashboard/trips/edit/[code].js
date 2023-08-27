import CustomAppShell from "../../../../components/customAppShell";
import { Anchor, Breadcrumbs } from '@mantine/core';
import { useRouter } from "next/router";
import EditTripForm from "../../../../components/trip/editTripForm";

export default function EditTrip() {

    const router = useRouter();
    const { code } = router.query

    const items = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Trips', href: '/dashboard/trips' },
        { title: code },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <CustomAppShell>
            <Breadcrumbs className="ml-7 mb-4">{items}</Breadcrumbs>
            <EditTripForm code={code} />
        </CustomAppShell>
    )
}