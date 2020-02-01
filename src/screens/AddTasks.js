import React, { Component } from 'react'
import {
	Text, TextInput, Modal, View,
	DatePickerIOS, StyleSheet, Alert,
	TouchableWithoutFeedback, TouchableOpacity
} from 'react-native'
import commonStyles from '../commonStyles'
import moment from 'moment'

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'space-between'
	},
	offset: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	button: {
		margin: 20,
		marginRight: 30,
		color: commonStyles.colors.default
	},
	header: {
		fontFamily: commonStyles.fontFamily,
		backgroundColor: commonStyles.colors.default,
		color: commonStyles.colors.secondary,
		textAlign: 'center',
		padding: 15,
		fontSize: 15
	},
	input: {
		fontFamily: commonStyles.fontFamily,
		width: '90%',
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		backgroundColor: 'white',
		borderRadius: 6
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
})

const initialState = { desc: '', date: new Date() }

export default class AddTask extends Component {
	state = { ...initialState }

	isValidDesc(desc) {
		return (desc != null && desc.trim().length > 0)
	}

	save = () => {
		const data = { ...this.state }
		if (this.isValidDesc(data.desc)) {
			this.props.onSave(data)
			this.setState( { ...initialState } )
		} else {
			Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa.')
		}
	}

	modalBlanckSpace = () => {
		return(
			<TouchableWithoutFeedback onPress={this.props.onCancel}>
				<View style={styles.offset} />
			</TouchableWithoutFeedback>
		)
	}
	
	touchableOpacityButton = (onPressFunc, text) => {
		return (
			<TouchableOpacity onPress={onPressFunc}>
				<Text style={styles.button}>{text}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return(
			<Modal onRequestClose={this.props.onCancel}
				visible={this.props.isVisible}
				animationType='slide' transparent={true}>
					{this.modalBlanckSpace()}

					<View style={styles.container}>
						<Text style={styles.header}>Nova Tarefa!</Text>
						<TextInput placeholder={'Descrição...'}
							style={styles.input}
							onChangeText={desc => this.setState({ desc })}
							value={this.state.desc} />
						<DatePickerIOS mode='date' date={this.state.date}
							onDateChange={date => this.setState({ date })} />
						<View style={styles.buttonsContainer}>
							{this.touchableOpacityButton(this.props.onCancel, 'Cancelar')}
							{this.touchableOpacityButton(this.save, 'Savar')}
						</View>
					</View>

					{this.modalBlanckSpace()}
			</Modal>
		)
	}
}