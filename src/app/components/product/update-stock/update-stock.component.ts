import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wholesaler } from '../../../models/wholesaler';
import { Product, Stock, WholesalerProduct } from '../../../models/product';
import { WholesalerService } from '../../../services/wholesaler.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector   : 'app-update-wholesaler-product',
  templateUrl: './update-stock.component.html',
  styleUrls  : ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  controls = {
    no_of_units: new FormControl(null),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  stock: Stock;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateStockComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.stock = this.data.stock;
  }

  close() {
    this.dialogRef.close();
  }

  updateStock() {
    const data = this.form.value;
    console.log(data);
    this.productService.updateStock(this.stock.id, data)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
