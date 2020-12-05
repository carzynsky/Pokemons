import * as React from 'react'
import { BottomNavigation } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import Home from './Home'
import PokemonsRoutes from './PokemonsRoutes'
import Favourites from './Favourites'
import Other from './Other'

const HomeRoute = () =>  <Home />;

const PokemonsRoute = () => <PokemonsRoutes />;

const FavouritesRoute = () => <Favourites />;

const OtherRoute = () => <Other />;

const AppBottomBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'pokemons', title: 'Pokemony' , icon: 'pokeball' },
    { key: 'favourites', title: 'Ulubione', icon: 'star' },
    { key: 'other', title: 'Inne', icon: 'settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    pokemons: PokemonsRoute,
    favourites: FavouritesRoute,
    other: OtherRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={index === 1 ? 'whitesmoke' : 'black'}
      
      barStyle={{backgroundColor: 
        index === 0 ? '#fff933' 
        : index === 1 ? '#f93318'
        : 'whitesmoke'}}
    />
  );
};

export default AppBottomBar;

const styles = StyleSheet.create({
  colors: {
    backgroundColor: '#f8fc03'
  },
});
