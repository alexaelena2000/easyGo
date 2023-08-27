import { Button, Group, Text } from "@mantine/core"
import { useRouter } from "next/router"

export default function TrainToolbar() {

    const router = useRouter();
    const redirect = () => {
        router.push("/dashboard/trains/add")
    }

    return (
        <Group position="apart">
            <Text className="text-2xl ml-2 mb-2 font-bold">Trains</Text>
            <Button variant="subtle" className="text-md" onClick={redirect}>Add</Button>
        </Group>
    )
}