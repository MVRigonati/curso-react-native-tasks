import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { screenRoutes } from './common'
import commonStyles from './commonStyles'
import Auth from './screens/Auth'
import TaskList from './screens/Agenda'

import todayImage from '../assets/imgs/today.jpg'
import tomorrowImage from '../assets/imgs/tomorrow.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'

const sideMenuRoutes = {
	Today: {
		name: 'today',
		screen: props => (
			<TaskList
				{...props}
				title="Hoje"
				daysAhead={0}
				backgroundImage={todayImage}
				color={commonStyles.colors.today}
			/>
		),
		navigationOptions: {
			title: 'Hoje'
		}
	},
	Tomorrow: {
		name: 'tomorrow',
		screen: props => (
			<TaskList
				{...props}
				title="Amanhã"
				daysAhead={1}
				backgroundImage={tomorrowImage}
				color={commonStyles.colors.tomorrow}
			/>
		),
		navigationOptions: {
			title: 'Amanhã'
		}
	},
	Week: {
		name: 'week',
		screen: props => (
			<TaskList
				{...props}
				title="Semana"
				daysAhead={7}
				backgroundImage={weekImage}
				color={commonStyles.colors.week}
			/>
		),
		navigationOptions: {
			title: 'Semana'
		}
	},
	Month: {
		name: 'month',
		screen: props => (
			<TaskList
				{...props}
				title="Mês"
				daysAhead={30}
				backgroundImage={monthImage}
				color={commonStyles.colors.month}
			/>
		),
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
