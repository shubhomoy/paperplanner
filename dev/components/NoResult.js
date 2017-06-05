import React from 'react';
import { View, Text, Image, Animated } from 'react-native';

export default class NoResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fadeInAnim: new Animated.Value(0),
			zoomInAnim: new Animated.Value(10)
		}
	}

	componentDidMount() {
		Animated.timing(this.state.fadeInAnim, {
			toValue: 1
		}).start();
		Animated.spring(this.state.zoomInAnim, {
			toValue: 50,
			friction: 2
		}).start();
	}

	render() {
		return(
			<Animated.View style = {[{flex: 1, alignItems: 'center', paddingTop: 40}, {opacity: this.state.fadeInAnim}]}>
				<Animated.Image source = {require('../images/document.png')} style = {{height: this.state.zoomInAnim, width: this.state.zoomInAnim}}/>
				<Text style = {{fontSize: 20, marginTop: 10, color: '#9e9e9e'}}>No results found</Text>
			</Animated.View>
		);
	}
}