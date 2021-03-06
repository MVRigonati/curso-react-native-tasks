import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		borderColor: '#EEE',
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		flex: 1,
		color: '#333',
		paddingLeft: 15
	},
	input: {
		flex: 7,
		width: '70%'
	}
})

export default props => {
	return (
		<View style={[styles.container, props.style]}>
			<Icon name={props.icon} size={20} style={styles.icon} />
			<TextInput {...props} style={styles.input} />
		</View>
	)
}
