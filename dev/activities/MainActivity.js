import React from 'react';
import { View, TouchableWithoutFeedback, Image, Dimensions, Text, FlatList } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import AppBar from '../components/AppBar';
import EntityItem from '../components/EntityItem';
import SearchBar from '../components/SearchBar';
import Separator_1 from '../components/Separator_1';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
		this.newNote = this.newNote.bind(this);
	}

	componentWillMount() {
		this.props.getNotes();
	}

	componentWillUpdate(nextProps, nextState) {
		this.refs.list.scrollToOffset({x: 0, y: 0, animated: true})
	}

	newNote = () => {
		Actions.noteActivity({
			action: 'new'}
		);
	}

	render() {
		return(
			<View style = {{flex:1}}>
				<FlatList 
					ref = "list"
					data = {this.props.notes}
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
			</View>
		);
	}
}

const ListHeader = () => {
	return(
		<View style = {{flex: 1, height: 95, justifyContent: 'flex-end', alignItems: 'center'}}>
			<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginBottom: 10}}>
				All Notes
			</Text>
		</View> 
	);
}

const ListFooter = () => {
	return(
		<View style = {{flex: 1, height: 95, backgroundColor: '#fff'}}>
			
		</View> 
	);
}

const addBtn = {
	backgroundColor: ColorScheme.primary,
	padding: 20,
	borderRadius: 50
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