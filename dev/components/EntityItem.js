import React from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableNativeFeedback, Alert } from 'react-native';
import { ColorScheme } from '../css/style';
import realm from '../database';

export default class EntityItem extends React.Component {
	constructor(props) {
		super(props);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.state = {
			event: this.props.event
		}
	}

	deleteEntity = () => {
		Alert.alert('Delete Entity', 'Are you sure you want to delete?',
			[
				{
					text: 'No'
				},
				{
					text: 'Yes',
					onPress: () => {
						realm.write(() => {
							this.state.event.notes.splice(this.props.index, 1);
						});
					}
				}
			]
		);
	}

	render() {
		return(
			<View>
				<View style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
					<View style = {roundBulletStyle}/>
					<Text style = {dateStyle}>Created on: {moment(this.props.createdOn).format('ddd Do MMM YYYY').toString()}</Text>
				</View>
				<View style = {{flex: 1, flexDirection: 'row'}}>
					<View style = {sepStyle}/>
					<View style = {{flex: 1, alignItems: 'flex-end'}}>
						<View style = {itemStyle}>
							<View style = {{flex: 1, flexDirection: 'row'}}>
								<Image source = {require('../images/note_dark.png')} style = {{width: 20, height: 20, marginRight: 10}}/>
								<Text style = {itemTextStyle}>{this.props.text}</Text>	
							</View>
						</View>
						<View style = {{flex: 1, flexDirection: 'row', paddingRight: 20}}>
							<TouchableNativeFeedback onPress = {() => this.deleteEntity()}>
								<View style = {removeBtnStyle}>
									<Text style = {{color: ColorScheme.red, fontWeight: 'bold'}}>REMOVE</Text>
								</View>
							</TouchableNativeFeedback>
							<TouchableNativeFeedback>
								<View style = {editBtnStyle}>
									<Text style = {{color: '#fff', fontWeight: 'bold'}}>EDIT</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
				</View>
			</View>
			
		);
	}
}

const roundBulletStyle = {
	width: 10,
	height: 10,
	borderRadius: 10,
	marginLeft: 20,
	backgroundColor: ColorScheme.primary
}

const dateStyle = {
	paddingLeft: 10,
	fontWeight: 'bold',
	fontSize: 17
}

const sepStyle = {
	width: 2.5,
	height: '100%',
	borderTopLeftRadius: 2.5,
	borderTopRightRadius: 2.5,
	marginLeft: 23.75,
	backgroundColor: ColorScheme.primary
}

const itemStyle = {
	flex: 1,
	flexDirection: 'row',
	marginTop: 10,
	backgroundColor: '#fff',
	marginLeft: 10,
	marginRight: 20,
	padding: 10,
	borderRadius: 2.5,
	borderWidth: 0.5,
	borderColor: ColorScheme.primary
}

const itemTextStyle = {
	fontSize: 20,
	flex: 1,
	paddingRight: 20,
	marginBottom: 20
}

const editBtnStyle = {
	backgroundColor: ColorScheme.primary,
	padding: 2,
	paddingLeft: 10,
	paddingRight: 10,
	borderRadius: 2,
	marginTop: 5
}

const removeBtnStyle = {
	borderWidth: 1.5,
	borderColor: ColorScheme.red,
	padding: 2,
	paddingLeft: 10,
	paddingRight: 10,
	borderRadius: 2,
	marginTop: 5,
	marginRight: 5
}

const titleStyle = {
	fontWeight: 'bold',
	fontSize: 22,
	color: '#212121',
	paddingLeft: 10,
	paddingRight: 10
}