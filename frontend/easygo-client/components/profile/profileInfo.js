import { Text, Button, Card, Center, Divider, Modal, Space } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function ProfileInfo() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [deleteModalOpened, setDeleteModalOpened] = useState("");

    const router = useRouter();

    useEffect(() => {
        setEmail(JSON.parse(localStorage.getItem("user")).email);
        setUsername(JSON.parse(localStorage.getItem("user")).username);
    })

    const deleteAccount = async () => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: username
        };
        const res = await fetch('http://localhost:8080/api/v1/user/delete', requestOptions)
        if(res.status == 200) {
            localStorage.removeItem("user");
            router.push("/");
        } else {
            alert("Error deleting account.")
        }
    }
    const openDeleteModal = () => {
        setDeleteModalOpened(true);
    }
    const closeDeleteModal = () => {
        setDeleteModalOpened(false)
    }

    return (
        <Center className="mt-6">
            <Card shadow="xl" withBorder radius="lg" style={{width: "30rem"}}>
                <Center><Text weight={700} >Basic Information</Text></Center>
                <Divider className="mt-2 mb-5" />
                <Text weight={600} className="mb-3">Username: <Text inline component="span" weight={400}>{username}</Text></Text>
                <Text weight={600}>Email: <Text inline component="span" weight={400}>{email}</Text></Text>

                <Center>
                <Text weight={700} className="mt-5">Actions</Text>

                </Center>
                <Divider className="mt-2 mb-2" />
                <Center>
                    <Button variant="subtle" color="red" onClick={openDeleteModal}>Delete Account</Button>
                </Center>

            </Card>
            <Modal
                opened={deleteModalOpened}
                onClose={closeDeleteModal}
                withCloseButton={false}
                centered
                size={300}
            >
                <Center><Text className="text-lg font-bold text-center">Are you sure you want to delete your account?</Text></Center>
                <Space h="xl" />
                <Center className="mt-2">
                    <Button variant="subtle" onClick={closeDeleteModal}>No</Button>
                    <Button variant="subtle" color="red" onClick={deleteAccount}>Yes</Button>
                </Center>
            </Modal>
        </Center>



    )

}