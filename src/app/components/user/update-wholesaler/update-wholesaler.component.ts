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
  selector   : 'app-update-wholesaler',
  templateUrl: './update-wholesaler.component.html',
  styleUrls  : ['./update-wholesaler.component.css']
})
export class UpdateWholesalerComponent implements OnInit {

  controls = {
    name        : new FormControl(null),
    store_name  : new FormControl(null),
    email       : new FormControl(null),
    mobile_no   : new FormControl(null),
    alternate_no: new FormControl(null),
    password    : new FormControl(null),
    address     : new FormControl(null),
    landmark    : new FormControl(null),
    state       : new FormControl(null),
    pincode     : new FormControl(null),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  wholesaler: Wholesaler;

  constructor(private wholesalerService: WholesalerService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateWholesalerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.wholesaler = this.data.wholesaler;
  }

  close() {
    this.dialogRef.close();
  }

  updateWholesaler() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.wholesalerService.updateWholesaler(this.wholesaler.id, data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
