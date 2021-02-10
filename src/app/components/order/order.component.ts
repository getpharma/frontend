import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { History } from '../../models/history';
import { MatDialog } from '@angular/material/dialog';
import { AssignEmployeesComponent } from './assign-employees/assign-employees.component';
import { OrderStatus } from '../../enums/order-status.enum';
import { InvoiceComponent } from './invoice/invoice.component';
import { CancelConfirmationDialogComponent } from './cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { ListProductsComponent } from './list-products/list-products.component';

@Component({
  selector   : 'app-order',
  templateUrl: './order.component.html',
  styleUrls  : ['./order.component.css']
})
export class OrderComponent implements OnInit {

  headings                   = ['head-unass-ord', 'head-pend-ord', 'head-pack-ord', 'head-comp-ord'];
  unassignedOrders: Order[]  = [];
  pendingOrders: Order[]     = [];
  packedOrders: Order[]      = [];
  completedOrders: History[] = [];
  rejectedOrders: History[]  = [];
  displayOrders: Order[];
  orderType;
  daysEnum                   = ['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  dayFilter                  = ['previous', 'yesterday', 'today'];

  constructor(private orderService: OrderService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.underline('head-unass-ord');
  }


  underline(element: string) {
    for (let i = 0; i < 4; i++) {
      if (this.headings[i] !== element) {
        document.getElementById(this.headings[i]).classList.replace('active-heading', 'inactive-heading');
      } else {
        document.getElementById(this.headings[i]).classList.replace('inactive-heading', 'active-heading');
      }
    }
    if (element === 'head-unass-ord') {
      this.orderType                                           = 'unass-ord';
      document.getElementById('table-pack-ord').style.display  = 'none';
      document.getElementById('table-unass-ord').style.display = 'block';
      document.getElementById('table-pend-ord').style.display  = 'none';
      document.getElementById('table-comp-ord').style.display  = 'none';
      document.getElementById('days').style.display            = 'block';
      document.getElementById('filter').style.display          = 'none';
      this.selectDay('unass-ord', 'all');

    } else if (element === 'head-pend-ord') {
      this.orderType = 'pend-ord';
      this.selectDay('pend-ord', 'all');
      document.getElementById('table-unass-ord').style.display = 'none';
      document.getElementById('table-pend-ord').style.display  = 'block';
      document.getElementById('table-pack-ord').style.display  = 'none';
      document.getElementById('table-comp-ord').style.display  = 'none';
      document.getElementById('days').style.display            = 'block';
      document.getElementById('filter').style.display          = 'none';
    } else if (element === 'head-pack-ord') {
      this.orderType = 'pack-ord';
      this.selectDay('pack-ord', 'all');
      document.getElementById('table-unass-ord').style.display = 'none';
      document.getElementById('table-pend-ord').style.display  = 'none';
      document.getElementById('table-pack-ord').style.display  = 'block';
      document.getElementById('table-comp-ord').style.display  = 'none';
      document.getElementById('days').style.display            = 'block';
      document.getElementById('filter').style.display          = 'none';
    } else if (element === 'head-comp-ord') {
      this.orderType = 'comp-ord';
      this.historyFilter('today');
      document.getElementById('table-unass-ord').style.display = 'none';
      document.getElementById('table-pend-ord').style.display  = 'none';
      document.getElementById('table-pack-ord').style.display  = 'none';
      document.getElementById('table-comp-ord').style.display  = 'block';
      document.getElementById('days').style.display            = 'none';
      document.getElementById('filter').style.display          = 'block';
    }
  }

  selectDay(type: string, day: string) {
    for (let i = 0; i < 8; i++) {
      if (this.daysEnum[i] === day) {
        document.getElementById(this.daysEnum[i]).classList.replace('inactive-day', 'active-day');
      } else {
        document.getElementById(this.daysEnum[i]).classList.replace('active-day', 'inactive-day');
      }
    }
    console.log(type, day);

    if (type === 'unass-ord') {
      if (day === 'all') {
        this.unassignedOrders = [];
        this.orderService.viewOrdersByStatus(OrderStatus.PENDING)
          .subscribe(res => {
            for (const order of res) {
              if (order.packager_id === null) {
                this.unassignedOrders.push(order);
              }
            }
          });
      } else {
        this.unassignedOrders = [];
        this.orderService.viewOrdersByStatus(OrderStatus.PENDING, day)
          .subscribe(res => {
            for (const order of res) {
              if (order.packager_id === null) {
                this.unassignedOrders.push(order);
              }
            }
          });
      }
    }
    if (type === 'pend-ord') {
      if (day === 'all') {
        this.pendingOrders = [];
        this.orderService.viewOrdersByStatus(OrderStatus.PENDING)
          .subscribe(res => {
            for (const order of res) {
              if (order.packager_id !== null) {
                this.pendingOrders.push(order);
              }
            }
          });
      } else {
        this.pendingOrders = [];
        this.orderService.viewOrdersByStatus(OrderStatus.PENDING, day)
          .subscribe(res => {
            for (const order of res) {
              if (order.packager_id !== null) {
                this.pendingOrders.push(order);
              }
            }
          });
      }
    }
    if (type === 'pack-ord') {
      if (day === 'all') {
        this.orderService.viewOrdersByStatus(OrderStatus.PACKED)
          .subscribe(res => {
            this.packedOrders = res;
          });
      } else {
        this.orderService.viewOrdersByStatus(OrderStatus.PACKED, day)
          .subscribe(res => {
            this.packedOrders = res;
          });
      }
    }
  }

  historyFilter(type: string) {
    for (const filter of this.dayFilter) {
      if (type === filter) {
        document.getElementById(filter).classList.replace('inactive-day', 'active-day');
      } else {
        document.getElementById(filter).classList.replace('active-day', 'inactive-day');
      }
    }
    this.orderService.viewHistoryByStatus(type)
      .subscribe(res => {
        this.completedOrders = res;
      });
  }

  assign(orderId: number) {
    const dialogRef = this.dialog.open(AssignEmployeesComponent, {
      data: {orderId}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.underline('head-unass-ord');
    });
  }

  cancel(id: number) {
    const dialogRef = this.dialog.open(CancelConfirmationDialogComponent, {
      data: {id}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (this.orderType === 'unass-ord') {
        this.underline('head-unass-ord');
      } else if (this.orderType === 'pend-ord') {
        this.underline('head-pend-ord');
      } else if (this.orderType === 'pack-ord') {
        this.underline('head-pack-ord');
      }
    });
  }

  viewInvoice(order: Order) {
    const dialogRef = this.dialog.open(InvoiceComponent, {
      data: {order}
    });
  }

  viewProducts(order: Order) {
    const dialogRef = this.dialog.open(ListProductsComponent, {
      data: {order}
    });
  }


}
