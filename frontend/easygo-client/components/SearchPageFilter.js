import dayjs from "dayjs";
import { Select, Button, Card, Text, Space, Checkbox, RangeSlider, Divider } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";

export default function SearchPageFilter() {

    const [stationSelectList, setStationSelectList] = useState([]);

    const stationListMapper = (data) => {
        var dataList = [];
        data.forEach(element => {
            var tempElement = undefined || {};
            tempElement.value = element.id
            tempElement.label = element.name
            dataList.push(tempElement)
        });
        return (dataList)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stations')
            const json = await res.json()
            setStationSelectList(stationListMapper(json))
        }
        fetchData().catch(console.error)
    }, [])

    const MARKS = [
        { value: 0, label: '12' },
        { value: 100, label: '50' },
      ];

    return (
        <>
            <div style={{ width: "19rem" }}>
                <form>
                    <Card shadow="xl" withBorder radius="lg">
                        <Text weight={700} size="xl">Search</Text>
                        <Divider className="mt-2 mb-1" />
                        <Space h="xs" />
                        <Select
                            label="Departure Location:"
                            placeholder="From where are you leaving?"
                            searchable
                            clearable
                            required
                            nothingFound="No options"
                            data={stationSelectList}
                        />
                        <Space h="sm" />
                        <Select
                            label="Arrival Location:"
                            placeholder="Where would you like to go?"
                            searchable
                            clearable
                            required
                            data={stationSelectList}
                        />
                        <Space h="sm" />
                        <DatePicker
                            placeholder="Pick date"
                            label="Date of Departure:"
                            required
                            minDate={dayjs(new Date()).toDate()}
                        />
                        <Space h="sm" />
                        <div className="flex justify-center">
                            <Button type="submit" variant="default" className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Search
                            </Button>
                        </div>

                    </Card>
                    <Card shadow="xl" withBorder radius="lg" className="mt-4">
                        <Text weight={700} size="xl">Filters</Text>
                        <Divider className="mt-2 mb-1" />
                        <Space h="xs" />
                        <Checkbox
                            label="Direct Routes Only"
                        />
                        <Space h="sm" />
                        <Text weight={400} size="md" className="mb-2">Price</Text>
                        <RangeSlider
                            color="indigo"
                            marks={MARKS}
                        />
                        <Space h="sm" />
                    </Card>
                </form>
            </div>
        </>
    )
}