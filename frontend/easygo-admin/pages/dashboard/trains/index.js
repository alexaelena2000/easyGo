import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomAppShell from "../../../components/customAppShell";
import TrainToolbar from "../../../components/train/trainToolbar";
import TrainList from "../../../components/train/trainList";

export default function Trains() {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    return (
        <CustomAppShell>
            <TrainToolbar />
            <TrainList />
        </CustomAppShell>
    )
}