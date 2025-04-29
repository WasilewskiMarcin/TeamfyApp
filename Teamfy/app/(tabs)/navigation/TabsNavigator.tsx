// navigation/TabsNavigator.tsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../index'
import SettingsScreen from '../settings/index'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function TabsNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, size }) => <Ionicons name='settings' size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	)
}
