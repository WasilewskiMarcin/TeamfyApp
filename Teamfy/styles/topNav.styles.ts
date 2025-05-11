import { StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 12,
        height:70,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    logoutWrapper: {
        position: 'absolute',
        right: 14,
        top: 24,
    },
    profileButton: {
        position: 'absolute',
        left: 14,
        top: 26,
    },
    content: {
        flex: 1,
    },
})