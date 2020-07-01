import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options = ['dashboard', 'products', 'users'];

  constructor(private router: Router,
              private adminService: AdminService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  bgColor(tab: string) {
    for (const option of this.options) {
      if (tab === option) {
        document.getElementById(tab).style.backgroundColor = '#19B3D3';
      } else {
        document.getElementById(option).style.backgroundColor = '#2f323a';
      }
    }
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/']);
  }

  products() {
    // this.bgColor('products');
    this.router.navigate(['/products']);
  }

  users() {
    // this.bgColor('users');
    this.router.navigate(['/users']);
  }

  employees() {
    this.router.navigate(['/employees']);
  }

  orders() {
    this.router.navigate(['/orders']);
  }

  pickups() {
    this.router.navigate(['/pickups']);
  }

  histories() {
    this.router.navigate(['/history']);
  }

}
