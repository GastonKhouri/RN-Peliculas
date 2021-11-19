import React from 'react'
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';

import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import CastItem from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>

                {/* Informacion */}
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="star-outline" color="grey" size={ 16 } />
                    <Text> { movieFull.vote_average } </Text>
                    <Text>- { movieFull.genres.map( g => g.name ).join(', ') }</Text>
                </View>

                {/* Sinopsis */}
                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Sinopsis
                </Text>

                <Text style={{ fontSize: 16 }}>
                    { movieFull.overview }
                </Text>

                {/* Presupuesto */}
                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>

                <Text style={{ fontSize: 18 }}>
                    { currencyFormatter.format(movieFull.budget, { code: 'USD' }) }
                </Text>

            </View>

            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Actores
                </Text>

                <FlatList 
                    data={ cast }
                    renderItem={ ({ item }) => (
                        <CastItem actor={ item } />
                    )}
                    keyExtractor={ (item) => item.id.toString() }
                    showsHorizontalScrollIndicator={ false }
                    horizontal
                    style={{ marginTop: 10, height: 70 }}
                />
            </View>

        </>
    )
}

export default MovieDetails
