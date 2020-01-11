import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import commonStyles, { loadCustomFont } from './src/commonStyles';

export default class App extends Component {

	componentDidMount() {
		loadCustomFont()
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Open up App.js to start working on your app!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	welcome: {
		fontFamily: commonStyles.fontFamily
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
