import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductRepository } from '../repository.model';

@Component({
  selector: 'admin-products',
  templateUrl: 'admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent{
  products: any;
  model:ProductRepository | undefined;
  selectedProduct!: Product;
  constructor() { 
    this.model=new ProductRepository();
    this.products=this.model.getProducts();
  }

  getSelected(product:Product):boolean{
    return product==this.selectedProduct;
  }

  editProduct(product:Product){
    this.selectedProduct=product;
  }

  saveChanges(){
    const p = this.model?.getProductsById(this.selectedProduct.id!);
    if(p!=null){
      p.name=this.selectedProduct.name;
      p.description=this.selectedProduct.description;
      p.price=Number(this.selectedProduct.price);
      p.imageUrl=this.selectedProduct.imageUrl;
      this.selectedProduct!=null;
    }
  }
}
