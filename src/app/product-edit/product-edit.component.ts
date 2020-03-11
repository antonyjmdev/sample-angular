import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId : string ;
  product : Product;
  productEditForm : FormGroup;
  imageFile : File;
  submitted : boolean;
  dataReturn : boolean;
  editSuccess : boolean;

  constructor(private route : ActivatedRoute, private formBuilder: FormBuilder, private productService : ProductService
    ,private  modalService : NgbModal) { }

  ngOnInit(): void {

    this.submitted = false;
    this.dataReturn = false;
    this.editSuccess = false;

    this.productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(this.productId).subscribe(
      data=>{ 
        this.product = data;
        this.productEditForm = this.formBuilder.group({
          name: [this.product.name, Validators.required],
          description : [this.product.description],
          image : [this.product.image],
          rating : [this.product.rating]
        });

      },
      error => {
        console.log(error);
            }
    );
    
  }

  get f() {
    return this.productEditForm.controls;
  } 

  setFile(files : FileList){
    if(files.length == 1) {
      this.imageFile = files[0];
      console.log(this.imageFile);
    }
  }


  editProduct(){

    let formData = new FormData();

    formData.append('name', this.f.name.value);
    if( this.f.description.value != '') formData.append('description', this.f.description.value);
    if(this.f.rating.value != '') formData.append('rating', this.f.rating.value);
    if( this.imageFile != undefined) formData.append('image', this.imageFile);

    console.log(formData);

    this.productService.editProduct(this.product.id.toString(), formData)
    .pipe(first())
    .subscribe(
      data => {
        this.dataReturn = true;
        this.editSuccess = true;
        console.log(data);
        setTimeout(() =>{ 
          this.ngOnInit();
        }, 2000);
      },
      error =>{
        this.dataReturn = true;
        this.editSuccess = false;
        console.log(error);
      }

    );

  }

  onSubmit(){

    this.submitted = true;

    if(this.productEditForm.invalid){
      console.log("form invalid");
      return
    }

    this.editProduct();

  }


  deleteModal(){

  }

  open(content) {
    this.modalService.open(content, { size:'sm'});
  }



}
