import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export const CurrentContext = createContext<apiType>({
    coord: {
        lon: 0,
        lat: 0
    },
    weather: [
        {
            id: 0,
            main: '',
            description: '',
            icon: ''
        }
    ],
    base: '',
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0
    },
    visibility: 0,
    wind: {
        speed: 0,
        deg: 0,
        gust: 0
    },
    clouds: {
        all: 0
    },
    dt: 0,
    sys: {
        country: '',
        sunrise: 0,
        sunset: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
});;

type apiType = {
    coord: {
        lon: Float,
        lat: Float
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: Float,
        feels_like: Float,
        temp_min: Float,
        temp_max: Float,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: Float,
        deg: number,
        gust: Float
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

const CurrentProvider = ({ children }: PropsWithChildren) => {

    const [apiData, setApiData] = useState<apiType>({
        coord: {
            lon: 0,
            lat: 0
        },
        weather: [
            {
                id: 0,
                main: '',
                description: '',
                icon: ''
            }
        ],
        base: '',
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0
        },
        visibility: 0,
        wind: {
            speed: 0,
            deg: 0,
            gust: 0
        },
        clouds: {
            all: 0
        },
        dt: 0,
        sys: {
            country: '',
            sunrise: 0,
            sunset: 0
        },
        timezone: 0,
        id: 0,
        name: '',
        cod: 0
    });

    useEffect(() => {

        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=5.9485&lon=80.5353&units=metric&appid=486733c32c2e00228569bc9647459318';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(userData => {
                setApiData(userData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <CurrentContext.Provider value={apiData}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentProvider

export const useCurrent = () => useContext(CurrentContext);