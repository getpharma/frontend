import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wholesaler } from '../../../models/wholesaler';
import { Product, WholesalerProduct } from '../../../models/product';
import { WholesalerService } from '../../../services/wholesaler.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { OrderService } from '../../../services/order.service';
import { PickupService } from '../../../services/pickup.service';

@Component({
  selector   : 'app-assign-employees',
  templateUrl: './assign-wholesaler.component.html',
  styleUrls  : ['./assign-wholesaler.component.css']
})
export class AssignWholesalerComponent implements OnInit {


  loading = false;
  wholesalerProducts: WholesalerProduct[];
  wholesalerProductId: number;


  constructor(private productService: ProductService,
              private pickupService: PickupService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<AssignWholesalerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.productService.viewWpByProduct(this.data.productId)
      .subscribe(res => {
        this.wholesalerProducts = res;
        console.log(res);
      });
    console.log(this.wholesalerProducts);
  }


  close() {
    this.dialogRef.close();
  }

  assign() {
    if (!this.wholesalerProductId) {
      alert('Kindly Select a wholesaler');
    } else {
      const data = {
        wholesaler_product_id: this.wholesalerProductId,
      };
      this.pickupService.assignPickupToWholesaler(this.data.pickupProductId, data)
        .subscribe(() => {
          this.dialogRef.close();
        }, err => {
          alert(err);
        });
    }
  }
}
