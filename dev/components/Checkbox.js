import React from 'react';
import { View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';

class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			showAnim: new Animated.Value(0),
			opacityAnim: new Animated.Value(0)
		}
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		Animated.timing(this.state.showAnim, {
			toValue: 40
		}).start();
		Animated.timing(this.state.opacityAnim, {
			toValue: 1
		}).start();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.markAll) {
			this.setState({
				isChecked: false
			})
		}
	}


	toggle = () => {
		if(!this.state.isChecked) {
			this.setState({
				isChecked: true
			});
			this.props.mark(this.props.item.id);
		}else{
			this.setState({
				isChecked: false
			});
			this.props.unmark(this.props.item.id);
		}
	}

	render() {	
		return(
			<TouchableWithoutFeedback onPress = {() => {this.toggle()}}>
				<Animated.View style = {{marginRight: 10, marginTop: 3, width: this.state.showAnim, opacity: this.state.opacityAnim}}>
					<Image source = {this.state.isChecked || this.props.markAll ? require('../images/success.png') : require('../images/untick.png')} style = {tick_style}/>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const tick_style = {
	height: 30,
	width: 30
}

function mapStateToProps(state) {
	return {
		multiple: state.app.multiple,
		markAll: state.app.markAll
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		mark: ACTIONS.mark,
		unmark: ACTIONS.unmark
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);