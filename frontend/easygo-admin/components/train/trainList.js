import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space, Modal, Box, View } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Router } from 'next/router';
import { useRouter } from "next/router"

export default function TrainList() {
    const router = useRouter();


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalData, setModalData] = useState([]);
    const [modalData1, setModalData1] = useState([]);
    const [modalData2, setModalData2] = useState([]);


    const [isViewModalOpened, setIsViewModalOpened] = useState(false);
    const [isViewModalOpened1, setIsViewModalOpened1] = useState(false);
    const [isViewModalOpened2, setIsViewModalOpened2] = useState(false);

    const trainListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.name = element.name
            tempElement.tripCode = element.tripCode
            tempElement.totalSeatsPerClassList = element.totalSeatsPerClassList
            element.totalSeatsPerClassList?.map(element1 => {
                tempElement.totalSeatsPerClassList.classCategory = element1.classCategory
                tempElement.totalSeatsPerClassList.seats = element1.seats
            })
            tempElement.availableSeatsPerClassList = element.availableSeatsPerClassList
            element.availableSeatsPerClassList?.map(element1 => {
                tempElement.availableSeatsPerClassList.classCategory = element1.classCategory
                tempElement.availableSeatsPerClassList.seats = element1.seats
            })
            tempElement.priceModifiersPerClass = element.priceModifiersPerClass
            element.priceModifiersPerClass?.map(element1 => {
                // tempElement.priceModifiersPerClass.seats = element1.costPerKm
            })
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const deleteTrain = async (code) => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: code
        };
        const res = await fetch('http://localhost:8080/api/v1/trains/delete', requestOptions)
        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
    }

    const fetchEditTrain = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/trains/one/' + code)
        return res.json();
    }

    const fetchTotalSeatsByClasss = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/trains/' + code + '/getTotalSeatsByClass')
        return res.json();
    }
    const fetchAvailableSeatsByClasss = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/trains/' + code + '/getAvailableSeatsByClass')
        return res.json();
    }

    const fetchPriceModifiersPerClass = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/trains/' + code + '/getPriceModifiersPerClass')
        return res.json();
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/trains')
            const json = await res.json()
            setData(trainListObjectMapper(json))
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'tripCode', headerName: 'Trip', width: 150 },
        {
            field: 'totalSeatsByClass',
            headerName: 'TotalSeatsByClass',
            width: 150,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                const modalColumns = [
                    { field: 'classCategory', headerName: 'Class Category', width: 195 },
                    { field: 'seats', headerName: 'Seats', width: 195 },
                ]
                return (
                    <>
                        <Button variant="subtle" className="text-md"
                            onClick={async () => {
                                const data1 = await fetchTotalSeatsByClasss(params.getValue(params.id, "code"));
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
        },
        {
            field: 'availableSeatsByClass',
            headerName: 'AvailableSeatsByClass',
            width: 150,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                const modalColumns1 = [
                    { field: 'classCategory', headerName: 'Class Category', width: 195 },
                    { field: 'seats', headerName: 'Seats', width: 195 },
                ]
                return (
                    <>
                        <Button variant="subtle" className="text-md"
                            onClick={async () => {
                                const data1 = await fetchAvailableSeatsByClasss(params.getValue(params.id, "code"));
                                setModalData1(data1);
                                setIsViewModalOpened1(true);
                            }}>View</Button>
                        <Modal
                            opened={isViewModalOpened1}
                            onClose={() => setIsViewModalOpened1(false)}
                            withCloseButton={true}
                            centered
                        >
                            <Box style={{ width: "400px", height: "400px" }}>
                                <DataGrid
                                    rows={modalData1}
                                    columns={modalColumns1}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                />
                            </Box>
                        </Modal>
                    </>
                )
            }
        }, {
            field: 'priceModifiersPerClass',
            headerName: 'PriceModifiersPerClass',
            width: 150,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                const modalColumns2 = [
                    { field: 'classCategory', headerName: 'Class Category', width: 195 },
                    { field: 'costPerKm', headerName: 'CostPerKm', width: 195 },
                ]
                return (
                    <>
                        <Button variant="subtle" className="text-md"
                            onClick={async () => {
                                const data1 = await fetchPriceModifiersPerClass(params.getValue(params.id, "code"));
                                setModalData2(data1);
                                setIsViewModalOpened2(true);
                            }}>View</Button>
                        <Modal
                            opened={isViewModalOpened2}
                            onClose={() => setIsViewModalOpened2(false)}
                            withCloseButton={true}
                            centered
                        >
                            <Box style={{ width: "400px", height: "400px" }}>
                                <DataGrid
                                    rows={modalData2}
                                    columns={modalColumns2}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                />
                            </Box>
                        </Modal>
                    </>
                )
            }
        },
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
                    console.log(e);
                    console.log(params.getValue(params.id, "code"));
                    const isDeleted = await deleteTrain(params.getValue(params.id, "code"));
                    console.log(isDeleted)
                    if (isDeleted) {
                        window.location.reload(false);
                    }
                };

                const editAction = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let code = params.getValue(params.id, "code");

                    router.push({
                        pathname: '/dashboard/trains/edit/' + code,
                        query: { data: code }
                    }, '/dashboard/trains/edit/' + code)
                }

                return (
                    <>
                        {/* Pass Row as props to edit page */}
                        <UnstyledButton onClick={editAction}  >
                            <ModeEditOutline />
                        </UnstyledButton>
                        <Space w="md" />
                        <UnstyledButton onClick={deleteAction}>
                            <DeleteOutline />
                        </UnstyledButton>

                    </>);
            }
        },
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