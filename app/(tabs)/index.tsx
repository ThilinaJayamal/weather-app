import { StyleSheet, Text, View, RefreshControl, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

interface RootObject {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

const districtsInSriLanka = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya"
];


export default function TabOneScreen() {
  const [district, setDistrict] = useState('Matara');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadWeather();
  }, [district]);

  const [wheatherData, setWeatherData] = useState<RootObject>();

  const loadWeather = async () => {
    try {
      setLoad(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=486733c32c2e00228569bc9647459318&units=metric`);
      if (!response.ok) {
        console.log("error");
        setLoad(false);
      }

      const data = await response.json();
      setWeatherData(data);
      setLoad(false);
    }
    catch (err) {
      return;
    }
  }

  const onRefresh = () => {
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 2000)
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

      <ScrollView refreshControl={
        <RefreshControl refreshing={load} onRefresh={onRefresh} colors={['blue']} />
      } style={{}}>

        <ScrollView horizontal={true}>
          {
            districtsInSriLanka.map((item,index) => (
              <View key={index}>
                <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 10 }} onPress={() => setDistrict(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        {
          load ? (
            <View style={{}}>
              <Text style={{ fontSize: 24 }}>Loading...</Text>
            </View>
          )
            :
            (
              <View>
                <Text style={{ color: 'red' }} >{wheatherData?.name}</Text>
                <Text style={{ color: 'red' }} >{wheatherData?.clouds?.all}</Text>
              </View>
            )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
