import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

export default function Settings() {
	return (
		<View>
			<ScrollView contentContainerStyle={{ alignItems: 'stretch', gap: 15 }}>
				<TouchableOpacity>
					<Text style={{ textAlign: 'center' }}>Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={{ textAlign: 'center' }}>Account</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={{ textAlign: 'center' }}>Premium</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}
