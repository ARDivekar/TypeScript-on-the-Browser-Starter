import * as $ from "jquery";
import { Person } from "./CompanyLib/Person"
import { Organization } from "./CompanyLib/Organization"
import { TechCompany } from "./CompanyLib/TechCompany"
import { Order } from "./ProductLib/Order";
import { TShirt, TShitSizes } from "./ProductLib/TShirt";
import { Catalog } from "./ProductLib/Catalog";
import { Price, Currency } from "./ProductLib/Price";

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

let ralphLauren = new Organization("Ralph Lauren");
let catalog: Catalog = new Catalog("Ralph Lauren sportswear");
catalog.addProduct(new TShirt('Polo Shirt L', ralphLauren, new Price(10, Currency.USD), TShitSizes.Large));
catalog.addProduct(new TShirt('Polo Shirt M', ralphLauren, new Price(7, Currency.USD), TShitSizes.Medium));
catalog.addProduct(new TShirt('Polo Shirt S', ralphLauren, new Price(5, Currency.USD), TShitSizes.Small));
console.log(catalog.toString());
let o = new Order();
o.addItem(catalog.selectProductFromCatalog(1), 1);
o.addItem(catalog.selectProductFromCatalog(3), 5);
o.purchase();
console.log(o.getInvoice());

throw new EvalError("This is how an error appears, even on minified files.");
// console.log("This should not be seen on the console.");
