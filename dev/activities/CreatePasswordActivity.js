import React from 'react';
import { View, Text, AsyncStorage, Dimensions, TextInput, Image, ScrollView } from 'react-native';
import { ColorScheme } from '../css/style';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ASService from'../utils/AsyncStorageService';
import { Actions } from 'react-native-router-flux';
import Constants from '../utils/Constants';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class CreatePasswordActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordIsSet: -1,
			password: '',
			confirmPassword: '',
			oldPassword: '',
			prevPass: '',
			borderColor: ColorScheme.grey,
			match: false,
			borderWidth: 0.5
		}
		this.renderPage = this.renderPage.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	componentWillUpdate(nextProp, nextState) {
		this.renderPage()
	}

	componentDidMount() {
		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			if(obj) {
				obj = JSON.parse(obj);
				if(obj.is_password_set) {
					this.setState({
						passwordIsSet: 1,
						prevPass: obj.password
					});	
				}else{
					this.setState({
						passwordIsSet: 0
					});
				}
			}else{
				this.setState({
					passwordIsSet: 0
				});
			}
		}).done();
	}

	handleInput = (newPass, confirmPass) => {
		if(confirmPass === newPass && confirmPass.trim().length > 0) {
			this.setState({
				borderWidth: 1,
				borderColor: ColorScheme.green,
				match: true
			});
		}else{
			this.setState({
				borderWidth: 0.5,
				borderColor: ColorScheme.grey,
				match: false
			});
		}
	}

	handleUpdate = (oldPass, newPass, confirmPass) => {
		if(confirmPass === newPass && confirmPass.trim().length > 0 && this.state.prevPass === oldPass) {
			this.setState({
				borderWidth: 1,
				borderColor: ColorScheme.green,
				match: true
			});
		}else{
			this.setState({
				borderWidth: 0.5,
				borderColor: ColorScheme.grey,
				match: false
			});
		}
	}

	setPassword = () => {
		let paperStore = {
			is_password_set: true,
			password: this.state.password
		};
		ASService.setItem(paperStore);
		this.setState({
			passwordIsSet: 3
		});	
	}

	renderPage = () => {
		const inputStyle = {
			textAlign: 'center',
			fontSize: 17,
			marginBottom: 10, 
			borderRadius: 5,
			borderColor: this.state.borderColor,
			borderWidth: this.state.borderWidth,
			backgroundColor: '#fff',
			width: Dimensions.get('window').width/1.5
		}
		if(this.state.passwordIsSet === -1) return null;
		if(this.state.passwordIsSet === 0) {
			return(
					<View style = {{alignItems: 'center'}}>
						<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 20, marginTop: 50, textAlign: 'center', marginBottom: 10}}>Create a Password</Text>
						<Text style = {{color: '#212121', fontSize: 17, textAlign: 'center', width: Dimensions.get('window').width/2, marginBottom: 30}}><Text style = {{fontWeight: 'bold'}}>Lock</Text> your selected notes with a password</Text>
						
							<TextInput 
								onChangeText = {(text) => {
									this.setState({password: text})
									this.handleInput(text, this.state.confirmPassword);
								}}
								style = {inputStyle}
								maxLength = {20}
								underlineColorAndroid = 'transparent'
								secureTextEntry = {true}
								placeholder = "Password"/>
						
							<TextInput
								onChangeText = {(text) => {
									this.setState({confirmPassword: text});
									this.handleInput(this.state.password, text);
								}} 
								style = {inputStyle}
								maxLength = {20}
								underlineColorAndroid = 'transparent'
								secureTextEntry = {true}
								placeholder = "Re-type Password"/>

						{this.state.match ? <PrimaryButton title = "Set Password" color = {ColorScheme.green} onPressFunction = {this.setPassword}/> : <PrimaryButton title = "Cancel" color = '#616161' onPressFunction = {Actions.pop}/>}
					</View>
			);
		}
		if(this.state.passwordIsSet === 1) {
			return(
					<View style = {{alignItems: 'center', flex: 1}}>
						<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 20, marginTop: 50, textAlign: 'center', marginBottom: 10}}>Update Password</Text>
						<Text style = {{color: '#212121', fontSize: 17, textAlign: 'center', width: Dimensions.get('window').width/2, marginBottom: 30}}> Enter your old and new password</Text>
						
							<TextInput 
								onChangeText = {(text) => {
									this.setState({oldPassword: text})
									this.handleUpdate(text, this.state.password, this.state.confirmPassword);
								}}
								style = {inputStyle}
								maxLength = {20}
								underlineColorAndroid = 'transparent'
								secureTextEntry = {true}
								placeholder = "Old Password"/>
						
							<TextInput 
								onChangeText = {(text) => {
									this.setState({
										password: text
									});
									this.handleUpdate(this.state.oldPassword, text, this.state.confirmPassword);
								}}
								style = {inputStyle}
								maxLength = {20}
								underlineColorAndroid = 'transparent'
								secureTextEntry = {true}
								placeholder = "New Password"/>
						
							<TextInput
								onChangeText = {(text) => {
									this.setState({
										confirmPassword: text
									});
									this.handleUpdate(this.state.oldPassword, this.state.password, text);
								}} 
								style = {inputStyle}
								maxLength = {20}
								underlineColorAndroid = 'transparent'
								secureTextEntry = {true}
								placeholder = "Re-type New Password"/>

						{this.state.match ? <PrimaryButton title = "Set Password" color = {ColorScheme.green} onPressFunction = {this.setPassword}/> : <PrimaryButton title = "Cancel" color = '#616161' onPressFunction = {Actions.pop}/>}
					</View>
			);
		}
		if(this.state.passwordIsSet === 3) {
			return(
				<View style = {{alignItems: 'center'}}>
					<Image source = {require('../images/success.png')} style = {{height: 70, width: 70, marginTop: 50}} />
					<Text style = {{color: ColorScheme.green, marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>Password Set</Text>
					<Text style = {{color: ColorScheme.text, marginTop: 35, marginBottom: 20, fontSize: 17, width: Dimensions.get('window').width/2, textAlign: 'center'}}>You can now lock your notes with this password</Text>
					<SecondaryButton title = "ok" color = {ColorScheme.primary} withBorder = {true} onPressFunction = {Actions.pop}/>
				</View>
			);
		}
	};

	render() {
		return(
			<View style = {{flex: 1}}>
				<View style = {{width: '100%', height: 5, backgroundColor: ColorScheme.primary}}/>
				<View style = {{flex: 1, alignItems: 'center'}}>
					{this.renderPage()}
				</View>
				<KeyboardSpacer />
			</View>
		);
	}
}



const pageStyle = {
	flex: 1
}

export default CreatePasswordActivity;