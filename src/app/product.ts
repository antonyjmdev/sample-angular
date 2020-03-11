export interface Product {

    id : number;
    name : string;
    description : string;
    image : string;
    rating : number;
}

export interface Order {
    id : number;
    date : string;
    products : Array<string>;
}