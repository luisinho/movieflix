import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { getLoggedUser } from 'core/utils/auth';
import { getNewReview, Review } from 'core/types/Review';

import { makePrivateRequest } from 'core/utils/request';
import { URL_REVIEWS } from 'core/utils/ApiUrl';
import ReviewList from '../ReviewList';
import './styles.scss';

type Props = {
    moveId: number;
}

type FormData = {
    text: string;
}

const ReviewForm = ({ moveId }: Props) => {

    const userId = getLoggedUser();

    const reviewMoveId = moveId;

    const [newQuantityReview, setNewQuantityReview] = useState<number>(0);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {

        const review: Review = getNewReview();

        review.text = formData.text;
        review.movie.id = moveId;
        review.user.id = userId;

        makePrivateRequest({ method: 'POST', url: URL_REVIEWS, data: review })
            .then(response => {
                if (response.status === 201) {
                    console.log('Avalição criada com sucesso.');
                    setNewQuantityReview(newQuantityReview + 1);
                }
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
                reset();
            });
    }

    return (
        <div className="d-flex flex-column">

            <div className="main-review-form">

                <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        className={`form-control review-text-area ${errors.text ? 'is-invalid' : ''}`}
                        placeholder="Deixe sua avaliação aqui"
                        {...register("text", { required: "Campo avaliação obrigatório." })}
                    />
                    {errors.text && (
                        <div className="invalid-feedback d-block text-center mt-2">
                            {errors.text.message}
                        </div>
                    )}

                    <button className="review-btn-save">
                        Salvar Avaliação
                    </button>
                </form>

            </div>

            <div>
                <ReviewList reviewMoveId={reviewMoveId} newQuantityReview={newQuantityReview} />
            </div>
        </div>
    );
}

export default ReviewForm;