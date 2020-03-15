import React, { Component } from 'react'
import {
	ImageBackground,
	Text,
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

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
				<AuthInput
					icon="user"
					placeholder="Nome"
					autoCapitalize="words"
					value={this.state.name}
					style={styles.input}
					onChangeText={name => this.setState({ name })}
				/>
			)
			showConfirmPasswordInput = (
				<AuthInput
					icon="lock"
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
