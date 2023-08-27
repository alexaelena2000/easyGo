import { Card, Center, Divider, Text, TextInput, Group, Space, Button, Modal, Select, UnstyledButton } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { randomId } from "@mantine/hooks";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, ModeEditOutline, TextRotationAngledown } from '@mui/icons-material';
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { signOut } from "../../util/auth";



export default function AddTrainForm() {

    const router = useRouter();

    const [trainCode, setTrainCode] = useState("");
    const [trainName, setTrainName] = useState("");

    const [classCategorySelectList, setClassCategorySelectList] = useState([
        {label: "CLASA I", value: "CLASA-I"},
        {label: "CLASA II", value: "CLASA-II"}
    ]);
    const [tripSelectList, setTripSelectList] = useState([]);


    const [trainTotalSeatsByClassList, setTrainTotalSeatsByClassList] = useState([]);
    const [trainAvailableSeatsByClassList, setTrainAvailableSeatsByClassList] = useState([]);
    const [trainPriceModifiersPerClassList, setPriceModifiersPerClassList] = useState([]);
    const [classCategory, setClassCategory] = useState("");
    const [trip, setTrip] = useState("");


    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);


    const [totalCode, setTotalCode] = useState("");
    const [totalClassCategory, setTotalClassCategory] = useState("");
    const [totalSeats, setTotalSeats] = useState("");

    const [availableCode, setAvailableCode] = useState("");
    const [availableClassCategory, setAvailableClassCategory] = useState("");
    const [availableSeats, setAvailableSeats] = useState("");

    const [priceCode, setPriceCode] = useState("");
    const [priceClassCategory, setPriceClassCategory] = useState("");
    const [priceCostPerKm, setPriceCostPerKm] = useState("");

    const [isStopModalOpened, setIsStopModalOpened] = useState(false);
    const [isStopModalOpened2, setIsStopModalOpened2] = useState(false);



    const columnsTotal = [
        { field: 'classCategoryName', headerName: 'Class Category', width: 200 },
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
                    tempRows.push(...rows);
                    tempRows.splice(params.id - 1, 1)
                    setRows(tempRows);
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

    const columnsPriceModifiers = [
        { field: 'classCategoryName', headerName: 'Class Category', width: 200 },
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
                    tempRows.push(...rows2);
                    tempRows.splice(params2.id - 1, 1)
                    setRows2(tempRows);
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
        tempRows.push(...rows);

        var newRow = undefined || {};
        let classCategory = classCategorySelectList.find(data => data.value == totalClassCategory)
        newRow.id = tempRows.length + 1
        newRow.classCategoryName = classCategory.label
        newRow.classCategory = totalClassCategory
        newRow.seats = totalSeats

        tempRows.push(newRow);
        setRows(tempRows);

        setIsStopModalOpened(false)
    }

    const handlePriceModifiersSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...rows2);
        let classCategory = classCategorySelectList.find(data => data.value == priceClassCategory)
        var newRow = undefined || {};
        newRow.id = tempRows.length + 1
        newRow.classCategoryName = classCategory.label
        newRow.classCategory = priceClassCategory
        newRow.costPerKm = priceCostPerKm

        tempRows.push(newRow);
        setRows2(tempRows);

        setIsStopModalOpened2(false)
    }

    const buildSeatsList = (type) => {
        if (rows.length == 0) {
            return [];
        } else {
            var totalSeatsList = [];
            for (const row of rows) {
                if(type === "total") {
                    var totalSeat = undefined || {}
                    totalSeat.code = "SPC-" + trainCode + "-" + row.classCategory + "-TOTAL"
                    totalSeat.classCategory = row.classCategory
                    totalSeat.seats = row.seats
                    totalSeatsList.push(totalSeat)
                } else {
                    var totalSeat = undefined || {}
                    totalSeat.code = "SPC-" + trainCode + "-" + row.classCategory + "-AVAILABLE"
                    totalSeat.classCategory = row.classCategory
                    totalSeat.seats = row.seats
                    totalSeatsList.push(totalSeat)
                }
            }
            return totalSeatsList;
        }
    }

    const buildPriceModifiersPerClassList = () => {
        if (rows2.length == 0) {
            return [];
        } else {
            var priceModifiersList = [];
            for (const row of rows2) {
                    var priceModifiers = undefined || {}
                    priceModifiers.code = "PMPC-" + trainCode + "-" + row.classCategory
                    priceModifiers.classCategory = row.classCategory
                    priceModifiers.costPerKm = row.costPerKm
                    priceModifiersList.push(priceModifiers)
            }
            return priceModifiersList;
        }
    }

    const fetchTripCode = async (tripId) => {
        const res = await fetch('http://localhost:8080/api/v1/trips/' + tripId)
        const trip = await res.json();
        const tripCode = await trip.code;
        console.log(tripCode)
        return tripCode
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
        const totalSeatsPerClassList = buildSeatsList("total")
        const availableSeatsPerClassList = buildSeatsList("available")



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
        const response = await fetch('http://localhost:8080/api/v1/trains/add', requestOptions)
        if (response.status == 200) {
            router.push("/dashboard/trains")
        }
    }

    const classCategoryListMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.value = element.id
            tempElement.label = element.name
            dataList.push(tempElement)
        });
        return (dataList)
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

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await fetch('http://localhost:8080/api/v1/trips')
            const json1 = await res1.json()
            setTripSelectList(tripListMapper(json1))
        }
        fetchData().catch(console.error)
    }, [])

    return (
        <Center>
            <div style={{ width: '96%', margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Center>
                            <Text className="text-3xl font-bold my-3">Add Train</Text>
                        </Center>
                    </Card.Section>
                    <Divider />
                    <Card.Section>
                        <Text className="ml-6 text-lg font-bold mt-4">Basic Train Information</Text>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Code:" value={trainCode} required onChange={(event) => setTrainCode(event.currentTarget.value)}
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
                            <Text className="text-lg font-bold">Total Seats:</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsStopModalOpened(true)}>Add Total Seats By Class</Button>
                            <Modal
                                opened={isStopModalOpened}
                                onClose={() => setIsStopModalOpened(false)}
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
                                rows={rows}
                                columns={columnsTotal}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Card.Section>
                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Price Modifiers Per Class:</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsStopModalOpened2(true)}>Add Price Modifiers Per Class</Button>
                            <Modal
                                opened={isStopModalOpened2}
                                onClose={() => setIsStopModalOpened2(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="priceForm" onSubmit={handlePriceModifiersSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Price Modifiers Per Class</Text>
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
                                        <Button variant="subtle" className="text-md" type="submit">Add Price Modifier</Button>
                                    </Group>
                                </form>

                            </Modal>
                        </Group>

                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                rows={rows2}
                                columns={columnsPriceModifiers}
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