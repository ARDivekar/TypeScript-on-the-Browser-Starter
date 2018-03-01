import { Animal } from "./Animal";
export class Cat extends Animal{
    public constructor(name: string, dob: Date) {
        super(name, dob);
     }
    makeNoise():string {
        return "Meow! My name is: " + this.name;
    }
}
