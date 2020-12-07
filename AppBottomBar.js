import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <MaterialCommunityIcons
                    name={
                      focused
                        ? 'home-variant'
                        : "home-variant-outline"
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Pokedex') {
                return (
                  <MaterialCommunityIcons
                    name={'pokeball'}
                    size={size}
                    color={focused ? '#f93318' : 'gray'}
                  />
                );
              }
              else{
                return (
                  <AntDesign
                    name={focused ? 'star' : 'staro'}
                    size={size}
                    color={focused ? 'yellow' : 'gray'}
                  />
                );
              }
            },
          })}
        tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pokedex" component={PokemonsStackScreen} />
        <Tab.Screen name="Favourites" component={FavouriteStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
