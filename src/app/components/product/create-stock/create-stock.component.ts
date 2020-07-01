import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wholesaler } from '../../../models/wholesaler';
import { Product, WholesalerProduct } from '../../../models/product';
import { WholesalerService } from '../../../services/wholesaler.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector   : 'app-create-wholesaler-product',
  templateUrl: './create-stock.component.html',
  styleUrls  : ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  controls = {
    query      : new FormControl(),
    no_of_units: new FormControl(null, [Validators.required]),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  query;
  products: Product[];
  productId;


  constructor(private productService: ProductService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateStockComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.controls.query.valueChanges
      .pipe(
        filter(query => query),
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe(value => this.searchProducts(value));
  }

  close() {
    this.dialogRef.close();
  }


  searchProducts(query: string) {
    this.productService.searchProducts(query)
      .subscribe(res => {
        console.log(this.form.value);
        this.products = res;
      });
  }

  createStock() {
    const data      = this.form.value;
    data.product_id = this.productId;
    console.log(data);
    this.productService.createStock(data)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
