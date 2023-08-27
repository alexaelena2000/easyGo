import { Button, Group, Text } from "@mantine/core"
import { useRouter } from "next/router"

export default function AttractionToolbar() {

    const router = useRouter();
    const redirect = () => {
        router.push("/dashboard/attractions/add")
    }

    return (
        <Group position="apart">
            <Text className="text-2xl ml-2 mb-2 font-bold">Tourist Attractions</Text>
            <Button variant="subtle" className="text-md" onClick={redirect}>Add</Button>
        </Group>
    )
}