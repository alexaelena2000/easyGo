import { Select, Button, Image, Text, Group } from "@mantine/core";
import { useState, useEffect } from "react";

export default function TicketsHeader() {
    
    return (
        <>
            <div style={{ position: "relative" }}>
                <Image
                    width={3000}
                    height={300}
                    src="./suggest-background.png"
                    className="z-10"
                ></Image>
                <div className="flex justify-center">
                    <div style={{ position: "absolute", top: "8rem" }}>
                        <Text className="text-5xl text-white mb-2 font-bold" >My Tickets</Text>
                    </div>
                </div>
            </div>
        </>
        
    )
}