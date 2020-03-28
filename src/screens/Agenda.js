import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Platform,
	AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../common'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from './AddTasks'

const styles = StyleSheet.create({
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
		marginTop: Platform.OS == 'ios' ? 30 : 20,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
})

export default class Agenda extends Component {
	state = {
		tasks: [],
		visibleTasks: [],
		showDoneTasks: true,
		showAddTasks: false
	}

	addTask = task => {
		const tasks = [...this.state.tasks]
		tasks.push({
			id: Math.random(),
			desc: task.desc,
			estimateAt: task.date,
			doneAt: null
		})

		this.setState({ tasks, showAddTasks: false }, this.filterTasks)
	}

	deleteTask = idToRemove => {
		// Utilizando filter() para remover um elemento
		const tasks = this.state.tasks.filter(task => task.id !== idToRemove)
		this.setState({ tasks }, this.filterTasks)
	}

	filterTasks = () => {
		let visibleTasks = null
		if (this.state.showDoneTasks) {
			visibleTasks = [...this.state.tasks] // Duplicando
		} else {
			const funcIsPendingTask = task => task.doneAt === null
			visibleTasks = this.state.tasks.filter(funcIsPendingTask)
		}

		this.setState({ visibleTasks })
		AsyncStorage.setItem(
			'tasks',
			JSON.stringify({
				showDoneTasks: this.state.showDoneTasks
			})
		)
	}

	toggleFilter = () => {
		this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
	}

	toggleTask = taskId => {
		const tasks = [...this.state.tasks]
		tasks.forEach(task => {
			if (task.id === taskId) {
				task.doneAt = task.doneAt != null ? null : new Date()
			}
		})

		this.setState({ tasks }, this.filterTasks)
	}

	async componentDidMount() {
		const data = await AsyncStorage.getItem('tasks')
		const savedStates = JSON.parse(data) || []
		this.setState({ showDoneTasks: savedStates.showDoneTasks }, this.filterTasks())
	}

	loadTasks = async () => {
		try {
			const maxDate = moment().format('YYYY-MM-DD 23:59:59')
			const res = await axios.get(`${server}/tasks?date=${maxDate}`)
			this.setState({ tasks: res.data }, this.filterTasks())
		} catch (ex) {
			showError(ex)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<AddTask
					isVisible={this.state.showAddTasks}
					onSave={this.addTask}
					onCancel={() => this.setState({ showAddTasks: false })}
				/>
				<ImageBackground source={todayImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
								size={20}
								color={commonStyles.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>
							{moment()
								.locale('pt-br')
								.format('ddd, D [de] MMMM [de] YYYY')}
						</Text>
					</View>
				</ImageBackground>
				<View style={styles.taskContainer}>
					<FlatList
						data={this.state.visibleTasks}
						keyExtractor={item => `${item.id}`}
						renderItem={({ item }) => (
							<Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />
						)}
					/>
				</View>
				<ActionButton
					buttonColor={commonStyles.colors.today}
					onPress={() => this.setState({ showAddTasks: true })}
				/>
			</View>
		)
	}
}
