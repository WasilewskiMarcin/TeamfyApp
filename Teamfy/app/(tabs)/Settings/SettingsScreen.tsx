import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ProfileScreen from './ProfileScreen'

type RootStackParamList = {
	Navigation: undefined
	Profile: undefined
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator()
export default function SettingsScreen() {
	
	return (
		<View style={{ flex: 1 }}>
		
			<Stack.Navigator  screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Navigation' component={NavigationScreen} />
				<Stack.Screen name='Profile' component={ProfileScreen} />
			</Stack.Navigator>
		</View>
	)
}
function NavigationScreen() {
	const navigation = useNavigation<NavigationProp>()
	return (
		<ScrollView contentContainerStyle={{ alignItems: 'stretch', gap: 15, padding: 15 }}>
			<TouchableOpacity
				style={{ backgroundColor: 'grey' }}
				onPress={() => {
					navigation.navigate('Profile')
				}}>
				<Text style={{ textAlign: 'center', fontSize: 24 }}>Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={{ textAlign: 'center' }}>Account</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={{ textAlign: 'center' }}>Premium</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

