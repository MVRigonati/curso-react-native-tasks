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
		today: '#B13B44',
		secondary: '#FFF',
		mainText: '#222',
		subTexy: '#555'
	}
}