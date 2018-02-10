import { Organization } from "./Organization"
export class TechCompany extends Organization{
    constructor(readonly name: string, readonly website: string, readonly businessType:string = "LLC", readonly country: string = "United States"){
        super(name);
    }
    toString(){
        return this.name + ' ' + this.businessType + ' ' + this.country;
    }
    public getHTMLString(): string{
        let out = super.getHTMLString().trim();
        out = this.toString() + '<br>' + out;
        return out;
    }
}