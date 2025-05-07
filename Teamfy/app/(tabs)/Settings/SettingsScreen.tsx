import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '@/app/ProfileScreen'
// import { NavigationProp } from '../../Root'
export type RootStackParamList = {
	Settings: undefined
	Profile: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator()


// export default function SettingsNavigator() {
// 	return (
// 		<Stack.Navigator screenOptions={{ headerShown: false }}>
// 			<Stack.Screen name='Settings' component={SettingsScreen} />
// 			<Stack.Screen name='Profile' component={ProfileScreen} />
// 		</Stack.Navigator>
// 	)
// }
export default function SettingsScreen() {
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
