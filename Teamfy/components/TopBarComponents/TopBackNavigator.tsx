import { View, Text } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles } from '@/styles/topNav.styles'
export default function TopBackNavigator({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation()
	return (
		<>
			<View>
				<View style={styles.header}>
					<View style={styles.profileButton}>
						<TouchableOpacity
							onPress={() => {
								navigation.goBack()
							}}>
							<Text>Go Back</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.logoText}>Profile</Text>
					<View style={styles.logoutWrapper}>
						<SignOutButton />
					</View>
					<View style={styles.content}></View>
				</View>
			</View>
			{children}
		</>
	)
}
