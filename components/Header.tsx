import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View, Image } from 'react-native';
import { ScrollView} from 'react-native';
import { useCurrent } from '@/provider/CurrentProvider';


const Header = () => {

    const apiData = useCurrent();

    const colorScheme = useColorScheme();
    return (
        <ScrollView style={styles.block}>
            <Text style={[styles.title, { color: colorScheme === 'light' ? 'black' : 'white' }]}>Current Weather</Text>
            <Text style={[styles.city, { color: colorScheme === 'light' ? 'black' : 'white' }]}>{apiData.name} {apiData.sys.country}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png` }} style={styles.image} />
                <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'white', borderRadius: 15 }}>
                    <Text style={{ fontSize: 40, fontWeight: 600, color: '#1A5276' }}>{apiData.main.temp.toFixed(0)}</Text>
                    <Text style={styles.subscript}>o</Text>
                    <Text style={{ fontSize: 40, fontWeight: 600, color: '#1A5276' }}>C</Text>
                </View>

            </View>

            <Text style={[styles.subtitle, { color: colorScheme === 'light' ? 'black' : 'white' }]}>{apiData.weather[0].main}</Text>
            <Text style={[{ color: colorScheme === 'light' ? 'black' : 'white' ,textAlign:'center'}]}>{apiData.weather[0].description}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', marginVertical: 20 }}>

                <View style={styles.card}>
                    <Image source={require("../assets/images/hot.png")} style={styles.icon} />
                    <Text style={styles.cardText}>{apiData.main.feels_like}</Text>
                    <Text style={styles.cardText}>Feels Like</Text>
                </View>

                <View style={styles.card}>
                    <Image source={require("../assets/images/humidity.png")} style={styles.icon} />
                    <Text style={styles.cardText}>{apiData.main.humidity}%</Text>
                    <Text style={styles.cardText}>Humidity</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Header

const styles = StyleSheet.create({
    block: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    title: {
        fontSize: 28,
        fontWeight: '400',
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 150
    },
    subscript: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 5,
        color: '#1A5276',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '400',
        textTransform: 'capitalize',
        marginVertical: 10,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#2980B9',
        width: '40%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    icon: {
        width: 35,
        height: 35,
        marginVertical: 5
    },
    cardText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },
    city: {
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center'
    },
    selectCity: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 20,
        marginBottom: 20
    }
});
