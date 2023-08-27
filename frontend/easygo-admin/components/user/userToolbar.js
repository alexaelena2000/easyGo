import { Button, Group, Text } from "@mantine/core"
import { useRouter } from "next/router"

export default function UsernToolbar() {
    const router = useRouter();


    return (
        <Group position="apart">
            <Text className="text-2xl ml-2 mb-2">Users</Text>
        </Group>
    )
}
