import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PickupStatus } from '../../../enums/order-status.enum';
import { PickupService } from '../../../services/pickup.service';

@Component({
  selector   : 'app-mod-rate-confirmation-dialog',
  templateUrl: './wholesaler-confirmation-dialog.component.html',
  styleUrls  : ['./wholesaler-confirmation-dialog.component.css']
})
export class WholesalerConfirmationDialogComponent implements OnInit {


  constructor(private pickupService: PickupService,
              private matDialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<WholesalerConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
  }

  yes() {
    if (this.data.day === 'all') {
      this.pickupService.assignAllPickupsToWhole()
        .subscribe(() => {
          this.matDialog.closeAll();
        }, error => {
          this.matDialog.closeAll();
          alert('Failure');
        });
    } else {
      this.pickupService.assignPickupsByDay(this.data.day)
        .subscribe(() => {
          this.matDialog.closeAll();
        }, error => {
          this.matDialog.closeAll();
          alert('Failure');
        });
    }
  }

  no() {
    console.log('Hello');
    this.dialogRef.close();
  }
}
