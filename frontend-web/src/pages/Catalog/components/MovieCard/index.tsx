import { Movie } from 'core/types/Movie';
import './styles.scss';

type Props = {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return (
        <div className="movie-card">
            <img src={movie.imgUrl} alt={movie.title} className="movie-card-image" />
            <div className="movie-card-title">
                {movie.title}
                <h6 className="movie-card-title-year">{movie.year}</h6>
            </div>
            <div className="movie-card-sub-title">
                {movie.subTitle}
            </div>
        </div>
    );
}

export default MovieCard;