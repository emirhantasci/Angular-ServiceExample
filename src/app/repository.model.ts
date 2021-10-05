import { pipe } from "rxjs";
import { SimpleDataSource } from "./datasource.model";
import { Product } from "./product.model";

export class ProductRepository{
    private dataSource: SimpleDataSource;
    private products: Product[];
    
    constructor(){
        this.dataSource=new SimpleDataSource();
        this.products=new Array<Product>();
        this.dataSource.getProducts().forEach(p=>this.products.push(p));
    }

    getProducts(): Product[]{
        return this.products;
    }

    getProductsById(id:number):Product{
        
        let productName = new Product();
        productName= this.products.find(p=>p.id==id) as Product;
        return productName;
        
    }

    getProductCount():number{
        return this.products.length;
    }

    addProduct(product:Product){
        this.products.push(product)
    }

    deleteProduct(product:Product){
        let index= this.products.indexOf(product);
        this.products.splice(index,1);
    }

    getPopulerProducts(): Product[]{
        return this.products.slice(0,3);
    }
}