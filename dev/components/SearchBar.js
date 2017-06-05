import React from 'react';
import { View, Text, TextInput, Image, TouchableNativeFeedback, Animated } from 'react-native';
import { ColorScheme, styles } from '../css/style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import ClearButton from './ClearButton';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.renderClose = this.renderClose.bind(this);
	}


	handleInput = (text) => {
		this.props.searchNotes(text);
		if(text && text.trim().length > 0) {
			this.setState({showCross: true});
		}else{
			this.setState({showCross: false});
			this.props.getNotes();
		}
	}

	renderClose = () => {
		if(this.props.app.searchText.trim().length > 0) {
			return(
				<ClearButton/>
			);
		}else{
			return null;
		}
	}

	render() {
		return(
			<View style = {searchContainer}>
				<View style = {container}>
					<Image source = {require('../images/search.png')} style = {{height: 20, width: 20}}/>
					<TextInput
						value = {this.props.app.searchText}
						onChangeText = {(text) => this.handleInput(text)}
						style = {textInputStyle}
						multiline = {false}
						underlineColorAndroid = 'transparent'
						placeholder = "Search Notes" />
					{this.renderClose()}
				</View>
			</View>
		);
	}
}

const searchContainer = {
	width: '100%',
	flexDirection: 'row', 
	alignItems: 'center', 
	justifyContent: 'flex-start',
	height: 55, 
	position: 'absolute',
	backgroundColor: 'rgba(255,255,255,0.8)'
}

const container = {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	backgroundColor: 'rgba(211, 215, 218 ,0.8)',
	margin: 5,
	marginLeft: 20,
	marginRight: 20,
	borderRadius: 20,
	paddingLeft: 10,
	paddingRight: 5,
	paddingTop: 5,
	paddingBottom: 5,
	borderWidth: 0.5,
	borderColor: '#616161'
}

const textInputStyle = {
	flex: 1,
	padding: 0,
	marginLeft: 10,
	fontSize: 20,
	paddingRight: 5
}

function mapStateToProps(state) {
	return {
		notes: state.notes,
		app: state.app
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes,
		searchNotes: ACTIONS.searchNotes
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);