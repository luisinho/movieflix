import { getNewMovie, Movie } from './Movie';
import { getNewUser, User } from './User';

export type ReviewsResponse = {
    content: Review[];
    totalPages: number;
}

export type Review = {
    id: number;
    text: string;
    movie: Movie;
    user: User;
    createdAt: Date;
}

export const getNewReview = () => {

    const review = {
        id: 0,
        text: '',
        movie: getNewMovie(),
        user: getNewUser()
    }

    return review as Review;
}