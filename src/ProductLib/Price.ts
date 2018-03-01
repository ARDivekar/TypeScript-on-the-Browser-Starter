import { Currency } from "./Currency";

export class Price{
    constructor(
        private readonly value:number, 
        private readonly currency: Currency){
        if (this.value <= 0)
            throw new EvalError('Argument `value` cannot be less than zero');
    }

    getValue(): number{
        return this.value;
    }

    getCurrency(): Currency{
        return this.currency;
    }
}