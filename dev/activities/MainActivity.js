import React from 'react';
import { View, TouchableNativeFeedback, Image, Dimensions, Text } from 'react-native';
import { ColorScheme } from '../css/style';
import { BoxShadow } from 'react-native-shadow';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import AppBar from '../components/AppBar';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getNotes();
	}

	render() {
		return(
			<View style = {{flex:1}}>
				<AppBar title = "Notes" backButton = {false}/>

				{this.props.notes.map((note, index) => {
					return(
						<Text key = {index}>{note.note_text}</Text>
					);
				})}

				<View style = {{position: 'absolute', bottom: 16, right: 16}}>
					<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress = {Actions.noteActivity}>
						<View style = {addBtn}>
							<Image source = {require('../images/add.png')} style = {{height: 25, width: 25}} />
						</View>
					</TouchableNativeFeedback>
				</View>

			</View>
		);
	}
}

const addBtn = {
	backgroundColor: ColorScheme.primary,
	padding: 20,
	borderRadius: 50
}

function mapStateToProps(state) {
	return {
		notes: state.notes
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainActivity);