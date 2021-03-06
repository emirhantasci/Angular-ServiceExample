import { Component, NgModule } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "./product.model";
import { ProductRepository } from "./repository.model";



@Component({
    selector:"app",
    
    templateUrl:'product.component.html',
    styleUrls: ["./product.component.css"]
})

export class ProductComponent{
    model: ProductRepository=new ProductRepository();

    newProduct: Product= new Product();

    get jsonProduct(){
        return JSON.stringify(this.newProduct);
    }

    addProduct(p:Product){
        console.log("New Product: "+ this.jsonProduct);
    }

    log(x:any){
        console.log(x);
    }

    getValidationErrors(state:any, key?:string){
        let ctrlName:string=state.name || key;
        let messages: string[]=[];

        if(state.errors){
            for(let errorName in state.errors){
                switch(errorName){
                    case "required": 
                        messages.push(`You must enter a ${ctrlName}`);
                        break;
                    case "minlength": 
                        messages.push(`Min 3 characters for ${ctrlName}`);
                        break;
                    case "pattern": 
                        messages.push(`${ctrlName} contains illegal characters`);
                        break;
                    
                }
            }
        }

        return messages;
    }

    getFormValidationErrors(form:NgForm):string[]{
        let messages:string[]=[];

        Object.keys(form.controls).forEach(k=>{
            console.log(k); //name
            console.log(form.controls[k]); //formcontrol (name)

            this.getValidationErrors(form.controls[k],k).forEach(message=>messages.push(message));
        })
        return messages;
    }


    formSubmitted:boolean=false;

    submitForm(form:NgForm){
        console.log(form);
        this.formSubmitted=true;
        if(form.valid){
            this.addProduct(this.newProduct);
            this.newProduct=new Product();
            form.reset();
            this.formSubmitted=false;
        }
    }
    
}