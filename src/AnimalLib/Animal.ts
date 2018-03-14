export abstract class Animal {
    public constructor(protected readonly name: string, protected readonly dob: Date) {}
    public abstract makeNoise(): string;
    
    getName():string{
        return this.name;
    }
}