import { Alert } from 'react-native'

const server = 'http://192.168.0.52:3000'

const screenRoutes = {
	auth: 'auth',
	home: 'home'
}

function showError(err) {
	Alert.alert('Ocorreu um problema.', err)
}

function showSuccess(msg) {
	Alert.alert('Sucesso!', msg)
}

export { server, screenRoutes, showError, showSuccess }
