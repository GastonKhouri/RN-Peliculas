import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParams } from '../navigation/Navigation';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';

const { height } = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { top } = useSafeAreaInsets();
    const { cast, movieFull, isLoading } = useMovieDetails( movie.id );

    return (

        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image
                        source={{ uri }}
                        style={ styles.image }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subtitle } >{ movie.original_title }</Text>
                <Text style={ styles.title } >{ movie.title }</Text>
            </View>

            {
                isLoading 
                ? <ActivityIndicator color='grey' size={ 35 } style={{ marginTop: 20 }} />
                : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }    
            
            {/* Boton para regresar */}
            <View style={{ 
                ...styles.backButton ,
                top: top + 5
            }}>
                <TouchableOpacity
                    onPress={ () => navigation.popToTop() }
                >
                    <Icon 
                        name="arrow-back-outline"
                        size={ 50 }
                        color="white"
                    />
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    image: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: height * 0.7,   
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,

        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 5,
        left: 5
    }
});

export default DetailScreen
