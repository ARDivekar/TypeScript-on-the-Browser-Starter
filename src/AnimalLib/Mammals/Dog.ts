import { Animal } from "../Animal";
export class Dog extends Animal {
    public constructor(name: string, dob: Date) {
        super(name, dob);
    }
    makeNoise(): string {
        return "Woof! I'm: " + this.name + "! I love you!";
    }
}
