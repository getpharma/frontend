import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product, WholesalerProduct } from '../../../models/product';
import { Wholesaler } from '../../../models/wholesaler';
import { WholesalerService } from '../../../services/wholesaler.service';

@Component({
  selector   : 'app-create-product',
  templateUrl: './update-wholesaler-product.component.html',
  styleUrls  : ['./update-wholesaler-product.component.css']
})
export class UpdateWholesalerProductComponent implements OnInit {


  controls = {
    deal_price   : new FormControl(),
    selling_price: new FormControl(),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  wholesalerProduct: WholesalerProduct;
  trendingBool;

  constructor(private productService: ProductService,
              private wholesalerService: WholesalerService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateWholesalerProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.wholesalerProduct = this.data.wholesalerProduct;
    console.log(this.wholesalerProduct);
  }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
  }

  updateWholesalerProduct() {
    const data   = this.form.value;
    this.loading = true;
    if (data.deal_price && data.selling_price) {
      this.productService.updateWp(this.data.wholesalerProduct.id, data)
        .subscribe(res => {
          this.productService.updateProduct(this.wholesalerProduct.product_id, data)
            .subscribe(result => {
              this.dialogRef.close();
            });
        });

    } else if (data.deal_price) {
      this.productService.updateWp(this.data.wholesalerProduct.id, data)
        .subscribe(res => {
          this.dialogRef.close(res);

        }, err => {
          alert(err);
        });
    } else if (data.selling_price) {
      this.productService.updateProduct(this.wholesalerProduct.product_id, data)
        .subscribe(res => {
          this.dialogRef.close();
        });
    }
  }
}
