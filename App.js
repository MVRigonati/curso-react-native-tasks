import * as Font from 'expo-font'
import React, { Component } from 'react'
import Auth from './src/screens/Auth'
import { AppLoading } from 'expo'

export default class App extends Component {
	state = {
		showLoadingScreen: true
	}

	loadCustomFont = async () => {
		await Font.loadAsync({
			lato: require('./assets/fonts/Lato.ttf')
		})
	}

	loadingScreen = () => {
		return (
			<AppLoading
				onError={console.warn}
				startAsync={this.loadCustomFont}
				onFinish={() => this.setState({ showLoadingScreen: false })}
			/>
		)
	}

	render = () => {
		let resultPage
		if (this.state.showLoadingScreen) {
			resultPage = this.loadingScreen()
		} else {
			resultPage = <Auth />
		}
		return resultPage
	}
}
