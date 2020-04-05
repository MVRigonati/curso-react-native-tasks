import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { screenRoutes } from './common'
import Auth from './screens/Auth'
import TaskList from './screens/Agenda'

const sideMenuRoutes = {
	Today: {
		name: 'today',
		screen: props => <TaskList {...props} title="Hoje" daysAhead={0} />,
		navigationOptions: {
			title: 'Hoje'
		}
	},
	Tomorrow: {
		name: 'tomorrow',
		screen: props => <TaskList {...props} title="Amanhã" daysAhead={1} />,
		navigationOptions: {
			title: 'Amanhã'
		}
	},
	Week: {
		name: 'week',
		screen: props => <TaskList {...props} title="Semana" daysAhead={7} />,
		navigationOptions: {
			title: 'Semana'
		}
	},
	Month: {
		name: 'month',
		screen: props => <TaskList {...props} title="Mês" daysAhead={30} />,
		navigationOptions: {
			title: 'Mês'
		}
	}
}

const sideMenuNavigator = createDrawerNavigator(sideMenuRoutes)

const MainRoutes = {
	auth: {
		name: screenRoutes.auth,
		screen: Auth
	},
	home: {
		name: screenRoutes.home,
		screen: sideMenuNavigator
	}
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
	initialRouteName: screenRoutes.auth
})

export default createAppContainer(MainNavigator)
