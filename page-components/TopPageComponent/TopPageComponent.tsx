import React, {useReducer} from 'react';
import TopPageComponentProps from './TopPageComponent.props';
import {Advantages, HhData, Htag, Product, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css'
import {TopLevelCategory} from '../../interfaces/page.interface';
import {SortEnum} from "../../components/Sort/Sort.props";
import {sortReducer} from "./sort.reducer";

const TopPageComponent = ({page,products, firstCategory}: TopPageComponentProps) : JSX.Element => {
    const [{products: sortedProducts, sort}, dispatchSort]= useReducer(sortReducer,{products, sort: SortEnum.Rating});
    const setSort = (sort:SortEnum) => {
        dispatchSort({type: sort})
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products &&  <Tag color="grey" size="medium"> {products.length}</Tag>}
              <Sort sort={sort} setSort={setSort} />

            </div>
            <div>
                {sortedProducts && sortedProducts.map(p=> (<Product product={p} key={p._id}>{p.title}</Product>))}

            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                {products &&  <Tag color="red" size="medium">hh.ru</Tag>}
                <span> Сортировка</span>
            </div>
            {

                firstCategory ==TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>
            }
            {page.advantages && page.advantages.length>0 && <>
                <Htag tag="h2">Преимущества</Htag>
                <Advantages advantages={page.advantages}/>
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}> {page.seoText}</div>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(t=> <Tag color="primary" key={t}> {t}</Tag>)}
        </div>
    );
};

export default TopPageComponent;