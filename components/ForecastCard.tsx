import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type typeProp = {
    date: string,
    temp: string,
    hour: string,
    icon: string,
    main: string,
    desc: string
}

const ForecastCard = ({ date, temp, hour, icon, main, desc }: typeProp) => {
    return (
        <View style={{ padding: 20 }}>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#EBF5FB', padding: 10, borderRadius: 20,
                shadowColor: '#212F3C',
                shadowOffset: {
                    width: 2,
                    height: 2
                },
                elevation: 2,
                borderWidth: 1,
                borderColor: '#85C1E9',
                gap: 15
            }}>

                <Text style={{ fontSize: 18, fontWeight: 400 }}>{date}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} width={150} height={150} style={{ borderRadius: 75, backgroundColor: '#85C1E9' }} />

                <View style={{ flex: 1, flexDirection: 'row', gap: 50, alignItems: 'flex-end' }}>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 400 }}>{main}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 300 }}>{desc}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
                        <Text style={{ fontSize: 30, fontWeight: 600 }}>{temp}</Text>
                        <MaterialCommunityIcons name="temperature-celsius" size={36} color="black" />
                    </View>

                </View>

                <Text style={{ fontSize: 18, fontWeight: 400 }}>{hour}</Text>

            </View>
        </View>
    )
}

export default ForecastCard