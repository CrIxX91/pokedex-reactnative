import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePkm';
import { PokemonDetails } from '../components/PokemonDetails';



interface Props extends StackScreenProps<RootStackParams,'PokemonScreen'>{};

export const PokemonScreen = ({navigation,route}:Props) => {

  const {simplepokemon,color}= route.params;
  const {top} = useSafeAreaInsets();
  const {id,name,picture} =simplepokemon;
  const {isLoading,pokemon:pkm} =  usePokemon(id);
  
  return (
    <View style={{flex:1}}>

    <View
      style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.backButton,
          top: top + 5,
        }}
        onPress={() => navigation.pop()}>
        <Icon name="arrow-back-outline" color="White" size={30} />
      </TouchableOpacity>

      <Text style={{...styles.pokemonName, top: top + 40}}>
        {name}
        {'\n#' + id}
      </Text>
      <Image
        source={require('../assets/pokebola-blanca.png')}
        style={styles.pokebolaBG}
      />
      <FadeInImage uri={picture} style={styles.pokemonImage} />
      
    </View>
    

        {
          isLoading?(
          <View style={styles.loadingIndicator}>
            <ActivityIndicator color={color} size={50} />
          </View>
          ):<PokemonDetails pokemon={pkm}/>
        }
    

    </View>


  )
}

const styles = StyleSheet.create(
  {
    headerContainer:{
      height:370,
      zIndex:999,
      alignItems:'center',
      borderBottomLeftRadius:1000,
      borderBottomRightRadius:1000

    },

    backButton:{
      position:'absolute',
      left:15
      
    },pokemonName:{
      color:'white',
      fontSize:40,
      left:20,
      alignSelf:'flex-start'
    },
    pokebolaBG:{
      width:250,
      height:250,
      bottom:-20,
      opacity:0.7

    },
    pokemonImage:{
      width:250,
      height:250,
      position:'absolute',
      bottom:-15
    },
    loadingIndicator:{
      flex:1,
      justifyContent:'center',
      alignContent:'center'
    }
  }
)
