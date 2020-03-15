import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Auth from './screens/Auth'
import TaskList from './screens/Agenda'

const MainRoutes = {
	auth: {
		name: 'auth',
		screen: Auth
	},
	home: {
		name: 'home',
		screen: TaskList
	}
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
	initialRouteName: 'auth'
})

export default createAppContainer(MainNavigator)
