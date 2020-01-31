import React, { Component } from 'react'
import {
	StyleSheet, Text,
	View, ImageBackground,
	FlatList
} from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'

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
	}
})

export default class Agenda extends Component {
	state = {
		tasks: [
			{
				id: Math.random(),
				desc: 'Comprar curso',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso',
				estimateAt: new Date(),
				doneAt: null
			}
		]
	}

	toggleTask = taskId => {
		const tasks = [...this.state.tasks] // Duplicando
		tasks.forEach(task => {
			if (task.id === taskId) {
				task.doneAt = (task.doneAt != null) ?
					null : (new Date())
			}
		})

		this.setState({ tasks })
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={todayImage}
					style={styles.background}>
					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>
							{moment().locale('pt-br').format('ddd, D [de] MMMM')}
						</Text>
					</View>
				</ImageBackground>
				<View style={styles.taskContainer}>
					<FlatList data={this.state.tasks}
						keyExtractor={item => `${item.id}`}
						renderItem={({ item }) =>
							<Task {...item} toggleTask={this.toggleTask}/>} />
				</View>
			</View>
		)
	}
}