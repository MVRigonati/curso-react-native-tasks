import React from 'react'
import {
	Text, View, StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-swipeable'
import comonStyles from '../commonStyles'
import 'moment/locale/pt-br'
import moment from 'moment'

const styles = StyleSheet.create({
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
	date: {
		fontFamily: comonStyles.fontFamily,
		color: comonStyles.colors.subTex,
		fontSize: 12
	},
	exclude: {
		flex: 1,
		backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	excludeSwipe: {
		flex: 1,
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 20
	},
	// [ {...this}, {} ],
	excludeText: {
		fontFamily: comonStyles.fontFamily,
		color: comonStyles.colors.secondary,
		fontSize: 20,
		margin: 10
	}
})

export default props => {
	const descStyle = {}

	const leftContent = (
		<View style={styles.exclude}>
			<Icon name='trash' size={20}
				color={comonStyles.colors.secondary} />
			<Text style={styles.excludeText}>Excluir</Text>
		</View>
	)

	const rightContent = [
		<TouchableOpacity
			style={styles.excludeSwipe} // exclude + justifyContent: 'flex-start', paddingLeft: 20
			onPress={() => props.onDelete(props.id)}>
			<Icon name='trash' size={30}
				color={comonStyles.colors.secondary} />
		</TouchableOpacity>
	]

	let check = <View style={styles.pending} />
	if (props.doneAt !== null) {
		descStyle.textDecorationLine = 'line-through'

		check = (
			<View style={styles.done}>
				<Icon name='check' size={20}
					color={comonStyles.colors.secondary} />
			</View>
		)
	}

	return (
		<Swipeable leftActionActivationDistance={200}
			onLeftActionActivate={() => props.onDelete(props.id)}
			leftContent={leftContent} rightButtons={rightContent}>
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
				<View style={styles.checkContainer}>{check}</View>
			</TouchableWithoutFeedback>
			<View>
				<Text style={[styles.description, descStyle]}>
					{props.desc}
				</Text>
				<Text style={styles.date}>
					{moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
				</Text>
			</View>
		</View>
		</Swipeable>
	)
}