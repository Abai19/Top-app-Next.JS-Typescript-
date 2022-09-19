import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ProductModel} from "../../interfaces/product.interface";

export default interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}