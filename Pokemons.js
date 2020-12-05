import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import pokemons from './pokemons.json'
import { Modal, Searchbar, Button, ActivityIndicator, Colors } from 'react-native-paper';
import Voice from '@react-native-community/voice';

const MySearchbar = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [started, setStarted] = useState(false)
	const [recognized, setRecognized] = useState(false)
	const [results, setResults] = useState([])

	const onChangeSearch = query => {
		setSearchQuery(query);
		const pokemonsToRender = pokemons.data.filter((record) => {
				return record[3].toLowerCase().includes(query.toLowerCase());
		});
		props.handler(pokemonsToRender);
	}

	// const handleVoiceSearching = () => {
	// 	props.voiceSearchHandle()
	// 	Voice.start('en-US')
	// }

	Voice.onSpeechResults = (e) => {
		setResults(e.value)
		console.log(e.value)
		props.voiceSearchHandle
	}

	Voice.onSpeechRecognized = (e) => {
		setRecognized(true)
	}

	Voice.onSpeechStart = (e) => {
		setStarted(true)
	}

	async function startRecognition(e){
		setStarted(false)
		setRecognized(false)
		setResults([])
		try {
			props.voiceSearchHandle()
			await Voice.start('en-US');
		} catch (e) {
			console.error(e);
		}
	  }
	return (
		<View>
			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				value={searchQuery}/>
			<Button icon='microphone' onPress={startRecognition}>Voice search</Button>
		</View>
	  
	);
  };


export default class List extends Component {
	constructor(props) {
		super(props)

		this.initData = pokemons.data;
		this.itemToRender = 20;
		this.searchValue = "";
		this.chosenPokemon = ["test", "test","test", "bulbasaur"]
		this.fetchedPokemon = ["test", "test", "test", "test", [], [], []]
		this.state = {
			data: this.initData,
			itemToRender: this.itemToRender,
			searchValue: this.searchValue,
			visible: false,
			voiceSearchModalVisible: false
		}
	}

	_hideModal = () => this.setState({ visible: false });

	// handle open / close
	handleVoiceSearchModal = () => this.setState({ voiceSearchModalVisible: !this.state.voiceSearchModalVisible })

	handleChange(value) {
		this.setState({ data: value, itemToRender:20 });
	};

	getPokemonFromApi = (name) => {
		fetch('https://pokeapi.co/api/v2/pokemon/'+ name.toLowerCase())
		.then((response) => response.json())
		.then((json) => {
			let imgUrl = "./assets/pokemonMiniatures/" + json.id + ".png"
			const data = [imgUrl, json.name, json.base_experience, json.height, json.types, json.abilities, json.stats]
			this.fetchedPokemon = data
			console.log(json)
			this.setState({ visible: true })
		})
		.catch((error) => {
			console.error(error)
		});
	}

	render() {
		const items = this.state.data.map((item, index) => {
			const types = item[4].split(' ').map((type) =>  {
				return <Image key={index + type} style={styles.tinyLogo} source={require("" + "./assets/pokemonTypes/" + (type) + ".png")} />
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
				<MySearchbar style={styles.searchbar} handler={this.handleChange.bind(this)} voiceSearchHandle={this.handleVoiceSearchModal.bind(this)}></MySearchbar>
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
					<Modal visible={this.state.voiceSearchModalVisible} onDismiss={this.handleVoiceSearchModal} contentContainerStyle={styles.voiceSearchModal}>
						<ActivityIndicator animating={true} color={Colors.red800} size='large'/>
						<Text style={styles.modalTitleText}>Listening...</Text>
					</Modal>
					<Modal visible={this.state.visible} onDismiss={this._hideModal} contentContainerStyle={styles.modalStyle}>
						<Text style={styles.modalTitleText}>{this.fetchedPokemon[1].toUpperCase()}</Text>
						<View style={styles.modalRow}>
							<Text style={styles.modalCategoryText}>Base experience: </Text>
							<Text style={styles.modalItem}>{this.fetchedPokemon[2]}</Text>
						</View>
						<View style={styles.modalRow}>
							<Text style={styles.modalCategoryText}>Height: </Text>
							<Text style={styles.modalItem}>{this.fetchedPokemon[3]}</Text>
						</View>
						<View style={{ marginTop: 15 }}>
							<Text style={styles.modalCategoryText}>Types:</Text>
							{this.fetchedPokemon[4].map(x => {
								return 	<View><Text>{x.type.name}</Text></View>
							})}
						</View>
						<View style={{ marginTop: 5 }}>
							<Text style={styles.modalCategoryText}>Abilities:</Text>
							{this.fetchedPokemon[5].map(x => {
								return 	<View><Text>{x.ability.name}</Text></View>
							})}
						</View>
						<View style={{ marginTop: 5 }}>
							<Text style={styles.modalCategoryText}>Stats:</Text>
							{this.fetchedPokemon[6].map(x => {
								return 	<View><Text>{x.stat.name} {x.base_stat}</Text></View>
							})}
						</View>
						<Button 
							mode="contained"  
							theme={{ roundness: 40 }}
							style={styles.button}
							uppercase={false}
							onPress={() => this.props.navigation.navigate('Details', {
								pokemonName: this.fetchedPokemon[1]
							})}>
							<Text style={styles.buttonText}>More</Text>
						</Button>
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
	modalTitleText:{
		paddingTop: 15,
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
	},
	modalCategoryText:{
		flex:1,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black'
	},
	modalItem:{
		fontSize: 18,
		color: 'black'
	},
	modalRow:{
		marginTop: 5,
		flexDirection: 'row'
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
		margin: 'auto',
		width: '80vw',
		height: '70vh',
		maxHeight: 500,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 30
	},
	voiceSearchModal:{
		margin: 'auto',
		alignItems: 'center',
		height: 200,
		width: 200,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 30
	},
	button:{
		marginTop: 15,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: '#f93318',
		width: 95,
		height: 35,
	},
	buttonText:{
		color: 'whitesmoke',
		fontSize: 14,
	}
})


