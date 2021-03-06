import React from 'react';
import 'react-native-gesture-handler';
import Pokemons from './Pokemons.js';
import PokemonDetails from './PokemonDetails.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Pokemons"
                component={Pokemons}/>
            <Stack.Screen
                name="Details"
                component={PokemonDetails}/>
        </Stack.Navigator>
    </NavigationContainer>
 )
 export default Routes;