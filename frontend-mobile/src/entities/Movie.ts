import { Genre } from './Genre';
import { Review } from './Review';

export type MoviesResponse = {
    content: Movie[];
    totalPages: number;
}

export type Movie = {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    synopsis: string;
    imgUrl: string;
    genre?: Genre;
    reviews: Review[];
}

export const getNewMovie = () => {

    const movie = {
        id: 0,
        title: '',
        subTitle: '',
        year: 0,
        synopsis: '',
        imgUrl: '',
        genre: undefined,
        reviews: []
    };

    return movie as Movie;
}