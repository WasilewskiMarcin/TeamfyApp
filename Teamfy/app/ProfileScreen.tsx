import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import TopBackNavigator from '@/components/TopBarComponents/TopBackNavigator'
import { COLORS } from '@/constants/theme'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import ImagePickerComponent from '@/components/ImagePicker'

export default function ProfileScreen() {
	const { user } = useUser()
	
	const [showImagePicker, setShowImagePicker] = useState(false)

	const handleImagePicked = async (uri: string) => {
		setShowImagePicker(false)
		try {
			await user?.update({
				unsafeMetadata: {
					imageUrl: uri,
				},
			})
			console.log('Zaktualizowano zdjęcie profilowe.')
		} catch (error) {
			console.error('Błąd przy aktualizacji zdjęcia profilowego:', error)
		}
	}

	const onAvatarPress = () => {
	Alert.alert(
		'Profile Picture',
		'What would you like to do with this picture?',
		[
			{
				text: 'Change Picture',
				onPress: () => setShowImagePicker(true),
			},
			{
				text: 'Remove Picture',
				onPress: () => removeProfilePicture(),
				style: 'destructive',
			},
			{
				text: 'Cancel',
				style: 'cancel',
			},
		],
		{ cancelable: true }
	)
}
	const removeProfilePicture = async () => {
		try {
			await user?.update({
				unsafeMetadata: {
					imageUrl: null,
				},
			})

			console.log('Usunięto zdjęcie profilowe.')
		} catch (error) {
			console.error('Błąd przy usuwaniu zdjęcia profilowego:', error)
		}
	}

	return (
		<TopBackNavigator>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={onAvatarPress}>
						<Image
							source={
								typeof user?.unsafeMetadata?.imageUrl === 'string'
									? { uri: user.unsafeMetadata.imageUrl }
									: { uri: user?.imageUrl }
							}
							style={styles.avatar}
							contentFit='cover'
						/>
					</TouchableOpacity>
				</View>

				{showImagePicker && <ImagePickerComponent onImagePicked={handleImagePicked} style={styles.picker} />}
			</View>
		</TopBackNavigator>
	)
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
		//iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		//Android
		elevation: 5,
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
	picker: {
		marginTop: 20,
	},
})
