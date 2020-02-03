import React from 'react'
import {
	Text, View, StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import comonStyles from '../commonStyles'
import 'moment/locale/pt-br'
import moment from 'moment'

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#AAA',
		backgroundColor: '#FFF'
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
	excludeText: {
		fontFamily: comonStyles.fontFamily,
		color: comonStyles.colors.secondary,
		fontSize: 20,
		margin: 10
	},
	rightSwipe: {
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
	},
	leftSwipe: {
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center'
	},
	deleteText: {
		fontFamily: comonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20,
		margin: 10
	},
	deleteIcon: {
		marginLeft: 10
	}
})

export default props => {
	const descStyle = {}

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

	const getRightActions = () => {
		return (
			<TouchableOpacity style={styles.rightSwipe}
				onPress={() => props.onDelete(props.id)}>
				<Icon name='trash' size={30} color='#FFF' />
			</TouchableOpacity>
		)
	}

	const getLeftActions = () => {
		return (
			<View style={styles.leftSwipe}>
				<Icon name='trash' style={styles.deleteIcon}
					size={20} color='#FFF' />
				<Text style={styles.deleteText}>Excluir</Text>
			</View>
		)
	}

	return (
		<Swipeable renderRightActions={getRightActions}
			renderLeftActions={getLeftActions}
			onSwipeableLeftOpen={() => props.onDelete(props.id)}>
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