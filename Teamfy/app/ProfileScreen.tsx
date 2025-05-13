import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native'
import TopBackNavigator from '@/components/TopBarComponents/TopBackNavigator'
import { COLORS } from '@/constants/theme'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import ImagePickerComponent from '@/components/ImagePicker'
import { useEffect } from 'react'
export default function ProfileScreen() {
	const { user, isLoaded } = useUser()

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
	// useEffect(() => {
	// 	console.log('Użytkownik:', JSON.stringify(user, null, 2))
	// }, [user])
	if (!isLoaded || !user) {
		return <Text>Loading...</Text>
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
					<View style={styles.infoContainer}>
						<View style={styles.infoSection}>
				
							<Text style={styles.label}>USERNAME</Text>
							<Text style={styles.infoText}>{user?.unsafeMetadata.username as string }</Text>
							<View style={styles.divider} />

							<Text style={styles.label}>EMAIL</Text>
							<Text style={styles.infoText}>{user?.primaryEmailAddress?.emailAddress}</Text>
							<View style={styles.divider} />


							<Text style={styles.label}>ID</Text>
							<Text style={styles.infoText}>{user?.id}</Text>
							<View style={styles.divider} />
						</View>
					</View>
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
		flexDirection: 'row',
		gap: 20,
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
	infoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	infoSection: {
		width: '100%',
		paddingHorizontal: 20,
	},
	label: {
		fontSize: 14,
		color: '#888',
	},
	infoText: {
		fontSize: 14,
		color: '#000',
	},
	divider: {
		height: 1,
		backgroundColor: '#e0e0e0',
		marginVertical: 5,
	},
})
