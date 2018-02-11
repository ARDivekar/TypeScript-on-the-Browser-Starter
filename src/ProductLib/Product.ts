import { Price, Currency } from "./Price";
import { Organization } from "../CompanyLib/Organization";

export abstract class Product{
    private static numProductsSoFar = 0;
    protected productId: number = undefined;
    constructor(
        protected readonly productName:string, 
        protected readonly manufacturer:Organization,
        protected readonly price:Price){
        Product.numProductsSoFar += 1;
        this.productId = Product.numProductsSoFar;
    }

    getProductId() : number{
        return this.productId;
    }
    
    getValue() : number{
        return this.price.getValue();
    }

    getCurrency() : Currency{
        return this.price.getCurrency();
    }

    toString(){
        return '(' +  this.productId + ') ' + this.productName + ', by ' + this.manufacturer + '. Price: ' + this.price.getCurrency() + ' ' + this.price.getValue();
    }

}