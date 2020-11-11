import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import pokemons from './pokemons.json'
import { Searchbar } from 'react-native-paper';

const MyComponent = (props) => {
	const [searchQuery, setSearchQuery] = React.useState('');

	const onChangeSearch = query => {
		setSearchQuery(query);
		const pokemonsToRender = pokemons.data.filter((record) => {
				return record[3].includes(query);
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
		this.state = {
			data: this.initData,
			itemToRender: this.itemToRender,
			searchValue: this.searchValue,
		}
	}



	handleChange(value) {
		this.setState({ data: value });
	};

	render() {
		console.log(this.state.searchValue);
		const items = this.state.data.map((item, index) => {
			const types = item[4].split(' ').map((type) =>  {
				return <Image key={index + type} style={styles.tinyLogo} source={require("./assets/pokemonTypes/" + (type) + ".png")} />
			})

			if (index +1 <= this.state.itemToRender) {
				return <View key={index} style={styles.item}>
					<View style={styles.marginLeft}>
						<Text style={styles.text}>{item[1]} </Text>
						<Text style={styles.text}>{item[2]} </Text>
						<Image style={styles.tinyLogo} source={require("./assets/pokemonMiniatures/" + item[0] + ".png")} />
						<Text style={styles.text}>{item[3]} </Text>
						{types}
					</View>
				</View>
			}
		})

	
		return ( 
			<View style={styles.contentContainer}>

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
						<View style={styles.header}>
							<Text style={styles.headerText}>Header</Text>
						</View>
						<MyComponent handler={this.handleChange.bind(this)}></MyComponent>
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
	    width: 50,
	    height: 50,
	},
}) 


