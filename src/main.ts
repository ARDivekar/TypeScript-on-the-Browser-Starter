import * as $ from "jquery";
import { Person } from "./CompanyLib/Person"
import { Organization } from "./CompanyLib/Organization"
import { TechCompany } from "./CompanyLib/TechCompany"

let amazon = new TechCompany("Amazon", "amazon.com");

function showEmployees() {
    amazon.addEmployee(new Person(1, "John Smith"));
    amazon.addEmployee(new Person(2, "Johanna Smith"));
    let $para = $("#employees");
    $para.html(amazon.getHTMLString());
}
showEmployees();

/* An important note: 
    For classe where toString() is not explicitly defined, there is still a default toString function, 
    which returns the same value for every TypeScript class. 
    The typescript-collections library uses the toString() value as the key for the object.
    Hence, it should be overridden if we put objects in a Set<T>, or use them as a key in a
    Dictionary<K, T>, etc, or else those collections don't work.
*/
let cocaCola = new Organization("Coca cola");
let pepsi = new Organization("Pepsi");
console.log(pepsi.toString() == cocaCola.toString());

throw new EvalError("This is how an error appears, even on minified files.");
// console.log("This should not be seen on the console.");
