import { useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import ButtonBack from 'core/components/ButtonBack';
import ButtonSubmit from 'core/components/ButtonSubmit';
import './styles.scss';

const NewPassword = () => {

    const paramUseHistory = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(paramUseHistory.location.search);
        console.log('process333', parsed.processId);

    }, [paramUseHistory]);

    return (
        <div className="new-password-main">
            <div className="new_password-title">
                Codigo senha
            </div>

            <div className="div-btns">

                <div className="p-1">
                    <ButtonBack />
                </div>

                <div className="p-1">
                    <ButtonSubmit label={'Alterar'} />
                </div>

            </div>

        </div>
    );
}

export default NewPassword;