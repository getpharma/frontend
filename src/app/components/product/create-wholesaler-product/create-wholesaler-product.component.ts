import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wholesaler } from '../../../models/wholesaler';
import { Product, WholesalerProduct } from '../../../models/product';
import { WholesalerService } from '../../../services/wholesaler.service';

@Component({
  selector   : 'app-create-wholesaler-product',
  templateUrl: './create-wholesaler-product.component.html',
  styleUrls  : ['./create-wholesaler-product.component.css']
})
export class CreateWholesalerProductComponent implements OnInit {

  controls = {
    wholesaler_id : new FormControl('', [Validators.required]),
    off_percentage: new FormControl(),
    off_amount    : new FormControl(),
    deal_price    : new FormControl(),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  product: Product;
  wholesalers: Wholesaler[];

  trendingBool;

  constructor(private productService: ProductService,
              private wholesalerService: WholesalerService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateWholesalerProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.product = this.data.product;
    console.log(this.product);
    this.wholesalerService.viewWholesalers()
      .subscribe(res => {
        this.wholesalers = res;
      });
  }

  searchWholesalers() {
    this.wholesalerService.viewWholesalers()
      .subscribe(res => {
        this.wholesalers = res;
      });
  }


  close() {
    this.dialogRef.close();
  }

  createWholesalerProduct() {
    const wpData: {
      wholesaler_id?: number,
      product_id?: number,
      off_percentage?: number,
      off_amount?: number,
      deal_price?: number
    }               = {};
    const formModel = this.form.value;
    this.loading    = true;
    console.log(wpData);
    console.log(formModel);
    if (formModel.off_percentage) {
      wpData.off_percentage = +formModel.off_percentage;
    } else if (formModel.off_amount) {
      wpData.off_amount = +formModel.off_amount;
    } else if (formModel.deal_price) {
      console.log(+formModel.deal_price);
      wpData.deal_price = +formModel.deal_price;
    }
    wpData.product_id    = +this.product.id;
    wpData.wholesaler_id = +formModel.wholesaler_id;
    const data           = wpData;
    console.log(data);
    this.productService.createWP(data)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
