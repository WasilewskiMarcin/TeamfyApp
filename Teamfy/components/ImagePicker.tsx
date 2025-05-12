import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

type ImagePickerProps = {
	onImagePicked: (uri: string) => void
	style?: object
}

const ImagePickerComponent = ({ onImagePicked, style }: ImagePickerProps) => {
	const [hasPermission, setHasPermission] = useState<boolean>(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	// Poproś o uprawnienia do galerii
	useEffect(() => {
		const getPermissions = async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getPermissions()
	}, [])

	// Funkcja do wybierania zdjęcia z galerii
	const pickImage = async () => {
		if (!hasPermission) {
			Alert.alert('Permission required', 'We need access to your gallery to pick an image.')
			return
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'], // Używamy tablicy 'image' zamiast MediaTypeOptions.Images
			allowsEditing: true,
			aspect: [1, 1], // Proporcje obrazu
			quality: 0.8, // Najlepsza jakość
		})

		if (!result.canceled) {
			const uri = result.assets[0].uri
			setSelectedImage(uri)
			onImagePicked(uri) // Wywołaj funkcję przekazaną jako prop
		}
	}
	useEffect(() => {
		if (hasPermission) {
			pickImage() // Teraz wywołujemy pickImage tylko, jeśli uprawnienia są przyznane
		}
	}, [hasPermission]) // Zależy od hasPermission, więc będzie wywoływane, gdy permission będzie "granted"

	return (
		<View style={[styles.container, style]}>
			<View style={styles.circleContainer}>
				{/* Jeśli obraz został wybrany, wyświetlamy go */}
				{selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#1E90FF',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	image: {
		marginTop: 20,
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	circleContainer: {
		width: 100,
		height: 100,
		borderRadius: 50, // Tworzymy kształt koła
		overflow: 'hidden', // Ukrycie części obrazu, która wykracza poza kształt koła
		marginTop: 20,
	},
})

export default ImagePickerComponent
