import React, {useState} from 'react';
import cn from 'classnames';
import {ProductProps} from './Product.props'
import styles from './Product.module.css'
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {processEnv} from "@next/env";
import {Button} from "../Button/Button";
import {declOfNum, priceRu} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import {stringLiteral} from "@babel/types";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

    return (
        <>
            <Card className={styles.product}>
                <div className={styles.logo}><Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} width={70}
                                                    height={70} layout="responsive" alt={product.title}/></div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>{priceRu(product.price)} {product.oldPrice && <Tag color="green"
                                                                                                 className={styles.oldPrice}> {priceRu(product.price - product.oldPrice)}</Tag>}</div>
                <div className={styles.credit}>{priceRu(product.credit)}/<span className={styles.month}> мес</span>
                </div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}></Rating>
                </div>
                <div className={styles.tags}>{product.categories.map(c => <Tag color="ghost" className={styles.category}
                                                                               key={c}> {c}</Tag>)} </div>
                <div className={styles.priceTitle}>цена</div>
                <div className={styles.creditTitle}>кредит</div>
                <div
                    className={styles.rateTitle}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
                <Divider className={styles.hr}></Divider>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>{product.characteristics.map(c => (
                    <div className={styles.characteristic} key={c.name}>
                        <span className={styles.characteristicsName}> {c.name}</span>
                        <span className={styles.characteristicsDots}> </span>
                        <span className={styles.characteristicsValue}> {c.value}</span>
                    </div>
                ))}</div>
                <div className={styles.advBlock}>
                    {product.advantages &&
                        <div className={styles.advantages}>
                            <div className={styles.advTitle}>Преимущества</div>
                            {product.advantages}
                        </div>
                    }
                    {product.disadvantages &&
                        <div className={styles.disAdvantages}>
                            <div className={styles.advTitle}>Недостатки</div>
                            {product.disadvantages}
                        </div>}
                </div>
                <div className={cn(styles.hr, styles.hr2)}>
                    <hr className={styles.hr}/>
                </div>
                <div className={styles.actions}>
                    <Button appearance="primary"> Узнать подробнее</Button>
                    <Button appearance="ghost" arrow={isReviewOpened ? 'down' : 'right'} className={styles.reviewBtn}
                            onClick={() => setIsReviewOpened(!isReviewOpened)}> Читать отзывы</Button>

                </div>
            </Card>
            <Card color="blue" className={cn(styles.review, {
                [styles.opened]: isReviewOpened,
                [styles.closed]: !isReviewOpened
            })}>
                {product.reviews.map(r => (
                    <div key={r._id}>
                        <Review review={r}></Review>
                        <Divider/>
                    </div>
                ))}
                <ReviewForm productId={product._id}/>
            </Card>
        </>

    );
};

