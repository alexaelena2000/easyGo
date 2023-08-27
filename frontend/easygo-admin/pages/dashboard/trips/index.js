import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TripList from "../../../components/trip/tripList";
import TripToolbar from "../../../components/trip/tripToolbar";
import CustomAppShell from "../../../components/customAppShell";

export default function Trips() {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    return (
        <CustomAppShell>
            <TripToolbar />
            <TripList />
        </CustomAppShell>
    )
}