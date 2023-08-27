import { Image, Text } from "@mantine/core"

export default function SearchHeader() {
    return (
        <>
            <div style={{ position: "relative" }}>
                <Image
                    width={3000}
                    height={150}
                    src="./search-result-background.png"
                    className="z-10"
                ></Image>
                <div className="flex justify-center">
                    <div style={{ position: "absolute", top: "3.5rem" }}>
                        <Text className="text-4xl text-white mb-2 font-bold" >Search Results</Text>
                    </div>
                </div>

                <div className="z-20" style={{ position: "absolute", top: "5rem", right: "50%" }}>
                </div>
            </div>
        </>
    )
}