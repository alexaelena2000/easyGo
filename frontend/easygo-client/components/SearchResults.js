import { Button, SimpleGrid, Timeline, Text, ScrollArea, Card, Collapse, Divider, Space, Select, Checkbox, RangeSlider, Container } from "@mantine/core"
import { useEffect, useState } from "react"
import { DatePicker } from "@mantine/dates";
import SearchPageFilter from "./SearchPageFilter"
import StripeButton from "./StripeButton";
import moment from "moment";
import dayjs from "dayjs";
import SearchResultDirectItem from "./SearchResultDirectItem";
import SearchResultStopoverItem from "./SearchResultStopoverItem";

function SearchResults(props) {

    const [opened, setOpen] = useState(false);
    const [secondOpened, isSecondOpened] = useState(false);
    const [directJourneys, setDirectJourneys] = useState([]);
    const [stopoverJourneys, setStopoverJourneys] = useState([]);
    const [stationSelectList, setStationSelectList] = useState([]);

    const [depValue, setDepValue] = useState("");
    const [depDate, setDepDate] = useState("");
    const [arrValue, setArrValue] = useState("");

    const [depValueLabel, setDepValueLabel] = useState("");
    const [depDateLabel, setDepDateLabel] = useState("");
    const [arrValueLabel, setArrValueLabel] = useState("");

    const [showDirectOnly, setShowDirectOnly] = useState(false);

    const [hasResults, setHasResults] = useState(false);

    useEffect(() => {
        let directJourneysData = props.data.filter(journey => journey.journeyType == "direct");
        setDirectJourneys(directJourneysData);

        let stopoverJourneysData = props.data.filter(journey => journey.journeyType == "stopover");
        setStopoverJourneys(stopoverJourneysData);

        console.log(directJourneysData);
        console.log(stopoverJourneysData.length);

        if (directJourneysData.length != 0 || stopoverJourneysData.length != 0) {
            setHasResults(true)
        } else {
            setHasResults(false)
        }

        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))
            updateHeaderLabel(json, "raw", props.query.depStationId, props.query.arrStationId, new Date(props.query.depDate))
        }
        fetchData().catch(console.error)

        setDepValue(props.query.depStationId)
        setDepDate(new Date(props.query.depDate))
        setArrValue(props.query.arrStationId)

    }, [])

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

    const MARKS = [
        { value: 0, label: '12' },
        { value: 100, label: '50' },
    ];

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        let query = { depStationId: depValue, arrStationId: arrValue, depDate: moment(depDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss') }
        const res = await fetch('http://localhost:8080/api/v1/search?' + new URLSearchParams(query))
        const fetchedData = await res.json()

        let directJourneysData = fetchedData.filter(journey => journey.journeyType == "direct");
        setDirectJourneys(directJourneysData);

        let stopoverJourneysData = fetchedData.filter(journey => journey.journeyType == "stopover");
        setStopoverJourneys(stopoverJourneysData);

        if (directJourneysData.length != 0 || stopoverJourneysData.length != 0) {
            setHasResults(true)
        } else {
            setHasResults(false)
        }

        updateHeaderLabel(stationSelectList, "list", depValue, arrValue, depDate);

    }

    const updateHeaderLabel = async (stationData, dataType, dId, aId, dDate) => {

        if (dataType == "list") {
            setDepValueLabel(stationData.find(station => station.value == dId).label)
            setDepDateLabel(moment(dDate).format("DD MMMM YYYY"))
            setArrValueLabel(stationData.find(station => station.value == aId).label)
        } else {
            setDepValueLabel(stationData.find(station => station.id == dId).name)
            setDepDateLabel(moment(dDate).format("DD MMMM YYYY"))
            setArrValueLabel(stationData.find(station => station.id == aId).name)
        }

    }


    //Maybe move Search Card to new component? for dynamic state of open bool for Collapse
    // Needs to be revamped to contain accurate data from backend
    return (
        <div className="SearchResults">
            <Text style={{ marginLeft: "17.6rem" }} weight="bold" className="text-3xl mb-4">From {depValueLabel} to {arrValueLabel} on {depDateLabel}:</Text>
            <div className="flex space-x-5 justify-center">

                <div style={{ width: "19rem" }} className="SearchPageFilter">
                    <form onSubmit={handleSearchSubmit}>
                        <Card shadow="xl" withBorder radius="lg">
                            <Text weight={700} size="xl">Search</Text>
                            <Divider className="mt-2 mb-1" />
                            <Space h="xs" />
                            <Select
                                label="Departure Location:"
                                placeholder="From where are you leaving?"
                                searchable
                                clearable
                                required
                                value={depValue}
                                onChange={setDepValue}
                                nothingFound="No options"
                                data={stationSelectList}
                            />
                            <Space h="sm" />
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
                            <Space h="sm" />
                            <DatePicker
                                placeholder="Pick date"
                                label="Date of Departure:"
                                required
                                value={depDate}
                                onChange={setDepDate}
                                minDate={dayjs(new Date()).toDate()}
                            />
                            <Space h="sm" />
                            <div className="flex justify-center">
                                <Button type="submit" variant="default" className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Search
                                </Button>
                            </div>

                        </Card>
                        <Card shadow="xl" withBorder radius="lg" className="mt-4">
                            <Text weight={700} size="xl">Filters</Text>
                            <Divider className="mt-2 mb-1" />
                            <Space h="xs" />
                            <Checkbox
                                label="Direct Routes Only"
                                checked={showDirectOnly}
                                onChange={(event) => setShowDirectOnly(event.currentTarget.checked)}
                            />
                            <Space h="sm" />
                        </Card>
                    </form>
                </div>

                {hasResults ?

                    <ScrollArea style={{ height: 900 }} type="scroll" offsetScrollbars >

                        <SimpleGrid cols={1}>
                            {directJourneys.map((journey) => {
                                return (
                                    <SearchResultDirectItem journey={journey} />
                                )
                            })}

                            {!showDirectOnly ?
                                <>
                                    {stopoverJourneys.map((journey) => (
                                        <SearchResultStopoverItem journey={journey} />
                                    ))}
                                </>
                                : <div style={{ width: "55.5rem" }}></div>
                            }


                        </SimpleGrid>
                    </ScrollArea>
                    :
                    <div style={{ width: "58.4rem" }}><Text>No Results. Please change search options.</Text></div>

                }
            </div>



        </div>


    )
};

export default SearchResults