import { StyleSheet } from 'react-native'
import { COLORS } from '@/constants/theme'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingTop: 12,
		height: 70,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	logoText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	logoutWrapper: {
		position: 'absolute',
		right: 14,
		top: 24,
		color: COLORS.primary,
	},
	profileButton: {
		position: 'absolute',
		left: 14,
		top: 24,
		color: COLORS.primary,
	},
	content: {
		flex: 1,
	},
})
