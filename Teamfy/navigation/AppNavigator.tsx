import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Index from '../app/(tabs)/index' // Główny ekran
import Profile from '../app/(tabs)/settings/profile' // Ekran edycji profilu

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Tabs = () => (
	<Tab.Navigator>
		<Tab.Screen name='Home' component={Index} />
		{/* Dodaj inne zakładki */}
	</Tab.Navigator>
)

const AppNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name='Tabs' component={Tabs} />
			<Stack.Screen name='Profile' component={Profile} />
		</Stack.Navigator>
	</NavigationContainer>
)

export default AppNavigator
