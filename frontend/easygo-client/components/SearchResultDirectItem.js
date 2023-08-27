import { Button, SimpleGrid, Timeline, Text, ScrollArea, Card, Collapse, Divider, Space, Select, Checkbox, RangeSlider, Container } from "@mantine/core"
import { useEffect, useState } from "react"
import { DatePicker } from "@mantine/dates";
import SearchPageFilter from "./SearchPageFilter"
import StripeButton from "./StripeButton";
import moment from "moment";
import dayjs from "dayjs";

export default function SearchResultDirectItem(props) {

    const [opened, setOpen] = useState(false);
    return (
        <Card shadow="xl" withBorder radius="lg" key={props.journey}>
            <div className="flex flex-row">
                <div className="flex flex-col ml-3">
                    <Text weight="bold" size="xl">Departure:</Text>
                    <div>
                        <Text color="dimmed" size="sm" className="mt-1">Station:</Text>
                        <h1>{props.journey.trip.departureStation.name}</h1>
                        <Text color="dimmed" size="sm" className="mt-1">Departure Date:</Text>
                        <h1>{moment(props.journey.trip.departureDate).format("DD MMMM YYYY")}</h1>
                        <Text color="dimmed" size="sm" className="mt-1">Departure Time:</Text>
                        <h1>{moment(props.journey.trip.departureTime).format("HH:mm")}</h1>
                    </div>

                </div>
                <div className="flex flex-col ml-12">
                    <Text weight="bold" size="xl">Arrival:</Text>
                    <div>
                        <Text color="dimmed" size="sm" className="mt-1">Station:</Text>
                        <h1>{props.journey.trip.arrivalStation.name}</h1>
                        <Text color="dimmed" size="sm" className="mt-1">Departure Date:</Text>
                        <h1>{moment(props.journey.trip.arrivalDate).format("DD MMMM YYYY")}</h1>
                        <Text color="dimmed" size="sm" className="mt-1">Departure Time:</Text>
                        <h1>{moment(props.journey.trip.arrivalTime).format("HH:mm")}</h1>
                    </div>
                </div>
                <div className="flex flex-col ml-12">
                    <Text weight="bold" size="xl">Availability:</Text>
                    <div>
                        <Text color="dimmed" size="sm" className="mt-1">Clasa 1:</Text>
                        <Text><Text color={props.journey.trip.availableSeatsPerClassList[0].seats > 0 ? "green" : "red"} inherit component="span">{props.journey.trip.availableSeatsPerClassList[0].seats}</Text> Seats Available</Text>
                        <Text color="dimmed" size="sm" className="mt-1">Clasa 2:</Text>
                        <Text><Text color={props.journey.trip.availableSeatsPerClassList[1].seats > 0 ? "green" : "red"} inherit component="span">{props.journey.trip.availableSeatsPerClassList[1].seats}</Text> Seats Available</Text>
                    </div>
                </div>
                <div className="flex flex-col ml-12 mb-4">
                    <Text weight="bold" size="xl">Price:</Text>
                    <div>
                        <Text color="dimmed" size="sm" className="mt-1">Clasa 1:</Text>
                        <Text className="mb-1"><Text component="span" weight={700}>{props.journey.pricePerClassList[0].price.toFixed(2)}</Text> RON Per Ticket</Text>
                        <StripeButton price={props.journey.pricePerClassList[0].price.toFixed(2)} disabled={props.journey.trip.availableSeatsPerClassList[0].seats > 0 ? false : true} journey={props.journey} direct={true} classCategory="Clasa I" />
                        <Text color="dimmed" size="sm" className="mt-1">Clasa 2:</Text>
                        <Text className="mb-1"><Text component="span" weight={700}>{props.journey.pricePerClassList[1].price.toFixed(2)}</Text> RON Per Ticket</Text>
                        <StripeButton price={props.journey.pricePerClassList[1].price.toFixed(2)} disabled={props.journey.trip.availableSeatsPerClassList[1].seats > 0 ? false : true} journey={props.journey} direct={true} classCategory="Clasa II" />
                    </div>
                </div>
                <div className="flex flex-col justify-center ml-10">
                    <Divider orientation="vertical" />
                </div>
                <div className="flex flex-col justify-center ml-10 mr-8">
                    <Button variant="outline" onClick={() => setOpen((o) => !o)} className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View More
                    </Button>
                </div>
            </div>

            <Collapse in={opened}>
                <Divider className="mt-4 mb-2" />
                <div className="flex flex-row">
                    <div className="flex flex-col ">
                        <Text className="ml-3" weight="bold" size="xl">Trip:</Text>
                        <Timeline className="mt-3 ml-3" lineWidth={5}>
                            <Timeline.Item title={props.journey.trip.departureStation.name} bulletSize={28}>
                                <Text color="dimmed" size="sm">{moment(props.journey.trip.departureTime).format("HH:mm")}</Text>
                            </Timeline.Item>
                            {props.journey.trip.legSet.map((leg) => {
                                if (leg.arrivalStation.name == props.journey.trip.arrivalStation.name) {
                                    return null
                                } else {
                                    return (
                                        <Timeline.Item title={leg.arrivalStation.name} bulletSize={18}>
                                            <Text color="dimmed" size="sm">{moment(leg.arrivalTime).format("HH:mm")}</Text>
                                        </Timeline.Item>
                                    )
                                }
                            })}
                            <Timeline.Item title={props.journey.trip.arrivalStation.name} bulletSize={28}>
                                <Text color="dimmed" size="sm">{moment(props.journey.trip.arrivalTime).format("HH:mm")}</Text>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                    <div className="flex flex-col ml-9">
                        <Text weight="bold" size="xl">Details:</Text>
                        <Text color="dimmed" size="sm" className="mt-1">Train Code:</Text>
                        <Text className="mb-1">{props.journey.trip.trainCode}</Text>
                        <Text color="dimmed" size="sm" className="mt-1">Type:</Text>
                        <Text className="mb-1">{props.journey.journeyType}</Text>
                        <Text color="dimmed" size="sm" className="mt-1">Distance:</Text>
                        <Text className="mb-1">{props.journey.trip.distance} KM</Text>
                        <Text color="dimmed" size="sm" className="mt-1">Stops:</Text>
                        <Text className="mb-1">{props.journey.trip.destinations.length - 1}</Text>

                        <Text color="dimmed" size="sm" className="mt-1">Duration:</Text>
                        <Text className="mb-1">{parseInt(props.journey.trip.tripDuration / 60)} Hours {props.journey.trip.tripDuration % 60} Minutes</Text>
                    </div>
                </div>


            </Collapse>

        </Card>
    )
}