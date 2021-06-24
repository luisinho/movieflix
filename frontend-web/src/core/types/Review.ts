import { Movie } from "./Movie";
import { User } from "./User";

export type Review = {
    id: number;
    text: string;
    movie: Movie;
    user: User;
}