import { View, StyleSheet, SafeAreaView, Text } from 'react-native'

import { SignOutButton } from '@/components/SignOutButton'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import ProfileButton from '@/components/ProfileButton'

export default function Main() {
	return (
		<View>
			<View style={styles.header}>
				<View style={styles.profileButton}>
					<ProfileButton />
				</View>
				<Text style={styles.logoText}>Teamfy</Text>
				<View style={styles.logoutWrapper}>
					<SignOutButton />
				</View>
			</View>

			<View style={styles.content}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: responsiveWidth(3.5),
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	logoText: {
		fontSize: responsiveFontSize(3.5),
		fontWeight: 'bold',
	},
	logoutWrapper: {
		position: 'absolute',
		right: responsiveWidth(4),
		top: responsiveHeight(3),
	},
	profileButton: {
		position: 'absolute',
		left: responsiveWidth(4),
		top: responsiveHeight(3),
	},
	content: {
		flex: 1,
	},
})
