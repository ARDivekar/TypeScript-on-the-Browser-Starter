import { Product } from "./Product";
import { Price } from "./Price";
import { TShirtSizes } from "./TShirtSizes";
import { Organization } from "../CompanyLib";

export class TShirt extends Product{
    constructor(
        protected readonly productName: string,
        protected readonly manufacturer: Organization,
        protected readonly price: Price,
        protected readonly size: TShirtSizes){
        super(productName, manufacturer, price);
    }
}
