import { View, StyleSheet } from 'react-native'
import TopBar from './TopBar'

export default function TopBackNavigator({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TopBar>
				<View style={{ flex: 1, backgroundColor: 'black' }}></View>
			</TopBar>
			{children}
		</>
	)
}

const style = StyleSheet.create({
	content: {
		flex: 1,
	},
})
