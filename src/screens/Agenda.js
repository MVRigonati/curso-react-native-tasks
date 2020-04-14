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
		marginTop: 40,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

export default class Agenda extends Component {
	state = {
		tasks: [],
		visibleTasks: [],
		showDoneTasks: true,
		showAddTasks: false
	}

	constructor() {
		super()
		AsyncStorage.getItem('tasks', (_, result) => {
			const savedStates = JSON.parse(result) || []
			this.setState({ showDoneTasks: savedStates.showDoneTasks }, this.loadTasks)
		})
	}

	addTask = async task => {
		try {
			await axios.post(`${server}/tasks`, {
				desc: task.desc,
				estimateAt: task.date
			})

			this.setState({ showAddTasks: false }, this.loadTasks)
		} catch (ex) {
			showError(ex)
		}
	}

	deleteTask = async idToRemove => {
		try {
			await axios.delete(`${server}/tasks/${idToRemove}`)
			this.loadTasks()
		} catch (ex) {
			showError(ex)
		}
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
	}

	toggleFilter = () => {
		this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
		AsyncStorage.setItem(
			'tasks',
			JSON.stringify({
				showDoneTasks: this.state.showDoneTasks
			})
		)
	}

	toggleTask = async taskId => {
		try {
			await axios.put(`${server}/tasks/${taskId}/toggle`)
			this.loadTasks()
		} catch (ex) {
			showError(ex)
		}
	}

	loadTasks = async () => {
		try {
			const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59:59')
			const res = await axios.get(`${server}/tasks?date=${maxDate}`)
			this.setState({ tasks: res.data }, this.filterTasks)
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
				<ImageBackground source={this.props.backgroundImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.props.navigation.openDrawer}>
							<Icon name="bars" size={20} color={commonStyles.colors.secondary} />
						</TouchableOpacity>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
								size={20}
								color={commonStyles.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.titleBar}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.subtitle}>
							{moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
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
					buttonColor={this.props.color}
					onPress={() => this.setState({ showAddTasks: true })}
				/>
			</View>
		)
	}
}
