export class Person{
    constructor(readonly ssn:number, readonly name:string) {}
    public toString() : string {
        return ''+this.ssn;
    }
}
