import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import SplashScreen from '../components/SplashScreen'
import HomeScreen from '../screens/HomeScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import MyListScreen from '../screens/MyListScreen'
import DownloadsScreen from '../screens/DownloadsScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Discover') {
            iconName = 'explore';
          } else if (route.name === 'MyList') {
            iconName = 'video-library';
          } else if (route.name === 'Downloads') {
            iconName = 'download';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5b13ec',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: {
          backgroundColor: '#161022',
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Discover' component={DiscoverScreen} />
        <Tab.Screen name='MyList' component={MyListScreen} />
        <Tab.Screen name='Downloads' component={DownloadsScreen} />
        <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
