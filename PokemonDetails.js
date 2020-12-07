import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import pokeTypes from './types.json';
const PokemonDetails = ({ route }) => {
    const { pokemonName } = route.params;
    const [pokemon, setPokemon] = useState([])
    const [types, setTypes] = useState([])
    const [abilities, setAbilities] = useState([])
    const [stats, setStats] = useState([])
    const [url, setUrl] = useState("")


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
            setUrl(json['sprites']['other']['official-artwork']['front_default'])
            console.log(url)
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
                    {console.log(url)}
                    <Image style={styles.mediumPic} source={{ uri: url }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.cardInfo}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Height</Text>
                                <Text style={styles.cardTextData}>{pokemon.height}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Base experience</Text>
                                <Text style={styles.cardTextData}>{pokemon.base_experience}</Text>
                            </View>
                            <View style={{  flexDirection: 'column' }}>
                                <Text style={styles.cardText}>Weight</Text>
                                <Text style={styles.cardTextData}>{pokemon.weight}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 }}>
                    <Text style={styles.mediumHeader}>Types</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18, marginTop: 10 , justifyContent:'center'}}>
                        {types.map(x => {
								return <View key={x.type.name} style={styles.typeCard}>
                                            <Text style={styles.typeCardText}>{x.type.name}</Text>
                                        </View>
						})}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 }}>
                    <Text style={styles.mediumHeader}>Abilities</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18, marginTop: 10, justifyContent:'center'}}>
                        {abilities.map(x => {
								return <View key={x.ability.name} style={styles.abilityCard}>
                                            <Text style={styles.typeCardText}>{x.ability.name}</Text>
                                        </View>
						})}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30}}>
                    <Text style={styles.mediumHeader}>Stats</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18,marginLeft:'10%', marginTop: 10, width: '80%', flexWrap:'wrap', justifyContent:'center'}}>
                        {stats.map(x => {
								return <View key={x.stat.name} style={styles.statCard}>
                                            <Text style={styles.typeCardText}>{x.stat.name} {x.base_stat}</Text>
                                        </View>
						})}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 30 , justifyContent:'center'}}>
                    <Text style={styles.mediumHeader}>Type effectiveness</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 18, marginTop: 10, width: '80%', flexWrap:'wrap', justifyContent:'center',marginLeft:'10%'}}>
                    {pokeTypes.map(x => {
                        var effectiveness = {
                            loveJS: 1
                        }
                        types.map(y=>{
                            if(x.weaknesses.includes(y.type.name))effectiveness.loveJS/=2
                            if(x.strengths.includes(y.type.name)) effectiveness.loveJS*=2
                            if(x.immunes.includes(y.type.name))effectiveness.loveJS=0
                        })
                            if(effectiveness.loveJS===1){
								return <View key={x.name} style={styles.typeCard}>
                                            <Text style={styles.typeCardText}>{x.name+" x"+effectiveness.loveJS}</Text>
                                        </View>
                            }
                            if(effectiveness.loveJS<1 && effectiveness.loveJS>0){
								return <View key={x.name} style={styles.typeCardLose} >
                                            <Text style={styles.typeCardText}>{x.name+" x"+effectiveness.loveJS}</Text>
                                        </View>
                            }
                            if(effectiveness.loveJS===0){
								return <View key={x.name} style={styles.typeCardNull} >
                                            <Text style={styles.typeCardText}>{x.name+" x"+effectiveness.loveJS}</Text>
                                        </View>
                            }
                            if(effectiveness.loveJS>1){
								return <View key={x.name} style={styles.typeCardWin} >
                                            <Text style={styles.typeCardText}>{x.name+" x"+effectiveness.loveJS}</Text>
                                        </View>
                            }
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
        backgroundColor: '#483d8b',
        width: "auto",
        height: "auto",
        marginRight: 5,
        marginVertical: 3,
        borderRadius: 5,
        padding: 15,
        paddingVertical: 3
    },
    abilityCard:{
        backgroundColor: '#b97fc9',
        width: '90',
        height: 35,
        marginRight: 5,
        borderRadius: 5
    },
    statCard:{
        backgroundColor: '#9bcc50',
        width: 'auto',
        height: 35,
        marginRight: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    typeCardText:{
        color: 'whitesmoke',
        textAlign: 'center',
        margin: 'auto',
        padding: 3
    },
    cardInfo:{
        backgroundColor: '#30a7d7',
        borderRadius: 5,
        width: 'auto',
        height: 'auto',
        margin: 'auto',
        display: 'flex'
    },
    cardText:{
        color: 'whitesmoke',
        fontSize: 18,
        padding: 15,
        paddingBottom: 0,
        textAlign: 'center'
    },
    mediumHeader:{
        color: 'black',
        fontSize: 22,
        paddingVertical: 18,
        textAlign: 'center'
    },
    cardTextData:{
        color: 'black',
        fontSize: 18,
        padding: 15,
        paddingTop: 0,
        textAlign: 'center'
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
    typeCardLose:{
        backgroundColor: '#b22222',
        width: "auto",
        height: "auto",
        marginRight: 5,
        marginVertical: 3,
        borderRadius: 5,
        padding: 15,
        paddingVertical: 3
    },
    typeCardNull:{
        backgroundColor: '#696969',
        width: "auto",
        height: "auto",
        marginRight: 5,
        marginVertical: 3,
        borderRadius: 5,
        padding: 15,
        paddingVertical: 3
    },
    typeCardWin:{
        backgroundColor: '#228b22',
        width: "auto",
        height: "auto",
        marginRight: 5,
        marginVertical: 3,
        borderRadius: 5,
        padding: 15,
        paddingVertical: 3
    },
})