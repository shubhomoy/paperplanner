import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import App from './dev/app';

export default class paperplanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shareText: props.share_text
		}
	}

    render() {
        return (
            <App shareText = {this.state.shareText}/>
        );
    }
}

AppRegistry.registerComponent('paperplanner', () => paperplanner);
