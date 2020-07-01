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
import { EmployeeCategory } from '../../../enums/employee-category.enum';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector   : 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls  : ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  controls = {
    name          : new FormControl(null, [Validators.required]),
    email         : new FormControl(null, [Validators.required]),
    mobile_no     : new FormControl(null, [Validators.required]),
    password      : new FormControl(null, [Validators.required]),
    category      : new FormControl(null, [Validators.required]),
    aadhaar_no    : new FormControl(null),
    driver_license: new FormControl(null),
    address       : new FormControl(null, [Validators.required]),
    pincode       : new FormControl(null),
  };

  form       = new FormGroup(this.controls);
  loading    = false;
  categories = Object.keys(EmployeeCategory).map(key => EmployeeCategory[key]);

  constructor(private employeeService: EmployeeService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.categories);
  }

  close() {
    this.dialogRef.close();
  }

  createEmployee() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.employeeService.createEmployee(data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
