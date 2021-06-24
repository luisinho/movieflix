import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { getLoggedUser } from 'core/utils/auth';
import { Review } from 'core/types/Review';

import { getNewMovie } from 'core/types/Movie';
import { getNewUser } from 'core/types/User';

import { makePrivateRequest } from 'core/utils/request';
import { URL_REVIEWS } from 'core/utils/ApiUrl';
import './styles.scss';

type Props = {
    moveId: number;
}

type FormData = {
    review: Review;
}

const ReviewForm = ({ moveId }: Props) => {

    const userId = getLoggedUser();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {

        formData.review.movie = getNewMovie();
        formData.review.user = getNewUser();

        formData.review.movie.id = moveId;
        formData.review.user.id = userId;

        makePrivateRequest({ method: 'POST', url: URL_REVIEWS, data: formData.review })
            .then(response => {
                if (response.status === 201) {
                    console.log('Avalição criada com sucesso.');
                }
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
                reset();
            });
    }

    return (
        <div className="main-review-form">

            <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    className={`form-control review-text-area ${errors.review?.text ? 'is-invalid' : ''}`}
                    placeholder="Deixe sua avaliação aqui"
                    {...register("review.text", { required: "Campo avaliação obrigatório." })}
                />
                {errors.review?.text && (
                    <div className="invalid-feedback d-block text-center mt-2">
                        {errors.review?.text.message}
                    </div>
                )}

                <button className="review-btn-save">
                    Salvar Avaliação
                </button>
            </form>

        </div>
    );
}

export default ReviewForm;