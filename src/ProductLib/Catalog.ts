import { Set } from 'typescript-collections';
import { Product } from './Product';
export class Catalog{
    private productsList: Set<Product>;
    constructor(readonly catalogName:string){
        this.productsList = new Set<Product>();
    }

    addProduct(product:Product) : boolean{
        if (product != null){
            this.productsList.add(product);
            return true;
        }
        return false;
    }

    getCatalogString() : string{
        let out = '';
        let counter = 1;
        this.productsList.forEach((product)=>{
            out += counter + '. ' + product.toString() + '\n';
            counter += 1;
        });
        out = out.trim();
        return out;
    }

    selectProductFromCatalog(productId: number) : Product{
        let selectedProduct : Product = undefined;
        this.productsList.forEach((p:Product)=>{
            if(p.getProductId() == productId){
                selectedProduct = p;
                return false;
            }
        });
        return selectedProduct;
    }

    toString(): string{
        return this.getCatalogString();
    }
}