import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../models/order';
import { Wholesaler } from '../../../models/wholesaler';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector   : 'app-deleted-retailer',
  templateUrl: './deleted-retailer.component.html',
  styleUrls  : ['./deleted-retailer.component.css']
})
export class DeletedRetailerComponent implements OnInit {

  users: User[];

  constructor(private dialogRef: MatDialogRef<DeletedRetailerComponent>,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.viewDeletedRetailers()
      .subscribe(res => {
        this.users = res;
      });
  }

  restore(id: number) {
    this.userService.restoreRetailer(id)
      .subscribe(res => {
        this.userService.viewDeletedRetailers()
          .subscribe(result => {
            this.users = result;
          });
      });
  }

}
