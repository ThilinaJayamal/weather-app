import { View, Text } from 'react-native'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface propType {
    lat: number,
    lon: number,
    setLat: (lat: number) => void,
    setLon: (lon: number) => void
}

const WeatherContext = createContext<propType>({
    lat: 0,
    lon: 0,
    setLat: () => { },
    setLon: () => { }
});

const DataProvider = ({ children }: PropsWithChildren) => {
    const [lat, setLat] = useState(5.9485);
    const [lon, setLon] = useState(80.5353);
    return (
        <WeatherContext.Provider value={{ lat, lon, setLat, setLon }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useData = () => useContext(WeatherContext);

export default DataProvider