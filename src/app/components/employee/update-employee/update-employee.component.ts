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
import { Employee } from '../../../models/employee';

@Component({
  selector   : 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls  : ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  controls = {
    name          : new FormControl(null),
    email         : new FormControl(null),
    mobile_no     : new FormControl(null),
    password      : new FormControl(null),
    category      : new FormControl(null),
    aadhaar_no    : new FormControl(null),
    driver_license: new FormControl(null),
    address       : new FormControl(null),
    pincode       : new FormControl(null),
  };

  form       = new FormGroup(this.controls);
  loading    = false;
  categories = Object.keys(EmployeeCategory).map(key => EmployeeCategory[key]);
  employee: Employee;

  constructor(private employeeService: EmployeeService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.categories);
    this.employee = this.data.employee;
  }

  close() {
    this.dialogRef.close();
  }

  updateEmployee() {
    const data = this.form.value;
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    console.log(data);
    this.employeeService.updateEmployee(this.employee.id, data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
