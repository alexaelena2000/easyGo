import { Card, Center, Divider, Text, TextInput, Group, Space, Button, Modal, Select, UnstyledButton } from "@mantine/core";
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";


export default function EditTrainForm(props) {

    const router = useRouter();

    const [tripSelectList, setTripSelectList] = useState([]);
    const [classCategorySelectList, setClassCategorySelectList] = useState([
        { label: "CLASA I", value: "CLASA-I" },
        { label: "CLASA II", value: "CLASA-II" }
    ]);

    const [trainCode, setTrainCode] = useState("");
    const [trainName, setTrainName] = useState("");
    const [trip, setTrip] = useState("");


    const [totalSeatsRows, setTotalSeatsRows] = useState([]);
    const [availableSeatsRows, setAvailableSeatsRows] = useState([]);
    const [priceModifiersRows, setPriceModifiersRows] = useState([]);

    const [totalClassCategory, setTotalClassCategory] = useState("")
    const [totalSeats, setTotalSeats] = useState("")

    const [availableClassCategory, setAvailableClassCategory] = useState("")
    const [availableSeats, setAvailableSeats] = useState("")

    const [priceClassCategory, setPriceClassCategory] = useState("");
    const [priceCostPerKm, setPriceCostPerKm] = useState("");

    const [isTotalModalOpened, setIsTotalModalOpened] = useState(false);
    const [isAvailableModalOpened, setIsAvailableModalOpened] = useState(false);
    const [isPriceModalOpened, setIsPriceModalOpened] = useState(false);


    const totalSeatsColumns = [
        { field: 'classCategory', headerName: 'Class Category', width: 200 },
        { field: 'seats', headerName: 'Seats', width: 200 },
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
                    tempRows.push(...totalSeatsRows);
                    for (var i = 0; i < tempRows.length; i++) {

                        if (tempRows[i].id === params.id) {

                            tempRows.splice(i, 1);
                        }

                    }
                    setTotalSeatsRows(tempRows);
                };

                return (
                    <>
                        {/* Pass Row as props to edit page */}
                        <UnstyledButton onClick={deleteAction}>
                            <DeleteOutline />
                        </UnstyledButton>

                    </>);
            }
        }
    ]

    const availableSeatsColumns = [
        { field: 'classCategory', headerName: 'Class Category', width: 200 },
        { field: 'seats', headerName: 'Seats', width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 100,
            align: "left",
            headerAlign: "left",
            renderCell: (params3) => {
                const deleteAction = async (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    var tempRows = [];
                    tempRows.push(...availableSeatsRows);
                    for (var i = 0; i < tempRows.length; i++) {

                        if (tempRows[i].id === params3.id) {

                            tempRows.splice(i, 1);
                        }

                    }
                    setAvailableSeatsRows(tempRows);
                };

                return (
                    <>
                        {/* Pass Row as props to edit page */}
                        <UnstyledButton onClick={deleteAction}>
                            <DeleteOutline />
                        </UnstyledButton>

                    </>);
            }
        }
    ]


    const priceModifiersColumns = [
        { field: 'classCategory', headerName: 'Class Category', width: 200 },
        { field: 'costPerKm', headerName: 'Cost Per Km', width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 100,
            align: "left",
            headerAlign: "left",
            renderCell: (params2) => {
                const deleteAction = async (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    var tempRows = [];
                    tempRows.push(...priceModifiersRows);
                    for (var i = 0; i < tempRows.length; i++) {

                        if (tempRows[i].id === params2.id) {

                            tempRows.splice(i, 1);
                        }

                    }
                    setPriceModifiersRows(tempRows);
                };

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
        router.push("/dashboard/trains")
    }

    const handleTotalSeatsSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...totalSeatsRows);

        var newRow = undefined || {};
        newRow.id = tempRows.length + 1
        newRow.classCategory = totalClassCategory
        newRow.seats = totalSeats

        tempRows.push(newRow);
        setTotalSeatsRows(tempRows);

        setIsTotalModalOpened(false)
    }

    const handleAvailableSeatsSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...availableSeatsRows);

        var newRow = undefined || {};
        newRow.id = tempRows.length + 1
        newRow.classCategory = availableClassCategory
        newRow.seats = availableSeats

        tempRows.push(newRow);
        setAvailableSeatsRows(tempRows);

        setIsAvailableModalOpened(false)
    }

    const handlePriceModifiersSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...priceModifiersRows);
        let classCategory = classCategorySelectList.find(data => data.value == priceClassCategory)
        var newRow = undefined || {};
        newRow.id = tempRows.length + 1
        newRow.classCategory = priceClassCategory
        newRow.costPerKm = priceCostPerKm

        tempRows.push(newRow);
        setPriceModifiersRows(tempRows);

        setIsPriceModalOpened(false)
    }

    const tripListMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.value = element.id
            tempElement.label = element.code
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const buildTotalSeatsList = () => {
        if (totalSeatsRows.length == 0) {
            return [];
        } else {
            var totalSeatsList = [];
            for (const row of totalSeatsRows) {
                var totalSeat = undefined || {}
                totalSeat.code = "SPC-" + trainCode + "-" + row.classCategory + "-TOTAL"
                totalSeat.classCategory = row.classCategory
                totalSeat.seats = row.seats
                totalSeatsList.push(totalSeat)
            }
            return totalSeatsList;
        }
    }

    const buildAvailableSeatsList = () => {
        if (availableSeatsRows.length == 0) {
            return [];
        } else {
            var availableSeatsList = [];
            for (const row of availableSeatsRows) {
                var availableSeat = undefined || {}
                availableSeat.code = "SPC-" + trainCode + "-" + row.classCategory + "-AVAILABLE"
                availableSeat.classCategory = row.classCategory
                availableSeat.seats = row.seats
                availableSeatsList.push(availableSeat)
            }
            return availableSeatsList;
        }
    }


    const buildPriceModifiersPerClassList = () => {
        if (priceModifiersRows.length == 0) {
            return [];
        } else {
            var priceModifiersList = [];
            for (const row of priceModifiersRows) {
                var priceModifiers = undefined || {}
                priceModifiers.code = "PMPC-" + trainCode + "-" + row.classCategory
                priceModifiers.classCategory = row.classCategory
                priceModifiers.costPerKm = row.costPerKm
                priceModifiersList.push(priceModifiers)
            }
            return priceModifiersList;
        }
    }


    const buildPriceRows = (data) => {
        if (data.length == 0) {
            return [];
        } else {
            var priceModifiersList = [];
            for (const row of data) {
                var priceModifiers = undefined || {}
                priceModifiers.id = priceModifiersList.length + 1
                priceModifiers.classCategory = row.classCategory
                priceModifiers.costPerKm = row.costPerKm
                priceModifiersList.push(priceModifiers)
            }
            return priceModifiersList;
        }
    }

    const buildSeatsRows = (data) => {
        if (data.length == 0) {
            return [];
        } else {
            var seatsList = [];
            for (const row of data) {
                var seat = undefined || {}
                seat.id = seatsList.length + 1
                seat.classCategory = row.classCategory
                seat.seats = row.seats
                seatsList.push(seat)
            }
            return seatsList;
        }
    }


    const fetchTripCode = async (tripId) => {
        const res = await fetch('http://localhost:8080/api/v1/trips/' + tripId)
        const trip = await res.json();
        const tripCode = await trip.code;
        console.log(tripCode)
        return tripCode
    }

    const fetchTripId = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/trips/one/' + code)
        const trip = await res.json();
        const tripId = await trip.id;
        return tripId
    }


    const buildTrainObject = async () => {
        var train = undefined || {}
        train.code = trainCode
        train.name = trainName
        train.tripCode = await fetchTripCode(trip)
        return train
    }

    const handleTrainSubmit = async (event) => {
        event.preventDefault();
        const train = await buildTrainObject()
        const priceModifiersPerClassList = buildPriceModifiersPerClassList()
        const totalSeatsPerClassList = buildTotalSeatsList()
        const availableSeatsPerClassList = buildAvailableSeatsList()



        const buildTrainRequest = {
            train: train,
            totalSeatsPerClassList: totalSeatsPerClassList,
            availableSeatsPerClassList: availableSeatsPerClassList,
            priceModifiersPerClassList: priceModifiersPerClassList
        }
        console.log(buildTrainRequest)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildTrainRequest)
        };
        const response = await fetch('http://localhost:8080/api/v1/trains/edit/' + trainCode, requestOptions)
        if (response.status == 200) {
            router.push("/dashboard/trains")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/trains/one/' + props.code)
            const json = await res.json()
            console.log(json)
            setTrainCode(json.code)
            setTrainName(json.name)
            const tripItemId = await fetchTripId(json.tripCode)
            setTrip(tripItemId)
            setTotalSeatsRows(buildSeatsRows(json.totalSeatsByClass))
            setAvailableSeatsRows(buildSeatsRows(json.availableSeatsByClass))
            setPriceModifiersRows(buildPriceRows(json.priceModifiersPerClass))

            const resTrips = await fetch('http://localhost:8080/api/v1/trips')
            const jsonTrips = await resTrips.json()
            setTripSelectList(tripListMapper(jsonTrips))
        }
        fetchData().catch(console.error)
    }, [])

    return (
        <Center>
            <div style={{ width: '96%', margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Center>
                            <Text className="text-3xl font-bold my-3">Edit Train</Text>
                        </Center>
                    </Card.Section>
                    <Divider />
                    <Card.Section>
                        <Text className="ml-6 text-lg font-bold mt-4">Basic Train Information</Text>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Code:" value={trainCode} required disabled onChange={(event) => setTrainCode(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Name:" value={trainName} required onChange={(event) => setTrainName(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <Select
                                label="Trip:"
                                placeholder="Pick Trip"
                                searchable
                                clearable
                                required
                                value={trip}
                                onChange={setTrip}
                                nothingFound="No options"
                                data={tripSelectList}
                            />
                        </Group>
                    </Card.Section>
                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Total Seats Information</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsTotalModalOpened(true)}>Add Total Seats By Class</Button>
                            <Modal
                                opened={isTotalModalOpened}
                                onClose={() => setIsTotalModalOpened(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="stopForm" onSubmit={handleTotalSeatsSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Total Seats</Text>
                                    </Center>
                                    <Divider />
                                    <Group className="my-2">
                                        <Select
                                            label="Class Category:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={totalClassCategory}
                                            onChange={setTotalClassCategory}
                                            nothingFound="No options"
                                            data={classCategorySelectList}
                                        />
                                    </Group>
                                    <Group>
                                        <TextInput
                                            label="Seats:" value={totalSeats} required onChange={(event) => setTotalSeats(event.currentTarget.value)}
                                        />
                                    </Group>
                                    <Group position="right">
                                        <Button variant="subtle" className="text-md" type="submit">Add Total Seats</Button>
                                    </Group>
                                </form>
                            </Modal>
                        </Group>
                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                rows={totalSeatsRows}
                                columns={totalSeatsColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Card.Section>
                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Available Seats Information</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsAvailableModalOpened(true)}>Add Available Seats By Class</Button>
                            <Modal
                                opened={isAvailableModalOpened}
                                onClose={() => setIsAvailableModalOpened(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="stopForm" onSubmit={handleAvailableSeatsSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Available Seats</Text>
                                    </Center>
                                    <Divider />
                                    <Group className="my-2">
                                        <Select
                                            label="Class Category:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={availableClassCategory}
                                            onChange={setAvailableClassCategory}
                                            nothingFound="No options"
                                            data={classCategorySelectList}
                                        />
                                    </Group>
                                    <Group>
                                        <TextInput
                                            label="Seats:" value={availableSeats} required onChange={(event) => setAvailableSeats(event.currentTarget.value)}
                                        />
                                    </Group>
                                    <Group position="right">
                                        <Button variant="subtle" className="text-md" type="submit">Add Available Seats</Button>
                                    </Group>
                                </form>
                            </Modal>
                        </Group>
                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                rows={availableSeatsRows}
                                columns={availableSeatsColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Card.Section>
                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Price Modifiers Information</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsPriceModalOpened(true)}>Add Price Modifiers By Class</Button>
                            <Modal
                                opened={isPriceModalOpened}
                                onClose={() => setIsPriceModalOpened(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="stopForm" onSubmit={handlePriceModifiersSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Price Modifiers</Text>
                                    </Center>
                                    <Divider />
                                    <Group>
                                        <Select
                                            label="Class Category:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={priceClassCategory}
                                            onChange={setPriceClassCategory}
                                            nothingFound="No options"
                                            data={classCategorySelectList}
                                        />
                                    </Group>
                                    <Group>
                                        <TextInput
                                            label="Cost Per Km:" value={priceCostPerKm} required onChange={(event) => setPriceCostPerKm(event.currentTarget.value)}
                                        />
                                    </Group>
                                    <Group position="right">
                                        <Button variant="subtle" className="text-md" type="submit">Add Price Modifiers</Button>
                                    </Group>
                                </form>
                            </Modal>
                        </Group>
                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                rows={priceModifiersRows}
                                columns={priceModifiersColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Card.Section>
                    <Card.Section>
                        <Group position="right" className="mt-2 mb-2">
                            <Button variant="subtle" className="text-md" onClick={backToList}>Cancel</Button>
                            <Button variant="subtle" onClick={handleTrainSubmit} className=" mr-7 h-8 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>

        </Center>

    )
}