import { ReactComponent as ImageCar } from 'core/assets/images/image-card.svg';
import './styles.scss';

const MovieCard = () => (
    <div className="movie-card">
        <ImageCar className="movie-card-image" />
        <div className="movie-card-title">
            O Retorno do Rei 2103
        </div>
        <div className="movie-card-sub-title">
            O olho do inimigo está se movendo.
        </div>
    </div>
);

export default MovieCard;