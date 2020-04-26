import React, { Component } from 'react'
import axios from 'axios'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, AsyncStorage } from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess, screenRoutes } from '../common'

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerTitle: {
		flex: 1,
		justifyContent: 'center'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 70
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 10
	},
	container: {
		flex: 1
	},
	formContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 20,
		width: '90%'
	},
	input: {
		marginTop: 10,
		backgroundColor: '#FFF'
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		borderRadius: 7
	},
	buttonText: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20
	},
	containerChangeStageButton: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	changeStageButton: {
		padding: 10,
		marginBottom: 50
	}
})

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	stageNew: false
}

export default class Auth extends Component {
	state = { ...initialState }

	adicionaTokenAoHeader(token, axios) {
		axios.defaults.headers.common['Authorization'] = `bearer ${token}`
	}

	singin = async () => {
		try {
			const res = await axios.post(server.concat('/signin'), { ...this.state })

			AsyncStorage.setItem('userData', JSON.stringify(res.data))

			this.adicionaTokenAoHeader(res.data.token, axios)
			this.props.navigation.navigate(screenRoutes.home, res.data)
		} catch (err) {
			showError(err)
		}
	}

	signup = async () => {
		try {
			await axios.post(server.concat('/signup'), { ...this.state })

			showSuccess('Usuário Cadastrado!')
			this.setState({ ...initialState })
		} catch (err) {
			showError(err)
		}
	}

	isFormValuesValid = () => {
		let isFormValuesValid = this.state.email && this.state.email.includes('@')
		isFormValuesValid = isFormValuesValid && this.state.password && this.state.password.length > 5
		if (this.state.stageNew) {
			isFormValuesValid = isFormValuesValid && this.state.name && this.state.name.trim().length > 2
			isFormValuesValid = isFormValuesValid && this.state.confirmPassword === this.state.password
		}
		return isFormValuesValid
	}

	render() {
		let mainButtonOnPress = this.signup
		let displayStageNewComponent = {}
		let mainButtonText = 'Registrar'
		let subtitleText = 'Crie sua conta'
		let changeStageText = 'Já possui conta?'

		if (!this.state.stageNew) {
			mainButtonOnPress = this.singin
			mainButtonText = 'Entrar'
			subtitleText = 'Informe seus dados'
			changeStageText = 'Ainda não possui conta?'
			displayStageNewComponent = { display: 'none' }
		}

		let disableMainButton = null
		if (!this.isFormValuesValid()) {
			disableMainButton = { backgroundColor: '#AAA' }
		}

		return (
			<ImageBackground source={backgroundImage} style={styles.background}>
				<View style={styles.containerTitle}>
					<Text style={styles.title}>Tasks</Text>
				</View>
				<View style={styles.container}>
					<View style={styles.formContainer}>
						<Text style={styles.subtitle}>{subtitleText}</Text>
						<AuthInput
							icon="user"
							placeholder="Nome"
							autoCapitalize="words"
							value={this.state.name}
							style={[styles.input, displayStageNewComponent]}
							onChangeText={name => this.setState({ name })}
						/>
						<AuthInput
							icon="at"
							placeholder="E-mail"
							autoCapitalize="none"
							keyboardType="email-address"
							value={this.state.email}
							style={styles.input}
							onChangeText={email => this.setState({ email })}
						/>
						<AuthInput
							icon="lock"
							placeholder="Senha"
							secureTextEntry={true}
							value={this.state.password}
							style={styles.input}
							onChangeText={password => this.setState({ password })}
						/>
						<AuthInput
							icon="lock"
							placeholder="Confirme sua senha"
							secureTextEntry={true}
							value={this.state.confirmPassword}
							style={[styles.input, displayStageNewComponent]}
							onChangeText={confirmPassword => this.setState({ confirmPassword })}
						/>
						<TouchableOpacity onPress={mainButtonOnPress} disabled={disableMainButton != null}>
							<View style={[styles.button, disableMainButton]}>
								<Text style={styles.buttonText}>{mainButtonText}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.containerChangeStageButton}>
					<TouchableOpacity
						style={styles.changeStageButton}
						onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
						<Text style={styles.buttonText}>{changeStageText}</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		)
	}
}
