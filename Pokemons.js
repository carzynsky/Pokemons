import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import pokemons from './pokemons.json'
import { Modal, Searchbar } from 'react-native-paper';

const MySearchbar = (props) => {
	const [searchQuery, setSearchQuery] = React.useState('');

	const onChangeSearch = query => {
		setSearchQuery(query);
		const pokemonsToRender = pokemons.data.filter((record) => {
				return record[3].includes(query.charAt(0).toUpperCase() + query.slice(1))
		});
		props.handler(pokemonsToRender);
	}

	return (
	  <Searchbar
		placeholder="Search"
		onChangeText={onChangeSearch}
		value={searchQuery}
	  />
	);
  };


export default class List extends Component {
	constructor(props) {
		super(props)

		this.initData = pokemons.data;
		this.itemToRender = 20;
		this.searchValue = "";
		this.chosenPokemon = ["test", "test","test", "bulbasaur"]
		this.fetchedPokemon = ""
		this.state = {
			data: this.initData,
			itemToRender: this.itemToRender,
			searchValue: this.searchValue,
			visible: false
		}
	}

	_hideModal = () => this.setState({ visible: false });


	handleChange(value) {
		this.setState({ data: value, itemToRender:20 });
	};

	getPokemonFromApi = (name) => {
		fetch('https://pokeapi.co/api/v2/pokemon/'+ name.toLowerCase())
		.then((response) => response.json())
		.then((json) => {
			this.fetchedPokemon = json.name
			this.setState({ visible: true })
		})
		.catch((error) => {
			console.error(error)
		});
	}

	render() {
		const items = this.state.data.map((item, index) => {
			const types = item[4].split(' ').map((type) =>  {
				return <Image key={index + type} style={styles.tinyLogo} source={require("./assets/pokemonTypes/" + (type) + ".png")} />
			})

			if (index +1 <= this.state.itemToRender) {
				return <TouchableOpacity onPress={()=>{
					this.getPokemonFromApi(item[3])
					}}>
					<View key={index} style={styles.item}>
						<View style={styles.marginLeft}>
							<Text style={styles.text}>{item[1]} </Text>
							<Text style={styles.text}>{item[2]} </Text>
							<Image style={styles.tinyLogo} source={require("./assets/pokemonMiniatures/" + item[0] + ".png")} />
							<Text style={styles.text}>{item[3]} </Text>
							{types}
						</View>
					</View>
				</TouchableOpacity>
			}
		})


		return (
			<View style={styles.contentContainer}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Header</Text>
				</View>
				<MySearchbar style={styles.searchbar} handler={this.handleChange.bind(this)}></MySearchbar>
				<ScrollView
					scrollEventThrottle={1}

					onScroll={(e) => {
						const scrollPosition = e.nativeEvent.contentOffset.y;
						const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
						const contentHeight = e.nativeEvent.contentSize.height;
						const isScrolledToBottom = contentHeight + scrollPosition;

						if(isScrolledToBottom >= (contentHeight-50) && this.itemToRender <= this.state.data.length) {
							this.setState({itemToRender: this.state.itemToRender +10})
						}
					}}
					>
						<View>
							{items}
						</View>
					</ScrollView>
					<Modal visible={this.state.visible} onDismiss={this._hideModal} contentContainerStyle={styles.modalStyle}>
						<Text>{this.fetchedPokemon}</Text>
	  				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		height: 60,
		backgroundColor: 'orange',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	contentContainer: {
		backgroundColor: 'white',
		flex:1,
	},
	item: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'grey',
		alignItems: 'center',
	},
	marginLeft: {
		flexDirection: 'row',
	},
	menu: {
		width: 20,
		height: 2,
		backgroundColor: '#111',
		margin: 2,
		borderRadius: 3,
	},
	text: {
		marginVertical: 30,
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 10
	},
	tinyLogo: {
		margin: 'auto',
		width: 50,
		height: 50,
	},
	modalStyle: {
		backgroundColor: 'white',
		padding: 20
	},
})


