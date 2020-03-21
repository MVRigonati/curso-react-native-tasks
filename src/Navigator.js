import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { screenRoutes } from './common'
import Auth from './screens/Auth'
import TaskList from './screens/Agenda'

const MainRoutes = {
	auth: {
		name: screenRoutes.auth,
		screen: Auth
	},
	home: {
		name: screenRoutes.home,
		screen: TaskList
	}
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
	initialRouteName: screenRoutes.auth
})

export default createAppContainer(MainNavigator)
