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
  selector   : 'app-create-wholesaler',
  templateUrl: './create-wholesaler.component.html',
  styleUrls  : ['./create-wholesaler.component.css']
})
export class CreateWholesalerComponent implements OnInit {

  controls = {
    name        : new FormControl(null, [Validators.required]),
    store_name  : new FormControl(null, [Validators.required]),
    email       : new FormControl(null, [Validators.required]),
    mobile_no   : new FormControl(null, [Validators.required]),
    alternate_no: new FormControl(null),
    password    : new FormControl(null, [Validators.required]),
    address     : new FormControl(null, [Validators.required]),
    landmark    : new FormControl(null),
    state       : new FormControl(null),
    pincode     : new FormControl(null),
  };

  form    = new FormGroup(this.controls);
  loading = false;

  constructor(private wholesalerService: WholesalerService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateWholesalerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  createWholesaler() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.wholesalerService.addWholesaler(data)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
