import React, { Component } from 'react'
import { loadCustomFont } from './src/commonStyles'
import Auth from './src/screens/Auth'

export default class App extends Component {
	componentDidMount() {
		loadCustomFont()
	}

	render() {
		return <Auth />
	}
}
