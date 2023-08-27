import { Card, Center, Divider, Text, TextInput, Group, Space, Button, Modal, Select, UnstyledButton, Textarea, MultiSelect } from "@mantine/core";
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";



export default function EditNearbyStationsForm(props) {

    const router = useRouter();

    const [extendedStationCode, setExtendedStationCode] = useState("");
    const [stationCode, setStationCode] = useState("");
    const [nearbyStations, setNearbyStations] = useState([]);
    const [stationSelectList, setStationSelectList] = useState([]);


    const backToList = () => {
        router.push("/dashboard/stations")
    }


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))


            const res2 = await fetch('http://localhost:8080/api/v1/nearbyStations/one/' + props.code)
            const json2 = await res2.json()
            setExtendedStationCode(json2.code)
            setStationCode(json2.station.code)
            var nearbyStationList = [];
            json2.nearbyStations.forEach(listElement => {
                var stationElement = undefined || {};
                stationElement = listElement.code
                nearbyStationList.push(stationElement)
            })
            setNearbyStations(nearbyStationList)


        }
        fetchData().catch(console.error)
    }, [])

    const stationListMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.value = element.code
            tempElement.label = element.name
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const buildExtendedStationObject = () => {
        var extendedStation = undefined || {}
        extendedStation.code = extendedStationCode
        return extendedStation
    }

    const handleNearbyStationSubmit = async (event) => {
        event.preventDefault();
        const extendedStation = buildExtendedStationObject()
        const mainStationCode = stationCode
        const nearbyStationsList = nearbyStations


        
        const buildExtendedStationRequest = {
            extendedStationWithDestinations: extendedStation,
            mainStationCode: mainStationCode,
            nearbyStations: nearbyStationsList
        }

        console.log(buildExtendedStationRequest)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildExtendedStationRequest)
        };
        const response = await fetch('http://localhost:8080/api/v1/nearbyStations/edit/' + props.code, requestOptions)
        if (response.status == 200) {
            router.push("/dashboard/nearbyStations")
        }
    }

    return (
        <Center>
            <div style={{ width: '96%', margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Center>
                            <Text className="text-3xl font-bold my-3">Add Extended Station</Text>
                        </Center>
                    </Card.Section>
                    <Divider />
                    <Card.Section>
                        <Text className="ml-6 text-lg font-bold mt-4">Extended Station Information</Text>
                        <Group className="my-2 ml-6">
                            <TextInput
                                label="Extension Code:" value={extendedStationCode} required disabled onChange={(event) => setExtendedStationCode(event.currentTarget.value)}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <Select
                                label="Station:"
                                placeholder="Pick Station"
                                searchable
                                clearable
                                required
                                value={stationCode}
                                onChange={setStationCode}
                                nothingFound="No options"
                                data={stationSelectList}
                            />
                        </Group>
                        <Group className="my-2 ml-6">
                            <MultiSelect
                                label="Nearby Stations:"
                                placeholder="Pick Stations"
                                searchable
                                clearable
                                required
                                value={nearbyStations}
                                onChange={setNearbyStations}
                                nothingFound="No options"
                                data={stationSelectList}
                            />
                        </Group>

                    </Card.Section>


                    <Card.Section>
                        <Group position="right" className="mt-2 mb-2">
                            <Button variant="subtle" className="text-md" onClick={backToList}>Cancel</Button>
                            <Button variant="subtle" onClick={handleNearbyStationSubmit} className=" mr-7 h-8 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</Button>
                        </Group>
                    </Card.Section>
                </Card>
            </div>

        </Center>

    )
}