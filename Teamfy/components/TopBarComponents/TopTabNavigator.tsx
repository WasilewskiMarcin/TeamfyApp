import { View, Text } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import ProfileButton from '@/components/ProfileButton'
import { styles } from '@/styles/topNav.styles'

type TopTabNavigatorProps = {
	children: React.ReactNode
	button?: React.ReactNode // opcjonalny przycisk
	text?: string | React.ReactNode // opcjonalny przycisk
}

export default function TopTabNavigator({ children, button, text }: TopTabNavigatorProps) {
	return (
		<>
			<View>
				<View style={styles.header}>
					<View style={styles.profileButton}>{button || <ProfileButton />}</View>
					<Text style={styles.logoText}>{typeof text === 'string' || typeof text === 'undefined' ? text || 'Teamfy' : text}</Text>
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
