
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StripeButton(props) {
    const publishableKey = 'pk_test_tvGcJd9lm9BXl2EfXufQmIKB007KJFlVIz'
    const stripePrice = props.price * 100

    const description = "Your total is " + props.price + " RON"

    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user"))

    const onToken = (token) => {
        console.log(token)
        var ticket;

        if (props.direct == true) {
            ticket = buildBasicDirectTicket(props.journey);
        } else {
            ticket = buildBasicStopoverTicket(props.journey);
        }




        const username = JSON.parse(localStorage.getItem("user")).username;
        const chargeRequest = {
            amount: stripePrice,
            stripeToken: token.id,
            currency: "RON",
            stripeEmail: token.email,
            description: "Ticket Nr. " + ticket.code

        }

        const ticketPaymentRequest = {
            chargeRequest: chargeRequest,
            ticket: ticket,
            username: username
        }

        axios
            .post('http://localhost:8080/api/payment', ticketPaymentRequest)
            .then((response) => {
                alert('Payment Success')
                router.push("/my-tickets")
            })
            .catch((error) => {
                alert('Payment Failed')
            })
    }

    //Need to add clasa
    const buildBasicDirectTicket = (journey) => {
        const ticket = undefined || {};
        ticket.code = ("EZG-" + Math.floor(Math.random() * 999999999999));
        ticket.departureStation = journey.trip.departureStation;
        ticket.departureDate = journey.trip.departureDate;
        ticket.departureTime = journey.trip.departureTime;
        ticket.arrivalStation = journey.trip.arrivalStation;
        ticket.arrivalDate = journey.trip.arrivalDate;
        ticket.arrivalTime = journey.trip.arrivalTime;
        ticket.tripCodeReferences = [];
        ticket.tripCodeReferences.push(journey.trip.code);
        ticket.trainCodes = [];
        ticket.trainCodes.push(journey.trip.trainCode);
        ticket.pricePaid = props.price;
        ticket.classCategory = props.classCategory;
        return ticket;
    }

    const buildBasicStopoverTicket = (journey) => {
        const ticket = undefined || {};
        ticket.code = ("EZG-" + Math.floor(Math.random() * 999999999999));
        ticket.departureStation = journey.trips[0].departureStation;
        ticket.departureDate = journey.trips[0].departureDate;
        ticket.departureTime = journey.trips[0].departureTime;
        ticket.arrivalStation = journey.trips[1].arrivalStation;
        ticket.arrivalDate = journey.trips[1].arrivalDate;
        ticket.arrivalTime = journey.trips[1].arrivalTime;
        ticket.tripCodeReferences = [];
        ticket.tripCodeReferences.push(journey.trips[0].code);
        ticket.tripCodeReferences.push(journey.trips[1].code);
        ticket.trainCodes = [];
        ticket.trainCodes.push(journey.trips[0].trainCode);
        ticket.trainCodes.push(journey.trips[1].trainCode);
        ticket.pricePaid = props.price;
        ticket.classCategory = props.classCategory;
        return ticket;
    }


    return (

        <>
            {isLoggedIn ? <>
                {
                    props.disabled ? (
                        <StripeCheckout
                            amount={stripePrice}
                            name="Book Ticket"
                            description={description}
                            panelLabel="Pay Now"
                            disabled
                            token={onToken}
                            stripeKey={publishableKey}
                            currency="RON"
                        >
                            <Button disabled color="indigo" className="h-8 group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Book Ticket
                            </Button>


                        </StripeCheckout>
                    ) : (
                        <StripeCheckout
                            amount={stripePrice}
                            name="Book Ticket"
                            description={description}
                            panelLabel="Pay Now"
                            token={onToken}
                            stripeKey={publishableKey}
                            currency="RON"
                        >
                            <Button color="indigo" className="h-8 group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Book Ticket
                            </Button>


                        </StripeCheckout>)
                }

            </>
                :
                <>
                    {
                        props.disabled ? (
                            <Button disabled color="indigo" className="h-8 group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => router.push("/login")}>
                                Book Ticket
                            </Button>
                        ) : (

                            <Button color="indigo" className="h-8 group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => router.push("/login")}>
                                Book Ticket
                            </Button>
                        )
                    }

                </>
            }
        </>
    )

}