import React from 'react';
import { View, TouchableWithoutFeedback, Image, Dimensions, Text, FlatList, Button, Animated, BackHandler } from 'react-native';
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
import ASService from '../utils/AsyncStorageService';
import MultipleHeader from '../components/MultipleHeader';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			translateAnim: new Animated.Value(-65),
			fadeAnim: new Animated.Value(0),
			animatePlus: new Animated.Value(-50),
			shareText: this.props.shareText
		}
		this.newNote = this.newNote.bind(this);
		this.scroll = this.scroll.bind(this);
		this.gotoSettings = this.gotoSettings.bind(this);
		this.renderFirstNote = this.renderFirstNote.bind(this);
		this.onBack = this.onBack.bind(this);
		if(this.state.shareText) {
			Actions.noteActivity({
				note: this.state.shareText,
				action: 'share'
			});
		}
	}

	componentWillMount() {
		this.props.getNotes();
		ASService.init();

	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPressed', this.onBack)
	}

	newNote = () => {
		Actions.noteActivity({
			action: 'new'}
		);
	}

	scroll = () => {
		if(this.props.app.scrollToTop) {
			this.refs.list.scrollToOffset({x: 0, y: 0, animated: true});
			this.props.notScrollToTop();
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPressed', this.onBack);
		Animated.spring(this.state.translateAnim, {
			toValue: 16,
			friction: 2,
			tension: 2
		}).start();
		Animated.timing(this.state.fadeAnim, {
			toValue: 1
		}).start();
		Animated.spring(this.state.animatePlus, {
			toValue: 0,
			friction: 2
		}).start();
	}

	gotoSettings = () => {
		Actions.settingsActivity();
	}

	onBack = () => {
		if(this.props.app.multiple) {
			this.props.multipleClose();
			return true;
		}
		return false;
	}

	renderFirstNote = () => {
		if(this.props.notes.allNotes.length == 0 && !this.props.notes.isSearching) {
			return(
				<View style = {{position: 'absolute', height: '100%', backgroundColor: '#fff', width: '100%', top: 0}}>
					<View style = {{flex: 1, alignItems: 'center', paddingTop: 50}}>
						<Text style = {{fontSize: 20, padding: 20, color: ColorScheme.primary}}>Welcome to Paper!</Text>
						<Text style = {{width: 150, textAlign: 'center', marginBottom: 80, fontSize: 17}}><Text style = {{fontWeight: 'bold', color: '#212121'}}>Tap</Text> on the plus button to add your first note</Text>
						
						<Animated.View style = {{top: this.state.animatePlus}}>
							
								<TouchableWithoutFeedback onPress = {() => this.newNote()} useForeground = {true}>
										<Animated.View style = {[addBtn, {opacity: this.state.fadeAnim}]}>
											<Image source = {require('../images/add.png')} style = {{height: 20, width: 20}} />
										</Animated.View>
								</TouchableWithoutFeedback>
							
						</Animated.View>
					</View>
				</View>
			);
		}
		return null;
	}

	render() {

		const showTitle = () => {
			if(this.props.notes.isSearching) {
				return 'Result (' + this.props.notes.activeNotes.length + ')';
			}else if(this.props.app.markAll) {
				return 'Selected (' + this.props.notes.allNotes.length + ')';
			}else if(this.props.app.selectedItems.length) {
				return 'Selected (' + this.props.app.selectedItems.length + ')';
			}else if(this.props.app.multiple){
				return 'None selected';
			}else{
				return 'All notes (' + this.props.notes.allNotes.length + ')';
			}
		}

		const ListFooter = () => {
			if(this.props.notes.isSearching && this.props.notes.activeNotes.length == 0) {
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
					<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 17, marginLeft: 25, marginBottom: 10, flex: 1}}>
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
					data = {this.props.notes.activeNotes}
					renderItem = {({item, index}) => <EntityItem index = {index} note = {item}/>}
					keyExtractor={(item, index) => item.id}
					ListHeaderComponent = {ListHeader}
					ListFooterComponent = {ListFooter}
					ItemSeparatorComponent = {() => <Separator_1 />}/>
					<TouchableWithoutFeedback onPress = {() => this.newNote()} useForeground = {true}>
						<Animated.View style = {[addBtn, {flex: 1, flexDirection: 'row', position: 'absolute', bottom: this.state.translateAnim, right: 16}]}>
							<Image source = {require('../images/add.png')} style = {{height: 20, width: 20}} />
						</Animated.View>
					</TouchableWithoutFeedback>
				{ this.props.app.multiple ? <MultipleHeader /> : <SearchBar />}

				{this.renderFirstNote()}
				{this.scroll()}
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
		notes: state.notes,
		app: state.app
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes,
		notScrollToTop: ACTIONS.notScrollToTop,
		multipleClose: ACTIONS.multipleClose
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainActivity);