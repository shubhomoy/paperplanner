import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import App from './dev/app';

export default class paperplanner extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('paperplanner', () => paperplanner);
