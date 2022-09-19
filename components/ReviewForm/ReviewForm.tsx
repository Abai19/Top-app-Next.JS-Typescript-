import React from 'react';
import cn from 'classnames';
import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import UserSvg from './user.svg';
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './cross.svg'
import {useForm, Controller} from "react-hook-form";
import {IReviewForm} from "./ReviewForm.interface";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit ,formState:{errors}} = useForm<IReviewForm>();
    const onSubmit = (data: IReviewForm) => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input {...register('name', {required:{ value:true, message:'Заполните имя'}})} error={errors.name} placeholder="Имя"/>
                <Input {...register('title', {required:{ value:true, message:'Заполните заголовок'}})} placeholder="Заголовок отзыва" error={errors.title} className={styles.title}/>
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller control={control}
                                name="rating"
                                render={({field}) =>
                                    (<Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange}></Rating>)}/>

                </div>
                <Textarea error={errors.description} {...register('description', {required:{ value:true, message:'Заполните описание'}})} className={styles.desc} placeholder="Текст отзыва"/>
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить </Button>
                    <span className={styles.info}> * Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <CloseIcon className={styles.close}/>
            </div>
        </form>
    );
};

