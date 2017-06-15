import React from 'react';
import { View, Text, TextInput, Image, TouchableNativeFeedback, TouchableWithoutFeedback, Animated } from 'react-native';
import { ColorScheme, styles } from '../css/style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import PrimaryButton from './PrimaryButton';
import Services from '../utils';

class MultipleHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			markText: 'Mark all',
			opacityAnim: new Animated.Value(0)
		}
		this.toggle = this.toggle.bind(this);
		this.showDelete = this.showDelete.bind(this);
		this.deleteSelected = this.deleteSelected.bind(this);
	}

	toggle = () => {
		if(this.state.isChecked){
			this.setState({
				markText: 'Mark all',
				isChecked: false
			});
			this.props.unmarkAll();
		}else{
			this.setState({
				markText: 'Unmark all',
				isChecked: true
			});
			this.props.markAll();
		}
	}

	deleteSelected = () => {
		if(this.props.app.markAll) {
			Services.deleteAllNotes();
			this.props.getNotes();
			this.props.multipleClose();
		}else if(this.props.app.selectedItems.length) {
			Services.deleteSelectedNotes(this.props.app.selectedItems);
			this.props.getNotes();
			this.props.multipleClose();
		}
	}

	showDelete = () => {
		if(this.props.app.markAll || this.props.app.selectedItems.length) {
			Animated.timing(this.state.opacityAnim, {
				toValue: 1
			}).start();
			return (
				<Animated.View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: 20, opacity: this.state.opacityAnim}}>
					<PrimaryButton title = "Delete" color={ColorScheme.red} onPressFunction = {this.deleteSelected}/>
				</Animated.View>
			);
		}else{
			Animated.timing(this.state.opacityAnim, {
				toValue: 0
			}).start();
			return (
				<Animated.View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: 20, opacity: this.state.opacityAnim}}>
					<PrimaryButton title = "Delete" color={ColorScheme.red} onPressFunction = {this.deleteSelected}/>
				</Animated.View>
			);
		}
	}


	render() {
		return(
			<View style = {searchContainer}>
				<TouchableWithoutFeedback onPress = {() => this.toggle()}>
					<View style = {{marginRight: 10, marginLeft: 25, flexDirection: 'row', alignItems: 'center'}}>
						<Image source = {this.state.isChecked ? require('../images/success.png') : require('../images/untick.png')} style = {tick_style}/>
						<Text style = {{color: ColorScheme.primary}}>
							{this.state.markText}
						</Text>
					</View>
				</TouchableWithoutFeedback>
				{this.showDelete()}
			</View>
		);
	}
}

const tick_style = {
	height: 30,
	width: 30,
	marginRight: 10
}

const searchContainer = {
	width: '100%',
	flexDirection: 'row', 
	alignItems: 'center', 
	height: 55, 
	position: 'absolute',
	backgroundColor: 'rgba(255,255,255,0.8)'
}

const container = {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	backgroundColor: 'rgba(238, 238, 238 ,0.8)',
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
	fontSize: 17,
	paddingRight: 5
}

function mapStateToProps(state) {
	return {
		app: state.app
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		markAll: ACTIONS.markAll,
		unmarkAll: ACTIONS.unmarkAll,
		getNotes: ACTIONS.getNotes,
		multipleClose: ACTIONS.multipleClose
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleHeader);