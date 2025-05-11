import { View, Text } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import ProfileButton from '@/components/ProfileButton'
import { styles } from '@/styles/topNav.styles'

export default function TopTabNavigator({ children }: { children: React.ReactNode }) {
	return (
		<>
			<View>
				<View style={styles.header}>
					<View style={styles.profileButton}>
						<ProfileButton />
					</View>
					<Text style={styles.logoText}>Teamfy</Text>
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
