import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native'
import TopBackNavigator from '@/components/TopBarComponents/TopBackNavigator'
import { COLORS } from '@/constants/theme'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import ImagePickerComponent from '@/components/ImagePicker'
import { Ionicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
export default function ProfileScreen() {
	const { user, isLoaded } = useUser()
	const convexUser = useQuery(api.users.getUserByClerkId, { clerkId: user?.id || '' })
	const updateUser = useMutation(api.users.updateUser)
	const [showImagePicker, setShowImagePicker] = useState(false)

	const [newUsername, setNewUsername] = useState('')
	const [newBio, setNewBio] = useState('')
	const [infoModalVisible, setInfoModalVisible] = useState(false)
	const [showPasswordFields, setShowPasswordFields] = useState(false)
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const handleUpdateUser = async () => {
		try {
			await updateUser({
				clerkId: user?.id || '',
				username: newUsername,
				bio: newBio,
			})
			setInfoModalVisible(false)
		} catch (error) {
			console.error('Błąd przy aktualizacji użytkownika:', error)
			Alert.alert('Błąd', 'Nie udało się zaktualizować profilu.')
		}
	}
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

	if (!isLoaded || !user) {
		return <Text>Loading...</Text>
	}
	return (
		<TopBackNavigator>
			<View style={styles.container}>
				<View style={{ ...styles.sectionContainer, ...styles.profileContainer }}>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: 100 }}>
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

						{/* <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 10 }}>
							<TouchableOpacity style={{ ...styles.infoSectionModalBtn, width: '100%' }}>
								<Text style={{ fontSize: 12, color: COLORS.primary }}>Select avatar</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ ...styles.infoSectionModalBtn, width: '100%' }}>
								<Text style={{ fontSize: 12, color: COLORS.primary }}>Select frame</Text>
							</TouchableOpacity>
						</View> */}
					</View>

					<View style={styles.infoContainer}>
						<ScrollView style={{ maxHeight: '95%' }}>
							<View style={styles.infoSection}>
								<Text style={styles.label}>USERNAME</Text>
								<Text style={styles.infoText}>{convexUser?.username ?? 'Loading...'}</Text>
								<View style={styles.divider} />

								<Text style={styles.label}>EMAIL</Text>
								<Text style={styles.infoText}>{user?.primaryEmailAddress?.emailAddress}</Text>
								<View style={styles.divider} />

								<Text style={styles.label}>BIO</Text>

								<Text style={styles.infoText}>{convexUser?.bio ?? 'No bio yet'}</Text>
							</View>
						</ScrollView>
						<TouchableOpacity
							onPress={() => setInfoModalVisible(true)}
							style={{ position: 'absolute', right: 10, top: 10, gap: 5 }}>
							<View style={styles.infoSectionModalBtn}>
								<Ionicons name='pencil' size={20} color={COLORS.primary} />
							</View>
						</TouchableOpacity>
						<Modal
							visible={infoModalVisible}
							transparent={true}
							animationType='fade'
							onRequestClose={() => setInfoModalVisible(false)}>
							<TouchableWithoutFeedback onPress={() => setInfoModalVisible(false)}>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: 'rgba(0,0,0,0.2)',
									}}>
									<TouchableWithoutFeedback onPress={() => {}}>
										<View style={{ width: '90%', backgroundColor: COLORS.background, padding: 20, borderRadius: 10 }}>
											<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit Profile</Text>
											<Text style={{ fontSize: 14, color: '#888', marginBottom: 5 }}>Username</Text>
											<TextInput
												placeholder={convexUser?.username ?? 'Loading...'}
												value={newUsername}
												onChangeText={setNewUsername}
												style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 }}
											/>
											<Text style={{ fontSize: 14, color: '#888', marginBottom: 5 }}>BIO:</Text>
											<TextInput
												placeholder={convexUser?.bio ?? 'No bio yet'}
												value={newBio}
												onChangeText={setNewBio}
												style={{ borderWidth: 1, height: 100, marginBottom: 10, padding: 8, borderRadius: 5 }}
												multiline={true}
												textAlignVertical='top'
											/>
											{!showPasswordFields ? (
												<TouchableOpacity
													onPress={() => setShowPasswordFields(true)}
													style={{
														backgroundColor: COLORS.primary,
														padding: 10,
														borderRadius: 5,
														alignItems: 'center',
														marginBottom: 10,
													}}>
													<Text style={{ color: '#fff' }}>Zmień hasło</Text>
												</TouchableOpacity>
											) : (
												<>
													<Text style={{ fontSize: 14, color: '#888', marginBottom: 5 }}>Stare hasło</Text>
													<TextInput
														placeholder='Old password'
														secureTextEntry
														value={oldPassword}
														onChangeText={setOldPassword}
														style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 }}
													/>
													<Text style={{ fontSize: 14, color: '#888', marginBottom: 5 }}>Nowe hasło</Text>
													<TextInput
														placeholder='New password'
														secureTextEntry
														value={newPassword}
														onChangeText={setNewPassword}
														style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 }}
													/>
													<TouchableOpacity
														onPress={() => setShowPasswordFields(false)}
														style={{
															backgroundColor: '#ccc',
															padding: 8,
															borderRadius: 5,
															alignItems: 'center',
															marginBottom: 10,
														}}>
														<Text style={{ color: '#333' }}>Cancel password change</Text>
													</TouchableOpacity>
												</>
											)}
											<TouchableOpacity
												onPress={handleUpdateUser}
												style={{
													backgroundColor: COLORS.primary,
													padding: 10,
													borderRadius: 5,
													alignItems: 'center',
												}}>
												<Text style={{ color: '#fff' }}>Save changes</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => {
													setInfoModalVisible(false)
													setNewUsername('')
													setNewBio('')
												}}
												style={{
													marginTop: 5,
													backgroundColor: COLORS.primary,
													padding: 10,
													borderRadius: 5,
													alignItems: 'center',
												}}>
												<Text style={{ color: '#fff' }}>Cancel</Text>
											</TouchableOpacity>
										</View>
									</TouchableWithoutFeedback>
								</View>
							</TouchableWithoutFeedback>
						</Modal>
					</View>
				</View>
				<View style={{ ...styles.sectionContainer, ...styles.statsContainer }}></View>

				{showImagePicker && <ImagePickerComponent onImagePicked={handleImagePicked} style={styles.picker} />}
			</View>
		</TopBackNavigator>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 6,
	},
	infoSectionModalBtn: {
		width: 30,
		height: 30,
		borderRadius: 10,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 5,
	},
	sectionContainer: {
		width: '95%',
		backgroundColor: COLORS.background,
		borderRadius: 10,
		padding: 5,
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
	profileContainer: {
		flexDirection: 'row',
		height: 200,
	},
	statsContainer: {
		marginTop: 5,
		height: 400,
	},
	avatar: {
		width: 90,
		height: 90,
		top: 5,
		borderRadius: 45,
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
		// backgroundColor: COLORS.surfaceLight,
		// marginTop: 10,
	},
	infoSection: {
		width: '100%',
		paddingHorizontal: 15,
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
