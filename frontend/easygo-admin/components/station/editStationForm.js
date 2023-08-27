import { Card, Center, Divider, Text, TextInput, Group, Button, Textarea, Modal, Space, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function EditStationForm(props) {

    const router = useRouter();

    const [stationCode, setStationCode] = useState("");
    const [stationName, setStationName] = useState("");
    const [stationDescription, setStationDescription] = useState("");
    const [stationFileName, setStationFileName] = useState("");
    const [attractionRows, setAttractionRows] = useState([]);

    const [attractionCode, setAttractionCode] = useState("");
    const [attractionName, setAttractionName] = useState("");
    const [attractionDescription, setAttractionDescription] = useState("");

    const [isStopModalOpened, setIsStopModalOpened] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log(props.code)
            const res = await fetch('http://localhost:8080/api/v1/stations/one/' + props.code)
            const json = await res.json()
            setStationCode(json.code)
            setStationName(json.name)
            setStationDescription(json.description)
            setStationFileName(json.imageFileName)
            if (json.attractionList) {
                setAttractionRows(json.attractionList)
            }

        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])


    const attractionsColumns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
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
                    tempRows.push(...attractionRows);
                    for (var i = 0; i < tempRows.length; i++) {

                        if (tempRows[i].id === params.id) {

                            tempRows.splice(i, 1);
                        }

                    }
                    setAttractionRows(tempRows);
                };

                const viewTicket = (e) => {
                    setAttractionCode("")
                    setAttractionName("")
                    setAttractionDescription("")
                    setTicketModalOpened(true)
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


    const closeModal = () => {
        setTicketModalOpened(false)
    }

    const handleAttractionSubmit = (event) => {
        event.preventDefault();

        var tempRows = [];
        tempRows.push(...attractionRows);
        console.log(tempRows);

        var newRow = undefined || {};
        newRow.id = tempRows.length + 1
        newRow.code = attractionCode
        newRow.name = attractionName
        newRow.description = attractionDescription

        tempRows.push(newRow);
        setAttractionRows(tempRows);

        setIsStopModalOpened(false)
    }

    const backToList = () => {
        router.push("/dashboard/stations")
    }


    const buildStationObject = async () => {
        var station = undefined || {}
        station.code = stationCode
        station.name = stationName
        station.description = stationDescription
        station.imageFileName = stationFileName
        return station
    }

    const buildAttractionList = () => {
        if (attractionRows.length == 0) {
            return []
        } else {
            var attractionList = [];
            for (const row of attractionRows) {
                var attraction = undefined || {}
                attraction.code = row.code
                attraction.name = row.name
                attraction.description = row.description
                attractionList.push(attraction)
            }
            return attractionList
        }
    }


    const handleStationSubmit = async (event) => {
        event.preventDefault();
        const station = await buildStationObject()
        const attractionList = buildAttractionList()

        const buildStationRequest = {
            station: station,
            attractionList: attractionList
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildStationRequest)
        };
        const response = await fetch('http://localhost:8080/api/v1/stations/edit/' + props.code, requestOptions)
        if (response.status == 200) {
            router.push("/dashboard/stations")
        }
    }


    return (
        <Center>
            <div style={{ width: '96%', margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Center>
                            <Text className="text-3xl font-bold my-3">Edit Station</Text>
                        </Center>
                    </Card.Section>
                    <Divider />
                    <Card.Section>
                        <Text className="ml-6 text-lg font-bold mt-4">Basic Station Information</Text>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Code:" value={stationCode} required disabled onChange={(event) => setStationCode(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Name:" value={stationName} required disabled onChange={(event) => setStationName(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <Textarea
                                label="Description:" value={stationDescription} required onChange={(event) => setStationDescription(event.currentTarget.value)} autosize
                                minRows={2}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="File Name in Client:" value={stationFileName} required onChange={(event) => setStationFileName(event.currentTarget.value)}
                            />
                        </Group>
                    </Card.Section>


                    <Card.Section>
                        <Group position="apart" style={{ width: '96%' }} className=" mt-4 ml-6">
                            <Text className="text-lg font-bold">Attractions:</Text>
                            <Button variant="subtle" className="text-md" onClick={() => setIsStopModalOpened(true)}>Add Attraction</Button>
                            <Modal
                                opened={isStopModalOpened}
                                onClose={() => setIsStopModalOpened(false)}
                                withCloseButton={false}
                                centered
                            >
                                <form id="stopForm" onSubmit={handleAttractionSubmit}>
                                    <Center>
                                        <Text className="text-2xl font-bold mb-1">Add Attraction</Text>
                                    </Center>
                                    <Divider />
                                    <Group className="my-2">
                                        <TextInput
                                            label="Code:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={attractionCode}
                                            onChange={(event) => setAttractionCode(event.currentTarget.value)}
                                            nothingFound="No options"
                                        />
                                    </Group>
                                    <Group className="my-2">
                                        <TextInput
                                            label="Name:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={attractionName}
                                            onChange={(event) => setAttractionName(event.currentTarget.value)}
                                            nothingFound="No options"
                                        />
                                    </Group>
                                    <Group className="my-2">
                                        <TextInput
                                            label="Description:"
                                            placeholder=""
                                            searchable
                                            clearable
                                            required
                                            value={attractionDescription}
                                            onChange={(event) => setAttractionDescription(event.currentTarget.value)}
                                            nothingFound="No options"
                                        />
                                    </Group>
                                    <Group position="right">
                                        <Button variant="subtle" className="text-md" type="submit">Add Attraction</Button>
                                    </Group>
                                </form>

                            </Modal>
                        </Group>

                        <div style={{ height: 300, width: "96%", backgroundColor: "white" }} className="ml-6 mt-2">
                            <DataGrid
                                rows={attractionRows}
                                columns={attractionsColumns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Card.Section>


                    <Card.Section>
                        <Group position="right" className="mt-2 mb-2">
                            <Button variant="subtle" className="text-md" onClick={backToList}>Cancel</Button>
                            <Button variant="subtle" onClick={handleStationSubmit} className=" mr-7 h-8 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>

        </Center>

    )
}