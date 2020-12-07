import React, { Component} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Button, ActivityIndicator, Colors, IconButton} from 'react-native-paper';
import pokemons from './pokemons.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Favourites extends Component {
	constructor(props) {
    super(props)
		this.initData = pokemons.data;
		this.itemToRender = 20;
		this.searchValue = "";
		this.chosenPokemon = ["test", "test","test", "bulbasaur"]
		this.fetchedPokemon = ["test", "test", "test", "test", [], [], []]
		this.state = {
			data: pokemons.data,
			itemToRender: this.itemToRender,
      visible: false,
      favourites: {}
		}
  }

  inDict(dict) {
    console.log(dict);
    return function(element) {
        return dict[element.toLowerCase()] !== undefined;
    }
  }

  async componentDidMount() {
		// await this.storeData({});
    const favDict = await this.getData();
    let filterFunc = this.inDict(favDict);

    const favouritesToRender = pokemons.data.filter((record) => {
      return filterFunc(record[3]);
    });
    
		this.setState({ data: favouritesToRender});
	
	}

	storeData = async (value) => {
		try {
		  const jsonValue = JSON.stringify(value)
		  await AsyncStorage.setItem('@favourites', jsonValue)
		} catch (e) {
		  // saving error
		}
	}

	getData = async () => {
		try {
		  const value = await AsyncStorage.getItem('@favourites')
		  return value != null ? JSON.parse(value) : {};
		} catch(e) {
		  console.log(e);
		}
	  }
  
	_hideModal = () => this.setState({ visible: false });

	handleChange(value) {
		this.setState({ data: value, itemToRender:20 });
	};

	render() {
    
		const items = this.state.data.map((item, index) => {
			const types = item[4].split(' ').map((type) =>  {
				return <Image key={index + type} style={styles.tinyLogo} source={require("" + "./assets/pokemonTypes/" + (type) + ".png")} />
			})

			if (index +1 <= this.state.itemToRender) {
				return <TouchableOpacity onPress={()=>{
					  this.props.navigation.navigate('Details', {
              pokemonName: item[3]
            })
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
