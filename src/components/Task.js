import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import comonStyles from '../commonStyles'
import 'moment/locale/pt-br'
import moment from 'moment'

const styles = {
	container: {
		paddingVertical: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#AAA'
	},
	checkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%'
	},
	pending: {
		borderWidth: 1,
		height: 25,
		width: 25,
		borderRadius: 15,
		borderColor: '#555'
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 15,
		backgroundColor: '#4D7031',
		alignItems: 'center',
		justifyContent: 'center'
	},
	description: {
		fontFamily: comonStyles.fontFamily,
		color: comonStyles.colors.mainText,
		fontSize: 15
	},
	date: {
		fontFamily: comonStyles.fontFamily,
		color: comonStyles.colors.subTex,
		fontSize: 12
	},
	iconDone: comonStyles.colors.secondary
}

export default props => {
	const descStyle = {}
	let check = <View style={styles.pending} />
	if (props.doneAt !== null) {
		descStyle.textDecorationLine = 'line-through'
		
		check = (
			<View style={styles.done}>
				<Icon name='check' size={20}
					color={styles.iconDone} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.checkContainer}>{check}</View>
			<View>
				<Text style={[styles.description, descStyle]}>
					{props.desc}
				</Text>
				<Text style={styles.date}>
					{moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
				</Text>
			</View>
		</View>
	)
}