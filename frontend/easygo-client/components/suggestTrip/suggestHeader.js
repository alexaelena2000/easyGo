import { Select, Button, Image, Text, Group, Center, Card, Container, Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import SuggestItem from "./suggestItem";

export default function SuggestHeader() {

    const theme = useMantineTheme();

    const router = useRouter();

    const handleSubmit = async (event) => {
        console.log(station)
        event.preventDefault();
        const res = await fetch('http://localhost:8080/api/v1/nearbyStations/fetchByStation/' + station)
        const json = await res.json()
        const status = res.status
        if (status == 200) {
            setExtendedStationData(json)
            setSearchResultsPresent(true);
        } else {
            setSearchResultsPresent(false);
            alert("No results. Try another station.")
        }
    }
    const [station, setStation] = useState("");

    const [extendedStationData, setExtendedStationData] = useState({});

    const [stationSelectList, setStationSelectList] = useState([]);

    const [searchResultsPresent, setSearchResultsPresent] = useState(false);

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

    const arrCodeFromName = (name) => {
        const station = stationSelectList.find(station => station.label == name)
        return station.value
    }

    const redirect = (arrName) => {
        const arrId = arrCodeFromName(arrName);
        router.push({
            pathname: '/',
            query: { arrId: arrId, depId: station}
        }, "/")
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
            <div style={{ position: "relative" }}>
                <Image
                    width={3000}
                    height={300}
                    src="./suggest-background.png"
                    className="z-10"
                ></Image>
                <div className="flex justify-center">
                    <div style={{ position: "absolute", top: "4rem" }}>
                        <Text className="text-5xl text-white mb-2 font-bold" >Discover Destinations Around You!</Text>
                        <div className="flex flex-row justify-center">
                            <div className="card w-96 bg-base-100 z-20 mt-6 shadow-xl" >
                                <div className="min-h-full flex py-4 px-4 mb-2">
                                    <form onSubmit={handleSubmit} className="max-w-md w-full">
                                        <div className="flex flex-row justify-end">
                                            <Select
                                                label="Departure Location:"
                                                placeholder="From where are you leaving?"
                                                searchable
                                                clearable
                                                required
                                                value={station}
                                                onChange={setStation}
                                                className="w-3/4"
                                                nothingFound="No options"
                                                data={stationSelectList}
                                            />
                                            <Button type="submit" variant="default" className="self-end ml-6 bg-indigo-600 text-base-100 text-sm font-medium border border-transparent hover:bg-indigo-700 focus:outline-none">
                                                Search
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {searchResultsPresent && (
                    <>
                        <div className="w-screen bg-indigo-700 h-20 shadow-xl ">
                            <Center className="pt-5">
                                <Text className="text-4xl text-white mb-2 font-semibold">Search Results</Text>
                            </Center>
                        </div>
                        <Center className="mt-12">
                            <Container size={2000}>
                                <Grid className="mt-1 mb-10 space-x-0.5">
                                    {extendedStationData.nearbyStations.map(nearStation => {
                                        return (
                                            <SuggestItem nearStation={nearStation} stationSelectList={stationSelectList} station={station}/>
                                        )
                                    })}
                                </Grid>
                            </Container>

                        </Center>
                    </>
                )}



            </div>
        </>
    )
}