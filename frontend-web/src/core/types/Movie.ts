import { Genre } from "./Genre"

export type MoviesResponse = {
    content: Movie[];
}

export type Movie = {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    synopsis: string;
    imgUrl: string;
    genre: Genre;
    reviews: [];
}