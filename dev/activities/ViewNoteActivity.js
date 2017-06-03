import React from 'react';
import { View, Text, TouchableNativeFeedback, ScrollView, Dimensions, Alert } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { ColorScheme, styles } from '../css/style';
import { Actions, ActionConst } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import realm from '../database';

class ViewNoteActivity extends React.Component {

	constructor(props) {
		super(props);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.editNote = this.editNote.bind(this);
	}

	deleteEntity = () => {
		Alert.alert('Delete Note', 'Are you sure you want to delete?',
			[
				{
					text: 'No'
				},
				{
					text: 'Yes',
					onPress: () => {
						realm.write(() => {
							let note = realm.objectForPrimaryKey('Note', this.props.note.id);
							realm.delete(note);
							this.props.getNotes();
							Actions.pop();
						});
					}
				}
			]
		);
	}

	editNote = () => {
		Actions.noteActivity({
			type: ActionConst.REPLACE,
			note: this.props.note,
			action: 'edit'
		});
	}

	render() {
		return(
			<View style = {{flex: 1}}>
				<ScrollView>
					<Text style = {textStyle}>
						{this.props.note.note_text}
					</Text>
				</ScrollView>
				<BoxShadow setting = {shadow}>
					<View style = {controlsContainer}>
						<SecondaryButton title = "Delete" withBorder = {true} color = {ColorScheme.redDark} onPressFunction = {this.deleteEntity}/>
						<PrimaryButton title = "Edit" onPressFunction = {this.editNote}/>
					</View>
				</BoxShadow>
			</View>
		);
	}
}

const textStyle = {
	fontSize: 25,
	color: '#212121',
	padding: 20
}

const controlsContainer = {
	flex: 1,
	flexDirection: 'row',
	backgroundColor: '#fff',
	justifyContent: 'flex-end',
	alignItems: 'center'
}

const shadow = {
	width: Dimensions.get('window').width,
	height: 50,
	color: '#dedede',
	border: 20,
	radius: 25,
	opacity: 0.3,
	x: 0,
	y: 0,
	style:{
		
	}
}

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNoteActivity);