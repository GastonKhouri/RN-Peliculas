import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';

import useMovies from '../hooks/useMovies';
import MoviePoster from '../components/MoviePoster';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = () => {

    const { setMainColors, setPrevMainColors } = useContext(GradientContext);

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();

    const getPosterColor = async( index: number ) => {

        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [ primary = 'black', secondary = 'grey' ] = await getImageColors( uri );

        setMainColors({
            primary,
            secondary
        });

    }

    useEffect(() => {
        
        if ( nowPlaying.length > 0 ) {
            getPosterColor( 0 );
        }

    }, [ nowPlaying ])

    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='blue' size={ 100 } />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* Carrusel principal */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={ nowPlaying }
                            renderItem={ ({ item }) => <MoviePoster movie={ item } /> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            onSnapToItem={ index => getPosterColor( index ) }
                        />
                    </View>
                    {/* Peliculas populares */}
                    <HorizontalSlider movies={ popular } title="Populares" />
                    {/* Peliculas mejor puntuadas */}
                    <HorizontalSlider movies={ topRated } title="Mejor puntuadas" />
                    {/* Peliculas por venir */}
                    <HorizontalSlider movies={ upcoming } title="Por venir" />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default HomeScreen
