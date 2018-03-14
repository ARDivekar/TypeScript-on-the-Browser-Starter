import { Animal } from "../Animal";
export class Snake extends Animal {
    public constructor(name: string, dob: Date) {
        super(name, dob);
    }
    makeNoise(): string {
        return "Hiss! I'm: " + this.name + ", very pleasssed to meat you.";
    }
    slither(): void{
        console.log(this.name + " the snake is slithering...");
    }
}
