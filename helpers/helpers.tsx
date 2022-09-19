import {FirstLevelMenuItem} from "../interfaces/menu.interface";
import CoursesIcon from "../layout/Menu/icons/courses.svg";
import {TopLevelCategory} from "../interfaces/page.interface";
import ServicesIcon from "../layout/Menu/icons/services.svg";
import ProductsIcon from "../layout/Menu/icons/staff.svg";
import BooksIcon from "../layout/Menu/icons/books.svg";
import React from "react";

export const firstLevelMenu: FirstLevelMenuItem[]=[
    {route: '[type]', name: 'Курсы', icon: <CoursesIcon/> , id:TopLevelCategory.Courses },
    {route: 'servises', name: 'Сервисы', icon: <ServicesIcon/> , id:TopLevelCategory.Services},
    {route: 'products', name: 'Продукты', icon: <ProductsIcon/> , id:TopLevelCategory.Products},
    {route: 'books', name: 'Книги', icon: <BooksIcon/> , id:TopLevelCategory.Books}
]

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+ (?!\d))/g, '').concat('₽');
export const declOfNum = (number: number, titles:[string,string,string]) :string =>{
    const cases = [2,0,1,1,1,2]
    return titles[(number %100>4 && number%100 <20)? 2 : cases[(number %10 <5) ? number %10: 5] ]
}