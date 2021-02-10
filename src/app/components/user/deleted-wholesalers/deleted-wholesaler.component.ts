import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../models/order';
import { Wholesaler } from '../../../models/wholesaler';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { WholesalerService } from '../../../services/wholesaler.service';

@Component({
  selector   : 'app-deleted-retailer',
  templateUrl: './deleted-wholesaler.component.html',
  styleUrls  : ['./deleted-wholesaler.component.css']
})
export class DeletedWholesalerComponent implements OnInit {

  users: Wholesaler[];

  constructor(private dialogRef: MatDialogRef<DeletedWholesalerComponent>,
              public wholesalerService: WholesalerService) {
  }

  ngOnInit(): void {
    this.wholesalerService.viewDeletedWholesalers()
      .subscribe(res => {
        this.users = res;
      });
  }

  restore(id: number) {
    this.wholesalerService.restoreWholesaler(id)
      .subscribe(res => {
        this.wholesalerService.viewDeletedWholesalers()
          .subscribe(result => {
            this.users = result;
          });
      });
  }

}
