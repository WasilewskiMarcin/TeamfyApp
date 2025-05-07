import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/app/Root'

export default function ProfileButton() {
	const navigation = useNavigation<NavigationProp>()
	// const goToProfile = () => {
	// 	navigation.navigate('Profile', { from: 'Index' }); // Przekazujemy parametr
	//   };
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Profile')
			}}>
			<Ionicons name='person-circle-outline' size={28} color='black' />
		</TouchableOpacity>
	)
}
