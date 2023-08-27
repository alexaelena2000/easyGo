import { Center, Container, Text, Grid, Image, Card, Button, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function SuggestIdeas() {

    // Mountainous Areas
    // Historical Areas
    // Monuments
    // Places with great food

    const theme = useMantineTheme();


    const router = useRouter();


    const arrCodeFromName = (name) => {
        const station = stationSelectList.find(station => station.label == name)
        return station.value
    }

    const redirect = (arrName) => {
        const arrId = arrCodeFromName(arrName);
        router.push({
            pathname: '/',
            query: { arrId: arrId}
        }, "/")
    }

    const [stationSelectList, setStationSelectList] = useState([]);

    const stationListMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.value = element.id
            tempElement.label = element.name
            dataList.push(tempElement)
        });
        return (dataList)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))
        }
        fetchData().catch(console.error)
    }, [])


    return (
        <>
            <div className="w-full bg-indigo-700 h-20 shadow-xl ">
                <Center className="pt-5">
                    <Text className="text-4xl text-white mb-2 font-semibold">Our Recommendations</Text>
                </Center>
            </div>
            <Center className="mt-12">
                <Container size={2000}>
                    <Text className="text-lg font-medium text-black"> A Mountain View: </Text>
                    <Grid className="mt-1 mb-10">
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./busteni.jpeg" height={160} alt="Busteni" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Busteni</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                    If you love hiking in the summer and skiing in the winter, this is the place for you.
                                    Busteni is a small town built along mountain ranges, and is a great place
                                     to visit any season of the year. 
                                    
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("BUSTENI")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./brasov.jpeg" height={160} alt="Brasov" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Brasov</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                    Proven to be Romania's most popular mountainous destinations, 
                                    Brasov is a city situated in a valley surrounded by towering peaks
                                    , and is home to the two most popular castles in Romania, Bran and Peles Castle.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("BRASOV")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./sinaia.jpg" height={160} alt="Sinaia" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Sinaia</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                A lovely little town in Romania, Sinaia is located just east of the Bucegi Mountains.
                                 It’s a picturesque mountain village, and has lots to offer if you extend your visit to the nearby Bucegi Mountains.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("SINAIA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./hunedoara.jpeg" height={160} alt="Hunedoara" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Hunedoara</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                This great city is a smaller but beautiful upcoming tourist destination that is worth a visit. 
                                You will be surprised by some of the unique things to do and places you can explore at this hidden destination.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("HUNEDOARA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                    <Text className="text-lg font-medium text-black"> For The Gourmand In You: </Text>
                    <Grid className="mt-1 mb-10">
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./bucharest.jpeg" height={160} alt="Bucharest" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Bucharest</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                One of the things that people seem to remember best after visiting Bucharest is its amazing restaurants. 
                                Part of the reason is that food memories often feel more evocative than other types of impressions. 
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("BUCURESTI")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./sibiu.jpeg" height={160} alt="Sibiu" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Sibiu</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                Welcoming, diverse, and full of character, its restaurants serve everything from high-quality Black Angus beef to raw vegan cheesecakes. 
                                You’ll be spoilt for choice with the variety of venues and cuisines available.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("SIBIU")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./constanta.jpeg" height={160} alt="Constanta" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Constanta</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                It’s not easy to choose among the best restaurants in Constanta,
                                 as attractive eating places wait for you literally on every street.
                                  There are various restaurants for devotees of different culinary trends.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("CONSTANTA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./sighisoara.jpeg" height={160} alt="Sighisoara" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Sighisoara</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                    Sighisoara's streets adorned with a variety of architectural designs 
                                    create a particular charm hard to find elsewhere. However, 
                                    every great experience comes not only with scenic views, but also with amazing food.
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("SIGHISOARA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                    <Text className="text-lg font-medium text-black"> Historical Cities We Love: </Text>
                    <Grid className="mt-1 mb-10">
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

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("CLUJ")}>
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
                                    Something about history of Timisoara Something about history of Timisoara
                                    Something about history of Timisoara Something about history of Timisoara
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("TIMISOARA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./maramures.jpeg" height={160} alt="Maramures" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Title about Maramures Title about Maramures</Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                    A nice description of maramures, nature and mocanita, and whatever else there is there A nice description of maramures, nature and mocanita, and whatever else there is there
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("MARAMURES")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                            <Card shadow="md" p="lg">
                                <Card.Section height={160}>
                                    <Image src="./alba-iulia.jpeg" height={160} alt="Norway" />
                                </Card.Section>
                                <Text weight={500} align="center" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>Title of Alba Iulia Title of Alba Iulia Title of Alba Iulia </Text>

                                <Text size="sm" style={{ color: "gray", lineHeight: 1.5 }}>
                                    A nice description of alba iulia and the cetate there, and the change of guards that happen only in the summer
                                    and now im trying to add one more line here, need to fix height
                                </Text>

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => redirect("ALBA IULIA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>

                </Container>

            </Center>




        </>
    )
}