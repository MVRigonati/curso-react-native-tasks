import { StyleSheet } from 'react-native'

import commonStyles from '../../commonStyles'

const styles = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderColor: '#DDD',
		paddingLeft: 10
	},
	title: {
		color: '#000',
		fontFamily: commonStyles.fontFamily,
		fontSize: 30,
		paddingTop: 50,
		marginBottom: 15
	},
	avatar: {
		height: 60,
		width: 60,
		borderWidth: 3,
		borderRadius: 30,
		marginBottom: 10
	},
	name: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 20,
		marginBottom: 5
	},
	email: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.subTex,
		fontSize: 15,
		marginBottom: 10
	},
	logout: {
		marginBottom: 10
	}
})

export default styles
