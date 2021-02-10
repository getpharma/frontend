import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PickupStatus } from '../../../enums/order-status.enum';
import { PickupService } from '../../../services/pickup.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector   : 'app-cancel-confirmation-dialog',
  templateUrl: './cancel-confirmation-dialog.component.html',
  styleUrls  : ['./cancel-confirmation-dialog.component.css']
})
export class CancelConfirmationDialogComponent implements OnInit {


  constructor(private orderService: OrderService,
              private matDialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<CancelConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
  }

  yes() {
    this.orderService.cancelOrder(this.data.id)
      .subscribe(res => {
        this.matDialog.closeAll();
      }, error => {
        this.matDialog.closeAll();
        alert('Failed');
      });
  }

  no() {
    console.log('Hello');
    this.dialogRef.close();
  }
}
