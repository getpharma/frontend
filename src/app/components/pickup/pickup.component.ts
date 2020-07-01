import { Component, OnInit } from '@angular/core';
import { Pickup, PickupProduct } from '../../models/pickup';
import { WholesalerProduct } from '../../models/product';
import { OrderStatus, PickupStatus } from '../../enums/order-status.enum';
import { PickupService } from '../../services/pickup.service';
import { AvailabilityEnum } from '../../enums/availability.enum';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModRateConfirmationDialogComponent } from './mod-rate-confirmation-dialog/mod-rate-confirmation-dialog.component';
import { AssignWholesalerComponent } from './assign-wholesaler/assign-wholesaler.component';
import { WholesalerConfirmationDialogComponent } from './wholesaler-confirmation-dialog/wholesaler-confirmation-dialog.component';
import { AssignEmployeesComponent } from '../order/assign-employees/assign-employees.component';
import { AssignPackagerComponent } from './assign-packager/assign-packager.component';

@Component({
  selector   : 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls  : ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  headings = ['head-unass-pick', 'head-pend-pick', 'head-acc-pick', 'head-comp-pick', 'head-rej-pick', 'head-mod-pick'];
  daysEnum = ['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  unassignedPickupProducts: PickupProduct[];
  pendingPickupProducts: PickupProduct[];
  acceptedPickups: Pickup[];
  completedPickups: Pickup[];
  rejectedPickupProducts: PickupProduct[];
  modifiedRates: PickupProduct[];

  currentDay;
  orderType;

  constructor(private pickupService: PickupService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    this.underline('head-unass-pick');
  }

  underline(element: string) {
    for (const heading of this.headings) {
      if (heading === element) {
        console.log(heading);
        document.getElementById(heading).classList.replace('inactive-heading', 'active-heading');
      } else {
        console.log(heading);
        document.getElementById(heading).classList.replace('active-heading', 'inactive-heading');
      }
    }
    if (element === 'head-unass-pick') {
      this.orderType = 'unass-pick';
      this.selectDay('unass-pick', 'all');
      document.getElementById('table-unass-pick').style.display = 'block';
      document.getElementById('table-pend-pick').style.display  = 'none';
      document.getElementById('table-acc-pick').style.display   = 'none';
      document.getElementById('table-comp-pick').style.display  = 'none';
      document.getElementById('table-rej-pick').style.display   = 'none';
      document.getElementById('table-mod-pick').style.display   = 'none';
      document.getElementById('days').style.display             = 'block';
    } else if (element === 'head-pend-pick') {
      this.orderType = 'pend-pick';
      this.selectDay('pend-pick', 'all');
      document.getElementById('table-unass-pick').style.display = 'none';
      document.getElementById('table-pend-pick').style.display  = 'block';
      document.getElementById('table-acc-pick').style.display   = 'none';
      document.getElementById('table-comp-pick').style.display  = 'none';
      document.getElementById('table-rej-pick').style.display   = 'none';
      document.getElementById('table-mod-pick').style.display   = 'none';
      document.getElementById('days').style.display             = 'block';
    } else if (element === 'head-acc-pick') {
      this.selectDay('acc-pick', 'all');
      document.getElementById('days').style.display             = 'none';
      document.getElementById('table-unass-pick').style.display = 'none';
      document.getElementById('table-pend-pick').style.display  = 'none';
      document.getElementById('table-acc-pick').style.display   = 'block';
      document.getElementById('table-comp-pick').style.display  = 'none';
      document.getElementById('table-rej-pick').style.display   = 'none';
      document.getElementById('table-mod-pick').style.display   = 'none';
    } else if (element === 'head-comp-pick') {
      this.selectDay('comp-pick', 'all');
      document.getElementById('days').style.display             = 'none';
      document.getElementById('table-unass-pick').style.display = 'none';
      document.getElementById('table-pend-pick').style.display  = 'none';
      document.getElementById('table-acc-pick').style.display   = 'none';
      document.getElementById('table-comp-pick').style.display  = 'block';
      document.getElementById('table-rej-pick').style.display   = 'none';
      document.getElementById('table-mod-pick').style.display   = 'none';
    } else if (element === 'head-rej-pick') {
      this.orderType = 'rej-pick';
      this.selectDay('rej-pick', 'all');
      document.getElementById('table-unass-pick').style.display = 'none';
      document.getElementById('table-pend-pick').style.display  = 'none';
      document.getElementById('table-acc-pick').style.display   = 'none';
      document.getElementById('table-comp-pick').style.display  = 'none';
      document.getElementById('table-rej-pick').style.display   = 'block';
      document.getElementById('table-mod-pick').style.display   = 'none';
      document.getElementById('days').style.display             = 'block';
    } else if (element === 'head-mod-pick') {
      this.orderType = 'mod-pick';
      this.selectDay('mod-pick', 'all');
      document.getElementById('table-unass-pick').style.display = 'none';
      document.getElementById('table-pend-pick').style.display  = 'none';
      document.getElementById('table-acc-pick').style.display   = 'none';
      document.getElementById('table-comp-pick').style.display  = 'none';
      document.getElementById('table-rej-pick').style.display   = 'none';
      document.getElementById('table-mod-pick').style.display   = 'block';
      document.getElementById('days').style.display             = 'none';
    }
  }

  selectDay(type: string, day: string) {
    this.currentDay = day;
    console.log(this.currentDay);
    for (let i = 0; i < 8; i++) {
      if (this.daysEnum[i] === day) {
        document.getElementById(this.daysEnum[i]).classList.replace('inactive-day', 'active-day');
      } else {
        document.getElementById(this.daysEnum[i]).classList.replace('active-day', 'inactive-day');
      }
    }
    if (type === 'unass-pick') {
      if (day === 'all') {
        this.pickupService.viewUnassignedPP()
          .subscribe(res => {
            this.unassignedPickupProducts = res;
          });
      } else {
        this.pickupService.viewUnassignedPP(day)
          .subscribe(res => {
            this.unassignedPickupProducts = res;
          });
      }
    } else if (type === 'pend-pick') {
      if (day === 'all') {
        this.pickupService.viewAssignedPickupProducts()
          .subscribe(res => {
            this.pendingPickupProducts = res;
            console.log(this.pendingPickupProducts[0]);
          });
      } else {
        this.pickupService.viewAssignedPickupProducts(day)
          .subscribe(res => {
            this.pendingPickupProducts = res;
          });
      }
    } else if (type === 'acc-pick') {
      this.pickupService.viewPickups(PickupStatus.PENDING)
        .subscribe(res => {
          this.acceptedPickups = res;
        });
    } else if (type === 'comp-pick') {
      this.pickupService.viewPickups(PickupStatus.SUCCESS)
        .subscribe(res => {
          this.completedPickups = res;
        });
    } else if (type === 'rej-pick') {
      if (day === 'all') {
        this.pickupService.viewPickupProducts(AvailabilityEnum.OUT_OF_STOCK)
          .subscribe(res => {
            this.rejectedPickupProducts = res;
          });
      } else {
        this.pickupService.viewPickupProducts(AvailabilityEnum.OUT_OF_STOCK, day)
          .subscribe(res => {
            this.rejectedPickupProducts = res;
            console.log(res);
          });
      }
    } else if (type === 'mod-pick') {
      this.pickupService.viewPickupProducts(AvailabilityEnum.REVISED_RATE)
        .subscribe(res => {
          this.modifiedRates = res;
          console.log(res);
        });
    }
  }

  assignWholesaler(pickupProductId: number, productId: number) {
    const dialogRef = this.dialog.open(AssignWholesalerComponent, {
      data: {pickupProductId, productId}
    });
    if (this.orderType === 'unass-pick') {
      dialogRef.afterClosed().subscribe(() => {
        const day = this.currentDay;
        if (day === 'all') {
          this.pickupService.viewUnassignedPP()
            .subscribe(res => {
              this.unassignedPickupProducts = res;
            });
        } else {
          this.pickupService.viewUnassignedPP(day)
            .subscribe(res => {
              this.unassignedPickupProducts = res;
            });
        }
      });
    } else {
      dialogRef.afterClosed().subscribe(() => {
        const day = this.currentDay;
        if (day === 'all') {
          this.pickupService.viewPickupProducts(AvailabilityEnum.OUT_OF_STOCK)
            .subscribe(res => {
              this.rejectedPickupProducts = res;
            });
        } else {
          this.pickupService.viewPickupProducts(AvailabilityEnum.OUT_OF_STOCK, day)
            .subscribe(res => {
              this.rejectedPickupProducts = res;
              console.log(res);
            });
        }
      });
    }
  }

  assignWholesalerByDay(day: string) {
    const dialogRef = this.dialog.open(WholesalerConfirmationDialogComponent, {data: {day}});
    dialogRef.afterClosed().subscribe(() => {
      this.selectDay('unass-pick', day);
    });
  }

  assignPackagerToPickup(pickupId: number) {
    const dialogRef = this.dialog.open(AssignPackagerComponent, {
      data: {pickupId}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.underline('head-acc-pick');
    });
  }


  actOnRevisedRate(id: number, action: string) {
    const dialogRef = this.dialog.open(ModRateConfirmationDialogComponent, {
      data: {id, action}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.pickupService.viewPickupProducts(AvailabilityEnum.REVISED_RATE)
        .subscribe(res => {
          this.modifiedRates = res;
        });
    });
  }
}
