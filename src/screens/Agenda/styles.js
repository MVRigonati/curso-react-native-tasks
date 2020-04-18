import commonStyles from '../../commonStyles'

const styles = {
	container: {
		flex: 1
	},
	background: {
		flex: 3
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 30
	},
	taskContainer: {
		flex: 7
	},
	iconBar: {
		marginTop: 40,
		marginHorizontal: 6,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	iconBarTouchableButtons: {
		width: 50,
		height: 50,
		alignItems: 'center'
	},
	iconColor: commonStyles.colors.secondary
}

export default styles
