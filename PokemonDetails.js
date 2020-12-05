import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PokemonDetails = ({ route }) => {
    const { pokemonName } = route.params;
    const [pokemon, setPokemon] = useState([])
    const [types, setTypes] = useState([])
    const [abilities, setAbilities] = useState([])
    const [stats, setStats] = useState([])
    var url = ""

    useEffect(() => {
        getPokemonFromApi(pokemonName)
      }, []);

    const getPokemonFromApi = (name) => {
		fetch('https://pokeapi.co/api/v2/pokemon/'+ name.toLowerCase())
		.then((response) => response.json())
		.then((json) => {
            setPokemon(json)
            setTypes(json.types)
            setAbilities(json.abilities)
            setStats(json.stats)
            url = json['sprites']['other']['official-artwork']['front_default']

		})
		.catch((error) => {
			console.error(error)
		});
    }
    
    return(
        <ScrollView>
            <View style={styles.contentContainer}>
                <View style={{ marginTop: 15, flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={styles.pokemonName}>
                            {pokemon.name}{" "} 
                        </Text>
                        <Text style={styles.pokemonId}>
                            #{pokemon.id}
                        </Text>
                    </Text>
                </View>
                {/* <View style={styles.rowStyle}>
                    <Image style={styles.tinyLogo} source={require("")} />
                </View> */}
                <View style={{ flexDirection: 'column' }}>
                    {/* <Image style={styles.mediumPic} source={require("./assets/pokemonMiniatures/1.png")} /> */}
                    <Image style={styles.mediumPic} source={{ uri: url }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.cardInfo}>
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ width: '50%', flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Height</Text>
                                <Text style={styles.cardTextData}>{pokemon.height}</Text>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Base experience</Text>
                                <Text style={styles.cardTextData}>{pokemon.base_experience}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ width: '50%', flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Weight</Text>
                                <Text style={styles.cardTextData}>{pokemon.weight}</Text>
                            </View>
                            {/* <View style={{ width: '50%', flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Weight</Text>
                                <Text style={styles.cardTextData}>{pokemon.weight}</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 }}>
                    <Text style={styles.mediumHeader}>Types</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18, marginTop: 10 }}>
                        {types.map(x => {
								return <View key={x.type.name} style={styles.typeCard}>
                                            <Text style={styles.typeCardText}>{x.type.name}</Text>
                                        </View>
						})}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 }}>
                    <Text style={styles.mediumHeader}>Abilities</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18, marginTop: 10 }}>
                        {abilities.map(x => {
								return <View key={x.ability.name} style={styles.abilityCard}>
                                            <Text style={styles.typeCardText}>{x.ability.name}</Text>
                                        </View>
						})}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 }}>
                    <Text style={styles.mediumHeader}>Stats</Text>
                    <View style={{ flexDirection: 'column', paddingLeft: 18, marginTop: 10 }}>
                        {stats.map(x => {
								return <View key={x.stat.name} style={styles.statCard}>
                                            <Text style={styles.typeCardText}>{x.stat.name} {x.base_stat}</Text>
                                        </View>
						})}
                    </View>
                   
                </View>
            </View>
        </ScrollView>
       
        // <TouchableOpacity style = {{ margin: 128 }} onPress = {() => this.props.navigation.navigate('Pokemons')}>
        //     <Text></Text>
        // </TouchableOpacity>
    )
}
export default PokemonDetails


const styles = StyleSheet.create({
    row:{
        marginTop: 20,
        flexDirection: 'row',
    },
    typeCard:{
        backgroundColor: '#fd7d24',
        width: 90,
        height: 35,
        marginRight: 5,
        borderRadius: 5
    },
    abilityCard:{
        backgroundColor: '#b97fc9',
        width: 90,
        height: 35,
        marginRight: 5,
        borderRadius: 5
    },
    statCard:{
        backgroundColor: '#9bcc50',
        width: 120,
        height: 35,
        marginRight: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    typeCardText:{
        color: 'whitesmoke',
        textAlign: 'center',
        margin: 'auto'
    },
    cardInfo:{
        backgroundColor: '#30a7d7',
        borderRadius: 5,
        width: '90%',
        height: 150,
        margin: 'auto',
    },
    cardText:{
        color: 'whitesmoke',
        fontSize: 18,
        paddingLeft: 15
    },
    mediumHeader:{
        color: 'black',
        fontSize: 22,
        paddingLeft: 18
    },
    cardTextData:{
        color: 'black',
        fontSize: 18,
        paddingLeft: 15
    },
    contentContainer: {
		backgroundColor: 'white',
		flex:1,
	},
    pokemonName: {
		fontSize: 26,
        color: 'black',
    },
    pokemonId: {
		fontSize: 26,
        color: 'gray',
    },
    mediumPic: {
		margin: 'auto',
		width: 175,
		height: 175,
	},
})