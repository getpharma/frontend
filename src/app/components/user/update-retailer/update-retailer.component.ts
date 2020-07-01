import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wholesaler } from '../../../models/wholesaler';
import { Product, WholesalerProduct } from '../../../models/product';
import { WholesalerService } from '../../../services/wholesaler.service';
import { UserService } from '../../../services/user.service';
import { DaysEnum } from '../../../enums/days.enum';
import { User } from '../../../models/user';

@Component({
  selector   : 'app-update-retailer',
  templateUrl: './update-retailer.component.html',
  styleUrls  : ['./update-retailer.component.css']
})
export class UpdateRetailerComponent implements OnInit {

  controls = {
    name           : new FormControl(null),
    email          : new FormControl(null),
    mobile_no      : new FormControl(null),
    alternate_no   : new FormControl(null),
    password       : new FormControl(null),
    address        : new FormControl(null),
    state          : new FormControl(null),
    pincode        : new FormControl(null),
    delivery_charge: new FormControl(null),
    delivery_day   : new FormControl(null),
  };

  form     = new FormGroup(this.controls);
  loading  = false;
  weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  retailer: User;

  constructor(private userService: UserService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateRetailerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.weekDays);
    this.retailer = this.data.retailer;
  }

  close() {
    this.dialogRef.close();
  }

  updateStock() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.userService.updateRetailer(this.retailer.id, data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
