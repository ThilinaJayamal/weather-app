import { StyleSheet, Text, View, RefreshControl, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useData } from '@/Provider/DataProvider';

interface RootObject {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface Sys {
  pod: string;
}

interface Rain {
  '3h': number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export default function TabTwoScreen() {

  const { lat, lon } = useData();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadWeather();
  }, [lat, lon]);

  const [wheatherData, setWeatherData] = useState<RootObject>();

  const loadWeather = async () => {
    try {
      setLoad(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=486733c32c2e00228569bc9647459318&units=metric`);
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
    <SafeAreaView style={{ backgroundColor: '#FDFEFE', flex: 1, padding: 10 }}>

      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView refreshControl={
        <RefreshControl refreshing={load} onRefresh={onRefresh} colors={['blue']} />
      } showsVerticalScrollIndicator={false}>

        {
          load ? (
            <View style={{}}>
              <Text style={{ fontSize: 14 }}>Loading...</Text>
            </View>
          )
            :
            (
              <View style={{ gap: 20 }}>

                <View>
                  <Text style={{ fontSize: 24, fontWeight: 500,textAlign:'center' }}>Hourly Forecast </Text>
                  <Text style={{ fontSize: 18, fontWeight: 300,textAlign:'center' }}>{wheatherData?.city?.name}</Text>
                </View>

                {
                  wheatherData?.list.map((item, index) => (
                    <View key={index} style={{padding: 20}}>
                      <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: '#EBF5FB',padding:10, borderRadius: 20,
                        shadowColor: '#212F3C',
                        shadowOffset: {
                          width: 2,
                          height: 2
                        },
                        elevation: 2,
                        borderWidth:1,
                        borderColor:'#85C1E9',
                        gap:10
                      }}>
                        <Text style={{ fontSize: 18, fontWeight: 400 }}>{item.dt_txt.toString().substring(0, 10)}</Text>
                        <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png` }} width={150} height={150} />
                        <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.weather[0].main.toUpperCase()}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 300 }}>{item.weather[0].description.toUpperCase()}</Text>
                        <Text style={{ fontSize: 24, fontWeight: 600 }}>{item.main.temp.toFixed(0)} C</Text>
                        <Text style={{ fontSize: 18, fontWeight: 400 }}>{item.dt_txt.toString().substring(11)}</Text>
                      </View>
                    </View>
                  )
                  )
                }
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
