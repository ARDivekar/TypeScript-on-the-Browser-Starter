// Note: typescript-collections is a 3rd party library, not part of Typescript itself. It adds about 30kb to the total JS size.
import { Set } from 'typescript-collections';
import { Person } from "./Person"

export class Organization{
    private employees: Set<Person>; 
    constructor(readonly name: string){
        this.employees = new Set<Person>();
    }

    public addEmployee(e: Person){
        this.employees.add(e);
    }

    toString(): string{
        return this.name;
    }
    
    public getHTMLString(): string {
        let out : string = 'This organization has ' + this.employees.size() + ' employees';
        if(this.employees.size() > 0)
            out+=':';
        else out += '.';
        // iterate through all the employees:
        this.employees.forEach((employee) => {
            out += '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + employee.name;
        });
        
        return out;
    }
}