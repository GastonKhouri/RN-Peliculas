import { useEffect, useState } from 'react';

import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

export interface MovieDetails {
    isLoading: boolean;
    cast: Cast[];
    movieFull?: MovieFull;
}

const useMovieDetails = ( movieId: number ) => {
    
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        cast: [],
        movieFull: undefined,
    });

    const getMovieDetails = async() => {

        const movieDetailsPromise = movieDB.get<MovieFull>(`/${ movieId }`);
        const castPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);

        const resps = await Promise.all([
            movieDetailsPromise,
            castPromise
        ])

        setState({
            movieFull: resps[0].data,
            cast: resps[1].data.cast,
            isLoading: false
        })

    }

    useEffect(() => {
        
        getMovieDetails();

    }, [])

    return {
        ...state
    }

}

export default useMovieDetails
