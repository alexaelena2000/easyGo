import react from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { Card, Space } from "@mantine/core";
import SearchResults from "../components/SearchResults";
import SearchHeader from "../components/SearchHeader";

export async function getServerSideProps({ query }) {
    console.log(query);
    const res = await fetch('http://localhost:8080/api/v1/search?' + new URLSearchParams(query))
    const fetchedData = await res.json()
    console.log(fetchedData);
    return {
        props: {
            query: query,
            result: fetchedData
        },
    };
}

class Search extends react.Component {
    constructor(props) {
        super(props);
    }

    //if there is data, display new search result compnent, otherwise, nothing found
    render() {
        return (
            <>
                <Navbar />
                <SearchHeader />
                <div className="mt-12">
                    <SearchResults data={this.props.result} query={this.props.query}/>
                </div>

            </>
        )
    }
}

export default Search