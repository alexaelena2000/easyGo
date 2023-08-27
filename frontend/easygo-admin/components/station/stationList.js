// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import { Center, Button, UnstyledButton } from '@mantine/core';
// import { NextLink } from '@mantine/next';
// import { DeleteOutline } from '@mui/icons-material';
// import { useEffect, useState } from 'react';
// import Loading from '../Loading';

// /* Maybe use pieces of this function when auth is reenabled on backend
// export async function fetchData() {
//     const token = JSON.parse(localStorage.getItem("user")).token;
//     console.log(token)
//     const requestOptions= {
//         method: 'GET',
//         headers: { Authorization: 'Bearer ' + token},
//     }
//     const res = await fetch('http://localhost:8080/api/v1/stations',requestOptions)
//     const fetchedData = await res.json()

//     return fetchedData
// }
// */

// export default function StationList(props) {

//     // Replace by converting stations page into class and use getServerSideProps to fetch data using props

//     const [data, setData] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await fetch('http://localhost:8080/api/v1/stations')
//             const json = await res.json()
//             setData(json)
//         }
//         fetchData().catch(console.error);
//         setLoading(false);
//     }, [])


//     const columns = [
//         { field: 'code', headerName: 'Code', width: 150 },
//         { field: 'name', headerName: 'Name', width: 150 },
//         {
//             field: "action",
//             headerName: "Action",
//             sortable: false,
//             width: 150,
//             renderCell: (params) => {
//                 const onClick = (e) => {
//                     e.stopPropagation(); // don't select this row after clicking
//                     console.log(e);
//                 };

//                 return (
//                 <>
//                     {/* Pass Row as props to edit page */}
//                     <Button className="btn btn-ghost" onClick={onClick}>Edit</Button>
//                     <UnstyledButton>
//                         <DeleteOutline />
//                     </UnstyledButton>

//                 </>);
//             }
//         },
//     ];

//     if(loading) {
//         return <Loading />
//     }

//     return (
//         <div style={{ height: 300, width: '100%', backgroundColor: "white" }}>
//             <DataGrid
//                 rows={data}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[10]}
//                 checkboxSelection
//                 disableSelectionOnClick
//             />
//         </div>
//     )
// }


//---------------------------------------------------------------------------------------
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Center, Button, UnstyledButton, Space, Modal, Box } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Router } from 'next/router';
import { useRouter } from "next/router"


export default function StationList() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const stationListObjectMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.id = element.id
            tempElement.code = element.code
            tempElement.name = element.name
            dataList.push(tempElement)
        });
        return (dataList)
    }

    const deleteStation = async (code) => {
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: code
        };
        const res = await fetch('http://localhost:8080/api/v1/stations/delete', requestOptions)
        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
    }

    const fetchEditStation = async (code) => {
        const res = await fetch('http://localhost:8080/api/v1/stations/one/' + code)
        console.log(code);
        return res.json();
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setData(stationListObjectMapper(json))
        }
        fetchData().catch(console.error)
        setLoading(false);
    }, [])

    const columns = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'name', headerName: 'Station Name', width: 150 }, ,
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
                    const isDeleted = await deleteStation(params.getValue(params.id, "code"));
                    console.log(isDeleted)
                    if (isDeleted) {
                        window.location.reload(false);
                    }
                };

                const editAction = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let code = params.getValue(params.id, "code");

                    router.push({
                        pathname: '/dashboard/stations/edit/' + code,
                        query: { data: code }
                    }, '/dashboard/stations/edit/' + code)

                    // const data1 = fetchEditStation(params.getValue(params.id, "code"));
                    // setModalData(data1); console.log(modalData);
                    // console.log(data); setIsViewModalOpened(true);

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