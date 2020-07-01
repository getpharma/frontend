import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector   : 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls  : ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {


  constructor(private productService: ProductService,
              private matDialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
  }

  yes() {
    console.log('answers', this.data);
    this.productService.delete(this.data.type, this.data.id)
      .subscribe(res => {
        this.matDialog.closeAll();
      }, error => {
        this.matDialog.closeAll();
        alert('Deletion Failed');
      });
  }

  no() {
    console.log('Hello');
    this.dialogRef.close();
  }
}
