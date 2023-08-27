import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';


export default function AttractionList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const attractionListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.name = element.name
            tempElement.description = element.description
            dataList.push(tempElement)
        });
        return (dataList)
    }
    //TODO: METODA IN BACK
    const deleteAttraction = async (code) => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: code
        };
        const res = await fetch('http://localhost:8080/api/v1/touristAttractions/delete', requestOptions)
        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/touristAttractions')
            const json = await res.json()
            setData(attractionListObjectMapper(json))
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
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
                    const isDeleted = await deleteAttraction(params.getValue(params.id, "code"));
                    console.log(isDeleted)
                    if (isDeleted) {
                        window.location.reload(false);
                    }
                };

                const editAction = (e) => {
                    e.stopPropagation();

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