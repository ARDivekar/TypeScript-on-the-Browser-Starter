import { Price } from "./Price";
import { Currency } from "./Currency";
import { Product } from "./Product";
import { Organization } from "../CompanyLib";
import { PhoneNumber } from "./PhoneNumber";

export class MobilePhone extends Product {
    private currentSimPhoneNumber: PhoneNumber = undefined;

    constructor(
        protected readonly productName: string,
        protected readonly manufacturer: Organization,
        protected readonly price: Price) {
        super(productName, manufacturer, price);
    }

    insertSim(newSimPhoneNumber: PhoneNumber){
        this.currentSimPhoneNumber = newSimPhoneNumber;
    }

    call(receiverPhoneNumber: PhoneNumber): void{
        if (this.currentSimPhoneNumber != undefined){
            console.log("Calling " + receiverPhoneNumber.toString() + " from " + this.currentSimPhoneNumber.toString() + ".");
        }
        else{
            console.log("Please insert a valid SIM card in order to make a call.");
        }
    }
}