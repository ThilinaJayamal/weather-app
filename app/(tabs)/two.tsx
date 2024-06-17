import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';


export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={{marginTop:100}}>
        <Text style={styles.subtitle}>powered by Thilina Jayamal</Text>
        <Text style={styles.subtitle}>version : 1.0.0</Text>
        <Text style={styles.subtitle}>contact us : +94-75-9622397</Text>
        <Text style={styles.subtitle}>used technology : React Native & Open Weather API</Text>
        <Text style={styles.subtitle}>API : Open Weather API</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    lineHeight:40
  },
  textBtn: {
    marginTop: 20,
    backgroundColor: Colors.light.tint,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center'
  }
});
