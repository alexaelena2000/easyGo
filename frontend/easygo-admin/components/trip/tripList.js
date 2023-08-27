import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useRouter } from "next/router"

export default function TripList() {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const tripListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.departureStation = element.departureStation.name
            tempElement.arrivalStation = element.arrivalStation.name
            tempElement.departureTime = new Date(element.departureTime)
            tempElement.arrivalTime = new Date(element.arrivalTime)
            tempElement.duration = element.tripDuration
            tempElement.distance = element.distance
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const deleteTrip = async (code) => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: code
        };
        const res = await fetch('http://localhost:8080/api/v1/trips/delete', requestOptions)
        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/trips')
            const json = await res.json()
            setData(tripListObjectMapper(json))
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'departureStation', headerName: 'Departure Station', width: 150 },
        { field: 'arrivalStation', headerName: 'Arrival Station', width: 150 },
        { field: 'departureTime', headerName: 'Departure Time', width: 210 },
        { field: 'arrivalTime', headerName: 'Arrival Time', width: 210 },
        { field: 'duration', headerName: 'Trip Duration in minutes', width: 150 },
        { field: 'distance', headerName: 'Trip Distance in km', width: 150 },
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
                    const isDeleted = await deleteTrip(params.getValue(params.id, "code"));
                    console.log(isDeleted)
                    if (isDeleted) {
                        window.location.reload(false);
                    }
                };

                const editAction = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let code = params.getValue(params.id, "code");

                    router.push({
                        pathname: '/dashboard/trips/edit/' + code,
                        query: { data: code }
                    }, '/dashboard/trips/edit/' + code)
                }

                return (
                    <>
                        {/* Pass Row as props to edit page */}
                        <UnstyledButton onClick={editAction}>
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