import { Center, Text, Grid, Card, Badge, Button, Group, useMantineTheme, Image } from "@mantine/core";

export default function PopularDestinations(props) {
    const theme = useMantineTheme();

    //Issues from card height could be from p property
    // Add state sharing using redux between searchform and popular destinations
    return (
        <>
            <div className="w-screen bg-indigo-700 h-20 shadow-xl ">
                <Center className="pt-5">
                    <Text className="text-4xl text-white mb-2 font-semibold">Popular Destinations</Text>
                </Center>
            </div>

            <Center className="mt-8">
                <Grid>
                    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                        <Card shadow="md" p="lg">
                            <Card.Section height={160}>
                                <Image src="./Cluj-Napoca.jpeg" height={160} alt="Cluj" />
                            </Card.Section>
                            <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Explore the Transylvanian streets of Cluj-Napoca!</Text>

                            <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                Visit and enjoy the rich and diverse culture this event-packed city has to offer!
                                From restaurants and bars, to mountain tops and salt mine - it has them all.
                            </Text>

                            <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={props.arrivalStationChange("62ac3f035381f80f47858d4f")}>
                                Book a trip
                            </Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                        <Card shadow="md" p="lg">
                            <Card.Section height={160}>
                                <Image src="./timisoara.jpeg" height={160} alt="Timisoara" />
                            </Card.Section>
                            <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Visit the rich history of Romanian culture in Timisoara!</Text>

                            <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                Begin your adventures with a walk around the Union Square and visit
                                 to one of the most popular and unique buildings in Timisoara, Casa Bruck.
                            </Text>

                            <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                                Book a trip
                            </Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                        <Card shadow="md" p="lg">
                            <Card.Section height={160}>
                                <Image src="./maramures.jpeg" height={160} alt="Maramures" />
                            </Card.Section>
                            <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Ride Through the Land of Tress of Romania, Maramures!</Text>

                            <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                               Hop on the Mocanita and travel through the dense forests on 
                               the last of the Carpathian forestry railways accessible today - or visit the world-renowned Merry Cemetary.
                            </Text>

                            <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                                Book a trip
                            </Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                        <Card shadow="md" p="lg">
                            <Card.Section height={160}>
                                <Image src="./alba-iulia.jpeg" height={160} alt="Norway" />
                            </Card.Section>
                            <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Tour the Citadel of the North-West, Alba Iulia! </Text>

                            <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                Learn more about one of the greatest standing citadels in Romania, 
                                along with the oldest cathedral in the country, St. Michael's Cathedral.
                            </Text>

                            <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                                Book a trip
                            </Button>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Center>
        </>
    )
}