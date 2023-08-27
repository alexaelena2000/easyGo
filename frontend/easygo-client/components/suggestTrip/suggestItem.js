import { Select, Button, Image, Text, Group, Center, Card, Container, Grid, Modal, Space, Divider } from "@mantine/core";
import { useState, useEffect } from "react";
import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";

export default function SuggestItem(props) {

    const theme = useMantineTheme();

    const router = useRouter()

    const [opened, setOpen] = useState(false);

    const [stationAttractionList, setStationAttractionList] = useState([]);

    const [hasAttractions, setHasAttractions] = useState(false);

    const arrCodeFromName = (name) => {
        const station = props.stationSelectList.find(station => station.label == name)
        return station.value
    }

    const redirect = (arrName) => {
        const arrId = arrCodeFromName(arrName);
        router.push({
            pathname: '/',
            query: { arrId: arrId, depId: props.station }
        }, "/")
    }

    const [modalOpened, setModalOpened] = useState("");

    const openModal = () => {
        if (props.nearStation.attractionList != null && props.nearStation.attractionList.length > 0) {
            setHasAttractions(true);
            setModalOpened(true);
        } else {
            alert("this station has no attractions!");
        }

    }
    const closeModal = () => {
        setModalOpened(false)
    }

    return (
        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
            <Card shadow="md" style={{ minWidth: 335 }} p="lg">
                <Card.Section height={160}>
                    <Image src={props.nearStation.imageFileName} height={160} alt={props.nearStation.name} />
                </Card.Section>
                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>{props.nearStation.name}</Text>

                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                    {props.nearStation.description}

                </Text>
                <Center>
                    <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={openModal}>
                        View Attractions
                    </Button>
                    <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect(props.nearStation.name)}>
                        Book a trip
                    </Button>
                </Center>

            </Card>


            <Modal
                opened={modalOpened}
                onClose={closeModal}
                withCloseButton={false}
                centered
                size={500}
            >
                <Center><Text className="text-2xl font-bold text-center">Tourist Attractions in {props.nearStation.name}</Text></Center>
                <Divider className="mt-3"/>
                <Space h="md" />
                {hasAttractions && (
                    <>
                        {props.nearStation.attractionList.map(attractionItem => {
                            return (
                                <>
                                    <Text weight={650} size="md">{attractionItem.name}</Text>
                                    <Text>{attractionItem.description}</Text>
                                    <Space h="md" />
                                </>
                            )
                        })}
                    </>
                )}
                <Center><Button onClick={closeModal} variant="subtle">Close</Button></Center>
            </Modal>

        </Grid.Col>
    )
}