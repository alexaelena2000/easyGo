import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space, Modal, Box } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Router } from 'next/router';
import { useRouter } from "next/router"


export default function UserList() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isViewModalOpened, setIsViewModalOpened] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalDataTemp, setModalDataTemp] = useState('')
    const userListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.username = element.username
            tempElement.email = element.email
            tempElement.tickets = element.tickets
            element.tickets?.map(element1 => {
                tempElement.tickets.code = element1.code
                //console.log(tempElement.tickets.code)
                tempElement.tickets.departureStation = element1.departureStation.name
                console.log(tempElement.tickets.departureStation)
                // tempElement.tickets.arrivalStation = element1.arrivalStation.name
                // tempElement.tickets.classCategory = element1.classCategory
                // tempElement.tickets.pricePaid = element1.pricePaid

            })
            dataList.push(tempElement)
        });
        return (dataList)
    }


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/user')
            const json = await res.json()
            setData(userListObjectMapper(json))

        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const fetchTickets = async (username) => {
        const res = await fetch('http://localhost:8080/api/v1/user/' + username + '/getTickets')
        return res.json()
    }


    const columns = [
        { field: 'username', headerName: 'Code', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        {
            field: 'tickets',
            headerName: "Tickets",
            sortable: true,
            width: 300,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                const modalColumns = [
                    { field: 'code', headerName: 'Code', width: 150 },
                    // { field: 'departureStation', headerName: 'Departure Station', width: 150 },
                    // { field: 'arrivalStation', headerName: 'Arrival Station', width: 150 },
                    { field: 'classCategory', headerName: 'Class Category', width: 150 },
                    { field: 'pricePaid', headerName: 'Price', width: 150 }
                ]
                return (
                    <>
                        <Button variant="subtle" className="text-md"
                            onClick={async () => {
                                const data1 = await fetchTickets(params.getValue(params.id, "username"));
                                setModalData(data1);
                                setIsViewModalOpened(true);
                            }}>View</Button>
                        <Modal
                            opened={isViewModalOpened}
                            onClose={() => setIsViewModalOpened(false)}
                            withCloseButton={true}
                            centered
                        >
                            <Box style={{ width: "400px", height: "400px" }}>
                                <DataGrid
                                    rows={modalData}
                                    columns={modalColumns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick

                                />
                            </Box>
                        </Modal>
                    </>
                )
            }
        }
    ];

    if (loading) {
        return <Loading />
    }

    return (
        <div style={{ height: '90%', width: '100%', backgroundColor: "white" }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}