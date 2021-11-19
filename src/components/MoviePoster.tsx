import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';

import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    return (
        <TouchableOpacity 
            onPress={ () => navigation.navigate( 'DetailScreen', movie ) }
            activeOpacity={ 0.8 }
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}
        >
            <View style={ styles.imageContainer }>
                <Image
                    source={{ uri }}
                    style={ styles.image }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    }
});

export default MoviePoster
