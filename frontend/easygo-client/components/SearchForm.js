import react, { useState, useRef, useEffect } from "react";
import { Select, Button, Image, Text, Center, Grid, Card, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import Router from "next/router";
import moment from "moment";

// TODO: Validate datepicker not null
// TODO: Retrieve data from backend
// Check if any route exists for dep arr combo
export default function SearchForm(props) {

    const [depValue, setDepValue] = useState("");
    const [arrValue, setArrValue] = useState("");
    const [dateValue, setDateValue] = useState(new Date());
    const [stationSelectList, setStationSelectList] = useState([]);

    const theme = useMantineTheme();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))
        }
        fetchData().catch(console.error)

        if(props.suggestArrId) {
            setArrValue(props.suggestArrId)
        }
        if(props.suggestDepId) {
            setDepValue(props.suggestDepId)
        }

    }, [props.suggestArrId])


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

    const checkSameLocations = (dep, arr) => {
        if (dep == arr) {
            return true
        } else {
            return false
        }
    }

    const handleDateChange = (value) => {
        console.log(value);
        if (value) {
            setDateValue(value);
        } else {
            setDateValue(new Date())
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var sameLocation = checkSameLocations(depValue, arrValue);

        Router.push({
            pathname: '/search',
            query: { depStationId: depValue, arrStationId: arrValue, depDate: moment(dateValue).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss') }
        }, "search")
    }

    const switchLocation = (event) => {
        const newArr = depValue
        setDepValue(arrValue)
        setArrValue(newArr)
    }

    const handleArrChangeWithCode = (name) => {
        console.log(stationSelectList)
        const station = stationSelectList.find(station => station.label == name)
        setArrValue(station.value)
    }


    return (
        <>
            <div className="flex justify-center ">
                <div style={{ position: "relative" }}>
                    <Image
                        width={3000}
                        height={600}
                        src="./search-background.png"
                        className="z-10"
                    ></Image>
                    <div className="card w-96 bg-base-100 z-20 ml-32" style={{ position: "absolute", top: "100px" }}>
                        <div className="min-h-full flex py-6 px-4">
                            <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
                                <div>
                                    <h2 className="pb-3 text-center text-3xl font-bold text-gray-900">Find a Train</h2>
                                </div>

                                <div className="flex flex-row justify-end">
                                    <Select
                                        label="Departure Location:"
                                        placeholder="From where are you leaving?"
                                        searchable
                                        clearable
                                        required
                                        value={depValue}
                                        onChange={setDepValue}
                                        className="w-3/4"
                                        nothingFound="No options"
                                        data={stationSelectList}
                                    />
                                    <Button variant="outline" onClick={switchLocation} className="self-end ml-6 bg-indigo-600 text-base-100 text-sm font-medium border border-transparent hover:bg-indigo-700 focus:outline-none">
                                        Switch
                                    </Button>
                                </div>
                                <Select
                                    label="Arrival Location:"
                                    placeholder="Where would you like to go?"
                                    searchable
                                    clearable
                                    required
                                    value={arrValue}
                                    onChange={setArrValue}
                                    data={stationSelectList}
                                />
                                <DatePicker
                                    placeholder="Pick date"
                                    label="Date of Departure:"
                                    required
                                    defaultValue={dateValue}
                                    value={dateValue}
                                    onChange={setDateValue}
                                    minDate={dayjs(new Date()).toDate()}
                                />
                                <div className="flex justify-center">
                                    <Button type="submit" variant="default" className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Search
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="z-20" style={{ position: "absolute", top: "150px", right: "8rem" }}>
                        <Text className="text-5xl text-white mb-2 font-bold" >Easy Travel, EasyGo.</Text>
                        <Text className="text-lg text-center text-white mb-2" >Exploring Romania has never been easier.</Text>
                    </div>
                </div>
            </div>



            <div className="">
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

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => handleArrChangeWithCode("CLUJ")}>
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

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => handleArrChangeWithCode("TIMISOARA")}>
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

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => handleArrChangeWithCode("MARAMURES")}>
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

                                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => handleArrChangeWithCode("ALBA IULIA")}>
                                    Book a trip
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Center>
            </div>


        </>





    )

};

