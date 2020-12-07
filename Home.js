import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
        <Image style={{width: 500, height: 500}} source={require("./assets/pikachu.png")} />
        <Text style={{marginTop: 50, fontSize: 26}}>Witaj w aplikacji Pokemons!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
