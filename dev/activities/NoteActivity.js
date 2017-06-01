import React from 'react';
import { Text, View, TextInput, Button, TouchableNativeFeedback } from 'react-native';
import { ColorScheme } from '../css/style';
import realm from '../database/schemas';
import Services from '../utils';

export default class NoteActivity extends React.Component {

	constructor(props) {
		super(props);
		this.event = this.props.navigation.state.params.event;
		this.state = {
			noteText: ''
		}
		this.saveNote = this.saveNote.bind(this);
	}

	static navigationOptions = {
		title: 'Add Note'
	}

	saveNote = () => {
		let notes = this.event.notes;
		realm.write(() => {
			notes.push({
				id: Services.getUniqueID(),
				description: this.state.noteText,
				created_on: new Date(),
				updated_on: new Date()
			});
		});
	}

	render() {
		return (
			<View style = {{flex: 1, backgroundColor: '#fff'}}>
				{/*<Text style = {eventTitleStyle}>{this.event.title}</Text>*/}
				<TextInput 
					style = {inputStyle}
					multiline = {true} 
					numberOfLines = {10} 
					autoFocus = {true}
					onChangeText = {(text) => {this.setState({noteText: text})}}
					underlineColorAndroid = 'transparent' 
					placeholder = "Enter note"/>

				<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
					<TouchableNativeFeedback onPress = {() => {this.saveNote()}}>
						<View style = {saveBtn}>
							<Text style = {{fontWeight: 'bold', color: ColorScheme.primary}}>SAVE</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}
}

const inputStyle = {
	fontSize: 20,
	marginLeft: 20,
	marginRight: 20,
	marginTop: 20,
	textAlignVertical: 'top',
	flex: 1
}

const saveBtn = {
	padding: 20
}

const eventTitleStyle = {
	padding: 20,
	fontSize: 28,
	fontWeight: 'bold'
}