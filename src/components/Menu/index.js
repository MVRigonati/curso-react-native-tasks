import React from 'react'
import { ScrollView, View, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import { screenRoutes } from '../../common'
import styles from './styles'

export default props => {
	const logout = () => {
		delete axios.defaults.headers.common['Authorization']
		AsyncStorage.removeItem('userData')
		props.navigation.navigate(screenRoutes.initActions)
	}

	return (
		<ScrollView>
			<View style={styles.header}>
				<Text style={styles.title}>Tasks</Text>
				<Gravatar
					style={styles.avatar}
					options={{
						email: props.navigation.getParam('email'),
						secure: true
					}}
				/>
				<View>
					<Text style={styles.name}>{props.navigation.getParam('name')}</Text>
					<Text style={styles.email}>{props.navigation.getParam('email')}</Text>
				</View>
				<TouchableOpacity style={styles.logoutIcon} onPress={logout}>
					<Icon name="sign-out" size={30} color="#800" />
				</TouchableOpacity>
			</View>
			<DrawerItems {...props} />
		</ScrollView>
	)
}
