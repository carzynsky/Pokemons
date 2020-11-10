import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import pokemons from 'pokemons.json'
import { Searchbar } from 'react-native-paper';


const MyComponent = (props) => {
	const [searchQuery, setSearchQuery] = React.useState('');
  
  
	return (
	  <Searchbar
		placeholder="Search"
		onChangeText= {(query) => {props.handler(query)}}
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
		this.setState({ searchValue: value });
	};

	render() {
		const items = this.state.data.map((item, index) => {
			const types = item[3].split(' ').map((type) =>  {
				return <Image key={index + type} style={styles.tinyLogo} source={require("./assets/pokemonTypes/" + (type) + ".png")} />
			})

			if (index +1 <= this.state.itemToRender) {
				console.log("./Strona/" + (index+1) + ".png")
				return <View key={index} style={styles.item}>
					<View style={styles.marginLeft}>
						<Text style={styles.text}>{item[0]} </Text>
						<Text style={styles.text}>{item[1]} </Text>
						<Image style={styles.tinyLogo} source={require("./assets/pokemonMiniatures/" + (index+1) + ".png")} />
						<Text style={styles.text}>{item[2]} </Text>
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
						<MyComponent handler={this.handleChange}></MyComponent>
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


