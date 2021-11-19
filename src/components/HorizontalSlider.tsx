import React from 'react'
import { View, Text, FlatList } from 'react-native'

import MoviePoster from './MoviePoster'
import { Movie } from '../interfaces/movieInterface';

interface Props {
    title?: string;
    movies: Movie[]
}

const HorizontalSlider = ({ title, movies }: Props) => {
    return (
        <View style={{ 
            height: title ? 260 : 220
        }}>
            {
                title && 
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>{ title }</Text>
            }
            <FlatList 
                data={ movies }
                renderItem={ ({ item }) => (
                    <MoviePoster movie={ item } width={ 140 } height={ 200 } />
                )}
                keyExtractor={ (item) => item.id.toString() }
                showsHorizontalScrollIndicator={ false }
                horizontal
            />
        </View>
    )
}

export default HorizontalSlider
