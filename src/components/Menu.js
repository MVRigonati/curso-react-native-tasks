import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import { DrawerItems } from 'react-navigation-drawer'

const styles = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderColor: '#DDD'
	},
	avatar: {
		height: 60,
		width: 60,
		borderWidth: 3,
		borderRadius: 30,
		margin: 50
	}
})

export default props => (
	<ScrollView>
		<View style={styles.header}>
			<Gravatar
				style={styles.avatar}
				options={{
					email: props.navigation.getParam('email'),
					secure: true
				}}
			/>
			<View style={styles.userInfo}>
				<Text>{props.navigation.getParam('name')}</Text>
				<Text>{props.navigation.getParam('email')}</Text>
			</View>
		</View>
		<DrawerItems {...props} />
	</ScrollView>
)
