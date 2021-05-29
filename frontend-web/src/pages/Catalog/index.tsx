import GenreComboBox from '../Genre/components/ComboBox';
import MovieCard from './components/MovieCard';
import './styles.scss';

const Catalog = () => {
    return (
        <div>
            <div className="card-combo-box">
                <GenreComboBox />
            </div>
            <div className="catalog-movie">
                <MovieCard />
            </div>
        </div>
    );
}

export default Catalog;