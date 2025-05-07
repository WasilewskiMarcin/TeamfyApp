import { View } from 'react-native'
import { styles } from '@/styles/topNav.styles'

export default function TopBar({ children }: { children: React.ReactNode }) {
	return (
		<>
			<View>
				<View style={styles.header}>{children}</View>
			</View>
		</>
	)
}
