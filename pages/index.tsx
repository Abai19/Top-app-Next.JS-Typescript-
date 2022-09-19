import {Button, Htag, Input, P, Rating, Tag, Textarea} from "../components";
import {useState} from "react";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from 'axios'
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";


function Home({menu}: HomeProps): JSX.Element {

    const [rating, setRating] = useState<number>(4)
    return (
        <div>
            <Htag tag="h1">TEST</Htag>
            <Button appearance='primary' arrow="right"> Кнопка</Button>
            <Button appearance='ghost' arrow="down"> Кнопка</Button>
            <P size='large'> trying to test paragraph</P>
            <P> trying to test paragraph</P>
            <P size='small'> trying to test paragraph</P>
            <Tag color="red" href='google.ru' size='small'>
                SUUUUU
            </Tag>
            <Tag href='google.ru' size='small'>
                SUUUUU
            </Tag>
            <Tag color="primary" href='google.ru' size="medium">
                SUUUUU
            </Tag>
            <Rating rating={rating} isEditable={true} setRating={setRating}></Rating>
            {/*<ul>*/}
            {/*    { menu ? menu.map(m=>(<li key={m._id.secondCategory}> {m._id.secondCategory}</li>)) : ""}*/}
            {/*</ul>*/}
            <Input placeholder="test"/>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Textarea placeholder="текст отзыва"/>

        </div>
    )
}


export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async ()=>{
    const firstCategory= 0;
    const {data:menu}= await axios.post<MenuItem[]>(API.topPage.find,{
        firstCategory
    })
    return {
        props: {
            menu,
            firstCategory
        }
    }
}
interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number;
}
