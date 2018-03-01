import { Product } from './Product';

class OrderItem{
    constructor(readonly product:Product, readonly quantity:number){
        if (this.quantity !== Math.round(this.quantity))
            throw new TypeError('The parameter `quantity` must be an integer.');
    }
    
    getItemTotal(){
        return this.product.getValue() * this.quantity;
    }
}

export class Order{
    private static numOrdersCreatedSoFar: number = Math.round(Math.random() * 1E8);
    private orderId : number;
    private completed : boolean;
    private items: Array<OrderItem>;
    private orderTotal : number = undefined;

    constructor(){
        this.items = new Array<OrderItem>();
        this.completed = false;
        Order.numOrdersCreatedSoFar += 1;
        this.orderId = Order.numOrdersCreatedSoFar;
    }
    
    getOrderId(): number{
        return this.orderId;
    }

    addItem(product: Product, quantity: number){
        if (!this.isCompleted()){
            try {
                this.items.push(new OrderItem(product, quantity));                
            } catch (error) {
                console.log("Cannot add this item to Order. Please check item.");
                return false;
            }
            return true;
        }
        throw new ReferenceError('Cannot add items to an order which already completed.');
    }

    getOrderTotal(): number{
        if(this.orderTotal == undefined){
            let val : number = 0;
            this.items.forEach((item)=>{
                val += item.getItemTotal();
            });
            this.orderTotal = val;
        }
        return this.orderTotal;
    }

    purchase(){
        this.completed = true;
        this.getOrderTotal();
    }

    isCompleted(): boolean{
        return this.completed;
    }

    toString(): string{
        return '' + this.getOrderId();
    }

    getInvoice(): string{
        let out = 'ORDER #' + this.getOrderId() + ':\n';
        let counter = 1;
        this.items.forEach((item) => {
            out += counter + '. \t' + item.quantity + ' x \t' + item.product.toString() + '| ' + item.getItemTotal() + ' ' + item.product.getCurrency() + '\n';
            counter += 1;
        });
        out += '--------------------\n';
        out += 'Total = ' + this.getOrderTotal();
        out = out.trim();
        return out;
    }
}