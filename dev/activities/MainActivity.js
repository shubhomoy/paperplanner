import React from 'react';
import { View, TouchableNativeFeedback, Image, Dimensions, Text, FlatList } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import AppBar from '../components/AppBar';
import EntityItem from '../components/EntityItem';
import Separator_1 from '../components/Separator_1';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
		this.newNote = this.newNote.bind(this);
	}

	componentWillMount() {
		this.props.getNotes();
	}

	newNote = () => {
		Actions.noteActivity({
			action: 'new'}
		);
	}

	render() {
		return(
			<View style = {{flex:1}}>
				<AppBar title = "Notes" backButton = {false}/>

				<FlatList 
					data = {this.props.notes}
					renderItem = {({item, index}) => <EntityItem index = {index} note = {item}/>}
					keyExtractor={(item, index) => item.id}
					ItemSeparatorComponent = {() => <Separator_1 />}/>

				<View style = {{position: 'absolute', bottom: 16, right: 16}}>
					<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress = {() => this.newNote()}>
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