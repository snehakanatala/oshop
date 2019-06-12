import { Url } from 'url';

export interface Product {  

    payload : {
        title : string,
        price : number,
        category : string,
        imageUrl : string
    },
    key : string
}