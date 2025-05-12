import { View, Text, StyleSheet, Touchable, Alert } from 'react-native'
import React from 'react'
import TopBackNavigator from '@/components/TopBarComponents/TopBackNavigator'
import { COLORS } from '@/constants/theme'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native'
export default function ProfileScreen() {
	const { user } = useUser()
	return (
		<TopBackNavigator>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							onAvatarPress()
						}}>
						<Image source={{ uri: user?.imageUrl }} style={styles.avatar} contentFit='cover' />
					</TouchableOpacity>
				</View>
			</View>
		</TopBackNavigator>
	)
}
function onAvatarPress() {
	Alert.alert(
		'Edytuj zdjęcie profilowe',
		'Co chcesz zrobić z tym zdjęciem?',
		[
			{
				text: 'Zmień zdjęcie',
				onPress: () => changeProfilePicture(),
			},
			{
				text: 'Usuń zdjęcie',
				onPress: () => removeProfilePicture(),
				style: 'destructive',
			},
			{
				text: 'Anuluj',
				style: 'cancel',
			},
		],
		{ cancelable: true }
	)
}
const changeProfilePicture = () => {
	// Przykładowa logika zmiany zdjęcia
	console.log('Zmieniam zdjęcie profilowe.')
	// Tutaj można dodać kod do zmiany zdjęcia, np. z użyciem kamery lub galerii.
}

// Funkcja do usuwania zdjęcia (zaktualizowanie zdjęcia w Clerk na brak zdjęcia)
const removeProfilePicture = () => {
	// Przykładowa logika usuwania zdjęcia
	console.log('Usuwam zdjęcie profilowe.')
	// Ustawienie na domyślne zdjęcie lub brak zdjęcia
	// setUser({ ...user, imageUrl: null }) // Jeśli chcesz zaktualizować użytkownika
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	header: {
		padding: 5,
		marginTop: 10,
		width: '95%',
		height: 200,
		backgroundColor: COLORS.background,
		borderRadius: 10,
		marginBottom: 20,

		// iOS shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		// Android shadow
		elevation: 5,

		// optional border
		borderWidth: 1.2,
		borderColor: '#ccc',
	},
	avatar: {
		width: 86,
		height: 86,
		left: 5,
		top: 5,
		borderRadius: 43,
		borderWidth: 2,
		borderColor: COLORS.grey,
	},
})
