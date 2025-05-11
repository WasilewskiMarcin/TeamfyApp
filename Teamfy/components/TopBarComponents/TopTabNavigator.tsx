import { View, Text } from 'react-native'

import { styles } from '@/styles/topNav.styles'

type TopTabNavigatorProps = {
	children: React.ReactNode
	leftbutton?: React.ReactNode // opcjonalny przycisk
	rightbutton?: React.ReactNode // opcjonalny przycisk
	text?: string | React.ReactNode // opcjonalny przycisk
}

export default function TopTabNavigator({ children, leftbutton, rightbutton, text }: TopTabNavigatorProps) {
	return (
		<>
			<View>
				<View style={styles.header}>
					<View style={styles.profileButton}>{leftbutton}</View>
					<Text style={styles.logoText}>{ text}</Text>
					<View style={styles.logoutWrapper}>
						{rightbutton}
					</View>
					<View style={styles.content}></View>
				</View>
			</View>
			{children}
		</>
	)
}
