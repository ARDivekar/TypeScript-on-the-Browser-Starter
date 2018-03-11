export class PhoneNumber{
    constructor(
        private readonly countrycode: string, 
        private readonly phoneNumberString: string
    ){
        this.countrycode = this.countrycode.trim();
        if (this.countrycode.length == 0){
            throw "`countryCode` cannot be an empty string";
        }
        if (isNaN(Number(this.phoneNumberString))){
            throw "`phoneNumberString` must be a valid number as well. The value '" + this.phoneNumberString + "' is not valid";
        }
        this.phoneNumberString = this.phoneNumberString.trim();
    }

    toString(): string{
        return this.countrycode + ' ' + this.phoneNumberString;
    }
}