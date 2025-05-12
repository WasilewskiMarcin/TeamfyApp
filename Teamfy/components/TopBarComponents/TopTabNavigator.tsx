import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '@/styles/topNav.styles'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'

type TopTabNavigatorProps = {
	children: React.ReactNode
	leftbutton?: React.ReactNode 
	rightbutton?: React.ReactNode 
	text?: string | React.ReactNode 
}

export default function TopTabNavigator({ children, leftbutton, rightbutton, text }: TopTabNavigatorProps) {
	const insets = useSafeAreaInsets()
	const colorScheme = useColorScheme()
	return (
		<>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
			<View style={{ paddingTop: insets.top, backgroundColor: '#fff' }}>
				<View style={styles.header}>
					<View style={styles.profileButton}>{leftbutton}</View>
					<Text style={styles.logoText}>{text}</Text>
					<View style={styles.logoutWrapper}>{rightbutton}</View>
					<View style={styles.content}></View>
				</View>
			</View>
			{children}
		</>
	)
}
