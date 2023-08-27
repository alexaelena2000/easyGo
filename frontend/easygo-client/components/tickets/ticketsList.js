import { Center, Text, Container, Modal, Button, Space } from "@mantine/core"
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { QRCodeSVG } from "qrcode.react";

export default function TicketsList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ticketModalOpened, setTicketModalOpened] = useState(false);
    const [modalValue, setModalValue] = useState("");

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'departureStation', headerName: 'Departure Station', width: 150 },
        { field: 'arrivalStation', headerName: 'Arrival Station', width: 150 },
        { field: 'departureTime', headerName: 'Departure Time', width: 210 },
        { field: 'arrivalTime', headerName: 'Arrival Time', width: 210 },
        { field: 'trainCodes', headerName: 'Trains', width: 180 },
        { field: 'classCategory', headerName: 'Type', width: 100 },
        { field: 'pricePaid', headerName: 'Price', width: 100 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 110,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {

                // COuld use verification link to verify ticket instead of just code
                const viewTicket = (e) => {
                    setModalValue("")
                    setTicketModalOpened(true)
                    setModalValue(params.getValue(params.id, "code"))
                }



                return (
                    <>
                        <Button variant="subtle" className="text-md" onClick={viewTicket}>View Ticket</Button>

                    </>
                );
            }
        },
    ];

    const ticketListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.departureStation = element.departureStation.name
            tempElement.arrivalStation = element.arrivalStation.name
            tempElement.departureTime = new Date(element.departureTime)
            tempElement.arrivalTime = new Date(element.arrivalTime)
            tempElement.chargeId = element.chargeId
            tempElement.pricePaid = element.pricePaid + " RON"
            tempElement.trainCodes = element.trainCodes
            tempElement.classCategory = element.classCategory
            dataList.push(tempElement)
        });
        return (dataList)
    }

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                body: JSON.parse(localStorage.getItem("user")).username
            }
            const res = await fetch('http://localhost:8080/api/v1/user/get-tickets', requestOptions)
            const json = await res.json()
            setData(ticketListObjectMapper(json))
            console.log(data);
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const closeModal = () => {
        setTicketModalOpened(false)
    }

    // Trbuie adaugat clasa de la payment
    return (
        <>

            <Modal
                opened={ticketModalOpened}
                onClose={closeModal}
                withCloseButton={true}
                centered
                size={300}
            >
                <Center><Text className="text-md font-semibold">Ticket: {modalValue}</Text></Center>
                <Space h="lg" />
                <QRCodeSVG value={modalValue} size={256} />
            </Modal>




            <div className="w-screen bg-indigo-700 h-20 shadow-xl ">
                <Center className="pt-5">
                    <Text className="text-4xl text-white mb-2 font-semibold">Where You've Travelled</Text>
                </Center>
            </div>
            <Center className="mt-12">
                <div style={{ height: '40rem', width: '86rem' }}>
                    <div style={{ height: '90%', width: '100%' }} className="shadow-lg">
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </Center>
        </>
    )
}