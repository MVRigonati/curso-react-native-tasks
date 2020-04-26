import React, { Component } from 'react'
import { View, ActivityIndicator, AsyncStorage } from 'react-native'
import axios from 'axios'

import { screenRoutes } from '../common'

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000'
	}
}

export default class InitActions extends Component {
	componentDidMount = async () => {
		const userDataJson = await AsyncStorage.getItem('userData')

		try {
			let userData = null

			userData = JSON.parse(userDataJson)

			if (userData && userData.token) {
				axios.defaults.headers.common['Authorization'] = `bearer ${token}`
				this.props.navigation.navigate(screenRoutes.home, userData)
			} else {
				this.goToAuthorizationScreen()
			}
		} catch (ex) {
			this.goToAuthorizationScreen()
		}
	}

	goToAuthorizationScreen = () => {
		this.props.navigation.navigate(screenRoutes.auth)
	}

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		)
	}
}
