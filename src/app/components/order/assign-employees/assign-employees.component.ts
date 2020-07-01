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

@Component({
  selector   : 'app-assign-employees',
  templateUrl: './assign-employees.component.html',
  styleUrls  : ['./assign-employees.component.css']
})
export class AssignEmployeesComponent implements OnInit {


  loading = false;
  packagers: Employee[];
  packagerId: number;
  deliveryMen: Employee[];
  deliveryManId: number;


  constructor(private employeeService: EmployeeService,
              private orderService: OrderService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<AssignEmployeesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.employeeService.viewPackagers()
      .subscribe(res => {
        this.packagers = res;
      });
    this.employeeService.viewDeliveryMan()
      .subscribe(res => {
        this.deliveryMen = res;
      });
  }


  close() {
    this.dialogRef.close();
  }

  assign() {
    if (!this.packagerId || !this.deliveryManId) {
      alert('Kindly Select both packager and delivery man');
    }
    const data = {
      packager_id    : this.packagerId,
      delivery_man_id: this.deliveryManId
    };
    this.orderService.assignEmployeesToOrder(this.data.orderId, data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
