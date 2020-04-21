import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import { DrawerItems } from 'react-navigation-drawer'

import styles from './styles'

export default props => (
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
		</View>
		<DrawerItems {...props} />
	</ScrollView>
)
