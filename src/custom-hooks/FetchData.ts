import React, {useState, useEffect} from "react";
import { server_calls } from "../api";

export const useGetData = () => {
    const [droneData, setData] = useState<any>([]);

    const handleFetchData = async () => {
        const result = await server_calls.get();
        setData(result)
    };

    // useEffect goes here; adds our data to react state
    useEffect( () => {
        handleFetchData();
    },[])

    return {droneData, getData:handleFetchData}
}