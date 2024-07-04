import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2ECC71',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle:{
          backgroundColor:'#fff',
          borderTopWidth:1,
          borderBlockColor:'#D5D8DC',
          shadowColor:'transparent',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Now',
          tabBarIcon: ({ color }) => <MaterialIcons name="now-widgets" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Forecast',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weather-partly-rainy" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
