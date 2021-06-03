import { GenresResponse } from 'core/types/Genre';
import { useState } from 'react';
import './styles.scss';

const GenreComboBox = () => {

    // const [senresResponse, setGenresResponse] = useState<GenresResponse>();
    return (
        <select name="genre" className="combo-box-genre">
            <option value="1">Genero 1</option>
            <option value="2">Genero 2</option>
            <option value="3">Genero 3</option>
        </select>
    );
}

export default GenreComboBox;