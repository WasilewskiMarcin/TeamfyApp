import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileButton() {
	// const navigation = useNavigation();
	// const goToProfile = () => {
	// 	navigation.navigate('Profile', { from: 'Index' }); // Przekazujemy parametr
	//   };
	return (
		<TouchableOpacity onPress={() => console.log('Profile Button Pressed')}>
			<Ionicons name='person-circle-outline' size={28} color='black' />
		</TouchableOpacity>
	)
}
