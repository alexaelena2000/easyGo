import { Card, Center, Divider, Text, TextInput, Group, Space, Button, Modal, Select, UnstyledButton } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

export default function EditTripForm(props) {
    const router = useRouter();

    const [stationSelect, setStationSelect] = useState("");

    const [tripCode, setTripCode] = useState("");
    const [stationSelectList, setStationSelectList] = useState([]);
    const [tripDepartureStation, setTripDepartureStation] = useState("");
    const [tripArrivalStation, setTripArrivalStation] = useState("");
    const [tripDepartureDate, setTripDepartureDate] = useState(new Date());
    const [tripDepartureTime, setTripDepartureTime] = useState(new Date());
    const [tripArrivalDate, setTripArrivalDate] = useState(new Date());
    const [tripArrivalTime, setTripArrivalTime] = useState(new Date());
    const [tripNewLegSet, setTripNewLegSet] = useState([]);
    const [tripDistance, setTripDistance] = useState("");
    const [tripDestinations, setTripDestinations] = useState("");

    const [tripDepartureDateTime, setTripDepartureDateTime] = useState(new Date());

    const [rows, setRows] = useState([]);


    const [stopStation, setStopStation] = useState("");
    const [stopArrivalTime, setStopArrivalTime] = useState(new Date());
    const [stopArrivalDate, setStopArrivalDate] = useState(new Date());
    const [stopDepartureTime, setStopDepartureTime] = useState(new Date());
    const [stopDepartureDate, setStopDepartureDate] = useState(new Date());
    const [stopDistance, setStopDistance] = useState("");

    const [isStopModalOpened, setIsStopModalOpened] = useState(false);

    const columns = [
        { field: 'stationName', headerName: 'Station', width: 150, sortable: false },
        { field: 'arrivalDate', headerName: 'Arrival Date', width: 200, sortable: false },
        { field: 'departureDate', headerName: 'Departure Date', width: 200 },
        { field: 'distance', headerName: 'Distance', width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 100,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                const deleteAction = async (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    var tempRows = [];
                    tempRows.push(...rows);
                    for (var i = 0; i < tempRows.length; i++) {

                        if (tempRows[i].id === params.id) {

                            tempRows.splice(i, 1);
                        }

                    }
                    setRows(tempRows);
                };

                const editAction = (e) => {
                    e.stopPropagation();
                }

                return (
                    <>
                        {/* Pass Row as props to edit page */}
                        <Space w="md" />
                        <UnstyledButton onClick={deleteAction}>
                            <DeleteOutline />
                        </UnstyledButton>

                    </>);
            }
        }
    ]


    const backToList = () => {
        router.push("/dashboard/trips")
    }


    const handleStopSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...rows);
        console.log(tempRows);

        var newRow = undefined || {};
        let station = stationSelectList.find(data => data.value == stopStation)
        console.log(station)
        newRow.id = tempRows.length + 1
        newRow.stationName = station.label
        newRow.station = stopStation
        newRow.arrivalDate = buildDateTime(stopArrivalDate, stopArrivalTime)
        newRow.departureDate = buildDateTime(stopDepartureDate, stopDepartureTime)
        newRow.distance = stopDistance
        tempRows.push(newRow);
        setRows(tempRows);

        setIsStopModalOpened(false)

    }

    //Needs to be applied to trip times as well, for backend purposes
    const buildDateTime = (date, time) => {
        // Needs to build final Time object from Date and Time
        date.setHours(time.getHours(), time.getMinutes())
        return date
    }

    // TODO: - Broken, Needs REPAIR URGENTLY
    const buildLegSet = async () => {
        if (rows.length == 0) {
            return 200
        } else {
            var legSet = [];
            var dest = [];
            var dist = tripDistance;
            for (const row of rows) {
                var leg = undefined || {}
                if (row.id == 1) {
                    console.log(rows[0].station)
                    leg.departureStation = await fetchStation(tripDepartureStation)
                    leg.arrivalStation = await fetchStation(rows[0].station)
                    leg.departureDate = moment(tripDepartureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.departureTime = moment(tripDepartureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.arrivalDate = moment(row.arrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.arrivalTime = moment(row.arrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.distance = row.distance
                    dist -= row.distance
                    leg.code = ("LEG-" + leg.departureStation.code + "-" + leg.arrivalStation.code + "-" + Math.floor(Math.random() * 999999))
                    // dest.push(leg.departureStation)
                    // dest.push(leg.arrivalStation)
                    legSet.push(leg)
                } else {
                    leg.departureStation = await fetchStation(rows[row.id - 2].station)
                    leg.arrivalStation = await fetchStation(row.station)
                    leg.departureDate = moment(rows[row.id - 2].departureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.departureTime = moment(rows[row.id - 2].departureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.arrivalDate = moment(row.arrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.arrivalTime = moment(row.arrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    leg.distance = row.distance
                    dist -= row.distance
                    leg.code = ("LEG-" + leg.departureStation.code + "-" + leg.arrivalStation.code + "-" + Math.floor(Math.random() * 999999))
                    //dest.push(leg.arrivalStation)
                    legSet.push(leg)
                }
                if (row.id == rows.length) {
                    var finalLeg = undefined || {}
                    finalLeg.departureStation = await fetchStation(row.station)
                    finalLeg.arrivalStation = await fetchStation(tripArrivalStation)
                    finalLeg.departureDate = moment(row.departureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    finalLeg.departureTime = moment(row.departureDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    finalLeg.arrivalDate = moment(tripArrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    finalLeg.arrivalTime = moment(tripArrivalDate).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
                    finalLeg.distance = dist
                    finalLeg.code = ("LEG-" + finalLeg.departureStation.code + "-" + finalLeg.arrivalStation.code + "-" + Math.floor(Math.random() * 999999))
                    console.log(finalLeg)
                    legSet.push(finalLeg)
                }
                console.log(rows.length)
                //console.log(dest)
                // setTripDestinations(dest)
            }
            //if no rows, no leg set
            // TO-DO: if one or more rows, create the final destination leg as well
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(legSet)
            };
            const response = await fetch('http://localhost:8080/api/v1/trips/addLeg?' + new URLSearchParams({ tripCode: tripCode }), requestOptions)
            return response.status
        }
    }

    const fetchStation = async (stationId) => {
        const res = await fetch('http://localhost:8080/api/v1/stations/' + stationId)
        const station = await res.json();
        return station
    }

    const buildTripObject = async () => {
        var trip = undefined || {}
        trip.code = tripCode
        trip.departureStation = await fetchStation(tripDepartureStation)
        trip.arrivalStation = await fetchStation(tripArrivalStation)
        trip.departureDate = moment(buildDateTime(tripDepartureDate, tripDepartureTime)).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
        trip.departureTime = moment(buildDateTime(tripDepartureDate, tripDepartureTime)).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss') // NEEDS TO BE CHANGED TO TIME AND BUILDTIME TO BE USED
        trip.arrivalDate = moment(buildDateTime(tripArrivalDate, tripArrivalTime)).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
        trip.arrivalTime = moment(buildDateTime(tripArrivalDate, tripArrivalTime)).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss') // NEEDS TO BE CHANGED TO TIME AND BUILDTIME TO BE USED
        trip.distance = tripDistance
        // trip.destinations = tripDestinations
        //console.log(tripDestinations)
        return trip
    }

    const handleTripSubmit = async (event) => {
        event.preventDefault();
        const trip = await buildTripObject()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip)
        };
        const response = await fetch('http://localhost:8080/api/v1/trips/edit/' + tripCode, requestOptions)
        if (response.status == 200) {
            const legres = await buildLegSet();
            if (legres == 200) {
                router.push("/dashboard/trips")
            }
        }
    }

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

    const setStates = (data) => {
        console.log(data)
        setTripCode(data.code)
        setTripDepartureStation(data.departureStation.id)
        setTripDepartureDate(new Date(data.departureDate))
        setTripDepartureTime(new Date(data.departureTime))
        setTripArrivalStation(data.arrivalStation.id)
        setTripArrivalDate(new Date(data.arrivalDate))
        setTripArrivalTime(new Date(data.arrivalTime))
        setTripDistance(data.distance)

        var tempRows = []
        for (const leg in data.legSet) {
            if (leg != data.legSet.length - 1) {
                var newRow = undefined || {};
                const nextLegIndex = parseInt(leg) + 1
                console.log(nextLegIndex)
                newRow.id = tempRows.length + 1
                newRow.stationName = data.legSet[leg].arrivalStation.name
                newRow.station = data.legSet[leg].arrivalStation.id
                newRow.arrivalDate = new Date(data.legSet[leg].arrivalDate)
                newRow.departureDate = new Date(data.legSet[nextLegIndex].departureDate)
                newRow.distance = data.legSet[leg].distance
                tempRows.push(newRow);
            }
        }
        setRows(tempRows);
    }



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))

            const tripRes = await fetch('http://localhost:8080/api/v1/trips/one/' + props.code)
            const tripData = await tripRes.json()
            setStates(tripData)

        }
        fetchData().catch(console.error)
    }, [])

    return (
        <Center>
            <div style={{ width: '96%', margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Center>
                            <Text className="text-3xl font-bold my-3">Edit Trip</Text>
                        </Center>
                    </Card.Section>
                    <Divider />
                    <Card.Section>
                        <Text className="ml-6 text-lg font-bold mt-4">Basic Trip Information</Text>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Code:" value={tripCode} required disabled onChange={(event) => setTripCode(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <Select
                                label="Departure Station:"
                                placeholder="Pick Station"
                                searchable
                                clearable
                                required
                                value={tripDepartureStation}
                                onChange={setTripDepartureStation}
                                nothingFound="No options"
                                data={stationSelectList}
                            />
                            <DatePicker
                                placeholder="Pick Date"
                                label="Departure Date:"
                                required
                                value={tripDepartureDate}
                                minDate={dayjs(new Date()).toDate()}
                                onChange={setTripDepartureDate}
                            />
                            <TimeInput label="Departure Time:" required style={{ width: '120px' }} value={tripDepartureTime} onChange={setTripDepartureTime} />
                        </Group>
                        <Group className="my-2 ml-6">
                            <Select
                                label="Arrival Station:"
                                placeholder="Pick Station"
                                searchable
                                clearable
                                required
                                value={tripArrivalStation}
                                onChange={setTripArrivalStation}
                                nothingFound="No options"
                                data={stationSelectList}
                            />
                            <DatePicker
                                placeholder="Pick Date"
                                label="Arrival Date:"
                                required
                                value={tripArrivalDate}
                                minDate={dayjs(new Date()).toDate()}
                                onChange={setTripArrivalDate}
                            />
                            <TimeInput label="Arrival Time:" required style={{ width: '120px' }} value={tripArrivalTime} onChange={setTripArrivalTime} />
                        </Group>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Distance:" value={tripDistance} required onChange={(event) => setTripDistance(event.currentTarget.value)}
                            />
                        </Group>
                    </Card.Section>

                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Stops:</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsStopModalOpened(true)}>Add Stop</Button>
                            <Modal
                                opened={isStopModalOpened}
                                onClose={() => setIsStopModalOpened(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="stopForm" onSubmit={handleStopSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Stop</Text>
                                    </Center>
                                    <Divider />
                                    <Group className="my-2">
                                        <Select
                                            label="Station:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={stopStation}
                                            onChange={setStopStation}
                                            nothingFound="No options"
                                            data={stationSelectList}
                                        />
                                        <TextInput
                                            label="Distance:" value={stopDistance} required onChange={(event) => setStopDistance(event.currentTarget.value)}
                                        />
                                    </Group>
                                    <Group className="my-2">
                                        {/* Change minDate maybe */}
                                        <DatePicker
                                            placeholder="Pick date"
                                            label="Arrival Date:"
                                            required
                                            minDate={dayjs(new Date()).toDate()}
                                            onChange={setStopArrivalDate}
                                        />
                                        <TimeInput label="Arrival Time:" required onChange={setStopArrivalTime} />
                                    </Group>
                                    <Group className="my-2">
                                        <DatePicker
                                            placeholder="Pick date"
                                            label="Departure Date:"
                                            required
                                            minDate={dayjs(new Date()).toDate()}
                                            onChange={setStopDepartureDate}
                                        />
                                        <TimeInput label="Departure Time:" required onChange={setStopDepartureTime} />
                                    </Group>
                                    <Group position="right">
                                        <Button variant="subtle" className="text-md" type="submit">Add Stop</Button>
                                    </Group>
                                </form>

                            </Modal>
                        </Group>

                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                sortingOrder={['asc']}
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'departureDate', sort: 'asc' }],
                                    },
                                }}
                            />
                        </div>
                    </Card.Section>
                    <Card.Section>
                        <Group position="right" className="mt-2 mb-2">
                            <Button variant="subtle" className="text-md" onClick={backToList}>Cancel</Button>
                            <Button variant="subtle" onClick={handleTripSubmit} className=" mr-7 h-8 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>

        </Center>

    )
}