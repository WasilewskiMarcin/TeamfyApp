// navigation/AppNavigator.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabsNavigator from './TabsNavigator'
import ProfileScreen from '../settings/profile'

const Stack = createStackNavigator()

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Tabs' component={TabsNavigator} />
				<Stack.Screen name='Profile' component={ProfileScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
