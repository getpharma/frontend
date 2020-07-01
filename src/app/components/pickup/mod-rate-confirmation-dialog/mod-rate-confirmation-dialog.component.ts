import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PickupStatus } from '../../../enums/order-status.enum';
import { PickupService } from '../../../services/pickup.service';

@Component({
  selector   : 'app-mod-rate-confirmation-dialog',
  templateUrl: './mod-rate-confirmation-dialog.component.html',
  styleUrls  : ['./mod-rate-confirmation-dialog.component.css']
})
export class ModRateConfirmationDialogComponent implements OnInit {


  constructor(private pickupService: PickupService,
              private matDialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<ModRateConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  yes() {
    this.pickupService.actOnModRate(this.data.id, this.data.action)
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
