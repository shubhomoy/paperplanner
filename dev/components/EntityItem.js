import React from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableNativeFeedback, Alert } from 'react-native';
import { ColorScheme } from '../css/style';
import realm from '../database';
import ImageButton from './ImageButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import { Actions } from 'react-native-router-flux';

class EntityItem extends React.Component {
	constructor(props) {
		super(props);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.openNote = this.openNote.bind(this);
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
							let note = realm.objectForPrimaryKey('Note', this.props.note.id);
							realm.delete(note);
							this.props.getNotes();
						});
					}
				}
			]
		);
	}

	openNote = () => {

	}

	render() {
		return(
			<View style = {itemStyle} onPress = {() => this.openNote()}>
				<Text style = {itemTextStyle}>{this.props.note.note_text}</Text>	
				<View style = {{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}> 
					<ImageButton onPressFunction={this.deleteEntity} image = {require('../images/remove.png')}/>
				</View>
			</View>
		);
	}
}

const itemStyle = {
	flex: 1,
	backgroundColor: '#fff',
	paddingLeft: 25,
	paddingRight: 25,
	paddingTop: 20,
	paddingBottom: 20
}

const itemTextStyle = {
	fontSize: 20,
	color: '#212121',
	flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(EntityItem);