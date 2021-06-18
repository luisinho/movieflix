import { Movie } from 'core/types/Movie';
import './styles.scss';

type Props = {
    movie: Movie;
}

const Sinopse = ({ movie }: Props) => {
    return (
        <div className="main-sinopse">
            <img src={movie.imgUrl} alt={movie.title} className="sinopse-image" />
        </div>
    );
}

export default Sinopse;