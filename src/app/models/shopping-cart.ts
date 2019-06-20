import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {

    items : ShoppingCartItem[] = [];

    constructor (public itemsMap : { [key : string] : ShoppingCartItem}) { 
        for (let productId in itemsMap) {    
            let item = itemsMap[productId];    
            this.items.push(new ShoppingCartItem(item.product, item.quantity));   
        }
     }   

    get totalItemsCount() {
        return Object.values(this.items).reduce((count, currentItem) => {
            return count + currentItem.quantity
        }, 0);             
    }        

    get totalPrice() {
        let total : number = 0;
        for (let item of this.items) {
            total += item.totalPrice;
        }
        return total;
    }

    getQuantity(product : Product) : number {
        let item = this.itemsMap[product.key];        
        return (item) ? item.quantity : 0
      }
}
