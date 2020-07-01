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

@Component({
  selector   : 'app-create-retailer',
  templateUrl: './create-retailer.component.html',
  styleUrls  : ['./create-retailer.component.css']
})
export class CreateRetailerComponent implements OnInit {

  controls = {
    name           : new FormControl(null, [Validators.required]),
    email          : new FormControl(null, [Validators.required]),
    mobile_no      : new FormControl(null, [Validators.required]),
    alternate_no   : new FormControl(null),
    password       : new FormControl(null, [Validators.required]),
    address        : new FormControl(null, [Validators.required]),
    state          : new FormControl(null),
    pincode        : new FormControl(null),
    delivery_charge: new FormControl(null, [Validators.required]),
    delivery_day   : new FormControl(null, [Validators.required]),
  };

  form     = new FormGroup(this.controls);
  loading  = false;
  weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  constructor(private userService: UserService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateRetailerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.weekDays);
  }

  close() {
    this.dialogRef.close();
  }

  createStock() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.userService.createRetailer(data)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
