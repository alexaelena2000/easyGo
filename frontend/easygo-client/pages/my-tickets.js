import Navbar from "../components/Navbar"
import TicketsHeader from "../components/tickets/ticketsHeader"
import TicketsList from "../components/tickets/ticketsList"

export default function MyTickets() {
    return(
        <>
        <Navbar />
        <TicketsHeader />
        <TicketsList />
        </>
    )
}