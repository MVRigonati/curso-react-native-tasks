import * as Font from 'expo-font';

const loadCustomFont = async () => {
	await Font.loadAsync({
		'lato': require('../assets/fonts/Lato.ttf'),
	});
}

export { loadCustomFont }

export default {
	fontFamily: 'lato',
	colors: {
		default: '#1631be',
		today: '#B13B44',
		secondary: '#FFF',
		mainText: '#222',
		subTex: '#555'
	}
}