import { Card, Space, Text } from "@mantine/core";
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { DataGrid } from "@mui/x-data-grid";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';



export default function Analytics() {

    ChartJS.register(CategoryScale,
        LinearScale,
        BarElement,
        Title, ArcElement, Tooltip, Legend);

    const [arrStationFrequencyList, setArrStationFrequencyList] = useState([]);

    const [averageTicketPrice, setAverageTicketPrice] = useState(0.0);

    const [firstClassCount, setFirstClassCount] = useState(0);
    const [secondClassCount, setSecondClassCount] = useState(0);

    const [noOfTotalUsers, setNoOfTotalUsers] = useState(0);
    const [userCountWithTicket, setUserCountWithTicket] = useState(0);

    const [noOfTotalSearches, setNoOfTotalSearches] = useState(0);
    const [noOfTotalTickets, setNoOfTotalTickets] = useState(0);

    const [arrStationFrequencyPieData, setArrStationFrequencyPieData] = useState({});
    const [depStationFrequencyPieData, setDepStationFrequencyPieData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/analytics')
            const json = await res.json()
            const arrFrequencyData = [];
            const arrLabels = [];
            for (var i = 0; i < (Object.keys(JSON.parse(json.arrStationFrequencyMapString))).length; i++) {
                console.log(i)
                arrLabels.push((Object.keys(JSON.parse(json.arrStationFrequencyMapString))[i]))
                arrFrequencyData.push((Object.values(JSON.parse(json.arrStationFrequencyMapString))[i]))
            }

            const arrData = {
                labels: arrLabels,
                data: arrFrequencyData
            }

            setArrStationFrequencyPieData(arrData);


            const depFrequencyData = [];
            const depLabels = [];
            for (var i = 0; i < (Object.keys(JSON.parse(json.depStationFrequencyMapString))).length; i++) {
                console.log(i)
                depLabels.push((Object.keys(JSON.parse(json.depStationFrequencyMapString))[i]))
                depFrequencyData.push((Object.values(JSON.parse(json.depStationFrequencyMapString))[i]))
            }

            const depData = {
                labels: depLabels,
                data: depFrequencyData
            }

            console.log(depData)

            setDepStationFrequencyPieData(depData);
            setAverageTicketPrice(json.averageTicketPrice)
            setFirstClassCount(json.firstClassCount)
            setSecondClassCount(json.secondClassCount)
            setNoOfTotalUsers(json.noOfTotalUsers)
            setUserCountWithTicket(json.userCountWithTicket)
            setNoOfTotalSearches(json.noOfTotalSearches)
            setNoOfTotalTickets(json.noOfTotalTickets)
        }
        fetchData().catch(console.error)
    }, [])


    const arrStationFrequencyDataSet = {
        labels: arrStationFrequencyPieData.labels,
        datasets: [
            {
                id: 1,
                label: '',
                data: arrStationFrequencyPieData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            }
        ],
    }

    const depStationFrequencyDataSet = {
        labels: depStationFrequencyPieData.labels,
        datasets: [
            {
                id: 1,
                label: '',
                data: depStationFrequencyPieData.data,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            }
        ],
    }

    const ClassRatioDataSet = {
        labels: ["Clasa I", "Clasa II"],
        datasets: [
            {
                id: 1,
                label: '',
                data: [firstClassCount, secondClassCount],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            }
        ],
    }

    const UserConversionDataSet = {
        labels: ["Users With Purchase", "Users With No Purchase"],
        datasets: [
            {
                id: 1,
                label: '',
                data: [userCountWithTicket, (noOfTotalUsers - userCountWithTicket)],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            }
        ],
    }

    const TicketConversionDataSet = {
        labels: ["Searches", "Tickets"],
        datasets: [
            {
                id: 1,
                label: '',
                data: [noOfTotalSearches, noOfTotalTickets],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            }
        ],
    }


    const arrStationBarChartdata = {
        labels: arrStationFrequencyPieData.labels,
        datasets: [
            {
                label: 'Stations',
                data: arrStationFrequencyPieData.data,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    };

    const depStationBarChartdata = {
        labels: depStationFrequencyPieData.labels,
        datasets: [
            {
                label: 'Stations',
                data: depStationFrequencyPieData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
            },
        ],
    };

    return (
        <>
            <div className="flex flex-row space-x-12">
                <div className="TicketInfo">
                    <Card style={{ width: "30.5rem" }} shadow="sm" withBorder={true} radius="md">
                        <Text className="ml-1 text-center" size="lg" weight={550}>Ticket Class Category Distribution</Text>
                        <Space h="sm" />
                        <Pie data={ClassRatioDataSet} datasetIdKey="id" options={{
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                            }
                        }} />

                    </Card>
                    <div className="flex flex-row space-x-2 mt-1">
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Average Ticket Price:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={averageTicketPrice} decimals={2} duration={3.75} useEasing={true} className="font-bold text-4xl" /> <Text component="span" weight={550}>RON</Text>
                            </div>
                        </Card>
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Clasa I to Clasa II Ratio:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={firstClassCount / secondClassCount} decimals={2} duration={3.75} useEasing={true} className="font-bold text-4xl" />
                            </div>
                        </Card>
                    </div>
                </div>


                <div className="SearchInfo">
                    <Card style={{ width: "30.5rem" }} shadow="sm" withBorder={true} radius="md">
                        <Text className="ml-1 text-center" size="lg" weight={550}>Ticket-Search Conversion</Text>
                        <Space h="sm" />
                        <Pie data={TicketConversionDataSet} datasetIdKey="id" options={{
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                            }
                        }} />

                    </Card>

                    <div className="flex flex-row space-x-2 mt-1">
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Total Searches:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={noOfTotalSearches} duration={1.75} start={-120} useEasing={true} className="font-bold text-4xl" />
                            </div>
                        </Card>
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Total Tickets Bought:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={noOfTotalTickets} duration={1.75} start={0} useEasing={true} className="font-bold text-4xl" />
                            </div>
                        </Card>
                    </div>

                </div>

                <div className="UserInfo">
                    <Card style={{ width: "30.5rem" }} shadow="sm" withBorder={true} radius="md">
                        <Text className="ml-1 text-center" size="lg" weight={550}>User-Ticket Conversion</Text>
                        <Space h="sm" />
                        <Pie data={UserConversionDataSet} datasetIdKey="id" options={{
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                            }
                        }} />

                    </Card>

                    <div className="flex flex-row space-x-2 mt-1">
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Users With Tickets:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={userCountWithTicket} duration={1.75} start={-120} useEasing={true} className="font-bold text-4xl" />
                            </div>
                        </Card>
                        <Card style={{ width: "15rem" }} shadow="sm" withBorder={true} radius="md">
                            <Text size="lg" weight={500}>Total Users Registered:</Text>
                            <div className="mt-1 mb-1">
                                <CountUp end={noOfTotalUsers} duration={1.75} start={-120} useEasing={true} className="font-bold text-4xl" />
                            </div>
                        </Card>
                    </div>

                </div>



            </div>
            <div className="flex flex-row space-x-2 mt-2">
                <Card shadow="sm" withBorder={true} radius="md" style={{ height: "28rem", width: "48.5rem", backgroundColor: "white" }}>
                    <Text className="ml-1" size="lg" weight={550}>Most Departed From Stations:</Text>
                    <Space h="sm" />
                    <Bar data={depStationBarChartdata} />


                </Card>
                <Card shadow="sm" withBorder={true} radius="md" style={{ height: "28rem", width: "48.5rem", backgroundColor: "white" }}>
                    <Text className="ml-1" size="lg" weight={550}>Most Arrived To Stations:</Text>
                    <Space h="sm" />
                    <Bar data={arrStationBarChartdata} />

                </Card>
            </div>
        </>
    )

}