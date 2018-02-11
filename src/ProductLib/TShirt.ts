import { Product } from "./Product";
import { Price } from "./Price";
import { Organization } from "../CompanyLib/Organization";

export enum TShitSizes {
    XSmall,
    Small,
    Medium,
    Large,
    XLarge,
    XXLarge
}

export class TShirt extends Product{
    constructor(
        protected readonly productName: string,
        protected readonly manufacturer: Organization,
        protected readonly price: Price,
        protected readonly size: TShitSizes){
        super(productName, manufacturer, price);
    }
}