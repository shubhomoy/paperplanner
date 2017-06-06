import React from 'react';
import { View, TouchableWithoutFeedback, Image, Dimensions, Text, FlatList, Button } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions, ActionConst } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import AppBar from '../components/AppBar';
import EntityItem from '../components/EntityItem';
import SearchBar from '../components/SearchBar';
import Separator_1 from '../components/Separator_1';
import SecondaryButton from '../components/SecondaryButton';
import NoResult from '../components/NoResult';
import { BoxShadow } from 'react-native-shadow';
import ASService from '../utils/AsyncStorageService';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
		this.newNote = this.newNote.bind(this);
		this.gotoSettings = this.gotoSettings.bind(this);
		this.renderFirstNote = this.renderFirstNote.bind(this);
	}

	componentWillMount() {
		this.props.getNotes();
		ASService.init();

	}

	componentWillUpdate(nextProps, nextState) {
		this.refs.list.scrollToOffset({x: 0, y: 0, animated: true})
	}

	componentDidUpdate(prevProps, prevState) {

	}

	newNote = () => {
		Actions.noteActivity({
			action: 'new'}
		);
	}

	gotoSettings = () => {
		Actions.settingsActivity();
	}

	renderFirstNote = () => {
		if(this.props.notes.items.length == 0 && !this.props.notes.isSearching) {
			return(
				<View style = {{position: 'absolute', height: '100%', backgroundColor: '#fff', width: '100%', top: 0}}>
					<View style = {{flex: 1, alignItems: 'center', paddingTop: 50}}>
						<Text style = {{fontSize: 20, padding: 20, color: ColorScheme.primary}}>Welcome to Paper!</Text>
						<Text style = {{width: 150, textAlign: 'center', marginBottom: 80, fontSize: 15}}><Text style = {{fontWeight: 'bold', color: '#212121'}}>Tap</Text> on the plus button to add your first note</Text>
						
						<BoxShadow setting = {shadow}>
						<TouchableWithoutFeedback onPress = {() => this.newNote()} useForeground = {true}>
							
								<View style = {[addBtn]}>
									<Image source = {require('../images/add.png')} style = {{height: 25, width: 25}} />
								</View>
							
						</TouchableWithoutFeedback>
						</BoxShadow>
					</View>
				</View>
			);
		}
		return null;
	}

	render() {

		const showTitle = () => {
			if(this.props.notes.isSearching) {
				return 'Result (' + this.props.notes.items.length + ')';
			}else{
				return 'All notes (' + this.props.notes.items.length + ')';
			}
		}

		const ListFooter = () => {
			if(this.props.notes.isSearching && this.props.notes.items.length == 0) {
				return(
					<NoResult />
				);
			}else{
				
				return(
					<View style = {{flex: 1, height: 200, backgroundColor: '#fff'}} />
				);
			}
		}

		const ListHeader = () => {
			return(
				<View style = {{flex: 1, height: 95, flexDirection: 'row', alignItems: 'flex-end', paddingRight: 15}}>
					<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginBottom: 10, flex: 1}}>
						{ showTitle() }
					</Text>
					<SecondaryButton title = "Settings" withBorder = {true} color = {ColorScheme.primary} onPressFunction = {this.gotoSettings} />
				</View> 
			);
		}

		return(
			<View style = {{flex:1}}>
				<FlatList 
					ref = "list"
					data = {this.props.notes.items}
					renderItem = {({item, index}) => <EntityItem index = {index} note = {item}/>}
					keyExtractor={(item, index) => item.id}
					ListHeaderComponent = {ListHeader}
					ListFooterComponent = {ListFooter}
					ItemSeparatorComponent = {() => <Separator_1 />}/>
					<TouchableWithoutFeedback onPress = {() => this.newNote()} useForeground = {true}>
						<View style = {[addBtn, {flex: 1, flexDirection: 'row', position: 'absolute', bottom: 16, right: 16}]}>
							<Image source = {require('../images/add.png')} style = {{height: 25, width: 25}} />
						</View>
					</TouchableWithoutFeedback>
				<SearchBar />

				{this.renderFirstNote()}
			</View>
		);
	}
}

const addBtn = {
	backgroundColor: ColorScheme.primary,
	padding: 20,
	borderRadius: 50
}

const shadow = {
	width: 65,
	height: 65,
	color: '#dedede',
	border: 10,
	radius: 30,
	opacity: 1,
	x: 0,
	y: 5,
	style:{
	}
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