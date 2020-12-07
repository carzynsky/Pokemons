import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import Pokemons from './Pokemons'
import Favourites from './Favourites'
import PokemonDetails from './PokemonDetails'


const PokemonsStack = createStackNavigator();

function PokemonsStackScreen() {
  return (
    <PokemonsStack.Navigator>
      <PokemonsStack.Screen options={{ headerShown: false }} name="Pokedex" component={Pokemons} />
      <PokemonsStack.Screen name="Details" component={PokemonDetails} />
    </PokemonsStack.Navigator>
  );
}

const FavouriteStack = createStackNavigator();

function FavouriteStackScreen() {
  return (
    <FavouriteStack.Navigator>
      <FavouriteStack.Screen options={{ headerShown: false }} name="Favourites" component={Favourites} />
      <FavouriteStack.Screen name="Details" component={PokemonDetails} />
    </FavouriteStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppBottomBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pokedex" component={PokemonsStackScreen} />
        <Tab.Screen name="Favourites" component={FavouriteStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
