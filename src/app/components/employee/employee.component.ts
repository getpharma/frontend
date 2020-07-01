import { Component, OnInit } from '@angular/core';
import { Wholesaler } from '../../models/wholesaler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../product/confirmation-dialog/confirmation-dialog.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeCategory } from '../../enums/employee-category.enum';

@Component({
  selector   : 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls  : ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  packagers: Employee[]   = [];
  deliveryMan: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    this.underline('head-pack');
  }

  underline(element: string) {
    if (element === 'head-pack') {
      document.getElementById('head-del').classList.replace('active-heading', 'inactive-heading');
      document.getElementById('head-pack').classList.replace('inactive-heading', 'active-heading');
      this.employeeService.viewPackagers()
        .subscribe(res => {
          this.packagers = res;
        });
      document.getElementById('table-pack').style.display = 'block';
      document.getElementById('table-del').style.display  = 'none';

    } else {
      document.getElementById('head-pack').classList.replace('active-heading', 'inactive-heading');
      document.getElementById('head-del').classList.replace('inactive-heading', 'active-heading');
      this.employeeService.viewDeliveryMan()
        .subscribe(res => {
          this.deliveryMan = res;
        });
      document.getElementById('table-pack').style.display = 'none';
      document.getElementById('table-del').style.display  = 'block';

    }
  }


  delete(type, id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    const dialogRef           = this.dialog.open(ConfirmationDialogComponent, {...dialogConfig, data: {type, id}});
    dialogRef.afterClosed().subscribe(() =>
      this.employeeService.viewPackagers()
        .subscribe(res => {
          this.packagers = res;
        }));
  }


  createEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.category === EmployeeCategory.PACKAGER) {
        this.employeeService.viewPackagers()
          .subscribe(res => {
            this.packagers = res;
          });
      } else if (result && result.category === EmployeeCategory.DELIVERY_MAN) {
        this.employeeService.viewDeliveryMan()
          .subscribe(res => {
            this.deliveryMan = res;
          });
      }
    });
  }

  updateEmployee(employee: Employee, index: number) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: {employee}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.category === EmployeeCategory.PACKAGER) {
        this.packagers[index] = res;
      } else if (res && res.category === EmployeeCategory.DELIVERY_MAN) {
        this.deliveryMan[index] = res;
      }
    });
  }
}
