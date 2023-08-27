import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space, Modal, Box } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Router } from 'next/router';
import { useRouter } from "next/router"


export default function NearbyStationsList() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const nearbyStationListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.station = element.station.name

            var nearbyStationList = [];
            element.nearbyStations.forEach(listElement => {
                var stationElement = undefined || {};
                stationElement = listElement.name
                nearbyStationList.push(stationElement)
            })

            tempElement.nearbyStations = nearbyStationList
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const deleteNearbyStation = async (code) => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: code
        };
        const res = await fetch('http://localhost:8080/api/v1/nearbyStations/delete', requestOptions)
        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
    }

    const fetchEditNearbyStation = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/nearbyStations/one/' + code)
        console.log(code);
        return res.json();
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/nearbyStations')
            const json = await res.json()
            setData(nearbyStationListObjectMapper(json))
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'station', headerName: 'Station Name', width: 150 },
        { field: 'nearbyStations', headerName: 'Nearby Stations', width: 150 },
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
                    const isDeleted = await deleteNearbyStation(params.getValue(params.id, "code"));
                    console.log(isDeleted)
                    if (isDeleted) {
                        window.location.reload(false);
                    }
                };

                const editAction = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let code = params.getValue(params.id, "code");

                    router.push({
                        pathname: '/dashboard/nearbyStations/edit/' + code,
                        query: { data: code }
                    }, '/dashboard/nearbyStations/edit/' + code)

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