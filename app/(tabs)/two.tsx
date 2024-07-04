import { StyleSheet, Text, View, RefreshControl, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useData } from '@/Provider/DataProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ForecastCard from '@/components/ForecastCard';

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
    <SafeAreaView style={{ backgroundColor: '#FDFEFE', flex: 1}}>

      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView refreshControl={
        <RefreshControl refreshing={load} onRefresh={onRefresh} colors={['#85C1E9']} />
      } showsVerticalScrollIndicator={false}>

        {
          load ? (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
              <Text style={{ fontSize: 14,fontWeight:'400',color:'#2ECC71' }}>Loading...</Text>
            </View>
          )
            :
            (
              <View>

                <View style={{marginVertical:15}}>
                  <Text style={{ fontSize: 24, fontWeight: 500, textAlign: 'center' }}>Hourly Forecast </Text>
                  <Text style={{ fontSize: 18, fontWeight: 300, textAlign: 'center' }}>{wheatherData?.city?.name}</Text>
                </View>

                {
                  wheatherData?.list.map((item, index) => (
                    <ForecastCard key={index} hour={item.dt_txt.toString().substring(11)} temp={item.main.temp.toFixed(0)} date={item.dt_txt.toString().substring(0, 10)} icon={item.weather[0].icon} main={item.weather[0].main.toUpperCase()} desc={item.weather[0].description.toUpperCase()} />
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
