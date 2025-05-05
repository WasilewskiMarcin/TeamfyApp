import { View , Text} from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import ProfileButton from '@/components/ProfileButton'
import {styles }from '@/styles/topNav.styles'

export default function TopNavigator() {
return (
        <View>
            <View style={styles.header}>
                <View style={styles.profileButton}>
                    <ProfileButton />
                </View>
                <Text style={styles.logoText}>Teamfy</Text>
                <View style={styles.logoutWrapper}>
                    <SignOutButton />
                </View>
            </View>

            <View style={styles.content}></View>
        </View>
    )
}
