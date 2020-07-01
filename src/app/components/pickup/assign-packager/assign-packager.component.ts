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
  templateUrl: './assign-packager.component.html',
  styleUrls  : ['./assign-packager.component.css']
})
export class AssignPackagerComponent implements OnInit {


  loading = false;
  packagers: Employee[];
  packagerId: number;


  constructor(private employeeService: EmployeeService,
              private pickupService: PickupService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<AssignPackagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.employeeService.viewPackagers()
      .subscribe(res => {
        this.packagers = res;
      });
  }


  close() {
    this.dialogRef.close();
  }

  assign() {
    if (!this.packagerId) {
      alert('Kindly Select a pickup boy');
    }
    const data = {
      employee_id: this.packagerId,
    };
    this.pickupService.assignPackagerToPickup(this.data.pickupId, data)
      .subscribe(res => {
        this.dialogRef.close(res);
      }, err => {
        alert(err);
      });
  }
}
