import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type propType = {
    city: string,
    temp: string,
    feels: string,
    humidity: string,
    icon: string,
    main: string,
    desc: string
}

const MainCard = ({ city, temp, feels, humidity, icon, main, desc }: propType) => {
    return (
        <View style={{gap:20}}>

            <View style={{ marginVertical: 15 }}>
                <Text style={{ fontSize: 28, fontWeight: '500', textAlign: 'center' }}>Current Weather</Text>
                <Text style={{ fontSize: 22, fontWeight: '300', textAlign: 'center' }}>{city}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>

                <View>
                    <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} width={150} height={150} style={{ borderRadius: 75, backgroundColor: '#85C1E9' }} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'left' }}>{main}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'left' }}>{desc}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-end',paddingBottom:50}}>
                    <Text style={{ fontSize: 30, fontWeight: '500' }}>{temp}</Text>
                    <MaterialCommunityIcons name="temperature-celsius" size={36} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 30, padding: 10 }}>
                <View style={{
                    flex: 1, gap: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D6EAF8', padding: 10, borderRadius: 15,
                    shadowColor: '#212F3C',
                    shadowOffset: {
                        width: 2,
                        height: 2
                    },
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: '#85C1E9',
                }}>
                    <FontAwesome5 name="temperature-low" size={34} color="#B03A2E" />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 24, fontWeight: '500' }}>{feels}</Text>
                        <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" />
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Feels Like</Text>
                </View>

                <View style={{
                    flex: 1, gap: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D6EAF8', padding: 10, borderRadius: 15,
                    shadowColor: '#212F3C',
                    shadowOffset: {
                        width: 2,
                        height: 2
                    },
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: '#85C1E9',
                }}>
                    <Entypo name="drop" size={34} color="#2E86C1" />
                    <Text style={{ fontSize: 24, fontWeight: '500' }}>{humidity}%</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Humidity</Text>
                </View>
            </View>
        </View>
    )
}

export default MainCard