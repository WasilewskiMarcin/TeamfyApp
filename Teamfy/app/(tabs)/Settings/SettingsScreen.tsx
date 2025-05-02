import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
type RootStackParamList = {
	Navigation: undefined
	Profile: undefined
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator()
export default function Settings() {
	return (
		<View style={{ flex: 1 }}>
		
			<Stack.Navigator screenOptions={{ headerShown: false }}>
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
function ProfileScreen() {
	return (
		
		<View>
			<BackButton/>
			<Text>Hello</Text>

		</View>
	)
}

function BackButton(){
	return(
		<View>
		<TouchableOpacity style={
			{height: 30}
		}>
			<Text>
				Go back 
			</Text>
		</TouchableOpacity>
		
	</View>
	)
}
