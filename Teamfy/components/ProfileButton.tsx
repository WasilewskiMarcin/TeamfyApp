import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileButton() {
	return (
		<TouchableOpacity onPress={() => console.log('Profile Button Pressed')}>
			<Ionicons name='person-circle-outline' size={28} color='black' />
		</TouchableOpacity>
	)
}
