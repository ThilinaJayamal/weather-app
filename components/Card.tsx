import { View, Text, StyleSheet,Image, useColorScheme } from 'react-native'
import React, { useState } from 'react'

type propText = {
    text:string | null,
    date:string | null,
    icon:string | null
}

const Card = ({text,date,icon }:propText) => {

    const dataTime= date || "0000-00-00 00:00:00";
    const forecastDate = dataTime.slice(0,10);
    const forecastTime = dataTime.slice(11);

    const colorScheme = useColorScheme();

    return (
        <View style={styles.card}>
            <Text style={[styles.cardText,{color: colorScheme === 'light' ?'black' :'white'}]}>{forecastTime}</Text>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} style={{width:80,aspectRatio:1}} />
            <Text style={[styles.cardText,{color: colorScheme === 'light' ?'black' :'white'}]}>{text}</Text>
            <Text style={[styles.cardText,{color: colorScheme === 'light' ?'black' :'white'}]}>{forecastDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center',
        width: 130,
        height: 160,
    },
    cardText:{
        fontSize:14,
        fontWeight:'300'
    }
})

export default Card