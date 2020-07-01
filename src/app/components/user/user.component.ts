import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Wholesaler } from '../../models/wholesaler';
import { WholesalerService } from '../../services/wholesaler.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../product/confirmation-dialog/confirmation-dialog.component';
import { CreateRetailerComponent } from './create-retailer/create-retailer.component';
import { UpdateRetailerComponent } from './update-retailer/update-retailer.component';
import { CreateWholesalerComponent } from './create-wholesaler/create-wholesaler.component';
import { UpdateWholesalerComponent } from './update-wholesaler/update-wholesaler.component';

@Component({
  selector   : 'app-user',
  templateUrl: './user.component.html',
  styleUrls  : ['./user.component.css']
})
export class UserComponent implements OnInit {

  retailers: User[]         = [];
  wholesalers: Wholesaler[] = [];

  constructor(private wholesalerService: WholesalerService,
              private userService: UserService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    this.underline('head-ret');
  }

  underline(element: string) {
    if (element === 'head-ret') {
      document.getElementById('head-whole').classList.replace('active-heading', 'inactive-heading');
      document.getElementById('head-ret').classList.replace('inactive-heading', 'active-heading');
      this.userService.viewRetailers()
        .subscribe(res => {
          this.retailers = res;
        });
      document.getElementById('table-ret').style.display   = 'block';
      document.getElementById('table-whole').style.display = 'none';

    } else {
      document.getElementById('head-ret').classList.replace('active-heading', 'inactive-heading');
      document.getElementById('head-whole').classList.replace('inactive-heading', 'active-heading');
      this.wholesalerService.viewWholesalers()
        .subscribe(res => {
          this.wholesalers = res;
        });
      document.getElementById('table-ret').style.display   = 'none';
      document.getElementById('table-whole').style.display = 'block';

    }
  }


  delete(type, id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    const dialogRef           = this.dialog.open(ConfirmationDialogComponent, {...dialogConfig, data: {type, id}});
    if (type === 'user') {
      dialogRef.afterClosed().subscribe(() =>
        this.userService.viewRetailers()
          .subscribe(res => {
            this.retailers = res;
          }));
    } else if (type === 'wholesaler') {
      dialogRef.afterClosed().subscribe(() =>
        this.wholesalerService.viewWholesalers()
          .subscribe(res => {
            this.wholesalers = res;
          }));
    }
  }


  createRetailer() {
    const dialogRef = this.dialog.open(CreateRetailerComponent);
    dialogRef.afterClosed().subscribe(() =>
      this.userService.viewRetailers()
        .subscribe(res => {
          this.retailers = res;
        })
    );
  }

  updateRetailer(retailer: User, index: number) {
    const dialogRef = this.dialog.open(UpdateRetailerComponent, {
      data: {retailer}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.retailers[index] = res;
      }
    });
  }

  createWholesaler() {
    const dialogRef = this.dialog.open(CreateWholesalerComponent);
    dialogRef.afterClosed().subscribe(() =>
      this.wholesalerService.viewWholesalers()
        .subscribe(res => {
          this.wholesalers = res;
        })
    );
  }

  updateWholesaler(wholesaler: Wholesaler, index: number) {
    const dialogRef = this.dialog.open(UpdateWholesalerComponent, {
      data: {wholesaler}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.wholesalers[index] = res;
      }
    });
  }
}
