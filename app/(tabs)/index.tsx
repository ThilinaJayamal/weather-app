import Card from '@/components/Card';
import { useAPI } from '@/provider/ForecastProvider';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View} from 'react-native';
import { FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView} from 'react-native';
import Header from '@/components/Header';


export default function TabOneScreen() {
  

  const API_DATA = useAPI();
  const colorScheme = useColorScheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        <LinearGradient
          colors={['rgba(93, 173, 226,0.8)', 'transparent']}
          style={styles.background}
        />

        <Header></Header>
        <Text style={[styles.subtitle, { color: colorScheme === 'light' ? 'black' : 'white' }]}>Hourly Forecast</Text>
        <FlatList horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }} data={API_DATA.list} renderItem={({ item }) => (
          <Card text={item.weather[0].main} date={item.dt_txt} icon={item.weather[0].icon}></Card>
        )} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
  },
  image: {
    width: 150,
    height: 150
  },
  subscript: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
    color: '#1A5276'
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '400',
    textTransform: 'capitalize',
    marginVertical: 10,
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
    fontWeight: '300'
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
