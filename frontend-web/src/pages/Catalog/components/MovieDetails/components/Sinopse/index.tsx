import { Movie } from 'core/types/Movie';

import './styles.scss';

type Props = {
    movie: Movie;
}

const Sinopse = ({ movie }: Props) => {
    return (
        <div className="main-sinopse d-flex flex-row">

            <img src={movie.imgUrl} alt={movie.title} className="sinopse-image" />

            <div className="sinopse-title">
                {movie.title}
                <h6 className="sinopse-title-year">{movie.year}</h6>

                <div className="sinopse-sub-title">
                    {movie.subTitle}
                </div>

                <div className="sinopse-description">
                    {movie.synopsis}
                </div>

            </div>

        </div>
    );
}

export default Sinopse;