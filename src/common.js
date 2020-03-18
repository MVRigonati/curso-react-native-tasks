import { Alert, Platform } from 'react-native'

const server = 'http://192.168.0.52:3000'

function showError(err) {
	Alert.alert('Ocorreu um problema.', err)
}

function showSuccess(msg) {
	Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }
