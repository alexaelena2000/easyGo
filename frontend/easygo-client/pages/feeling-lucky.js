import Navbar from "../components/Navbar";
import SuggestHeader from "../components/suggestTrip/suggestHeader";
import SuggestIdeas from "../components/suggestTrip/suggestIdeas";
import SuggestResults from "../components/suggestTrip/suggestResults";

export default function SuggestTrip() {
    return (
        <>
        <Navbar />
        <SuggestHeader />
        <SuggestResults />
        <SuggestIdeas />
        </>
    )
}