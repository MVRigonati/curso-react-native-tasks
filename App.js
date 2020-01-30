import React, { Component } from 'react'
import { loadCustomFont } from './src/commonStyles'
import Agenda from './src/screens/Agenda'

export default class App extends Component {
	componentDidMount() {
		loadCustomFont()
	}

	render() {
		return (
			<Agenda />
		)
	}
}
