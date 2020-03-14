import React, { Component } from 'react'
import {
	ImageBackground,
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 70,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 10
	},
	formContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 20,
		width: '90%'
	},
	input: {
		marginTop: 10,
		backgroundColor: '#FFF',
		padding: 15
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center'
	},
	buttonText: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20
	}
})

export default class Auth extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		stageNew: false
	}

	singinSignup = () => {
		if (this.state.stageNew) {
			// Registrar user
		} else {
			// Logar user
		}
	}

	render() {
		let showNameInput
		let showConfirmPasswordInput
		if (this.state.stageNew) {
			showNameInput = (
				<TextInput
					placeholder="Nome"
					value={this.state.name}
					style={styles.input}
					onChangeText={name => this.setState({ name })}
				/>
			)
			showConfirmPasswordInput = (
				<TextInput
					placeholder="Confirme sua senha"
					secureTextEntry={true}
					value={this.state.confirmPassword}
					style={styles.input}
					onChangeText={confirmPassword =>
						this.setState({ confirmPassword })
					}
				/>
			)
		}

		return (
			<ImageBackground source={backgroundImage} style={styles.background}>
				<Text style={styles.title}>Tasks</Text>
				<View style={styles.formContainer}>
					<Text style={styles.subtitle}>
						{this.state.stageNew
							? 'Crie sua conta'
							: 'Informe seus dados'}
					</Text>
					{showNameInput}
					<TextInput
						placeholder="E-mail"
						value={this.state.email}
						style={styles.input}
						onChangeText={email => this.setState({ email })}
					/>
					<TextInput
						placeholder="Senha"
						secureTextEntry={true}
						value={this.state.password}
						style={styles.input}
						onChangeText={password => this.setState({ password })}
					/>
					{showConfirmPasswordInput}
					<TouchableOpacity onPress={this.singinSignup}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>
								{this.state.stageNew ? 'Registrar' : 'Entrar'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() =>
						this.setState({ stageNew: !this.state.stageNew })
					}>
					<Text style={styles.buttonText}>
						{this.state.stageNew
							? 'Já possui conta?'
							: 'Ainda não possui conta?'}
					</Text>
				</TouchableOpacity>
			</ImageBackground>
		)
	}
}
