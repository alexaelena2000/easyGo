
import Navbar from "../components/Navbar";
import PopularDestinations from "../components/popularDestinations";
import SearchForm from "../components/SearchForm";
import { Space } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {

  const [arrivalId, setArrivalId] = useState("");
  const [depId, setDepId] = useState("");
  const router = useRouter();

  useEffect(() => {

    if(router.query.arrId) {
      setArrivalId(router.query.arrId)
    }
    if(router.query.depId) {
      setDepId(router.query.depId)
    } else {
      setDepId(null);
    }

  },[])

  return (
    <div>
      <Navbar />
      <SearchForm suggestArrId={arrivalId} suggestDepId={depId}/>
    </div>
  )
}
