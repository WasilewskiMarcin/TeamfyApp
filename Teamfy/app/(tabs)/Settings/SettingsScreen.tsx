import {  Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../Root'


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

