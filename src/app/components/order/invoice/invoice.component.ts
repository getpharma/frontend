import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../models/order';

@Component({
  selector   : 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls  : ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  pickup: Order;

  constructor(private dialogRef: MatDialogRef<InvoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.pickup = this.data.order;
  }

}
