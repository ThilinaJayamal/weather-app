import React, { useContext, useState, useEffect, createContext, Children, PropsWithChildren } from 'react'

export const ForecastContext = createContext<apiDetailsList>({
    list: [{
        dt_txt: "",
        weather: [
            {
                main: '',
                icon: ''
            }
        ]
    }],
});

type apiDetailsList = {
    list: [{
        dt_txt: string;
        weather: [
            {
                main: string | null;
                icon: string | null;
            }
        ]
    }] | null,
}

const ForecastProvider = ({children}:PropsWithChildren) => {

    const [apiData, setApiData] = useState<apiDetailsList>({
        list: [{
            dt_txt: "",
            weather: [
                {
                    main: '',
                    icon: ''
                }
            ]
        }],
    })

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=5.9485&lon=80.5353&units=metric&appid=486733c32c2e00228569bc9647459318';

    useEffect(() => {
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
    }, [])
    return(
       <ForecastContext.Provider value={apiData}>
         {children}
       </ForecastContext.Provider>
    )
}

export default ForecastProvider

export const useAPI = () =>{
    return useContext(ForecastContext);
}