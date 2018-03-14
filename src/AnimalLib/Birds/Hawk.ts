import { Animal } from "../Animal";

export class Hawk extends Animal{
    public constructor(name: string, dob: Date) {
        super(name, dob);
    }
    makeNoise(): string {
        return "Scraw! I'm a hawk named " + this.name + "! Scraw!";
    }
    attack(prey: Animal): void {
        console.log("*talons extended at " + prey.getName() + "* Screeeeeeeeeeeee!!!");
    }
}