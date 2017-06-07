import React from 'react';
import { TouchableNativeFeedback, View, Image, Animated } from 'react-native';
import ACTIONS from '../utils/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ClearButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			zoomInAnim: new Animated.Value(10),
			fadeInAnim: new Animated.Value(0)
		}
	}

	componentDidMount() {
		Animated.timing(this.state.fadeInAnim, {
			toValue: 1
		}).start();
		Animated.spring(this.state.zoomInAnim, {
			toValue: 25,
			friction: 5
		}).start();
	}

	render() {
		return(
			<TouchableNativeFeedback onPress = {() => {this.props.searchNotes(''); this.props.hideKeyboard()}}>
				<View>
					<Animated.Image source = {require('../images/cross_filled_black.png')} style = {{opacity: this.state.fadeInAnim, height: this.state.zoomInAnim, width: this.state.zoomInAnim}}/>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		searchNotes: ACTIONS.searchNotes,
		hideKeyboard: ACTIONS.hideKeyboard
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearButton);