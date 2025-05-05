import { StyleSheet} from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'

export const styles = StyleSheet.create({
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