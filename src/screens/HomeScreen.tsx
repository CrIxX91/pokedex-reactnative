import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePkmPaginated';
import {PokemonCard} from '../components/PokemonCard';

import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react';


export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemonList, loadPokemons} = usePokemonPaginated();
  
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <>
     
      

      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={{alignItems:'center'}}>

        <FlatList
          data={pokemonList}
          keyExtractor={pkm => pkm.id}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                marginBottom: top + 20,
                paddingBottom:10,
                top: top + 20,
              }}>
              Pokedex
            </Text>
          }
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />

      </View>

      
    </>
  );
};
