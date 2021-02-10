import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../models/order';

@Component({
  selector   : 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls  : ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  pickup: Order;

  constructor(private dialogRef: MatDialogRef<ListProductsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data.order);
    this.pickup = this.data.order;
  }

}
